---
title: Get Single Signature File
excerpt: ''
api:
  file: rest-api.json
  operationId: signatures-get-single-file
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

signature = fulcrum.signatures.media('{id}', 'original')

with open('{id}.jpg', 'wb') as f:
  f.write(signature)
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const fs = require('node:fs/promises');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.client.signaturesGetSingleFile({ signatureId: '{id}' }, { responseType: 'arraybuffer' })
  .then(response => fs.writeFile('{id}.jpg', Buffer.from(response.data)))
  .then(() => console.log('File downloaded!'))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.signatures.original('{id}') do |input|
  File.open('{id}.jpg', 'wb') do |output|
    output.write(input.read)
  end
end
```