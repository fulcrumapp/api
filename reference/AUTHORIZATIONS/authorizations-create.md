---
title: Create Authorization
excerpt: ''
api:
  file: rest-api.json
  operationId: authorizations-create
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
The `POST` method requires HTTP Basic authentication, while `@fulcrumapp/fulcrum-js` authenticates with an API token. To create an authorization without an existing API token, use a server-side Basic-auth request. This example requires Node.js 18 or later and reads credentials from environment variables; set `FULCRUM_API_URL` to the regional API base URL for your account.

```javascript JavaScript
const apiBaseUrl = process.env.FULCRUM_API_URL ?? 'https://api.fulcrumapp.com/api';
const email = process.env.FULCRUM_EMAIL;
const password = process.env.FULCRUM_PASSWORD;

async function createAuthorization() {
  if (!email || !password) {
    throw new Error('Set FULCRUM_EMAIL and FULCRUM_PASSWORD before running this example.');
  }

  const response = await fetch(`${apiBaseUrl}/v2/authorizations.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      authorization: {
        organization_id: 'organization-id-from-getUser',
        note: 'My New API Token',
        timeout: 3600
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Authorization creation failed (${response.status}): ${await response.text()}`);
  }

  const { authorization } = await response.json();
  return authorization.token;
}

createAuthorization()
  .then((token) => {
    // Capture this output securely; do not commit it or include it in browser code.
    process.stdout.write(`${token}\n`);
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
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