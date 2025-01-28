---
title: Create Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-layers-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"layer\": {\n    \"name\": \"USGS Topo\",\n    \"type\": \"xyz\",\n    \"source\": \"http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}\"\n  }\n}\n\nlayer = fulcrum.layers.create(obj)\nprint(layer['layer']['id'] + ' has been created!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"USGS Topo\",\n  \"type\": \"xyz\",\n  \"source\": \"http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}\"\n};\n\nclient.layers.create(obj)\n  .then((layer) => {\n    console.log(layer.id + ' has been created!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "# Not currently supported",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]