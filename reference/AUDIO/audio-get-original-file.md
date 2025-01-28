---
title: Get Original Audio File
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-audio-id-mp4
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\naudio = fulcrum.audio.media('{id}', 'original')\n\nwith open('{id}.m4a', 'wb') as f:\n  f.write(audio)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst fs = require('fs');\nconst client = new Client('{token}');\n\nconst writeStream = fs.createWriteStream('{id}.m4a');\n\nclient.audio.media('{id}', 'original')\n  .then(audio => audio.pipe(writeStream))\n  .catch(error => console.log(error));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.audio.original('{id}') do |input|\n  File.open('{id}.m4a', 'wb') do |output|\n    output.write(input.read)\n  end\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]