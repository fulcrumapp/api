---
title: Get User Information
excerpt: ''
api:
  file: rest-api.json
  operationId: users-get-user
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
from fulcrum import get_user
from fulcrum.exceptions import UnauthorizedException

try:
  user = get_user('{email}', '{password}')
  print(user['user'])
except UnauthorizedException:
  print('email and/or password is incorrect')
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.users.getUser()
  .then(response => console.log(response.data))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

user = Fulcrum::Client.get_user('{email}', '{password}')

puts user
```