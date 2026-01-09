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
const { getUser } = require('fulcrum-app');

getUser('{email}', '{password}')
  .then((user) => {
    console.log(user);
    // user.contexts is an array of the organizations you belong to.
    // Use these ids with createAuthorization to create API tokens.
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

user = Fulcrum::Client.get_user('{email}', '{password}')

puts user
```