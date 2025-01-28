---
title: Photo Thumbnail File
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-photos-photo-id-thumbnail-jpg
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nphoto = fulcrum.photos.media('{id}', 'thumbnail')\n\nwith open('{id}.jpg', 'wb') as f:\n  f.write(photo)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst fs = require('fs');\nconst writeStream = fs.createWriteStream('{id}.jpg');\n\nclient.photos.media('{id}', 'thumbnail')\n  .then(photo => photo.pipe(writeStream))\n  .catch(error => console.log(error));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.photos.thumbnail('{id}') do |input|\n  File.open('{id}.jpg', 'wb') do |output|\n    output.write(input.read)\n  end\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]