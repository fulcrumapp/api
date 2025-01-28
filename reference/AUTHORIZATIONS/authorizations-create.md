---
title: Create Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: post_v-version-authorizations-json
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
from fulcrum import create_authorization

email = '{email}'
password = '{password}'
organization_id = 'organization-id-from-get-user'
note = 'My New API Token'
timeout = 3600  # optional, defaults to None
user_id = 'bc95fb63-f664-46ce-b440-de8de85e4494' # optional, defaults to user creating token

auth = create_authorization(email, password, organization_id, note, timeout, user_id)
print(auth)
```
```javascript JavaScript
const { createAuthorization } = require('fulcrum-app');

const email = '{email}';
const password = '{password}';
const organizationId = 'organization-id-from-getUser';
const note = 'My New API Token';
const timeout = 3600; // optional, defaults to None
const userId = 'bc95fb63-f664-46ce-b440-de8de85e4494'; // optional, defaults to user creating token

createAuthorization(email, password, organizationId, note, timeout, userId)
  .then((authorization) => {
    console.log(authorization);
    // authorization.token is your API token to use with the rest of the API.
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

email = '{email}'
password = '{password}'
organization_id = 'organization-id-from-get-user'
note = 'My New API Token'
timeout = 3600  # optional, defaults to None
user_id = 'bc95fb63-f664-46ce-b440-de8de85e4494' # optional, defaults to user creating token

authorization = Fulcrum::Client.create_authorization(email, password, organization_id, note, timeout, user_id)

puts authorization
```

# Client-side jQuery Example

Below is an example of using jQuery to create an expiring authorization in a client-side application.

```js
var email = 'jane.doe@gmail.com';
var password = 'password';

var data = {
  authorization: {
    organization_id: 'organization-id-from-get-user',
    note: 'Some Application Name',
    timeout: 3600
  }
};

$.ajax({
  url: 'https://api.fulcrumapp.com/api/v2/authorizations.json',
  type: 'POST',
  data: JSON.stringify(data),
  dataType: 'json',
  contentType: 'application/json',
  headers: {
    'Authorization': 'Basic ' + window.btoa(email + ':' + password)
  },
  success: function (data) {
    console.log('Token is ' + data.authorization.token);
  },
  statusCode: {
    401: function() {
      window.alert('Incorrect credentials, please try again.');
    }
  }
});
```
