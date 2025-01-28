---
title: Get Single Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-layers-layer-id-json
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

layer = fulcrum.layers.find('{id}')

print(layer['layer'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.layers.find('{id}')
  .then((layer) => {
    console.log(layer);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
# Not currently supported
```
