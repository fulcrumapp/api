---
title: Get GeoJSON Audio Track
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-audio-id-track-geojson
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
      "code": "from fulcrum import Fulcrum\nimport json\nfulcrum = Fulcrum('{token}')\n\ntracks = fulcrum.audio.track('{id}', 'geojson')\n\nwith open('track.geojson', 'w') as f:\n  json.dump(tracks, f)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst fs = require('fs');\nconst client = new Client('{token}');\n\nclient.audio.track('{id}', 'geojson')\n  .then(track => fs.writeFile('track.geojson', track, function () {\n    console.log('track downloaded!');\n  }))\n  .catch(err => console.log(err));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\ntrack = client.audio.track('{id}', 'geojson')\n\nFile.open('track.geojson','w') do |f|\n  f.write(track)\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]