---
title: Layers API
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Layers API gives you access to the [map layers](http://help.fulcrumapp.com/maps-and-layers/general/how-do-you-add-a-map-layer-to-fulcrum) within your Fulcrum account.

# Properties

| Property      | Type   | Required | Readonly | Description                                                                      |
| ------------- | ------ | -------- | -------- | -------------------------------------------------------------------------------- |
| name          | string | yes      | no       | The name of the layer.                                                           |
| type          | string | yes      | no       | The layer type (fulcrum, xyz, tilejson, geojson, mbtiles, wms, feature-service). |
| source        | string | yes      | no       | The layer source.                                                                |
| description   | string | no       | no       | Optional layer description.                                                      |
| bounds        | array  | no       | yes      | The layer bounds.                                                                |
| center        | number | no       | yes      | The layer center.                                                                |
| maxzoom       | number | no       | yes      | The layer maximum zoom.                                                          |
| minzoom       | number | no       | yes      | The layer minimum zoom.                                                          |
| access\_token | string | yes      | no       | The layer access token.                                                          |
| id            | string | no       | yes      | The id of the layer.                                                             |
| created\_at   | string | no       | yes      | Timestamp when the layer was created.                                            |
| updated\_at   | string | no       | yes      | Timestamp when the layer was last updated.                                       |
| file\_size    | number | no       | yes      | The file size (for mbtiles).                                                     |

# Validations

The following properties must be included in order to create/update a layer object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type   | Description                                                                      | Example                                                                                     |
| -------- | ------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| name     | string | The name of the layer.                                                           | `"USGS Topo"`                                                                               |
| type     | string | The layer type (fulcrum, xyz, tilejson, geojson, mbtiles, wms, feature-service). | `"xyz"`                                                                                     |
| source   | string | The layer sourc (URL or inline GeoJSON).                                         | `"http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"` |

Example validation response if `type` is not included:

```json
{
  "layer": {
    "errors": {
      "type": [
        "must be one of fulcrum, xyz, tilejson, geojson, mbtiles, wms, feature-service"
      ]
    }
  }
}
```

# Notes

* The entire layer object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing layer is to fetch the layer object, modify it, and then submit the PUT request.
* For more information on uploading MBTiles files, please see [AWS Interactions](https://docs.fulcrumapp.com/reference/aws-interactions)

# Sample Response

```json
{
  "layer": {
    "name": "USGS Topo",
    "description": "USGS Topo Base Map - Primary Tile Cache (http://viewer.nationalmap.gov/example/services/serviceList.html)",
    "source": "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
    "bounds": null,
    "center": null,
    "maxzoom": null,
    "minzoom": null,
    "access_token": null,
    "id": "18e95686-b125-4baa-a263-b9bef2f9fee7",
    "created_at": "2014-10-22T17:07:53Z",
    "updated_at": "2014-10-24T19:21:05Z",
    "type": "xyz",
    "file_size": 0
  }
}
```

# Here's an example of how to upload an MBTiles file in python

```python
import requests
import json
import os

# get API_TOKEN
API_TOKEN = YOUR_API_TOKEN

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-apitoken": API_TOKEN
}

# Get the URL that we will upload our MBTiles file to
file_req_url = "https://api.fulcrumapp.com/api/v2/file/upload_url.json"
file_res = requests.get(url=file_req_url, headers=headers)
put_url_json = json.loads(file_res.text)
put_url = put_url_json['file']['url']

# Load the MBTiles file
with open(
    os.path.join(
        os.path.dirname( __file__ ), 
        '../../data-files', 
        'algiers.mbtiles'
    ), 'rb') as f:
    data = f.read()

# Put MBTiles file to AWS at the put_url
aws_response = requests.put(put_url,data=data)

# Make a layers object with "key" param instead of "source"
layers_json = {
    "layer": {
        "key": put_url_json['file']['key'],
        "type": "mbtiles",
        "name": "frankenlayer!"
    }
}

layers_url = 'https://api.fulcrumapp.com/api/v2/layers.json'
final_req = requests.post(url=layers_url, headers=headers, json=layers_json )
```
