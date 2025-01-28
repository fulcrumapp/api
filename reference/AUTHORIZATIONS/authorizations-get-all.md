---
title: Get All Authorizations
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-authorizations-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nauthorizations = fulcrum.authorizations.search()\n\nfor authorization in authorizations['authorizations']:\n  # print(authorization)\n  print(authorization['note'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.authorizations.all()\n  .then((page) => {\n    page.objects.forEach(authorization => {\n      // console.log(authorization); // entire authorization\n      console.log(authorization.id); // just the authorization id\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nauthorizations = client.authorizations.all()\n\nfor authorization in authorizations.objects do\n  # puts authorization # entire authorization definition\n  puts authorization['id'] # just the authorization ID\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]