---
title: Get All Choice Lists
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-choice-lists-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nchoice_lists = fulcrum.choice_lists.search()\n\nfor choice_list in choice_lists['choice_lists']:\n  # print(choice_list) # entire choice list\n  print(choice_list['name']) # just the choice list name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.choiceLists.all()\n  .then((page) => {\n    page.objects.forEach(choiceList => {\n      // console.log(choiceLists); // entire choice list\n      console.log(choiceList.name); // just the choice list name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nlists = client.choice_lists.all()\n\nfor list in lists.objects do\n  # puts list # entire choice list definition\n  puts list['name'] # just the choice list name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]