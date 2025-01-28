---
title: Update Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-authorizations-authorization-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"authorization\": {\n    \"organization_id\": \"organization-id-from-get-user\",\n    \"note\": \"Updated Authorization\"\n  }\n}\n\nauthorization = fulcrum.authorizations.update('{id}', obj)\nprint(authorization['authorization']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"organization_id\": \"organization-id-from-get-user\",\n  \"note\": \"Updated Authorization\"\n};\n\nclient.authorizations.update('{id}', obj)\n  .then((authorization) => {\n    console.log(authorization.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nauthorization = {\n  \"organization_id\"=>\"organization-id-from-get-user\",\n  \"note\"=>\"Updated Authorization\"\n};\n\nresponse = client.authorizations.update('{id}', authorization)\n\nputs response['id'] + ' has been updated!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]