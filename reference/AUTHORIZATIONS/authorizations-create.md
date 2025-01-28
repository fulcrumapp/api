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
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import create_authorization\n\nemail = '{email}'\npassword = '{password}'\norganization_id = 'organization-id-from-get-user'\nnote = 'My New API Token'\ntimeout = 3600  # optional, defaults to None\nuser_id = 'bc95fb63-f664-46ce-b440-de8de85e4494' # optional, defaults to user creating token\n\nauth = create_authorization(email, password, organization_id, note, timeout, user_id)\nprint(auth)",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { createAuthorization } = require('fulcrum-app');\n\nconst email = '{email}';\nconst password = '{password}';\nconst organizationId = 'organization-id-from-getUser';\nconst note = 'My New API Token';\nconst timeout = 3600; // optional, defaults to None\nconst userId = 'bc95fb63-f664-46ce-b440-de8de85e4494'; // optional, defaults to user creating token\n\ncreateAuthorization(email, password, organizationId, note, timeout, userId)\n  .then((authorization) => {\n    console.log(authorization);\n    // authorization.token is your API token to use with the rest of the API.\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nemail = '{email}'\npassword = '{password}'\norganization_id = 'organization-id-from-get-user'\nnote = 'My New API Token'\ntimeout = 3600  # optional, defaults to None\nuser_id = 'bc95fb63-f664-46ce-b440-de8de85e4494' # optional, defaults to user creating token\n\nauthorization = Fulcrum::Client.create_authorization(email, password, organization_id, note, timeout, user_id)\n\nputs authorization",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]
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