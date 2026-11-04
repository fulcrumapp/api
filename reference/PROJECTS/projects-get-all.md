---
title: Get All Projects
excerpt: ''
api:
  file: rest-api.json
  operationId: projects-get-all
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

projects = fulcrum.projects.search()

for project in projects['projects']:
  # print(project) # entire project
  print(project['name']) # just the project name
```
```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.projects.getAll()
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

projects = client.projects.all()

for project in projects.objects do
  # puts project # entire project definition
  puts project['name'] # just the projects name
end
```