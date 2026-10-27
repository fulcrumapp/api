---
title: Get KML Audio Track
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-single-track-kml
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

tracks = fulcrum.audio.track('{id}', 'kml')

with open('track.kml', 'w') as f:
  json.dump(tracks, f)
```
```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
import * as fs from 'node:fs/promises';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.audio.getSingleTrackKml('{id}')
  .then(response => fs.writeFile('track.kml', response.data))
  .then(() => console.log('Track downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

track = client.audio.track('{id}', 'kml')

File.open('track.kml','w') do |f|
  f.write(track)
end
```