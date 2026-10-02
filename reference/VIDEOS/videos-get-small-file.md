---
title: Get Small Video File
excerpt: ''
api:
  file: rest-api.json
  operationId: videos-get-small-file
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

video = fulcrum.videos.media('{id}', 'small')

with open('{id}.mp4', 'wb') as f:
  f.write(video)
```
```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
import * as fs from 'node:fs/promises';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.client.videosGetSmallFile({ videoId: '{id}' }, { responseType: 'arraybuffer' })
  .then(response => fs.writeFile('{id}.mp4', Buffer.from(response.data)))
  .then(() => console.log('File downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.videos.small('{id}') do |input|
  File.open('{id}.mp4', 'wb') do |output|
    output.write(input.read)
  end
end
```