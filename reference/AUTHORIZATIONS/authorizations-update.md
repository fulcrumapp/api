---
title: Update Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: authorizations-update
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
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "organization_id": "organization-id-from-get-user",
  "note": "Updated Authorization"
};

client.authorizations.update('{id}', { authorizationRequest: { authorization: obj } })
  .then((response) => {
    console.log(response.data);
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