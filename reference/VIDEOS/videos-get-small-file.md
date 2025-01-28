---
title: Get Small Video File
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-video-id-small-mp4
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nvideo = fulcrum.videos.media('{id}', 'small')\n\nwith open('{id}.mp4', 'wb') as f:\n  f.write(video)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst fs = require('fs');\nconst client = new Client('{token}');\n\nconst writeStream = fs.createWriteStream('{id}.mp4');\n\nclient.videos.media('{id}', 'small')\n  .then(video => video.pipe(writeStream))\n  .catch(error => console.log(error));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.videos.small('{id}') do |input|\n  File.open('{id}.mp4', 'wb') do |output|\n    output.write(input.read)\n  end\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]