---
title: Get All Classification Sets
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-classification-sets-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nclassification_sets = fulcrum.classification_sets.search()\n\nfor classification_set in classification_sets['classification_sets']:\n  # print(classification_set) # entire classification set\n  print(classification_set['name']) # just the classification set name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.classificationSets.all()\n  .then((page) => {\n    page.objects.forEach(classificationSet => {\n      // console.log(classificationSet);  // entire classification set\n      console.log(classificationSet.name); //  just the classification set name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclassification_sets = client.classification_sets.all()\n\nfor classification_set in classification_sets.objects do\n  # puts classification_set # entire classification set definition\n  puts classification_set['name'] # just the classification set name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]