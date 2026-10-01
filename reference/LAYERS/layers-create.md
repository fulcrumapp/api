---
title: Create Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: layers-create
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
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
    "type": "xyz",
    "source": "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
  }
}

layer = fulcrum.layers.create(obj)
print(layer['layer']['id'] + ' has been created!')
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
  "type": "xyz",
  "source": "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
};

client.layers.create({ layerRequest: { layer: obj } })
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