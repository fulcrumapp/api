---
title: Changesets API
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
Changesets are used to group sets of changes to any number of records. Changesets are automatically generated when making changes through the mobile and web apps (`changeset_id`), and are optional when updating records through the API.

# Properties

| Property | Type | Required | Readonly | Description |
|----------|------|----------|----------|-------------|
| form_id | string | yes | no | The id of the form associated with the changeset. |
| metadata | object | no | no | An object containing arbitrary metadata describing the changeset. Often used to log comments, apps, versions and user agents. |
| min_lat | number | no | yes | The minimum latitude of the spatial extent of the changeset. |
| max_lat | number | no | yes | The maximum  latitude of the spatial extent of the changeset. |
| min_lon | number | no | yes | The minimum  longitude of the spatial extent of the changeset. |
| max_lon | number | no | yes | The maximum  longitude of the spatial extent of the changeset. |
| number_of_changes | number | no | yes | The number of changed records included in this changeset. |
| id | string | no | yes | The id for this changeset. |
| created_at | string | no | yes | Timestamp when the changeset was created. |
| updated_at | string | no | yes | Timestamp when the changeset was last updated. |
| created_by | string | no | yes | The name of user who created the changeset. |
| created_by_id | string | no | yes | The ID of user who created the changeset. |
| updated_by | string | no | yes | The name of user who last updated the changeset. |
| updated_by_id | string | no | yes | The ID of user who last updated the changeset. |
| closed_at | string | no | yes | Timestamp when the changeset was closed. |
| closed_by | string | no | yes | The name of user who closed the changeset. |
| closed_by_id | string | no | yes | The ID of user who closed the changeset. |
| gravatar_email | string | no | yes | The email associated with the gravatar of the user who created the changeset.
| number_created | number | no | yes | The number of records created in this changeset. |
| number_updated | number | no | yes | The number of records updated in this changeset. |
| number_deleted | number | no | yes | The number of records deleted in this changeset. |

# Validations

The following properties must be included in order to create/update a changeset object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| form_id | string | The id of the form associated with the changeset. | `"8821a0d5-e767-47a9-815b-c72bdfa64043"` |

Example validation response if `form_id` is not included:

```json
{
  "changeset": {
    "errors": {
      "form_id": ["does not exist or you don't have access to it"]
    }
  }
}
```

# Notes

- The entire changeset object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing changeset is to fetch the changeset object, modify it, and then submit the PUT request.

# Sample Response

```json
{
  "changeset": {
    "metadata": {
      "comment": "Update record",
      "app_created_by": "Spatial Networks",
      "app_name": "Fulcrum Web",
      "app_version": "",
      "app_build": "",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36"
    },
    "min_lat": 42.82398681,
    "max_lat": 42.82398681,
    "min_lon": -73.89601931,
    "max_lon": -73.89601931,
    "number_of_changes": 1,
    "id": "8821a0d5-e767-47a9-815b-c72bdfa64043",
    "created_at": "2014-03-17T19:45:10Z",
    "updated_at": "2014-03-17T19:45:11Z",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "closed_at": "2014-03-17T19:45:11Z",
    "closed_by": "Bryan McBride",
    "closed_by_id": "50633f84a934480d260001db",
    "form_id": null,
    "gravatar_email": "",
    "number_created": 0,
    "number_updated": 1,
    "number_deleted": 0
  }
}
```