---
title: Get JSON Audio Track
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-single-track-json
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

tracks = fulcrum.audio.track('{id}', 'json')

with open('track.json', 'w') as f:
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

client.audio.getSingleTrackJson('{id}')
  .then(response => fs.writeFile('track.json', JSON.stringify(response.data, null, 2)))
  .then(() => console.log('Track downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'json')

File.open('track.json','w') do |f|
  f.write(track)
end
```