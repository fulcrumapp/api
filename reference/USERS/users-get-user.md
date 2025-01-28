---
title: Get User Information
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-users-json
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
      "code": "from fulcrum import get_user\nfrom fulcrum.exceptions import UnauthorizedException\n\ntry:\n  user = get_user('{email}', '{password}')\n  print(user['user'])\nexcept UnauthorizedException:\n  print('email and/or password is incorrect')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { getUser } = require('fulcrum-app');\n\ngetUser('{email}', '{password}')\n  .then((user) => {\n    console.log(user);\n    // user.contexts is an array of the organizations you belong to.\n    // Use these ids with createAuthorization to create API tokens.\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nuser = Fulcrum::Client.get_user('{email}', '{password}')\n\nputs user",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]