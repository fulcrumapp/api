---
title: Update Workflow
excerpt: ''
api:
  file: rest-api.json
  operationId: update-workflow
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
**NOTE** if you receive a "Unique index violation" error when updating your workflows, you will need to make sure that the `id`s of your workflow steps are unique in your organization. The easiest way to do that is by generating a random UUID (look up `uuid generator` on your search engine of choice to quickly find a new id)