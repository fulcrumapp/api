---
title: Get All Choice Lists
excerpt: ''
api:
  file: rest-api.json
  operationId: choice-lists-get-all
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

choice_lists = fulcrum.choice_lists.search()

for choice_list in choice_lists['choice_lists']:
  # print(choice_list) # entire choice list
  print(choice_list['name']) # just the choice list name
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.choiceLists.getAll()
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

lists = client.choice_lists.all()

for list in lists.objects do
  # puts list # entire choice list definition
  puts list['name'] # just the choice list name
end
```