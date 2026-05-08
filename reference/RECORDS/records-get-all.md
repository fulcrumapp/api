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
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.records.all({
    form_id: '{id}'
  })
  .then((page) => {
    page.objects.forEach(record => {
      // console.log(record); // entire record
      console.log(record.id); // just the record id
    });
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