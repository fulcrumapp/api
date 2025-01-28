---
title: Get Single Changeset
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-changesets-changeset-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nchangeset = fulcrum.changesets.find('{id}')\n\nprint(changeset['changeset'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.changesets.find('{id}')\n  .then((changeset) => {\n    console.log(changeset);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nchangeset = client.changesets.find('{id}')\n\nputs changeset",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]