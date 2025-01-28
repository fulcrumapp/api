---
title: Create Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-choice-lists-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"choice_list\": {\n    \"name\": \"Bridge Inspection Conditions\",\n    \"choices\": [{\n      \"label\": \"Excellent\",\n      \"value\": \"Excellent\"\n    }, {\n      \"label\": \"Good\",\n      \"value\": \"Good\"\n    }, {\n      \"label\": \"Fair\",\n      \"value\": \"Fair\"\n    }, {\n      \"label\": \"Poor\",\n      \"value\": \"Poor\"\n    }, {\n      \"label\": \"Unrated\",\n      \"value\": \"Unrated\"\n    }, {\n      \"label\": \"N/A\",\n      \"value\": \"N/A\"\n    }]\n  }\n}\n\nchoice_list = fulcrum.choice_lists.create(obj)\nprint(choice_list['choice_list']['id'] + ' has been created!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Bridge Inspection Conditions\",\n  \"choices\": [{\n    \"label\": \"Excellent\",\n    \"value\": \"Excellent\"\n  }, {\n    \"label\": \"Good\",\n    \"value\": \"Good\"\n  }, {\n    \"label\": \"Fair\",\n    \"value\": \"Fair\"\n  }, {\n    \"label\": \"Poor\",\n    \"value\": \"Poor\"\n  }, {\n    \"label\": \"Unrated\",\n    \"value\": \"Unrated\"\n  }, {\n    \"label\": \"N/A\",\n    \"value\": \"N/A\"\n  }]\n};\n\nclient.choiceLists.create(obj)\n  .then((choiceList) => {\n    console.log(choiceList.id + ' has been created!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nlist = {\n  \"name\"=>\"Bridge Inspection Conditions\",\n  \"choices\"=>[{\n    \"label\"=>\"Excellent\",\n    \"value\"=>\"Excellent\"\n  }, {\n    \"label\"=>\"Good\",\n    \"value\"=>\"Good\"\n  }, {\n    \"label\"=>\"Fair\",\n    \"value\"=>\"Fair\"\n  }, {\n    \"label\"=>\"Poor\",\n    \"value\"=>\"Poor\"\n  }, {\n    \"label\"=>\"Unrated\",\n    \"value\"=>\"Unrated\"\n  }, {\n    \"label\"=>\"N/A\",\n    \"value\"=>\"N/A\"\n  }]\n};\n\nresponse = client.choice_lists.create(list)\n\nputs response['id'] + ' has been created!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]