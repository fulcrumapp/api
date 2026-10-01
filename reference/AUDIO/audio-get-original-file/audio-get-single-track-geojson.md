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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const fs = require('node:fs/promises');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.audio.getSingleTrackGeojson('{id}')
  .then(response => fs.writeFile('track.geojson', JSON.stringify(response.data, null, 2)))
  .then(() => console.log('Track downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'geojson')

File.open('track.geojson','w') do |f|
  f.write(track)
end
```