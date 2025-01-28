---
title: Update Project
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-projects-project-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"project\": {\n    \"name\": \"Pinellas County, FL\",\n    \"description\": \"For records in Pinellas County, FL\"\n  }\n}\n\nproject = fulcrum.projects.update('{id}', obj)\nprint(project['project']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Pinellas County, FL\",\n  \"description\": \"For records in Pinellas County, FL\"\n};\n\nclient.projects.update('{id}', obj)\n  .then((project) => {\n    console.log(project.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "project = {\n  \"name\"=>\"Pinellas County, FL\",\n  \"description\"=>\"For records in Pinellas County, FL\"\n}\n\nresponse = client.projects.update('{id}', project)\n\nputs response['id'] + ' has been updated!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]