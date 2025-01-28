---
title: Classification Sets API
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
The Classification Sets API gives you access to the [classification sets](http://help.fulcrumapp.com/field-types/how-do-classification-sets-work) within your Fulcrum account. Classification sets are hierarchical lists of descriptors, allowing nested sets of options, which can be shared between multiple apps.

# Properties

| Property    | Type                                | Required | Readonly | Description                                                      |
| ----------- | ----------------------------------- | -------- | -------- | ---------------------------------------------------------------- |
| name        | string                              | yes      | no       | The name of the classification set.                              |
| items       | array of classification set objects | yes      | no       | The classification set options.                                  |
| description | string                              | no       | no       | Optional classification set description.                         |
| version     | number                              | no       | yes      | Autoincremented version of the choice list for history tracking. |
| id          | string                              | no       | yes      | The id of the classification set.                                |
| created\_at | string                              | no       | yes      | Timestamp when the choice list was created.                      |
| updated\_at | string                              | no       | yes      | Timestamp when the choice list was last updated.                 |

# Validations

The following properties must be included in order to create/update a classification\_set object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type                                | Description                     | Example                                         |
| -------- | ----------------------------------- | ------------------------------- | ----------------------------------------------- |
| name     | string                              | The name of the choice list.    | `"Inspection Conditions"`                       |
| items    | array of classification set objects | The classification set options. | See classification sets properties table below. |

## Classification Sets Properties

| Property               | Type                                                | Required | Readonly                                           | Description                           |
| ---------------------- | --------------------------------------------------- | -------- | -------------------------------------------------- | ------------------------------------- |
| label                  | string                                              | yes      | no                                                 | Choice label.                         |
| value                  | string                                              | no       | no                                                 | Choice value, stored in the database. |
| child\_classifications | array of label/value/child\_classifications objects | no       | Child classifications associated with this parent. |                                       |

Example validation response if `items` array is not included:

```json
{
  "classification_set": {
    "errors": {
      "base": ["child_classifications must be an array object"]
    }
  }
}
```

# Notes

* The entire `classification_set` object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing classification set is to fetch the `choice_list` object, modify it, and then submit the PUT request.

# Sample Response

```json
{
  "classification_set": {
    "name": "Wildlife Types",
    "description": "",
    "version": 2,
    "id": "50379f51a9344807fe000022",
    "created_at": "2012-08-24T15:35:45Z",
    "updated_at": "2013-10-04T03:33:57Z",
    "items": [{
      "label": "Bird",
      "value": "Bird",
      "child_classifications": [{
        "label": "Cormorant",
        "value": "Cormorant"
      },
      {
        "label": "Egret",
        "value": "Egret"
      },
      {
        "label": "Frigate Bird",
        "value": "Frigate Bird"
      },
      {
        "label": "Heron",
        "value": "Heron"
      },
      {
        "label": "Osprey",
        "value": "Osprey"
      },
      {
        "label": "Pelican",
        "value": "Pelican"
      },
      {
        "label": "Pigeon",
        "value": "Pigeon"
      },
      {
        "label": "Tern",
        "value": "Tern"
      }]
    },
    {
      "label": "Butterfly",
      "value": "Butterfly"
    },
    {
      "label": "Fish",
      "value": "Fish"
    },
    {
      "label": "Manatee",
      "value": "Manatee"
    },
    {
      "label": "Shellfish",
      "value": "Shellfish",
      "child_classifications": [{
        "label": "Crab",
        "value": "Crab",
        "child_classifications": [{
          "label": "Blue Crab",
          "value": "Blue Crab"
        },
        {
          "label": "Fiddler Crab",
          "value": "Fiddler Crab"
        },
        {
          "label": "Hermit Crab",
          "value": "Hermit Crab"
        }]
      }]
    },
    {
      "label": "Turtle",
      "value": "Turtle"
    }]
  }
}
```
