---
title: Get All Projects
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-projects-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nprojects = fulcrum.projects.search()\n\nfor project in projects['projects']:\n  # print(project) # entire project\n  print(project['name']) # just the project name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.projects.all()\n  .then((page) => {\n    page.objects.forEach(project => {\n      // console.log(project);  // entire project\n      console.log(project.name); //  just the project name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nprojects = client.projects.all()\n\nfor project in projects.objects do\n  # puts project # entire project definition\n  puts project['name'] # just the projects name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]