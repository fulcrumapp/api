---
title: Create Workflow
excerpt: ''
api:
  file: rest-api.json
  operationId: create-workflow
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
One of the tricky parts of making a new workflow is that you need each step to have their own unique ID [(in UUID format)](https://en.wikipedia.org/wiki/Universally_unique_identifier). The easiest way to do that is by generating a random UUID (look up `uuid generator` on your search engine of choice to quickly find a new ID) and then using these new IDs in your workflow steps. Make sure that the `next_steps` array in a workflow step references the valid ID of another step in your workflow.

**NOTE** if you receive a "Unique index violation" error when creating your workflows, you will need to make sure that the `id`s of your workflow steps are unique in your organization.