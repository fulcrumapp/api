---
title: Get Record History
excerpt: ''
api:
  file: rest-api.json
  operationId: records-get-history
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

history = fulcrum.records.history('{id}')

print(history)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.records.history('{id}')
  .then((page) => {
    page.objects.forEach(version => {
      console.log(version);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
history = client.records.history('{id}')

for version in history.objects do
  puts version
end
```