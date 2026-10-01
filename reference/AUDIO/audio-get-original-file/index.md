---
title: Get Original Audio File
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-original-file
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

audio = fulcrum.audio.media('{id}', 'original')

with open('{id}.m4a', 'wb') as f:
  f.write(audio)
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const fs = require('node:fs/promises');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.client.audioGetOriginalFile({ audioId: '{id}' }, { responseType: 'arraybuffer' })
  .then(response => fs.writeFile('{id}.m4a', Buffer.from(response.data)))
  .then(() => console.log('File downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.audio.original('{id}') do |input|
  File.open('{id}.m4a', 'wb') do |output|
    output.write(input.read)
  end
end
```