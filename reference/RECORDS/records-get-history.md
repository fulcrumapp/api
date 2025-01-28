---
title: Get Record History
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-records-record-id-history-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nhistory = fulcrum.records.history('{id}')\n\nprint(history)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.records.history('{id}')\n  .then((page) => {\n    page.objects.forEach(version => {\n      console.log(version);\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nhistory = client.records.history('{id}')\n\nfor version in history.objects do\n  puts version\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]