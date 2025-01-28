---
title: Get JSON Video Track
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-video-id-track-json
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
      "code": "from fulcrum import Fulcrum\nimport json\nfulcrum = Fulcrum('{token}')\n\ntracks = fulcrum.videos.track('{id}', 'json')\n\nwith open('track.json', 'w') as f:\n  json.dump(tracks, f)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst fs = require('fs');\nconst client = new Client('{token}');\n\nclient.videos.track('{id}', 'json')\n  .then(track => fs.writeFile('track.json', track, function () {\n    console.log('track downloaded!');\n  }))\n  .catch(err => console.log(err));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\ntrack = client.videos.track('{id}', 'json')\n\nFile.open('track.json','w') do |f|\n  f.write(track)\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]