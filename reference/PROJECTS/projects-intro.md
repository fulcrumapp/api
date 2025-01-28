---
title: Projects API
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Projects API gives you access to the [projects](http://help.fulcrumapp.com/web-app/what-are-projects) within your Fulcrum account. Projects can be used to separate your data into different groups for access, filtering, and exporting purposes.

# Properties

| Property             | Type    | Required | Readonly | Description                                           |
| -------------------- | ------- | -------- | -------- | ----------------------------------------------------- |
| name                 | string  | yes      | no       | The name of the project.                              |
| description          | string  | no       | no       | Optional project description.                         |
| record\_count        | numeric | no       | yes      | # of records using the project.                       |
| form\_count          | numeric | no       | yes      | # of forms using the project.                         |
| status               | string  | no       | no       | Status of the project.                                |
| customer             | string  | no       | no       | Optional name of customer.                            |
| external\_job\_id    | string  | no       | no       | Optional job ID.                                      |
| start\_date          | string  | no       | no       | Optional start date of the project.                   |
| end\_date            | string  | no       | no       | Optional end date of the project.                     |
| project\_manager\_id | string  | no       | no       | Optional user who is assigned as the project manager. |
| id                   | string  | no       | yes      | The id of the project.                                |
| created\_at          | string  | no       | yes      | Timestamp when the project was created.               |
| updated\_at          | string  | no       | yes      | Timestamp when the project was last updated.          |

# Validations

The following properties must be included in order to create/update a project object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type   | Description              | Example             |
| -------- | ------ | ------------------------ | ------------------- |
| name     | string | The name of the project. | `"Pinellas County"` |

Example validation response if `name` is not included:

```json
{
  "project": {
    "errors": {
      "name": ["can't be blank"]
    }
  }
}
```

# Notes

* The entire project object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing project is to fetch the project object, modify it, and then submit the PUT request.

# Sample Response

```json
{
  "project": {
    "name": "Pinellas County",
    "description": "For records in Pinellas County",
    "id": "60786571-46b4-43b8-8f49-7d8f0f45987e",
    "created_at": "2013-10-29T15:49:09Z",
    "updated_at": "2014-11-18T15:23:48Z"
  }
}
```
