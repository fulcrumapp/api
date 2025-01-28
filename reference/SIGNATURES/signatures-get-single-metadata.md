---
title: Get Single Signature Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-signatures-signature-id-json
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
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nsignature = fulcrum.signatures.find('{id}')\n\nprint(signature['signature'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.signatures.find('{id}')\n  .then((signature) => {\n    console.log(signature);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nsignature = client.signatures.find('{id}')\n\nputs signature",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]