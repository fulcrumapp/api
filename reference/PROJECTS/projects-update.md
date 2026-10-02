---
title: Update Project
excerpt: ''
api:
  file: rest-api.json
  operationId: projects-update
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

obj = {
  "project": {
    "name": "Pinellas County, FL",
    "description": "For records in Pinellas County, FL"
  }
}

project = fulcrum.projects.update('{id}', obj)
print(project['project']['id'] + ' has been updated!')
```
```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const obj = {
  "name": "Pinellas County, FL",
  "description": "For records in Pinellas County, FL"
};

client.projects.update('{id}', { project: obj })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
project = {
  "name"=>"Pinellas County, FL",
  "description"=>"For records in Pinellas County, FL"
}

response = client.projects.update('{id}', project)

puts response['id'] + ' has been updated!'
```