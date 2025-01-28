---
title: Get JSON Video Track
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-video-id-track-json
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
import json
fulcrum = Fulcrum('{token}')

tracks = fulcrum.videos.track('{id}', 'json')

with open('track.json', 'w') as f:
  json.dump(tracks, f)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

client.videos.track('{id}', 'json')
  .then(track => fs.writeFile('track.json', track, function () {
    console.log('track downloaded!');
  }))
  .catch(err => console.log(err));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.videos.track('{id}', 'json')

File.open('track.json','w') do |f|
  f.write(track)
end
```
