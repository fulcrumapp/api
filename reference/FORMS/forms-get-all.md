---
title: Get All Forms
excerpt: ''
api:
  file: rest-api.json
  operationId: forms-get-all
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

forms = fulcrum.forms.search()

for form in forms['forms']:
  # print(form) # entire form definition
  print(form['name']) # just the form name
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.forms.all({schema: false})
  .then((page) => {
    page.objects.forEach(form => {
      // console.log(form); // entire form definition
      console.log(form.name); // just the form name
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
forms = client.forms.all()

for form in forms.objects do
  # puts form # entire form definition
  puts form['name'] # just the form name
end
```