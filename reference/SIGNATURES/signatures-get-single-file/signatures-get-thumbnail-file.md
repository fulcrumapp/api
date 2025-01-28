---
title: Signature Thumbnail File
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-signatures-signature-id-thumbnail-png
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nsignature = fulcrum.signatures.media('{id}', 'thumbnail')\n\nwith open('{id}.jpg', 'wb') as f:\n  f.write(signature)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst fs = require('fs');\nconst writeStream = fs.createWriteStream('{id}.jpg');\n\nclient.signatures.media('{id}', 'thumbnail')\n  .then(signature => signature.pipe(writeStream))\n  .catch(error => console.log(error));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclient.signatures.thumbnail('{id}') do |input|\n  File.open('{id}.jpg', 'wb') do |output|\n    output.write(input.read)\n  end\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]