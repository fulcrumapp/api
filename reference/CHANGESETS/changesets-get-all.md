---
title: Get All Changesets
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-changesets-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nchangesets = fulcrum.changesets.search(url_params={'per_page':5,'page':1})\n\nfor changeset in changesets['changesets']:\n  # print(changeset) # entire changeset\n  print(changeset['id']) # just the changeset ID",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.changesets.all({'per_page':5,'page':1})\n  .then((page) => {\n    page.objects.forEach(changeset => {\n      // console.log(changeset);  // entire changeset\n      console.log(changeset.id); //  just the changesets ID\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nchangesets = client.changesets.all({'per_page':5,'page':1})\n\nfor changeset in changesets.objects do\n  # puts changeset # entire changeset\n  puts changeset['id'] # just the changeset ID\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]