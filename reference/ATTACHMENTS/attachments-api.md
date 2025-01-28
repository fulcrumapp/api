---
title: Attachments API
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The Attachments API gives you access to a record’s file attachments (files in attachment fields - not photo, video, audio, or signature fields) as well as a form’s reference files. In order to add attachments to a record you must first create the attachment and upload it.

# How to create a form attachment

First, create the attachment by POSTing to the Create Attachment endpoint. Next upload your attachment file to the `url` provided in the response from the Create Attachment endpoint through a PUT request. Lastly call the Finalize endpoint and include the owner information.

# How to create a record attachment

First, create the attachment by POSTing to the Create Attachment endpoint. Next upload your attachment file through a PUT request to the `url` provided in the response from the Create Attachment endpoint. Now that you have created and uploaded the attachment you can attach it to an attachment field by calling the create record or update record endpoints and providing the attachment IDs in the form\_values. See the [Record API](https://docs.fulcrumapp.com/reference#records-intro) for more information.

For additional information on uploading attachments, please check out [AWS Interactions](https://docs.fulcrumapp.com/reference/aws-interactions)
