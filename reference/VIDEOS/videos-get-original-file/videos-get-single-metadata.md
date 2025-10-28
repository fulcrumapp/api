---
title: Get Video Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: videos-get-single-metadata
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

video = fulcrum.videos.find('{id}')

print(video['video'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.videos.find('{id}')
  .then((video) => {
    console.log(video);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
video = client.videos.find('{id}')

puts video
```