---
title: Get All Memberships
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-memberships-json
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

memberships = fulcrum.memberships.search()

for membership in memberships['memberships']:
  # print(membership) # entire membership
  print(membership['user']) # just the user name
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.memberships.all()
  .then((page) => {
    page.objects.forEach(membership => {
      // console.log(membership); // entire membership
      console.log(membership.user); // just the user name
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
memberships = client.memberships.all()

for membership in memberships.objects do
  # puts membership # entire membership
  puts membership['user'] # just the user name
end
```

## Get All Memberships for a specific Form

```curl cURL
curl --request GET 'https://api.fulcrumapp.com/api/v2/memberships.json?form_id=:id' \
--header 'Accept: application/json' \
--header 'X-ApiToken: {token}'
```
```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

memberships = fulcrum.memberships.search(url_params={'form_id':'{id}'})

for membership in memberships['memberships']:
  # print(membership) # entire membership
  print(membership['user']) # just the user name
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.memberships.all({'form_id':'{id}'})
  .then((page) => {
    page.objects.forEach(membership => {
      // console.log(membership); // entire membership
      console.log(membership.user); // just the user name
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
memberships = client.memberships.all({'form_id':'{id}'})

for membership in memberships.objects do
  # puts membership # entire membership
  puts membership['user'] # just the user name
end
```
