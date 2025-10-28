---
title: Delete Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: classification-sets-delete
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

fulcrum.classification_sets.delete('{id}')
print('{id} has been deleted!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.classificationSets.delete('{id}')
  .then((classificationSet) => {
    console.log('{id} has been deleted!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.classification_sets.delete('{id}')

puts '{id} has been deleted!'
```