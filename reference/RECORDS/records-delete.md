---
title: Delete Record
excerpt: ''
api:
  file: rest-api.json
  operationId: delete_v-version-records-record-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nfulcrum.records.delete('{id}')\nprint('{id} has been deleted!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n  \nclient.records.delete('{id}')\n  .then((record) => {\n    console.log('{id} has been deleted!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.records.delete('{id}')\n\nputs '{id} has been deleted!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]