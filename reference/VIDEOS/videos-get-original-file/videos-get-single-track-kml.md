---
title: Get KML Video Track
excerpt: ''
api:
  file: rest-api.json
  operationId: videos-get-single-track-kml
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

tracks = fulcrum.videos.track('{id}', 'kml')

with open('track.kml', 'w') as f:
  json.dump(tracks, f)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

client.videos.track('{id}', 'kml')
  .then(track => fs.writeFile('track.kml', track, function () {
    console.log('track downloaded!');
  }))
  .catch(err => console.log(err));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.videos.track('{id}', 'kml')

File.open('track.kml','w') do |f|
  f.write(track)
end
```