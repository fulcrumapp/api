---
title: Update Webhook
excerpt: ''
api:
  file: rest-api.json
  operationId: webhooks-update
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

obj = {
  "webhook": {
    "name": "Fire Hydrant Inventory Emails",
    "url": "https://my-webhook-processing-script.php",
    "active": false,
    "run_for_bulk_actions": false
  }
}

webhook = fulcrum.webhooks.update('{id}', obj)
print(webhook['webhook']['id'] + ' has been updated!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Fire Hydrant Inventory Emails",
  "url": "https://my-webhook-processing-script.php",
  "active": false,
  "run_for_bulk_actions": false
};

client.webhooks.update('{id}', obj)
  .then((webhook) => {
    console.log(webhook.id + ' has been updated!');
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
  "url"=>"https://my-webhook-processing-script.php",
  "active"=>false,
  "run_for_bulk_actions"=>false
}

response = client.webhooks.update('{id}', webhook)

puts response['id'] + ' has been updated!'
```