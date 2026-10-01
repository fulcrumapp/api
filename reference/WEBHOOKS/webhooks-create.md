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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "name": "Fire Hydrant Inventory Emails",
  "url": "https://my-webhook-processing-script.php"
};

client.webhooks.create({ webhook: obj })
  .then((response) => {
    console.log(response.data);
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