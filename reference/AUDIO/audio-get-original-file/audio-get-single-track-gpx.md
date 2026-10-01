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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const fs = require('node:fs/promises');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.audio.getSingleTrackGpx('{id}')
  .then(response => fs.writeFile('track.gpx', response.data))
  .then(() => console.log('Track downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'gpx')

File.open('track.gpx','w') do |f|
  f.write(track)
end
```