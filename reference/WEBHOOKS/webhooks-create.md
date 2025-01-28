---
title: Create Webhook
excerpt: ''
api:
  file: rest-api.json
  operationId: webhooks-create
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

obj = {
  "webhook": {
    "name": "Fire Hydrant Inventory Emails",
    "url": "https://my-webhook-processing-script.php"
  }
}

obj = json.loads(obj)

webhook = fulcrum.webhooks.create(obj)
print(webhook['webhook']['id'] + ' has been created!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Fire Hydrant Inventory Emails",
  "url": "https://my-webhook-processing-script.php"
};

client.webhooks.create(obj)
  .then((webhook) => {
    console.log(webhook.id + ' has been created!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

webhook = {
  "name"=>"Fire Hydrant Inventory Emails",
  "url"=>"https://my-webhook-processing-script.php"
}

response = client.webhooks.create(webhook)

puts response['id'] + ' has been created!'
```
