---
title: Copy All Reference Files
excerpt: >-
  Copy all reference files from one form to another.
api:
  file: rest-api.json
  operationId: copy-all-attachments
deprecated: false
hidden: false
metadata:
  title: ""
  description: ""
  robots: noindex
next:
  description: ""
---

This endpoint allows you to copy all reference files from a source form to a destination form. This is useful when cloning a form or moving reference data between applications.

# Request Payload

```json
{
  "source_parent_id": "93eb5194-472e-436f-8769-6554b5f8845c",
  "destination_parent_id": "842d5194-472e-436f-8769-6554b5f8845c",
  "parent_type": "form"
}
```

# Response

The response includes a mapping of the original attachment IDs to the new attachment IDs created during the copy process.

```json
{
  "ref_file_mapping": {
    "ef9bc6b0-cfd2-4c3a-8189-316f1335126a": "694e1ea7-f847-4fe3-a8bb-299c50e0e6ed"
  }
}
```

# Limits

- **100 reference files** per form.
- **1GB** total reference file size per form.
