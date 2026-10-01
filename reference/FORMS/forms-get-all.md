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
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.forms.getAll({schema: false})
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
forms = client.forms.all()

for form in forms.objects do
  # puts form # entire form definition
  puts form['name'] # just the form name
end
```