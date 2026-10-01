---
title: Get All Records
excerpt: ''
api:
  file: rest-api.json
  operationId: records-get-all
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

records = fulcrum.records.search(url_params={'form_id': '{id}'})

for record in records['records']:
  # print(record) # entire record
  print(record['id']) # just the record id
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.records.getAll({
    formId: '{id}'
  })
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
records = client.records.all({'form_id':'{id}'})

for record in records.objects do
  # puts record # entire record definition
  puts record['id'] # just the record id
end
```