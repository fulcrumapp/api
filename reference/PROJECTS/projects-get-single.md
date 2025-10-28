---
title: Get Single Project
excerpt: ''
api:
  file: rest-api.json
  operationId: projects-get-single
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

project = fulcrum.projects.find('{id}')

print(project['project'])
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.projects.find('{id}')
  .then((project) => {
    console.log(projects);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
project = client.projects.find('{id}')

puts project
```
