---
title: Update Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-choice-lists-choice-list-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"choice_list\": {\n    \"name\": \"Bridge Inspection Conditions\",\n    \"choices\": [{\n      \"label\": \"Excellent\",\n      \"value\": \"Excellent\"\n    }, {\n      \"label\": \"Good\",\n      \"value\": \"Good\"\n    }, {\n      \"label\": \"Fair\",\n      \"value\": \"Fair\"\n    }, {\n      \"label\": \"Poor\",\n      \"value\": \"Poor\"\n    }, {\n      \"label\": \"Needs Replacing\",\n      \"value\": \"Replace\"\n    }, {\n      \"label\": \"Unrated\",\n      \"value\": \"Unrated\"\n    }, {\n      \"label\": \"N/A\",\n      \"value\": \"N/A\"\n    }]\n  }\n}\n\nchoice_list = fulcrum.choice_lists.update('{id}', obj)\nprint(choice_list['choice_list']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Bridge Inspection Conditions\",\n  \"choices\": [{\n    \"label\": \"Excellent\",\n    \"value\": \"Excellent\"\n  }, {\n    \"label\": \"Good\",\n    \"value\": \"Good\"\n  }, {\n    \"label\": \"Fair\",\n    \"value\": \"Fair\"\n  }, {\n    \"label\": \"Poor\",\n    \"value\": \"Poor\"\n  }, {\n    \"label\": \"Needs Replacing\",\n    \"value\": \"Replace\"\n  }, {\n    \"label\": \"Unrated\",\n    \"value\": \"Unrated\"\n  }, {\n    \"label\": \"N/A\",\n    \"value\": \"N/A\"\n  }]\n};\n\nclient.choiceLists.update('{id}', obj)\n  .then((choiceList) => {\n    console.log(choiceList.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nlist = {\n  \"name\"=>\"Bridge Inspection Conditions\",\n  \"choices\"=>[{\n    \"label\"=>\"Excellent\",\n    \"value\"=>\"Excellent\"\n  }, {\n    \"label\"=>\"Good\",\n    \"value\"=>\"Good\"\n  }, {\n    \"label\"=>\"Fair\",\n    \"value\"=>\"Fair\"\n  }, {\n    \"label\"=>\"Poor\",\n    \"value\"=>\"Poor\"\n  }, {\n    \"label\"=>\"Needs Replacing\",\n    \"value\"=>\"Replace\"\n  }, {\n    \"label\"=>\"Unrated\",\n    \"value\"=>\"Unrated\"\n  }, {\n    \"label\"=>\"N/A\",\n    \"value\"=>\"N/A\"\n  }]\n};\n\nresponse = client.choice_lists.update('{id}', list)\n\nputs response['id'] + ' has been updated!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]