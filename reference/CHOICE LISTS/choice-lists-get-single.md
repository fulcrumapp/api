---
title: Get Single Choice List
excerpt: ''
api:
  file: rest-api.json
  operationId: choice-lists-get-single
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

choice_list = fulcrum.choice_lists.find('{id}')

print(choice_list['choice_list'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.choiceLists.find('{id}')
  .then((choiceList) => {
    console.log(choiceList);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
list = client.choice_lists.find('{id}')

puts list
```
