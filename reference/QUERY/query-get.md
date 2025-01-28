---
title: GET Query
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-query
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
import json
fulcrum = Fulcrum('{token}')

response = fulcrum.query('SELECT * FROM "My App" LIMIT 10;', 'geojson')
# print(response)
with open('data.geojson', 'w') as outfile:  
  json.dump(response, outfile)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

client.query('SELECT * FROM "My App" LIMIT 10;', 'geojson')
  .then(geojson => fs.writeFile('data.geojson', JSON.stringify(geojson), function () {
    console.log('data downloaded!');
  }))
  .catch(error => console.log(error));
```
```ruby Ruby
require 'fulcrum'
require 'json'

client = Fulcrum::Client.new('{token}')
response = client.query('SELECT * FROM "My App" LIMIT 10;', 'geojson')

File.open("records.geojson","w") do |f|
  f.write(response.to_json)
end
```
