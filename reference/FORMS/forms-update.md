---
title: Update Form
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-forms-form-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"form\": {\n    \"name\": \"Fire Hydrant Inventory\",\n    \"description\": \"Updated inventory of fire hydrant structures.\",\n    \"elements\": [{\n      \"type\": \"TextField\",\n      \"key\": \"2832\",\n      \"label\": \"ID Tag\",\n      \"data_name\": \"id_tag\",\n      \"description\": \"Enter the asset tag ID.\",\n      \"required\": false,\n      \"disabled\": false,\n      \"hidden\": false,\n      \"default_value\": \"\"\n    }, {\n      \"type\": \"ChoiceField\",\n      \"key\": \"8373\",\n      \"label\": \"Hydrant Type\",\n      \"data_name\": \"hydrant_type\",\n      \"description\": \"What style of hydrant is it?\",\n      \"required\": false,\n      \"disabled\": false,\n      \"hidden\": false,\n      \"default_value\": \"\",\n      \"multiple\": false,\n      \"allow_other\": false,\n      \"choices\": [{\n        \"label\": \"Pillar\",\n        \"value\": \"pillar\"\n      }, {\n        \"label\": \"Pond\",\n        \"value\": \"pond\"\n      }, {\n        \"label\": \"Standpipe\",\n        \"value\": \"standpipe\"\n      }, {\n        \"label\": \"Underground\",\n        \"value\": \"underground\"\n      }, {\n        \"label\": \"Wall\",\n        \"value\": \"wall\"\n      }]\n    }]\n  }\n}\n\nform = fulcrum.forms.update('{id}', obj)\nprint(form['form']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Fire Hydrant Inventory\",\n  \"description\": \"Updated inventory of fire hydrant structures.\",\n  \"elements\": [{\n    \"type\": \"TextField\",\n    \"key\": \"2832\",\n    \"label\": \"ID Tag\",\n    \"data_name\": \"id_tag\",\n    \"description\": \"Enter the asset tag ID.\",\n    \"required\": false,\n    \"disabled\": false,\n    \"hidden\": false,\n    \"default_value\": \"\"\n  }, {\n    \"type\": \"ChoiceField\",\n    \"key\": \"8373\",\n    \"label\": \"Hydrant Type\",\n    \"data_name\": \"hydrant_type\",\n    \"description\": \"What style of hydrant is it?\",\n    \"required\": false,\n    \"disabled\": false,\n    \"hidden\": false,\n    \"default_value\": \"\",\n    \"multiple\": false,\n    \"allow_other\": false,\n    \"choices\": [{\n      \"label\": \"Pillar\",\n      \"value\": \"pillar\"\n    }, {\n      \"label\": \"Pond\",\n      \"value\": \"pond\"\n    }, {\n      \"label\": \"Standpipe\",\n      \"value\": \"standpipe\"\n    }, {\n      \"label\": \"Underground\",\n      \"value\": \"underground\"\n    }, {\n      \"label\": \"Wall\",\n      \"value\": \"wall\"\n    }]\n  }]\n};\n\nclient.forms.update('{id}', obj)\n  .then((form) => {\n    console.log(form.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nform = {\n  \"name\"=>\"Fire Hydrant Inventory\",\n  \"description\"=>\"Updated inventory of fire hydrant structures.\",\n  \"elements\"=>[{\n    \"type\"=>\"TextField\",\n    \"key\"=>\"2832\",\n    \"label\"=>\"ID Tag\",\n    \"data_name\"=>\"id_tag\",\n    \"description\"=>\"Enter the asset tag ID.\",\n    \"required\"=>false,\n    \"disabled\"=>false,\n    \"hidden\"=>false,\n    \"default_value\"=>\"\"\n  }, {\n    \"type\"=>\"ChoiceField\",\n    \"key\"=>\"8373\",\n    \"label\"=>\"Hydrant Type\",\n    \"data_name\"=>\"hydrant_type\",\n    \"description\"=>\"What style of hydrant is it?\",\n    \"required\"=>false,\n    \"disabled\"=>false,\n    \"hidden\"=>false,\n    \"default_value\"=>\"\",\n    \"multiple\"=>false,\n    \"allow_other\"=>false,\n    \"choices\"=>[{\n      \"label\"=>\"Pillar\",\n      \"value\"=>\"pillar\"\n    }, {\n      \"label\"=>\"Pond\",\n      \"value\"=>\"pond\"\n    }, {\n      \"label\"=>\"Standpipe\",\n      \"value\"=>\"standpipe\"\n    }, {\n      \"label\"=>\"Underground\",\n      \"value\"=>\"underground\"\n    }, {\n      \"label\"=>\"Wall\",\n      \"value\"=>\"wall\"\n    }]\n  }]\n}\n\nresponse = client.forms.update('{id}', form)\n\nputs response['id'] + ' has been updated!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]
## Adding fields to form

When adding new fields to a form, you **MUST** supply a `key` like `"key": "2832"` in the snippet <u>below</u>. As a reminder, the key is "the id for the field. Must be unique to the form and lowercase," and "4 character codes", as described in the Form Element Properties [table](https://docs.fulcrumapp.com/reference#forms-intro).
```json
{
   ...,
   {
      "type": "TextField",
      "key": "2832",
      "label": "ID Tag",
      "data_name": "id_tag",
      "description": "Enter the asset tag ID.",
      "required": false,
      "disabled": false,
      "hidden": false,
      "default_value": ""
    },
    ...
}
```