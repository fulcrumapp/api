---
title: Get All Photos
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-photos-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nphotos = fulcrum.photos.search(url_params={'form_id':'{id}'})\n\nfor photo in photos['photos']:\n  # print(photo) # entire photo metadata\n  print(photo['access_key']) # just the photo key",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.photos.all({'form_id':'{id}'})\n  .then((page) => {\n    page.objects.forEach(photo => {\n      // console.log(photo); // entire photo metadata\n      console.log(photo.access_key); // just the photo key\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nphotos = client.photos.all({'form_id':'{id}'})\n\nfor photo in photos.objects do\n  # puts photo # entire photo metadata\n  puts photo['access_key'] # just the photo key\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]