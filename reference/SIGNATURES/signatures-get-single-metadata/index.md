---
title: Get Single Signature Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: signatures-get-single-metadata
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

signature = fulcrum.signatures.find('{id}')

print(signature['signature'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.signatures.find('{id}')
  .then((signature) => {
    console.log(signature);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
signature = client.signatures.find('{id}')

puts signature
```