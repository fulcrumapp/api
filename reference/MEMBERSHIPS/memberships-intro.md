---
title: Memberships API
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
The Memberships API allows you to view, add, or remove non-owner users associated with the projects, forms, and layers in your Fulcrum account.

# Properties

| Property             | Type      | Required | Readonly | Description                      |
| -------------------- | --------- | -------- | -------- | -------------------------------- |
| id                   | string    | no       | yes      | The member ID                    |
| created\_at          | timestamp | no       | yes      | When the member was created      |
| updated\_at          | timestamp | no       | yes      | Last time the member was updated |
| gravatar\_email      | string    | no       | yes      | Email used for gravatar image    |
| gravatar\_image\_url | string    | no       | yes      | URL to gravatar image            |
| user\_id             | string    | no       | yes      | User ID                          |
| user                 | string    | no       | yes      | User full name                   |
| first\_name          | string    | no       | yes      | User first name                  |
| last\_name           | string    | no       | yes      | User last name                   |
| email                | string    | no       | yes      | User email                       |
| role\_id             | string    | no       | yes      | ID of the user's role            |
| image\_small         | string    | no       | yes      | User profile image (300px)       |
| image\_large         | string    | no       | yes      | User profile image (600px)       |

# Notes

* Users with a role of *Owner* always have access to all resources within the organization.

* The `change permissions` endpoint accepts a JSON object labeled `change` with three parameters.

* The first parameter is `type`, which indicates which object you want to change the membership permissions of. Valid type values are `project_members`, `form_members`, and `layer_members`.

* The second parameter is the id of the object you want to change the permission of. Valid ID keys are `project_id`, `form_id` and `layer_id`. Values must be valid resource IDs.

* The third parameter is the changeset you would like to add or remove. This is a key of either `add` or `remove` with the value an array of valid member IDs that you would like to alter.

* Permissions provided from [Groups](https://docs.fulcrumapp.com/reference/groups-api) take priority over normal permissions. If you attempt to remove a member's Group-provided access to a form, project, or layer, the request will fail with a 422 status code response and the member's permissions will not change

# Sample Response

```json
{
  "memberships": [{
      "id": "49ee5c1a-220f-4deb-8a9b-775706f66433",
      "created_at": "2018-01-19T23:38:39Z",
      "updated_at": "2018-01-19T23:38:39Z",
      "gravatar_email": null,
      "gravatar_image_url": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80",
      "user_id": "8e20fc7e-33c3-4a34-9b13-167b24ebe89c",
      "user": "Robb Stark",
      "first_name": "Robb",
      "last_name": "Stark",
      "email": "robbstark@harrenhall.com",
      "role_id": "5a326552-865c-4c91-a45b-4262d4b6aedf",
      "image_small": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=300",
      "image_large": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=600"
    },
    {
      "id": "b21cc100-08b1-41ba-8353-d6e7a97debee",
      "created_at": "2018-01-19T23:38:39Z",
      "updated_at": "2018-01-22T18:48:46Z",
      "gravatar_email": null,
      "gravatar_image_url": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80",
      "user_id": "c535156f-2871-4084-a399-d3061b25fae4",
      "user": "Walder Frey",
      "first_name": "Walder",
      "last_name": "Frey",
      "email": "walderfrey@thetwins.com",
      "role_id": "5696b7e9-765f-42b4-a61c-2895f257aab3",
      "image_small": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=300",
      "image_large": "https://s.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=600"
    }
  ]
}
```
