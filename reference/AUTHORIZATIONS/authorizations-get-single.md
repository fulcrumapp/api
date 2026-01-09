---
title: Get Single Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: authorizations-get-single
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

authorization = fulcrum.authorizations.find('{id}')

print(authorization['authorization'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.authorizations.find('{id}')
  .then((authorization) => {
    console.log(authorization); // entire authorization
    // console.log(authorization.id); // just the authorization id
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
authorization = client.authorizations.find('{id}')

puts authorization
```