---
title: Get All Authorizations
excerpt: ''
api:
  file: rest-api.json
  operationId: authorizations-get-all
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

authorizations = fulcrum.authorizations.search()

for authorization in authorizations['authorizations']:
  # print(authorization)
  print(authorization['note'])
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.authorizations.getAll()
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
authorizations = client.authorizations.all()

for authorization in authorizations.objects do
  # puts authorization # entire authorization definition
  puts authorization['id'] # just the authorization ID
end
```