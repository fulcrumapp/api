---
title: Close Changeset
excerpt: ''
api:
  file: rest-api.json
  operationId: changesets-close
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

fulcrum.changesets.close('{id}')
print('{id} has been closed!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.changesets.close('{id}')
  .then((changeset) => {
    console.log('{id} has been closed!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.changesets.close('{id}')

puts '{id} has been closed!'
```
