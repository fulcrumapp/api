---
title: Delete Webhook
excerpt: ''
api:
  file: rest-api.json
  operationId: webhooks-delete
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

fulcrum.webhooks.delete('{id}')
print('{id} has been deleted!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.webhooks.delete('{id}')
  .then((webhook) => {
    console.log('{id} has been deleted!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.webhooks.delete('{id}')

puts '{id} has been deleted!'
```