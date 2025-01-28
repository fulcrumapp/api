---
title: Get All Records
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-records-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nrecords = fulcrum.records.search(url_params={'form_id': '{id}'})\n\nfor record in records['records']:\n  # print(record) # entire record\n  print(record['id']) # just the record id",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.records.all({\n    form_id: '{id}'\n  })\n  .then((page) => {\n    page.objects.forEach(record => {\n      // console.log(record); // entire record\n      console.log(record.id); // just the record id\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nrecords = client.records.all({'form_id':'{id}'})\n\nfor record in records.objects do\n  # puts record # entire record definition\n  puts record['id'] # just the record id\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]