---
title: Get All Memberships
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-memberships-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nmemberships = fulcrum.memberships.search()\n\nfor membership in memberships['memberships']:\n  # print(membership) # entire membership\n  print(membership['user']) # just the user name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.memberships.all()\n  .then((page) => {\n    page.objects.forEach(membership => {\n      // console.log(membership); // entire membership\n      console.log(membership.user); // just the user name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nmemberships = client.memberships.all()\n\nfor membership in memberships.objects do\n  # puts membership # entire membership\n  puts membership['user'] # just the user name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]
## Get All Memberships for a specific Form
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET 'https://api.fulcrumapp.com/api/v2/memberships.json?form_id=:id' \\\n--header 'Accept: application/json' \\\n--header 'X-ApiToken: {token}'",
      "language": "curl",
      "name": "cURL"
    },
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nmemberships = fulcrum.memberships.search(url_params={'form_id':'{id}'})\n\nfor membership in memberships['memberships']:\n  # print(membership) # entire membership\n  print(membership['user']) # just the user name",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.memberships.all({'form_id':'{id}'})\n  .then((page) => {\n    page.objects.forEach(membership => {\n      // console.log(membership); // entire membership\n      console.log(membership.user); // just the user name\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nmemberships = client.memberships.all({'form_id':'{id}'})\n\nfor membership in memberships.objects do\n  # puts membership # entire membership\n  puts membership['user'] # just the user name\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]