---
title: Update Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: choice-lists-update
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
  "choice_list": {
    "name": "Bridge Inspection Conditions",
    "choices": [{
      "label": "Excellent",
      "value": "Excellent"
    }, {
      "label": "Good",
      "value": "Good"
    }, {
      "label": "Fair",
      "value": "Fair"
    }, {
      "label": "Poor",
      "value": "Poor"
    }, {
      "label": "Needs Replacing",
      "value": "Replace"
    }, {
      "label": "Unrated",
      "value": "Unrated"
    }, {
      "label": "N/A",
      "value": "N/A"
    }]
  }
}

choice_list = fulcrum.choice_lists.update('{id}', obj)
print(choice_list['choice_list']['id'] + ' has been updated!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Bridge Inspection Conditions",
  "choices": [{
    "label": "Excellent",
    "value": "Excellent"
  }, {
    "label": "Good",
    "value": "Good"
  }, {
    "label": "Fair",
    "value": "Fair"
  }, {
    "label": "Poor",
    "value": "Poor"
  }, {
    "label": "Needs Replacing",
    "value": "Replace"
  }, {
    "label": "Unrated",
    "value": "Unrated"
  }, {
    "label": "N/A",
    "value": "N/A"
  }]
};

client.choiceLists.update('{id}', obj)
  .then((choiceList) => {
    console.log(choiceList.id + ' has been updated!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

list = {
  "name"=>"Bridge Inspection Conditions",
  "choices"=>[{
    "label"=>"Excellent",
    "value"=>"Excellent"
  }, {
    "label"=>"Good",
    "value"=>"Good"
  }, {
    "label"=>"Fair",
    "value"=>"Fair"
  }, {
    "label"=>"Poor",
    "value"=>"Poor"
  }, {
    "label"=>"Needs Replacing",
    "value"=>"Replace"
  }, {
    "label"=>"Unrated",
    "value"=>"Unrated"
  }, {
    "label"=>"N/A",
    "value"=>"N/A"
  }]
};

response = client.choice_lists.update('{id}', list)

puts response['id'] + ' has been updated!'
```