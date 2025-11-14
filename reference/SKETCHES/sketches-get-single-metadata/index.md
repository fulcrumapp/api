---
title: Get Single Sketch Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: sketches-get-single-metadata
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

sketch = fulcrum.sketches.find('{id}')

print(sketch['sketch'])
```

```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.sketches.find('{id}')
  .then((sketch) => {
    console.log(sketch);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
sketch = client.sketches.find('{id}')

puts sketch
```
