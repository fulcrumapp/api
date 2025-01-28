---
title: Close Changeset
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-changesets-changeset-id-close-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nfulcrum.changesets.close('{id}')\nprint('{id} has been closed!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n  \nclient.changesets.close('{id}')\n  .then((changeset) => {\n    console.log('{id} has been closed!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.changesets.close('{id}')\n\nputs '{id} has been closed!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]