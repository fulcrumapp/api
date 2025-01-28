---
title: Get Single Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-layers-layer-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nlayer = fulcrum.layers.find('{id}')\n\nprint(layer['layer'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.layers.find('{id}')\n  .then((layer) => {\n    console.log(layer);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
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