---
title: Get GPX Audio Track
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-single-track-gpx
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

tracks = fulcrum.audio.track('{id}', 'gpx')

with open('track.gpx', 'w') as f:
  json.dump(tracks, f)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

client.audio.track('{id}', 'gpx')
  .then(track => fs.writeFile('track.gpx', track, function () {
    console.log('track downloaded!');
  }))
  .catch(err => console.log(err));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'gpx')

File.open('track.gpx','w') do |f|
  f.write(track)
end
```
