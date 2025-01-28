---
title: Update Layer
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-layers-layer-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"layer\": {\n    \"name\": \"USGS Topo\",\n    \"description\": \"USGS Topo Base Map - Primary Tile Cache\",\n    \"type\": \"xyz\",\n    \"source\": \"http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}\"\n  }\n}\n\nlayer = fulcrum.layers.update('{id}', obj)\nprint(layer['layer']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"USGS Topo\",\n  \"description\": \"USGS Topo Base Map - Primary Tile Cache\",\n  \"type\": \"xyz\",\n  \"source\": \"http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}\"\n};\n\nclient.layers.update('{id}', obj)\n  .then((layer) => {\n    console.log(layer.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
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