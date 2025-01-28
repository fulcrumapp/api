---
title: Get All Layers
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-layers-json
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

layers = fulcrum.layers.search()

for layer in layers['layers']:
  # print(layer)
  print(layer['name'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.layers.all()
  .then((page) => {
    page.objects.forEach(layer => {
      // console.log(layer);
      console.log(layer.name);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
# Not currently supported
```
