---
title: Create Group
excerpt: ''
api:
  file: rest-api.json
  operationId: create-group
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
To create a group, send a POST request to the groups endpoint with the following parameters:

| Property    | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| name        | string | yes      | The name of the group    |
| description | string | no       | Description of the group |

```json
{
    "group":{
        "name": "New group",
        "description": "Hello group!"
    }
}

```
