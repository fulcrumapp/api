---
title: Photo Large File
excerpt: ''
api:
  file: rest-api.json
  operationId: photos-large-file
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

photo = fulcrum.photos.media('{id}', 'large')

with open('{id}.jpg', 'wb') as f:
  f.write(photo)
```
```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
import * as fs from 'node:fs/promises';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.client.photosLargeFile({ photoId: '{id}' }, { responseType: 'arraybuffer' })
  .then(response => fs.writeFile('{id}.jpg', Buffer.from(response.data)))
  .then(() => console.log('File downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.photos.large('{id}') do |input|
  File.open('{id}.jpg', 'wb') do |output|
    output.write(input.read)
  end
end
```