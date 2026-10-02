---
title: Create Project
excerpt: ''
api:
  file: rest-api.json
  operationId: projects-create
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
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "name": "Pinellas County",
  "description": "For records in Pinellas County"
};

client.projects.create({ project: obj })
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

project = {
  "name"=>"Pinellas County",
  "description"=>"For records in Pinellas County"
}

response = client.projects.create(project)

puts response['id'] + ' has been created!'
```