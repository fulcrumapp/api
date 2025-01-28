---
title: Create Project
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-projects-json
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
  "project": {
    "name": "Pinellas County",
    "description": "For records in Pinellas County"
  }
}

project = fulcrum.projects.create(obj)
print(project['project']['id'] + ' has been created!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Pinellas County",
  "description": "For records in Pinellas County"
};

client.projects.create(obj)
  .then((project) => {
    console.log(project.id + ' has been created!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

project = {
  "name"=>"Pinellas County",
  "description"=>"For records in Pinellas County"
}

response = client.projects.create(project)

puts response['id'] + ' has been created!'
```
