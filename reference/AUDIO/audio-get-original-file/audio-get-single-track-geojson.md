---
title: Get GeoJSON Audio Track
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-single-track-geojson
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

tracks = fulcrum.audio.track('{id}', 'geojson')

with open('track.geojson', 'w') as f:
  json.dump(tracks, f)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

client.audio.track('{id}', 'geojson')
  .then(track => fs.writeFile('track.geojson', track, function () {
    console.log('track downloaded!');
  }))
  .catch(err => console.log(err));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'geojson')

File.open('track.geojson','w') do |f|
  f.write(track)
end
```