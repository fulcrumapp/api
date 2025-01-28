---
title: Create Attachment
excerpt: >-
  There is only one parameter that is required for creating an attachment:
  `owners`. You must specify at least one owner of type `record` or `form`. If
  you create a `record` attachment you can optionally include a `name` and
  `file_size`. The name will be the name of the file shown in the record
  information. The file_size is only used for verifying that uploading this
  attachment will not exceed your current storage limit. If no file_size is
  provided the attachment may be rejected once it has been uploaded. The
  response will provide the `url` to upload (PUT) the file to.
api:
  file: rest-api.json
  operationId: post_v-version-attachments
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---