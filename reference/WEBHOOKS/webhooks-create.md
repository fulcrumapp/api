---
title: Create Webhook
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-webhooks-json
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
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"webhook\": {\n    \"name\": \"Fire Hydrant Inventory Emails\",\n    \"url\": \"https://my-webhook-processing-script.php\"\n  }\n}\n\nobj = json.loads(obj)\n\nwebhook = fulcrum.webhooks.create(obj)\nprint(webhook['webhook']['id'] + ' has been created!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Fire Hydrant Inventory Emails\",\n  \"url\": \"https://my-webhook-processing-script.php\"\n};\n\nclient.webhooks.create(obj)\n  .then((webhook) => {\n    console.log(webhook.id + ' has been created!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nwebhook = {\n  \"name\"=>\"Fire Hydrant Inventory Emails\",\n  \"url\"=>\"https://my-webhook-processing-script.php\"\n}\n\nresponse = client.webhooks.create(webhook)\n\nputs response['id'] + ' has been created!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]