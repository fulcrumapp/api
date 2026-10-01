---
title: Get All Memberships
excerpt: ''
api:
  file: rest-api.json
  operationId: memberships-get-all
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.memberships.getAll()
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.memberships.getAll({formId:'{id}'})
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
memberships = client.memberships.all({'form_id':'{id}'})

for membership in memberships.objects do
  # puts membership # entire membership
  puts membership['user'] # just the user name
end
```