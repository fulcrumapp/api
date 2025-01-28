---
title: Get Single Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-classification-sets-classification-set-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nclassification_set = fulcrum.classification_sets.find('{id}')\n\nprint(classification_set['classification_set'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.classificationSets.find('{id}')\n  .then((classificationSet) => {\n    console.log(classificationSet);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nclassification_set = client.classification_sets.find('{id}')\n\nputs classification_set",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]