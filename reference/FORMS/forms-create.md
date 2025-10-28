---
title: Create Form
excerpt: ''
api:
  file: rest-api.json
  operationId: forms-create
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

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

obj = {
  "form": {
    "name": "Fire Hydrant Inventory",
    "description": "Inventory of fire hydrant structures.",
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

form = fulcrum.forms.create(obj)
print(form['form']['id'] + ' has been created!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Fire Hydrant Inventory",
  "description": "Inventory of fire hydrant structures.",
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

client.forms.create(obj)
  .then((form) => {
    console.log(form.id + ' has been created!');
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
  "description"=>"Inventory of fire hydrant structures.",
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

response = client.forms.create(form)

puts response['id'] + ' has been created!'
```