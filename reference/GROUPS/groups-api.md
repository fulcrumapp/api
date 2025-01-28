---
title: Groups API
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[Groups](https://help.fulcrumapp.com/en/articles/7436935-groups) are a great way to mass-manage your users' permissions to apps, layers, and projects. You can use the Groups endpoints to create, edit and delete any of your organization's groups.

# Properties of `/groups.json` and `/groups/{id}.json` Requests

This table applies to all Groups requests except for [Update Group Permissions requests](https://docs.fulcrumapp.com/reference/update-group-permissions) and [Get Group Resource requests.](https://docs.fulcrumapp.com/reference/get-group-resource)

| Property    | Type   | Required | Readonly | Description              |
| ----------- | ------ | -------- | -------- | ------------------------ |
| name        | string | yes      | no       | The name of the group    |
| description | string | no       | no       | Description of the group |
| id          | string | no       | yes      | UUID of the group        |

The following properties will be included in a `/groups.json` or  `/groups/{id}.json` response if you include the `associations=true` URL query parameter. 

Example: `https://api.fulcrumapp.com/api/v2/groups.json?associations=true`

| Property    | Type             | Description               |
| ----------- | ---------------- | ------------------------- |
| member_ids  | array of strings | The members in the group  |
| layer_ids   | array of strings | The layers in the group   |
| project_ids | array of strings | The projects in the group |
| form_ids    | array of strings | The forms in the group    |

But to change these properties, you will need to use the [Update Group Permissions endpoint](https://docs.fulcrumapp.com/reference/update-group-permissions)

# Getting additional information about the members, layers, projects and forms associated with a group

As stated above, you can use the `associations=true` URL query parameter in any `/groups.json` request in order to get the ids of the members, layers, projects and forms associated with a group. However if you are looking to return additional information on each of these resources, you can use the [Get Group Resource endpoint.](https://docs.fulcrumapp.com/reference/get-group-resource) The URL for this request is `/groups/{id}/{resource}.json`

# Creating Groups

## Validations for Creating Groups

To create a group, send a POST request to the [Create Group endpoint](https://docs.fulcrumapp.com/reference/create-group)  with the following parameters:

| Property    | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| name        | string | yes      | The name of the group    |
| description | string | no       | Description of the group |

Example JSON body:

```json
{
    "group":{
        "name": "New group",
        "description": "Hello group!"
    }
}

```

At the moment, you cannot assign permissions to a group before the group has been created. You must first create the group, and then use the [Update Group Permissions request](https://docs.fulcrumapp.com/reference/update-group-permissions) to add members, layers, projects and forms to the group.

# Updating the Name and Description of a Group

To update the name or description of a given group, send a `PUT` request the [Update Group Name / Description endpoint](https://docs.fulcrumapp.com/reference/update-group-name-description). 

## Validations for non-permission group updates

You do not need to include all properties in the body of your non-permissions update request. Feel free to only include `name` or `description` as needed. 

| Property    | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| name        | string | no       | The name of the group    |
| description | string | no       | Description of the group |

# Updating Permissions for a Group

If you are looking to update a group's members, layers, projects or forms, send a `POST` request to the [Update Group Permissions endpoint.](https://docs.fulcrumapp.com/reference/update-group-permissions) The URL for this request is `/groups/change_permissions.json`

## Validations for group permission updates

To change one of the permission properties of a group, you will need to include the correct `type` slug in the body of your request. Use this table to find out which slug to use in your request:

| Desired action            | Type slug        |
| ------------------------- | ---------------- |
| Update a group's members  | `group_members`  |
| Update a group's projects | `group_projects` |
| Update a group's layers   | `group_layers`   |
| Update a group's forms    | `group_forms`    |

The body of your request should contain these properties as required:

| Property | Type             | Required | Description                                              |
| -------- | ---------------- | -------- | -------------------------------------------------------- |
| type     | string           | yes      | The type of update (reference the type slug table above) |
| group_id | string           | yes      | The group ID                                             |
| add      | array of strings | no       | The collection of entities to add to the group           |
| remove   | array of strings | no       | The collection of entities to remove from the group      |

# Notes

- In a successful [Update Group Permissions request](https://docs.fulcrumapp.com/reference/update-group-permissions), nothing will be returned, even if you set `associations=true`
- Permissions provided from [Groups](https://docs.fulcrumapp.com/reference/groups-api) take priority over normal permissions. If you attempt to remove a member's Group-provided access to a form, project, or layer, the request will fail with a 422 status code response and the member's permissions will not change

# **Sample Response from a `/groups.json` or `/groups/{id}.json` endpoint with `associations=true` query parameter**

```json
{
    "group": {
        "name": "New Group",
        "description": "Hello group!",
        "id": "32280b0c-a806-48cb-97a9-7a3f40e48893",
        "member_ids": [
            "8ef909c1-dbce-40e2-92a9-3ce98031530c"
        ],
        "layer_ids": [
            "ddad85ed-d038-48fc-9086-090497e3b1f1",
            "114149f1-80a8-4095-8bf2-9b7c3265fd9a"
        ],
        "project_ids": [],
        "form_ids": [
            "a314ebda-eb51-44f0-b79e-07e83a4d4be0",
            "d1b3a7c1-9cd2-4f14-b408-46bd627644e5",
            "0c9f4569-a527-4301-a47d-f297d694a9b3"
        ]
    }
}
```