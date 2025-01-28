---
title: Get All Audio
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audio-json
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# API Library Examples
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\naudios = fulcrum.audio.search(url_params={'form_id':'{id}'})\n\nfor audio in audios['audio']:\n  # print(audio) # entire audio metadata\n  print(audio['access_key']) # just the audio key",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.audio.all({'form_id':'{id}'})\n  .then((page) => {\n    page.objects.forEach(audio => {\n      // console.log(audio); // entire audio metadata\n      console.log(audio.access_key); // just the audio key\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\naudios = client.audio.all({'form_id':'{id}'})\n\nfor audio in audios.objects do\n  # puts audio # entire audio metadata\n  puts audio['access_key'] # just the audio key\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]