---
title: Get All Changesets
excerpt: ''
api:
  file: rest-api.json
  operationId: changesets-get-all
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

changesets = fulcrum.changesets.search(url_params={'per_page':5,'page':1})

for changeset in changesets['changesets']:
  # print(changeset) # entire changeset
  print(changeset['id']) # just the changeset ID
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.changesets.all({'per_page':5,'page':1})
  .then((page) => {
    page.objects.forEach(changeset => {
      // console.log(changeset);  // entire changeset
      console.log(changeset.id); //  just the changesets ID
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

changesets = client.changesets.all({'per_page':5,'page':1})

for changeset in changesets.objects do
  # puts changeset # entire changeset
  puts changeset['id'] # just the changeset ID
end
```
