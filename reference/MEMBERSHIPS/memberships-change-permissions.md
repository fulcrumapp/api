---
title: Change Permissions
excerpt: Add or remove membership permissions from layers, forms, or projects
api:
  file: rest-api.json
  operationId: memberships-change-permissions
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# Notes

* Users with a role of *Owner* always have access to all resources within the organization.

* The `change_permissions` endpoint accepts a JSON object labeled `change` with three parameters.

* The first parameter is `type`, which indicates which object you want to change the membership permissions of. Valid type values are `project_members`, `form_members`, and `layer_members`.

* The second parameter is the id of the object you want to change the permission of. Valid ID keys are `project_id`, `form_id` and `layer_id`. Values must be valid resource IDs.

* The third parameter is the changeset you would like to add or remove. This is a key of either `add` or `remove` with the value an array of valid member IDs that you would like to alter.

* Permissions provided from [Groups](https://docs.fulcrumapp.com/reference/groups-api) take priority over normal permissions. If you attempt to remove a member's Group-provided access to a form, project, or layer, the request will fail with a 422 status code response and the member's permissions will not change

# API Library Examples

## Add a Member to a Form

```curl cURL
curl --request POST 'https://api.fulcrumapp.com/api/v2/memberships/change_permissions.json' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-ApiToken: {token}' \
--data '{
  "change": {
    "type": "form_members",
    "form_id": "my-form-id",
    "add": ["my-member-id"]
  }
}'
```
```python Python
import requests
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-apitoken": API_TOKEN
}
body = {
    "change": {
        "type": "project_members",
        "project_id": id_of_project,
        "add": [membership_id_1]
    }
}

url = "https://api.fulcrumapp.com/api/v2/memberships/change_permissions.json"

try:
    res = requests.post(url, headers=headers, json=body)
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.memberships.change('form', '{my-form-id}', 'add', ['{my-member-id}'])
  .then((membership) => {
    membership.forEach(membership => {
      console.log(membership.user + ' added!');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```python Ruby
# Not currently supported
```

## Remove a Member from a Project

```curl cURL
curl --request POST 'https://api.fulcrumapp.com/api/v2/memberships/change_permissions.json' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-ApiToken: {token}' \
--data '{
  "change": {
    "type": "project_members",
    "project_id": "my-project-id",
    "remove": ["my-member-id"]
  }
}'
```
```python Python
# Not currently supported
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.memberships.change('project', '{my-project-id}', 'remove', ['{my-member-id}'])
  .then((membership) => {
    membership.forEach(membership => {
      console.log(membership.user + ' removed!');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
# Not currently supported
```