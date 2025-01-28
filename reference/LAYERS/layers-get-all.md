---
title: Get All Layers
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-layers-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nlayers = fulcrum.layers.search()\n\nfor layer in layers['layers']:\n  # print(layer)\n  print(layer['name'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.layers.all()\n  .then((page) => {\n    page.objects.forEach(layer => {\n      // console.log(layer);\n      console.log(layer.name);\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
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