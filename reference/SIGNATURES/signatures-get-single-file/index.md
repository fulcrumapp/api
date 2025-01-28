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
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const fs = require('fs');
const writeStream = fs.createWriteStream('{id}.jpg');

client.signatures.media('{id}', 'original')
  .then(signature => signature.pipe(writeStream))
  .catch(error => console.log(error));
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
