---
title: Delete Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: layers-delete
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

fulcrum.layers.delete('{id}')
print('{id} has been deleted!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.layers.delete('{id}')
  .then((layer) => {
    console.log('{id} has been deleted!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
# Not currently supported
```
