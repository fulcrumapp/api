---
title: Delete Member
excerpt: ''
api:
  file: rest-api.json
  operationId: delete-member
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Must include the following body

```json
{
    "membership": {
        "reassign_to_membership_id": {{membership_id}} || null
    }
}
```