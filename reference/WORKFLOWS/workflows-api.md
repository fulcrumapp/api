---
title: Workflows API
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
The Workflows API gives you access to the workflows that you have created for your apps

This page is still under construction! More information on the step types is in progress!

# Properties

| Property             | Type           | Required | Readonly | Description                                                                                                                                                                                |
| -------------------- | -------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                   | string         | no       | yes      | The workflow ID                                                                                                                                                                            |
| created_at           | string         | no       | yes      | Timestamp of the workflow creation.                                                                                                                                                        |
| updated_at           | string         | no       | yes      | Timestamp of the last update to the workflow.                                                                                                                                              |
| created_by           | string         | no       | yes      | The name of user who created the workflow.                                                                                                                                                 |
| created_by_id        | string         | no       | yes      | The id of user who created the workflow.                                                                                                                                                   |
| updated_by           | string         | no       | yes      | The name of user who last updated the record.                                                                                                                                              |
| updated_by_id        | string         | no       | yes      | The id of user who last updated the record.                                                                                                                                                |
| name                 | string         | yes      | no       | The name of the workflow                                                                                                                                                                   |
| description          | string         | no       | no       | The description of the workflow                                                                                                                                                            |
| object_type          | string         | yes      | yes      | In almost all cases, will be `form`                                                                                                                                                        |
| object_resource_id   | string         | yes      | no       | The ID of the form associated with the workflow                                                                                                                                            |
| active               | boolean        | yes      | no       | Whether or not the workflow is currently processing events (`true` in this case means the workflow is active)                                                                              |
| run_for_bulk_actions | boolean        | no       | no       | Default: true. If true, this workflow will execute once per each action made during a bulk action. If false, this workflow will not be triggered by any bulk actions made to your records. |
| steps                | array of steps | yes      | no       | The steps that make up the workflow                                                                                                                                                        |
| event_type           | string         | yes      | no       | One of  'record_created', 'record_deleted', 'record_updated', or 'record_created_or_updated'                                                                                               |

# Workflow Steps

| Property   | Type               | Required | Readonly | Description                                                                    |
| ---------- | ------------------ | -------- | -------- | ------------------------------------------------------------------------------ |
| id         | string             | no       | yes      | The step ID                                                                    |
| name       | string             | no       | no       | The name of the step                                                           |
| step_type  | string             | yes      | no       | One of 'filter', 'email', 'sms', 'webhook', 'assign_record', or 'create_issue' |
| arguments  | object             | no       | no       | The arguments of the workflow step                                             |
| next_steps | array of step ID's | no       | no       | The ID of the step that should succeed this step                               |
| initial    | boolean            | yes      | no       | `true` means that this is the first step in the workflow                       |

# Step Types

There are 5 different types of steps that can be defined in the `step_type` parameter in the workflow step. The arguments structure of the step will be based off of the `step_type`

## The `email` type

| Property   | Type             | Required | Readonly | Description                                                                                |
| ---------- | ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------ |
| to         | string           | yes      | no       | Comma-separated string of the emails that the workflow should send an email to             |
| subject    | string           | yes      | no       | Subject of the email                                                                       |
| html_body  | string           | yes      | no       | The body of the email in HTML format. In most cases, will be the same value as `text_body` |
| text_body  | string           | yes      | no       | The body of the email in text format                                                       |
| report_ids | array of strings | no       | no       | Array that includes the ID of the desired report                                           |

email type arguments: 

```json
{
    "to": "vincent.lauffer@spatialnetworks.com",
    "subject": "Subject",
    "html_body": "body",
    "text_body": "body",
    "report_ids": []
}
```

## The `filter` type

The arguments of a filter type step will only have a single parameter: `expression`. However, this expression will contain an array of 

| Property   | Type   | Required | Readonly | Description                                                                                |
| ---------- | ------ | -------- | -------- | ------------------------------------------------------------------------------------------ |
| field      | string | yes      | no       | The field that the expression should test against                                          |
| value      | string | yes      | no       | Subject of the email                                                                       |
| operator   | string | no       | no       | The body of the email in HTML format. In most cases, will be the same value as `text_body` |
| combinator | string | no       | no       | The body of the email in text format                                                       |

# Sample response:

```json
{
    "workflow": {
        "id": "9fb801aa-7e7d-4480-bfb0-41de6a585a99",
        "created_at": "2023-03-01T03:22:03Z",
        "updated_at": "2023-03-01T03:22:03Z",
        "created_by": "Vincent Lauffer",
        "created_by_id": "9d64eea9-3d7d-427b-8a12-32458d6b5b2a",
        "updated_by": "Vincent Lauffer",
        "updated_by_id": "9d64eea9-3d7d-427b-8a12-32458d6b5b2a",
        "name": "Sample Workflow",
        "description": null,
        "object_type": "form",
        "object_resource_id": "6e278b5f-4445-429c-9284-0232db215e38",
        "active": true,
        "steps": [
            {
                "name": null,
                "description": null,
                "step_type": "filter",
                "arguments": {
                    "expression": [
                        {
                            "field": "text",
                            "value": "yes",
                            "operator": "text_contain",
                            "combinator": "or"
                        },
                        {
                            "field": "text",
                            "value": "maybe",
                            "operator": "text_contain",
                            "combinator": ""
                        }
                    ]
                },
                "next_steps": [
                    "3c2e722c-7039-4114-9e49-36188b1307ad"
                ],
                "initial": true,
                "id": "afac7bf4-84ae-4cf7-9c9d-e4bce9775946"
            },
            {
                "name": null,
                "description": null,
                "step_type": "email",
                "arguments": {
                    "to": "vincent.lauffer@spatialnetworks.com",
                    "subject": "Workflow email",
                    "html_body": "Here is the text field of the new record: {{text}}",
                    "text_body": "Here is the text field of the new record: {{text}}",
                    "report_ids": []
                },
                "next_steps": [],
                "initial": false,
                "id": "3c2e722c-7039-4114-9e49-36188b1307ad"
            }
        ],
        "event_type": "record_created"
    }
}
```