---
title: Photo Large File
excerpt: ''
api:
  file: rest-api.json
  operationId: photos-get-large-file
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
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const fs = require('fs');
const writeStream = fs.createWriteStream('{id}.jpg');

client.photos.media('{id}', 'large')
  .then(photo => photo.pipe(writeStream))
  .catch(error => console.log(error));
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
