---
title: GET Query
excerpt: ''
api:
  file: rest-api.json
  operationId: query-get
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const fs = require('fs');
const client = new FulcrumClient({
  apiKey: '{token}',
  region: FulcrumRegion.US
});

client.query.get({
  q: 'SELECT * FROM "My App" LIMIT 10;',
  accept: 'application/geo+json'
})
  .then(response => fs.writeFile('data.geojson', JSON.stringify(response.data), error => {
    if (error) return console.error(error);
    console.log('data downloaded!');
  }))
  .catch(error => console.error(error));
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