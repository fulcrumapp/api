---
title: Get an Export
excerpt: >-
  Retrieve an export and, once completed, its download URL
api:
  file: rest-api.json
  operationId: exports-get
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Poll this endpoint after [creating an export](https://docs.fulcrumapp.com/reference/exports-create) until `state` is `completed` or `failed`. When the export is completed, the `file` attribute contains a download URL. Exports expire 7 days after they are created, so download the file promptly.
