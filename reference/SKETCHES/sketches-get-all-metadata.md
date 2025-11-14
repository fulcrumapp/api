---
title: Get All Sketches
excerpt: ''
api:
  file: rest-api.json
  operationId: sketches-get-all-metadata
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

sketches = fulcrum.sketches.search(url_params={'form_id':'{id}'})

for sketch in sketches['sketches']:
  # print(sketch) # entire sketch metadata
  print(sketch['access_key']) # just the sketch key
```

```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.sketches.all({'form_id':'{id}'})
  .then((page) => {
    page.objects.forEach(sketch => {
      // console.log(sketch); // entire sketch metadata
      console.log(sketch.access_key); // just the sketch key
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```

```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

sketches = client.sketches.all({'form_id':'{id}'})

for sketch in sketches.objects do
  # puts sketch # entire sketch metadata
  puts sketch['access_key'] # just the sketch key
end
```
