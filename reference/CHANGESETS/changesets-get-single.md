---
title: Get Single Changeset
excerpt: ''
api:
  file: rest-api.json
  operationId: changesets-get-single
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

changeset = fulcrum.changesets.find('{id}')

print(changeset['changeset'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.changesets.find('{id}')
  .then((changeset) => {
    console.log(changeset);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

changeset = client.changesets.find('{id}')

puts changeset
```