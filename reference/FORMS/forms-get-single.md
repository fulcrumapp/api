---
title: Get Single Form
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-forms-form-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nform = fulcrum.forms.find('{id}')\n\n# print(form['form']) # entire form definition\nprint(form['form']['name']) # just the form name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.forms.find('{id}')\n  .then((form) => {\n    // console.log(form); // entire form definition\n    console.log(form.name); // just the form name\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nform = client.forms.find('{id}')\n\n# puts form # entire form definition\nputs form['name'] # just the form name",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]