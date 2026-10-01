---
title: Get All Videos
excerpt: ''
api:
  file: rest-api.json
  operationId: videos-get-all
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

videos = fulcrum.videos.search(url_params={'form_id':'{id}'})

for video in videos['videos']:
  # print(video) # entire video metadata
  print(video['access_key']) # just the video key
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.videos.getAll({formId:'{id}'})
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

videos = client.videos.all({'form_id':'{id}'})

for video in videos.objects do
  # puts video # entire video metadata
  puts video['access_key'] # just the video key
end
```