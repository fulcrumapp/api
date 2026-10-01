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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.forms.getHistory('{id}')
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.forms.getHistory('{id}', { version: 3 })
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
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

const formId = '{id}';
const version = 1;

client.forms.getHistory(formId, { version })
  .then(historyResponse => client.forms.update(formId, { form: historyResponse.data.forms[0] }))
  .then(response => console.log(response.data))
  .catch(error => console.error(error.message));
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