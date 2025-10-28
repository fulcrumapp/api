---
title: Create Record
excerpt: ''
api:
  file: rest-api.json
  operationId: records-create
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
  "record": {
    "form_id": "my-form-id",
    "latitude": 27.770787,
    "longitude": -82.638039,
    "form_values": {
      "2832": "123-ABC",
      "8373": {
        "choice_values": [
          "standpipe"
        ]
      }
    }
  }
}

record = fulcrum.records.create(obj)
print(record['record']['id'] + ' has been created!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "form_id": "my-form-id",
  "latitude": 27.770787,
  "longitude": -82.638039,
  "form_values": {
    "2832": "123-ABC",
    "8373": {
      "choice_values": [
        "standpipe"
      ]
    }
  }
};

client.records.create(obj)
  .then((record) => {
    console.log(record.id + ' has been created!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

record = {
  "form_id"=>"my-form-id",
  "latitude"=>27.770787,
  "longitude"=>-82.638039,
  "form_values"=>{
    "2832"=>"123-ABC",
    "8373"=>{
      "choice_values"=>[
        "standpipe"
      ]
    }
  }
}

response = client.records.create(record)

puts response['id'] + ' has been created!'
```