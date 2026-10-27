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
    "gps_device_capture": {
      "device_name": "Trimble R2",
      "manufacturer": "Trimble",
      "fix_type": "RTK",
      "satellite_count": 14,
      "hdop": 0.8,
      "geometry": {
        "type": "Point",
        "coordinates": [-82.638039, 27.770787]
      }
    },
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
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "form_id": "my-form-id",
  "latitude": 27.770787,
  "longitude": -82.638039,
  "gps_device_capture": {
    "device_name": "Trimble R2",
    "manufacturer": "Trimble",
    "fix_type": "RTK",
    "satellite_count": 14,
    "hdop": 0.8,
    "geometry": {
      "type": "Point",
      "coordinates": [-82.638039, 27.770787]
    }
  },
  "form_values": {
    "2832": "456-DEF",
    "8373": {
      "choice_values": [
        "pillar"
      ]
    }
  }
};

client.records.update('{record_id}', { record: obj })
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

record = {
  "form_id"=>"my-form-id",
  "latitude"=>27.770787,
  "longitude"=>-82.638039,
  "gps_device_capture"=>{
    "device_name"=>"Trimble R2",
    "manufacturer"=>"Trimble",
    "fix_type"=>"RTK",
    "satellite_count"=>14,
    "hdop"=>0.8,
    "geometry"=>{
      "type"=>"Point",
      "coordinates"=>[-82.638039, 27.770787]
    }
  },
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