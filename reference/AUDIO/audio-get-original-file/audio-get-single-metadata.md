---
title: Get Audio Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-audio-id-json
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

audio = fulcrum.audio.find('{id}')

print(audio['audio'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.audio.find('{id}')
  .then((audio) => {
    console.log(audio);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

audio = client.audio.find('{id}')

puts audio
```
