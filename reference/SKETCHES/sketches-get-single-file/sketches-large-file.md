---
title: Sketch Large File
excerpt: ''
api:
  file: rest-api.json
  operationId: sketches-large-file
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

sketch = fulcrum.sketches.media('{id}', 'large')

with open('{id}.jpeg', 'wb') as f:
  f.write(sketch)
```

```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const fs = require('fs');
const writeStream = fs.createWriteStream('{id}.jpeg');

client.sketches.media('{id}', 'large')
  .then(sketch => sketch.pipe(writeStream))
  .catch(error => console.log(error));
```

```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.sketches.large('{id}') do |input|
  File.open('{id}.jpeg', 'wb') do |output|
    output.write(input.read)
  end
end
```
