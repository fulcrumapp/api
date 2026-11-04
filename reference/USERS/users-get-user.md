---
title: Get User Information
excerpt: ''
api:
  file: rest-api.json
  operationId: users-get-user
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
from fulcrum import get_user
from fulcrum.exceptions import UnauthorizedException

try:
  user = get_user('{email}', '{password}')
  print(user['user'])
except UnauthorizedException:
  print('email and/or password is incorrect')
```
To retrieve the organizations available to a user before they have an API token, use a server-side Basic-auth request. Do not send account credentials from browser code. This example requires Node.js 18 or later; set `FULCRUM_API_URL` to the regional API base URL for your account.

```javascript JavaScript
const apiBaseUrl = process.env.FULCRUM_API_URL ?? 'https://api.fulcrumapp.com/api';
const email = process.env.FULCRUM_EMAIL;
const password = process.env.FULCRUM_PASSWORD;

async function getUser() {
  if (!email || !password) {
    throw new Error('Set FULCRUM_EMAIL and FULCRUM_PASSWORD before running this example.');
  }

  const response = await fetch(`${apiBaseUrl}/v2/users.json`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`User lookup failed (${response.status}): ${await response.text()}`);
  }

  const user = await response.json();
  // Use the returned organization IDs when creating a first API token.
  console.log(user);
}

getUser().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
```
The SDK example below uses an existing API token. For the Basic-auth flow required to create a first token, use the request above.

```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.users.getUser()
  .then(response => console.log(response.data))
  .catch(error => console.error(error.message));
```
```ruby Ruby
require 'fulcrum'

user = Fulcrum::Client.get_user('{email}', '{password}')

puts user
```