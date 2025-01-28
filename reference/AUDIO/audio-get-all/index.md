---
title: Get All Audio
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-json
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# API Library Examples

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

audios = fulcrum.audio.search(url_params={'form_id':'{id}'})

for audio in audios['audio']:
  # print(audio) # entire audio metadata
  print(audio['access_key']) # just the audio key
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.audio.all({'form_id':'{id}'})
  .then((page) => {
    page.objects.forEach(audio => {
      // console.log(audio); // entire audio metadata
      console.log(audio.access_key); // just the audio key
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

audios = client.audio.all({'form_id':'{id}'})

for audio in audios.objects do
  # puts audio # entire audio metadata
  puts audio['access_key'] # just the audio key
end
```
