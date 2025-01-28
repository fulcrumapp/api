---
title: Delete Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: delete_v-version-layers-layer-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nfulcrum.layers.delete('{id}')\nprint('{id} has been deleted!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n  \nclient.layers.delete('{id}')\n  .then((layer) => {\n    console.log('{id} has been deleted!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "# Not currently supported",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]