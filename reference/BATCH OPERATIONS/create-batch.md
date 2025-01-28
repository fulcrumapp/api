---
title: Create Batch to Bulk Delete Records
excerpt: Using the batch operations API, you can bulk delete records from a form.
api:
  file: rest-api.json
  operationId: post_v-version-batch-json
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Users with the bulk delete permission can delete records via the batch API POST.

# Notes

* Once a batch delete has started it CANNOT BE TERMINATED
* Do not include multiple operations within the same batch. Only the first operation will run.
* You will need to include an SQL query that indicates which records you want to delete, and make sure to alias the `_record_id` field as `id`. For example, if you wanted to delete all records in an app, your query would be`"SELECT \_record_id AS id FROM \"Testing App\""\`
* The maximum amount of records that can be deleted at this time is 10,000

# Sample request body

```json
{
    "batch": {
        "start": true,
        "operations": [
            {
                "action": "delete",
                "resource": "record",
                "form_id": "a5e0bef4-71b9-11ee-b962-0242ac120002",
                "query": "SELECT _record_id AS id FROM \"Testing App\" WHERE _status='delete_this'"
            }
        ]
    }
}
```

# Sample create batch response

```json
{
    "batch": {
        "status": "running",
        "objects_total": 60,
        "objects_success": 0,
        "id": "a5e0bef4-71b9-11ee-b962-0242ac120002",
        "created_at": "2023-10-16T16:48:14Z",
        "updated_at": "2023-10-16T16:48:14Z",
        "created_by": "Vincent Lauffer",
        "created_by_id": "b774e44c-71b9-11ee-b962-0242ac120002",
        "updated_by": "Vincent Lauffer",
        "updated_by_id": "b774e44c-71b9-11ee-b962-0242ac120002"
    }
}
```
