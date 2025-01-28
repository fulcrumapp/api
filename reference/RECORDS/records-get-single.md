---
title: Get Single Record
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-records-record-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nrecord = fulcrum.records.find('{id}')\n\nprint(record['record']) # entire record\n# print(record['record']['id']) # just the record id",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.records.find('{id}')\n  .then((record) => {\n    console.log(record); // entire record\n    // console.log(record.id); // just the record id\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nrecord = client.records.find('{id}')\n\n# puts record # entire record definition\nputs record['id'] # just the record id",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]