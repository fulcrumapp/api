---
title: Get All Projects
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-projects-json
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
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.projects.all()
  .then((page) => {
    page.objects.forEach(project => {
      // console.log(project);  // entire project
      console.log(project.name); //  just the project name
    });
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
