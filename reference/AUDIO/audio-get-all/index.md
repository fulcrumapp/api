---
title: Get All Audio
excerpt: ''
api:
  file: rest-api.json
  operationId: audio-get-all
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
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.audio.getAll({formId:'{id}'})
  .then((response) => {
    console.log(response.data);
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