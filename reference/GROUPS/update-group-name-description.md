---
title: Update Group Name / Description
excerpt: ''
api:
  file: rest-api.json
  operationId: update-group-name-description
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Use this endpoint to change the name and description of a group.

**Note:** if you are looking to manage a groups members, layers, projects and forms, you will need to use the [Update Group Permissions endpoint](https://docs.fulcrumapp.com/reference/update-group-permissions).

| Property    | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| name        | string | no       | The name of the group    |
| description | string | no       | Description of the group |

```json
{
    "group":{
        "name": "New name of group",
        "description": "Hello again group!"
    }
}

```
