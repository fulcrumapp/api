---
title: Get Video Metadata
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-video-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nvideo = fulcrum.videos.find('{id}')\n\nprint(video['video'])",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.videos.find('{id}')\n  .then((video) => {\n    console.log(video);\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nvideo = client.videos.find('{id}')\n\nputs video",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]