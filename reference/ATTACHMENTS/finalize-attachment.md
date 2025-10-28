---
title: Finalize Attachment
excerpt: >-
  The finalize endpoint is a required step for Form attachments. Use this
  endpoint to tell Fulcrum that your attachment has been uploaded.
api:
  file: rest-api.json
  operationId: finalize-attachment
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# Sample Error Responses

If you see this error message:\
`{
  "error": "At least one owner type and owner ID is required"
}`\
You will need to include an `owner` in your finalize request.

It is possible you will see an unauthorized error when using a valid api token if your token does not have permission to edit the form.\
`{
  "error": "Unauthorized"
}`