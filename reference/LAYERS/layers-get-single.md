---
title: Get Single Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: layers-get-single
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.layers.getById('{id}')
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