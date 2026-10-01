---
title: Create Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: choice-lists-create
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
      "label": "Unrated",
      "value": "Unrated"
    }, {
      "label": "N/A",
      "value": "N/A"
    }]
  }
}

choice_list = fulcrum.choice_lists.create(obj)
print(choice_list['choice_list']['id'] + ' has been created!')
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

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
    "label": "Unrated",
    "value": "Unrated"
  }, {
    "label": "N/A",
    "value": "N/A"
  }]
};

client.choiceLists.create({ choiceListRequest: { choice_list: obj } })
  .then((response) => {
    console.log(response.data);
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
    "label"=>"Unrated",
    "value"=>"Unrated"
  }, {
    "label"=>"N/A",
    "value"=>"N/A"
  }]
};

response = client.choice_lists.create(list)

puts response['id'] + ' has been created!'
```