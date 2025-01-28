---
title: Get Original Video File
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-video-id-mp4
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

video = fulcrum.videos.media('{id}', 'original')

with open('{id}.mp4', 'wb') as f:
  f.write(video)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

const writeStream = fs.createWriteStream('{id}.mp4');

client.videos.media('{id}', 'original')
  .then(video => video.pipe(writeStream))
  .catch(error => console.log(error));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.videos.original('{id}') do |input|
  File.open('{id}.mp4', 'wb') do |output|
    output.write(input.read)
  end
end
```
