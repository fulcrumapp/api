---
title: Get All Photos
excerpt: ''
api:
  file: rest-api.json
  operationId: photos-get-all-metadata
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

photos = fulcrum.photos.search(url_params={'form_id':'{id}'})

for photo in photos['photos']:
  # print(photo) # entire photo metadata
  print(photo['access_key']) # just the photo key
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.photos.all({'form_id':'{id}'})
  .then((page) => {
    page.objects.forEach(photo => {
      // console.log(photo); // entire photo metadata
      console.log(photo.access_key); // just the photo key
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

photos = client.photos.all({'form_id':'{id}'})

for photo in photos.objects do
  # puts photo # entire photo metadata
  puts photo['access_key'] # just the photo key
end
```