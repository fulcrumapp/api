---
title: Get Single Record
excerpt: ''
api:
  file: rest-api.json
  operationId: records-get-single
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

record = fulcrum.records.find('{id}')

print(record['record']) # entire record
# print(record['record']['id']) # just the record id
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.records.find('{id}')
  .then((record) => {
    console.log(record); // entire record
    // console.log(record.id); // just the record id
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
record = client.records.find('{id}')

# puts record # entire record definition
puts record['id'] # just the record id
```
