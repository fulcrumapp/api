---
title: Update Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: layers-update
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# API Library Examples

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

obj = {
  "layer": {
    "name": "USGS Topo",
    "description": "USGS Topo Base Map - Primary Tile Cache",
    "type": "xyz",
    "source": "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
  }
}

layer = fulcrum.layers.update('{id}', obj)
print(layer['layer']['id'] + ' has been updated!')
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "name": "USGS Topo",
  "description": "USGS Topo Base Map - Primary Tile Cache",
  "type": "xyz",
  "source": "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
};

client.layers.update('{id}', { layerRequest: { layer: obj } })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
# Not currently supported
```