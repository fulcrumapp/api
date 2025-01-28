---
title: Get Audio Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-audio-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\naudio = fulcrum.audio.find('{id}')\n\nprint(audio['audio'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.audio.find('{id}')\n  .then((audio) => {\n    console.log(audio);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\naudio = client.audio.find('{id}')\n\nputs audio",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]