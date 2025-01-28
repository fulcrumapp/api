---
title: Add batch operations
excerpt: >-
  Using the batch operations API, you can bulk delete records from a form or
  update project, assignee, or status values on multiple records.
api:
  file: rest-api.json
  operationId: post_v-version-batch-batch-id-operations-json
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# POST /api/v2/batch/:id/operations

```json
{  
  "operations": [  
    {  
      "action": "delete",  
      "resource": "record",  
      "query": "select \_record_id as id from \"{{formId}}\" where \_status = 'Approved'",  
    },  
    {  
      "action": "delete",  
      "resource": "record",  
      "ids": [ "{{recordId0}}", "{{recordId1}}" ],  
    }  
  ]  
}
```
