---
title: Update Record
excerpt: ''
api:
  file: rest-api.json
  operationId: records-update
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
      "2832": "456-DEF",
      "8373": {
        "choice_values": [
          "pillar"
        ]
      }
    }
  }
}

record = fulcrum.records.update('{record_id}', obj)
print(record['record']['id'] + ' has been updated!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "form_id": "my-form-id",
  "latitude": 27.770787,
  "longitude": -82.638039,
  "form_values": {
    "2832": "456-DEF",
    "8373": {
      "choice_values": [
        "pillar"
      ]
    }
  }
};

client.records.update('{record_id}', obj)
  .then((record) => {
    console.log(record.id + ' has been updated!');
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
    "2832"=>"456-DEF",
    "8373"=>{
      "choice_values"=>[
        "pillar"
      ]
    }
  }
}

response = client.records.update('{record_id}', record)

puts response['id'] + ' has been updated!'
```
