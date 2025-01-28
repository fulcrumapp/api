---
title: Get Single Project
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-projects-project-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nproject = fulcrum.projects.find('{id}')\n\nprint(project['project'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.projects.find('{id}')\n  .then((project) => {\n    console.log(projects);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nproject = client.projects.find('{id}')\n\nputs project",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]