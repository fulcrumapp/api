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

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

obj = {
  "form": {
    "name": "Fire Hydrant Inventory",
    "description": "Updated inventory of fire hydrant structures.",
    "elements": [{
      "type": "TextField",
      "key": "2832",
      "label": "ID Tag",
      "data_name": "id_tag",
      "description": "Enter the asset tag ID.",
      "required": false,
      "disabled": false,
      "hidden": false,
      "default_value": ""
    }, {
      "type": "ChoiceField",
      "key": "8373",
      "label": "Hydrant Type",
      "data_name": "hydrant_type",
      "description": "What style of hydrant is it?",
      "required": false,
      "disabled": false,
      "hidden": false,
      "default_value": "",
      "multiple": false,
      "allow_other": false,
      "choices": [{
        "label": "Pillar",
        "value": "pillar"
      }, {
        "label": "Pond",
        "value": "pond"
      }, {
        "label": "Standpipe",
        "value": "standpipe"
      }, {
        "label": "Underground",
        "value": "underground"
      }, {
        "label": "Wall",
        "value": "wall"
      }]
    }]
  }
}

form = fulcrum.forms.update('{id}', obj)
print(form['form']['id'] + ' has been updated!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Fire Hydrant Inventory",
  "description": "Updated inventory of fire hydrant structures.",
  "elements": [{
    "type": "TextField",
    "key": "2832",
    "label": "ID Tag",
    "data_name": "id_tag",
    "description": "Enter the asset tag ID.",
    "required": false,
    "disabled": false,
    "hidden": false,
    "default_value": ""
  }, {
    "type": "ChoiceField",
    "key": "8373",
    "label": "Hydrant Type",
    "data_name": "hydrant_type",
    "description": "What style of hydrant is it?",
    "required": false,
    "disabled": false,
    "hidden": false,
    "default_value": "",
    "multiple": false,
    "allow_other": false,
    "choices": [{
      "label": "Pillar",
      "value": "pillar"
    }, {
      "label": "Pond",
      "value": "pond"
    }, {
      "label": "Standpipe",
      "value": "standpipe"
    }, {
      "label": "Underground",
      "value": "underground"
    }, {
      "label": "Wall",
      "value": "wall"
    }]
  }]
};

client.forms.update('{id}', obj)
  .then((form) => {
    console.log(form.id + ' has been updated!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

form = {
  "name"=>"Fire Hydrant Inventory",
  "description"=>"Updated inventory of fire hydrant structures.",
  "elements"=>[{
    "type"=>"TextField",
    "key"=>"2832",
    "label"=>"ID Tag",
    "data_name"=>"id_tag",
    "description"=>"Enter the asset tag ID.",
    "required"=>false,
    "disabled"=>false,
    "hidden"=>false,
    "default_value"=>""
  }, {
    "type"=>"ChoiceField",
    "key"=>"8373",
    "label"=>"Hydrant Type",
    "data_name"=>"hydrant_type",
    "description"=>"What style of hydrant is it?",
    "required"=>false,
    "disabled"=>false,
    "hidden"=>false,
    "default_value"=>"",
    "multiple"=>false,
    "allow_other"=>false,
    "choices"=>[{
      "label"=>"Pillar",
      "value"=>"pillar"
    }, {
      "label"=>"Pond",
      "value"=>"pond"
    }, {
      "label"=>"Standpipe",
      "value"=>"standpipe"
    }, {
      "label"=>"Underground",
      "value"=>"underground"
    }, {
      "label"=>"Wall",
      "value"=>"wall"
    }]
  }]
}

response = client.forms.update('{id}', form)

puts response['id'] + ' has been updated!'
```

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
