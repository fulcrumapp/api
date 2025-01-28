---
title: Update Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-authorizations-authorization-id-json
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
  "authorization": {
    "organization_id": "organization-id-from-get-user",
    "note": "Updated Authorization"
  }
}

authorization = fulcrum.authorizations.update('{id}', obj)
print(authorization['authorization']['id'] + ' has been updated!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "organization_id": "organization-id-from-get-user",
  "note": "Updated Authorization"
};

client.authorizations.update('{id}', obj)
  .then((authorization) => {
    console.log(authorization.id + ' has been updated!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

authorization = {
  "organization_id"=>"organization-id-from-get-user",
  "note"=>"Updated Authorization"
};

response = client.authorizations.update('{id}', authorization)

puts response['id'] + ' has been updated!'
```
