---
title: Get All Forms
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-forms-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nforms = fulcrum.forms.search()\n\nfor form in forms['forms']:\n  # print(form) # entire form definition\n  print(form['name']) # just the form name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.forms.all({schema: false})\n  .then((page) => {\n    page.objects.forEach(form => {\n      // console.log(form); // entire form definition\n      console.log(form.name); // just the form name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nforms = client.forms.all()\n\nfor form in forms.objects do\n  # puts form # entire form definition\n  puts form['name'] # just the form name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]