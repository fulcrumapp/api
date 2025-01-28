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
const { Client } = require('fulcrum-app');
const fs = require('fs');
const client = new Client('{token}');

const writeStream = fs.createWriteStream('{id}.m4a');

client.audio.media('{id}', 'original')
  .then(audio => audio.pipe(writeStream))
  .catch(error => console.log(error));
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
