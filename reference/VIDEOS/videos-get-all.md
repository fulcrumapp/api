---
title: Get All Videos
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-videos-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nvideos = fulcrum.videos.search(url_params={'form_id':'{id}'})\n\nfor video in videos['videos']:\n  # print(video) # entire video metadata\n  print(video['access_key']) # just the video key",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.videos.all({'form_id':'{id}'})\n  .then((page) => {\n    page.objects.forEach(video => {\n      // console.log(video); // entire video metadata\n      console.log(video.access_key); // just the video key\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nvideos = client.videos.all({'form_id':'{id}'})\n\nfor video in videos.objects do\n  # puts video # entire video metadata\n  puts video['access_key'] # just the video key\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]