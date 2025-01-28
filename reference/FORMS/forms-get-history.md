---
title: Get Form History
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-forms-form-id-history-json
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

## Get Form History (all versions)
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET 'https://api.fulcrumapp.com/api/v2/forms/:id/history.json' \\\n--header 'Accept: application/json' \\\n--header 'X-ApiToken: {token}'",
      "language": "curl",
      "name": "cURL"
    },
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nhistory = fulcrum.forms.history('{id}')\n\nprint(history)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.forms.history('{id}')\n  .then((page) => {\n    page.objects.forEach(version => {\n      console.log(version);\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nform_history = client.forms.history('{id}');\n\nfor form in form_history.objects do\n  puts form\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]
## Get Form History (specific version)
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET 'https://api.fulcrumapp.com/api/v2/forms/:id/history.json?version=3' \\\n--header 'Accept: application/json' \\\n--header 'X-ApiToken: {token}'",
      "language": "curl",
      "name": "cURL"
    },
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nhistory = fulcrum.forms.history('{id}', {'version': 3})\n\nprint(history)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.forms.history('{id}', 3)\n  .then((page) => {\n    page.objects.forEach(version => {\n      console.log(version);\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nform_history = client.forms.history('{id}', {version: 1});\n\nfor form in form_history.objects do\n  puts form\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]
## Restore from a previous Version
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nform_id = '{id}'\nversion = 1\n\nold_form = fulcrum.forms.history(form_id, {'version': version})\nupdated_form = fulcrum.forms.update(form_id, old_form['forms'][0])\n\nprint(updated_form)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst formID = '{id}';\nconst version = 1;\n\nclient.forms.history(formID, version)\n  .then((page) => {\n    updateForm(formID, page.objects[0])\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });\n\nfunction updateForm(id, schema) {\n  client.forms.update(id, schema)\n    .then((form) => {\n      console.log(form);\n    })\n    .catch((error) => {\n      console.log(error.message);\n    });\n}",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nform_id = '{id}'\nversion = 1\n\nold_form = client.forms.history(form_id, {version: version});\nupdated_form = client.forms.update(form_id, old_form.objects[0])\n\nputs updated_form",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]