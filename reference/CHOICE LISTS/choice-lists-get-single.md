---
title: Get Single Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-choice-lists-choice-list-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nchoice_list = fulcrum.choice_lists.find('{id}')\n\nprint(choice_list['choice_list'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.choiceLists.find('{id}')\n  .then((choiceList) => {\n    console.log(choiceList);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nlist = client.choice_lists.find('{id}')\n\nputs list",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]