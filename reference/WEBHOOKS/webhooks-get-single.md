---
title: Get Single Webhook
excerpt: ''
api:
  file: rest-api.json
  operationId: webhooks-get-single
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

webhook = fulcrum.webhooks.find('{id}')

print(webhook['webhook'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.webhooks.find('{id}')
  .then((webhook) => {
    console.log(webhook);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

webhook = client.webhooks.find('{id}')

puts webhook
```