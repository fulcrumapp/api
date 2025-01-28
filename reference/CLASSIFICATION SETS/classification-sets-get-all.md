---
title: Get All Classification Sets
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-classification-sets-json
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

classification_sets = fulcrum.classification_sets.search()

for classification_set in classification_sets['classification_sets']:
  # print(classification_set) # entire classification set
  print(classification_set['name']) # just the classification set name
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.classificationSets.all()
  .then((page) => {
    page.objects.forEach(classificationSet => {
      // console.log(classificationSet);  // entire classification set
      console.log(classificationSet.name); //  just the classification set name
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

classification_sets = client.classification_sets.all()

for classification_set in classification_sets.objects do
  # puts classification_set # entire classification set definition
  puts classification_set['name'] # just the classification set name
end
```
