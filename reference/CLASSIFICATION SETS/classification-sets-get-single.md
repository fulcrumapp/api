---
title: Get Single Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: classification-sets-get-single
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.classificationSets.getById('{id}')
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
classification_set = client.classification_sets.find('{id}')

puts classification_set
```