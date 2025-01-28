---
title: Create Project
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-projects-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"project\": {\n    \"name\": \"Pinellas County\",\n    \"description\": \"For records in Pinellas County\"\n  }\n}\n\nproject = fulcrum.projects.create(obj)\nprint(project['project']['id'] + ' has been created!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Pinellas County\",\n  \"description\": \"For records in Pinellas County\"\n};\n\nclient.projects.create(obj)\n  .then((project) => {\n    console.log(project.id + ' has been created!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nproject = {\n  \"name\"=>\"Pinellas County\",\n  \"description\"=>\"For records in Pinellas County\"\n}\n\nresponse = client.projects.create(project)\n\nputs response['id'] + ' has been created!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]