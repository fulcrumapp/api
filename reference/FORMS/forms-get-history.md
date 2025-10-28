---
title: Get Form History
excerpt: ''
api:
  file: rest-api.json
  operationId: forms-get-history
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

## Get Form History (all versions)

```curl cURL
curl --request GET 'https://api.fulcrumapp.com/api/v2/forms/:id/history.json' \
--header 'Accept: application/json' \
--header 'X-ApiToken: {token}'
```
```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

history = fulcrum.forms.history('{id}')

print(history)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.forms.history('{id}')
  .then((page) => {
    page.objects.forEach(version => {
      console.log(version);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
form_history = client.forms.history('{id}');

for form in form_history.objects do
  puts form
end
```

## Get Form History (specific version)

```curl cURL
curl --request GET 'https://api.fulcrumapp.com/api/v2/forms/:id/history.json?version=3' \
--header 'Accept: application/json' \
--header 'X-ApiToken: {token}'
```
```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

history = fulcrum.forms.history('{id}', {'version': 3})

print(history)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.forms.history('{id}', 3)
  .then((page) => {
    page.objects.forEach(version => {
      console.log(version);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
form_history = client.forms.history('{id}', {version: 1});

for form in form_history.objects do
  puts form
end
```

## Restore from a previous Version

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

form_id = '{id}'
version = 1

old_form = fulcrum.forms.history(form_id, {'version': version})
updated_form = fulcrum.forms.update(form_id, old_form['forms'][0])

print(updated_form)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const formID = '{id}';
const version = 1;

client.forms.history(formID, version)
  .then((page) => {
    updateForm(formID, page.objects[0])
  })
  .catch((error) => {
    console.log(error.message);
  });

function updateForm(id, schema) {
  client.forms.update(id, schema)
    .then((form) => {
      console.log(form);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

form_id = '{id}'
version = 1

old_form = client.forms.history(form_id, {version: version});
updated_form = client.forms.update(form_id, old_form.objects[0])

puts updated_form
```
