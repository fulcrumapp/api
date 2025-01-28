---
title: Get Single Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-authorizations-authorization-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nauthorization = fulcrum.authorizations.find('{id}')\n\nprint(authorization['authorization'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.authorizations.find('{id}')\n  .then((authorization) => {\n    console.log(authorization); // entire authorization\n    // console.log(authorization.id); // just the authorization id\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nauthorization = client.authorizations.find('{id}')\n\nputs authorization",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]