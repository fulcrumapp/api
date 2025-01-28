---
title: Get Single Photo Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-photos-photo-id-json
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

photo = fulcrum.photos.find('{id}')

print(photo['photo'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.photos.find('{id}')
  .then((photo) => {
    console.log(photo);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
photo = client.photos.find('{id}')

puts photo
```
