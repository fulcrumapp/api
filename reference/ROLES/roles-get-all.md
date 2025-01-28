---
title: Get All Roles
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-roles-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nroles = fulcrum.roles.search()\n\nfor role in roles['roles']:\n  print(role) # entire role\n  # print(roles['name']) # just the role name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.roles.all()\n  .then((page) => {\n    page.objects.forEach(role => {\n      console.log(role); // entire role\n      // console.log(role.name); // just the role name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nroles = client.roles.all()\n\nfor role in roles.objects do\n  # puts role # entire role definition\n  puts role['id'] # just the role id\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]