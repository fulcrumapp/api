---
title: Delete Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: delete_v-version-classification-sets-classification-set-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nfulcrum.classification_sets.delete('{id}')\nprint('{id} has been deleted!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n  \nclient.classificationSets.delete('{id}')\n  .then((classificationSet) => {\n    console.log('{id} has been deleted!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.classification_sets.delete('{id}')\n\nputs '{id} has been deleted!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]