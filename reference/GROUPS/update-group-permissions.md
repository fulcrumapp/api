---
title: Update Group Permissions
excerpt: ''
api:
  file: rest-api.json
  operationId: groups-update-permissions
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Use this endpoint to manage a group's members, layers, projects and forms. To change one of the permission properties of a group, you will need to include the correct `type` slug in the body of your request. Use this table to find out which slug to use in your request:

| Desired action            | Type slug        |
| ------------------------- | ---------------- |
| Update a group's members  | `group_members`  |
| Update a group's projects | `group_projects` |
| Update a group's layers   | `group_layers`   |
| Update a group's forms    | `group_forms`    |

The body of your request should contain these properties as required:

| Property  | Type             | Required | Description                                              |
| --------- | ---------------- | -------- | -------------------------------------------------------- |
| type      | string           | yes      | The type of update (reference the type slug table above) |
| group\_id | string           | yes      | The group ID                                             |
| add       | array of strings | no       | The collection of entities to add to the group           |
| remove    | array of strings | no       | The collection of entities to remove from the group      |

## JSON Body Examples

In these examples, you can add and remove permissions in the same request by filling the `add` or `remove` array properties with multiple ids, separated by commas. **Please keep in mind** that if you are changing a group permission and reference multiple members, layers, projects or forms in the `add` or `remove` property of your request body, and there is an error with adding or removing one of them, the entire request will fail, and none of the other additions or removals will be successful.

Replace double-bracketed strings with your own variables where applicable.

```json Add members
{
    "change": {
        "type": "group_members",
        "group_id": "{{group_id}}",
        "add": [
            "81ad0f14-35a8-4be0-8ca0-83ea93947987",
          	"{{another membership id}}"
        ],
        "remove": []
    }
}
```
```json Add layers
{
    "change": {
        "type": "group_layers",
        "group_id": "{{group_id}}",
        "add": [
            "dc37b767-a160-47d3-ac58-b11432e5860d",
          	"a765a9ef-e233-400d-889d-4f81eb31d8b9",
          	"{{another layer id}}"
        ],
        "remove": []
    }
}
```
```json Add forms
{
    "change": {
        "type": "group_forms",
        "group_id": "{{group_id}}",
        "add": [
            "4d6f87d2-0dc3-4eb6-a065-9ac595173424",
          	"{{another form id}}}"
        ],
        "remove": []
    }
}
```
```json Remove members
{
    "change": {
        "type": "group_members",
        "group_id": "{{group_id}}",
        "add": [],
        "remove": [
            "81ad0f14-35a8-4be0-8ca0-83ea93947987",
          	"{{another membership id}}"
        ]
    }
}
```
