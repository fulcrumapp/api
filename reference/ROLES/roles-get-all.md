---
title: Get All Roles
excerpt: ''
api:
  file: rest-api.json
  operationId: roles-get-all
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

roles = fulcrum.roles.search()

for role in roles['roles']:
  print(role) # entire role
  # print(roles['name']) # just the role name
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.roles.all()
  .then((page) => {
    page.objects.forEach(role => {
      console.log(role); // entire role
      // console.log(role.name); // just the role name
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
roles = client.roles.all()

for role in roles.objects do
  # puts role # entire role definition
  puts role['id'] # just the role id
end
```