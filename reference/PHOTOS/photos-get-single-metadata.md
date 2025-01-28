---
title: Get Single Photo Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-photos-photo-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nphoto = fulcrum.photos.find('{id}')\n\nprint(photo['photo'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.photos.find('{id}')\n  .then((photo) => {\n    console.log(photo);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nphoto = client.photos.find('{id}')\n\nputs photo",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]