---
title: Create Record
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-records-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"record\": {\n    \"form_id\": \"my-form-id\",\n    \"latitude\": 27.770787,\n    \"longitude\": -82.638039,\n    \"form_values\": {\n      \"2832\": \"123-ABC\",\n      \"8373\": {\n        \"choice_values\": [\n          \"standpipe\"\n        ]\n      }\n    }\n  }\n}\n\nrecord = fulcrum.records.create(obj)\nprint(record['record']['id'] + ' has been created!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"form_id\": \"my-form-id\",\n  \"latitude\": 27.770787,\n  \"longitude\": -82.638039,\n  \"form_values\": {\n    \"2832\": \"123-ABC\",\n    \"8373\": {\n      \"choice_values\": [\n        \"standpipe\"\n      ]\n    }\n  }\n};\n\nclient.records.create(obj)\n  .then((record) => {\n    console.log(record.id + ' has been created!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nrecord = {\n  \"form_id\"=>\"my-form-id\",\n  \"latitude\"=>27.770787,\n  \"longitude\"=>-82.638039,\n  \"form_values\"=>{\n    \"2832\"=>\"123-ABC\",\n    \"8373\"=>{\n      \"choice_values\"=>[\n        \"standpipe\"\n      ]\n    }\n  }\n}\n\nresponse = client.records.create(record)\n\nputs response['id'] + ' has been created!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]