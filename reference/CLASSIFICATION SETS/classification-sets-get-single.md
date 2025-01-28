---
title: Get Single Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-classification-sets-classification-set-id-json
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

classification_set = fulcrum.classification_sets.find('{id}')

print(classification_set['classification_set'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.classificationSets.find('{id}')
  .then((classificationSet) => {
    console.log(classificationSet);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
classification_set = client.classification_sets.find('{id}')

puts classification_set
```
