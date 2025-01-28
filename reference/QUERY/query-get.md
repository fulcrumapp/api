---
title: GET Query
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-query
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
      "code": "from fulcrum import Fulcrum\nimport json\nfulcrum = Fulcrum('{token}')\n\nresponse = fulcrum.query('SELECT * FROM \"My App\" LIMIT 10;', 'geojson')\n# print(response)\nwith open('data.geojson', 'w') as outfile:  \n  json.dump(response, outfile)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst fs = require('fs');\nconst client = new Client('{token}');\n\nclient.query('SELECT * FROM \"My App\" LIMIT 10;', 'geojson')\n  .then(geojson => fs.writeFile('data.geojson', JSON.stringify(geojson), function () {\n    console.log('data downloaded!');\n  }))\n  .catch(error => console.log(error));",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\nrequire 'json'\n\nclient = Fulcrum::Client.new('{token}')\nresponse = client.query('SELECT * FROM \"My App\" LIMIT 10;', 'geojson')\n\nFile.open(\"records.geojson\",\"w\") do |f|\n  f.write(response.to_json)\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]