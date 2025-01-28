---
title: Batch API
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
The batch operations API can be used to make bulk-changes to the data in your organization. **At the moment, deleting and updating records' project, assignee, and status are the only fully supported batch operations**

Use this endpoint to update or delete multiple records from an app in a single request. At this time, you can update or delete up to 10,000 records in a single batch request.

# Properties

| Property         | Type   | Required | Readonly | Description                                                        |
| ---------------- | ------ | -------- | -------- | ------------------------------------------------------------------ |
| id               | string | no       | yes      | Id of the batch operation                                          |
| status           | string | no       | yes      | The status of the batch. "pending \| running \| success \| failed" |
| objects\_total   | int    | no       | yes      | Amount of affected objects                                         |
| objects\_success | int    | no       | yes      | Amount of successful changes                                       |
| created\_at      | string | no       | yes      | Timestamp of batch creation                                        |
| updated\_at      | string | no       | yes      | Timestamp of last batch update                                     |
| created\_by      | string | no       | yes      | Name of the user who created the batch                             |
| created\_by\_id  | string | no       | yes      | ID of the user who created the batch                               |
| updated\_by      | string | no       | yes      | Name of the user who created the batch                             |
| updated\_by\_id  | string | no       | yes      | ID of the user who updated the batch                               |
| started\_at      | string | no       | yes      | Time that the batch started at                                     |
| completed\_at    | string | no       | yes      | Time that the batch completed at                                   |

# Creating a batch

To create a batch, you can either use SQL queries to filter out the records you want involved with the batch, or provide an array of IDs. Depending on the method, you will either include a `query` property or an `ids` property in the `operations` JSON. Both of these properties cannot be used in the same batch request.

## Query method

The records of a batch can be filtered using [SQL queries](https://www.w3schools.com/sql/) as long as the result of the query includes an `id` column. For example, to delete all records in an app, you would use this query: `"SELECT _record_id AS id FROM \"Testing App\""`

```json
{
    "batch": {
        "start": true,
        "operations": [
            {
                "action": "delete",
                "resource": "record",
                "form_id": "81413088-71b9-11ee-b962-0242ac120002",
                "query": "SELECT _record_id AS id FROM \"Testing App\" WHERE _status='delete_this'"
            }
        ]
    }
}
```

## ID method

You can also create a batch using the IDs of the records by setting the `ids` property to an array of all the record IDs you want included in the batch. 

```json
{
    "batch": {
        "start": true,
        "operations": [
            {
                "action": "delete",
                "resource": "record",
                "form_id": "81413088-71b9-11ee-b962-0242ac120002",
                "ids": ["8a70dd2a-71b9-11ee-b962-0242ac120002", "8fd6cd9c-71b9-11ee-b962-0242ac120002"]
            }
        ]
    }
}
```

You can also create a batch but not immediately start it by setting the `start` property to `false`. You can then start it by sending a post request to `/batch/batch_id/start.json`

## Notes

* Once a batch change has started it CANNOT BE TERMINATED
* Do not include multiple operations within the same batch. Only the first operation will run.
* The maximum amount of records that can be deleted per batch request at this time is 10,000

# Sample Response

```json
{
    "batch": {
        "status": "running",
        "objects_total": 111,
        "objects_success": 0,
        "id": "68ef104a-71b9-11ee-b962-0242ac120002",
        "created_at": "2023-10-06T02:56:34Z",
        "updated_at": "2023-10-06T02:56:35Z",
        "created_by": "Vincent Lauffer",
        "created_by_id": "6fcf631a-71b9-11ee-b962-0242ac120002",
        "updated_by": "Vincent Lauffer",
        "updated_by_id": "6fcf631a-71b9-11ee-b962-0242ac120002"
    }
}
```
