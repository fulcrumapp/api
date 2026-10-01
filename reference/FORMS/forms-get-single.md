---
title: Get Single Form
excerpt: ''
api:
  file: rest-api.json
  operationId: forms-get-single
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

form = fulcrum.forms.find('{id}')

# print(form['form']) # entire form definition
print(form['form']['name']) # just the form name
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.forms.getById('{id}')
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
form = client.forms.find('{id}')

# puts form # entire form definition
puts form['name'] # just the form name
```