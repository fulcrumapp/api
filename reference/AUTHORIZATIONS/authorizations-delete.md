---
title: Delete Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: delete_v-version-authorizations-authorization-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nfulcrum.authorizations.delete('{id}')\nprint('{id}' + ' has been deleted!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n  \nclient.authorizations.delete('{id}')\n  .then((authorization) => {\n    console.log('{id} has been deleted!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.authorizations.delete('{id}')\n\nputs '{id} has been deleted!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]