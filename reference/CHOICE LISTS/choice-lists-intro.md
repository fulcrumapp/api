---
title: Choice Lists API
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
The Choice Lists API gives you access to the [choice lists](http://help.fulcrumapp.com/apps/how-do-choice-lists-work) within your Fulcrum account. Choice lists can be shared between multiple apps.

# Properties

| Property | Type | Required | Readonly | Description |
|----------|------|----------|----------|-------------|
| name | string | yes | no | The name of the choice list. |
| choices | array of choice objects | yes | no | The choice list options. (`[{"label": "Excellent Condition","value": "excellent"},{"label": "Poor Condition","value": "poor"}`) |
| description | string | no | no | Optional choice list description. |
| version | number | no | yes | Autoincremented version of the choice list for history tracking. |
| id | string | no | yes | The id of the choice list. |
| created_at | string | no | yes | Timestamp when the choice list was created. |
| updated_at | string | no | yes | Timestamp when the choice list was last updated. |

# Validations

The following properties must be included in order to create/update a choice_list object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| name | string | The name of the choice list. | `"Inspection Conditions"`
| choices | array of choice objects | The choice list options. | See choices properties table below.

## Choices Properties

| Property | Type | Required | Readonly | Description |
|----------|------|----------|----------|-------------|
| label | string | yes | no | Choice label. |
| value | string | no | no | Choice value, stored in the database. |

Example validation response if `choices` is not included:

```json
{
  "choice_list": {
    "errors": {
      "choices": ["must be an array object"]
    }
  }
}
```

# Notes

- The entire choice_list object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing choice list is to fetch the choice_list object, modify it, and then submit the PUT request.

# Sample Response

```json
{
  "choice_list": {
    "name": "Bridge Inspection Conditions",
    "description": "",
    "version": 1,
    "id": "56734070-0042-4f95-a914-b0307e65f9f3",
    "created_at": "2014-08-28T14:03:30Z",
    "updated_at": "2014-08-28T14:03:30Z",
    "choices": [{
      "label": "Excellent",
      "value": "Excellent"
    },
    {
      "label": "Good",
      "value": "Good"
    },
    {
      "label": "Fair",
      "value": "Fair"
    },
    {
      "label": "Poor",
      "value": "Poor"
    },
    {
      "label": "Unrated",
      "value": "Unrated"
    },
    {
      "label": "N/A",
      "value": "N/A"
    }]
  }
}
```