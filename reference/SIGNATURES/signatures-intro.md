---
title: Signatures API
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
The Signatures API gives you access to a record's signatures. In order to upload a record with signatures, you must upload each signature individually. By default, fetching the records will generate the URLs for the signature, if a signature exists for that record.

# Properties

| Property        | Type    | Required | Readonly | Description                                                                                                                                           |
| --------------- | ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| access\_key     | string  | yes      | no       | The ID of the signature.                                                                                                                              |
| created\_at     | string  | no       | yes      | Timestamp when the signature was created.                                                                                                             |
| updated\_at     | string  | no       | yes      | Timestamp when the signature was last updated.                                                                                                        |
| created\_by     | string  | no       | yes      | The name of user who created the signature.                                                                                                           |
| created\_by\_id | string  | no       | yes      | The id of user who created the signature.                                                                                                             |
| updated\_by     | string  | no       | yes      | The name of user who last updated the signature.                                                                                                      |
| updated\_by\_id | string  | no       | yes      | The id of user who last updated the signature.                                                                                                        |
| uploaded        | boolean | no       | yes      | The file has been uploaded, but might not be fully stored on the backend yet. This is the least useful indicator unless you're writing a synchronizer |
| stored          | boolean | no       | yes      | The `original` attribute is available for download.                                                                                                   |
| processed       | boolean | no       | yes      | The additional versions of the media are available for download. (thumbnails or small versions).                                                      |
| record\_id      | string  | no       | yes      | The id of the record the signature is associated with.                                                                                                |
| form\_id        | string  | no       | yes      | The id of the form the signature is associated with.                                                                                                  |
| file\_size      | number  | no       | yes      | The size of the signature file in bytes.                                                                                                              |
| content\_type   | string  | no       | yes      | The content type of the signature file.                                                                                                               |
| url             | string  | no       | yes      | The URL to access the signature.                                                                                                                      |
| thumbnail       | string  | no       | yes      | The URL to access the thumbnail version of the signature.                                                                                             |
| large           | string  | no       | yes      | The URL to access the large version of the signature.                                                                                                 |
| original        | string  | no       | yes      | The URL to access the original version of the signature.                                                                                              |

# Validations

The following properties must be included in order to create/update a photo object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property                | Type                | Description              | Example                                       |
| ----------------------- | ------------------- | ------------------------ | --------------------------------------------- |
| signature\[access\_key] | string              | The id of the signature. | `"9855e3f2-85a5-4b9f-9e62-0b1bbcfef091"`      |
| signature\[file]        | multipart/form-data | The signature file.      | See [example](#upload-a-new-signature) below. |

Example validation response if `access_key` is not included:

```json
{
  "signatures": {
    "errors": {
      "access_key": ["must be provided"]
    }
  }
}
```

# Notes

* There is no `DELETE` method for signatures. Signatures can be effectively deleted by unlinking them from their associated record.

# Sample Response

```json
{
  "signature": {
    "access_key": "9855e3f2-85a5-4b9f-9e62-0b1bbcfef091",
    "created_at": "2015-07-09T14:54:32Z",
    "updated_at": "2015-07-09T14:54:32Z",
    "uploaded": true,
    "stored": true,
    "processed": true,
    "record_id": "215f4147-51b5-42bb-84af-06b8112d9ecf",
    "form_id": "f99c0c14-7861-40b5-882c-d33fe2bcdeb2",
    "file_size": 22826,
    "content_type": "image/png",
    "url": "https://api.fulcrumapp.com/api/v2/signatures/9855e3f2-85a5-4b9f-9e62-0b1bbcfef091",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "thumbnail": "https://fulcrumapp.s3.amazonaws.com/signatures/thumb_e063496f-3288-4d2b-ab54-2121e23de722-9855e3f2-85a5-4b9f-9e62-0b1bbcfef091.png",
    "large": "https://fulcrumapp.s3.amazonaws.com/signatures/large_e063496f-3288-4d2b-ab54-2121e23de722-9855e3f2-85a5-4b9f-9e62-0b1bbcfef091.png",
    "original": "https://fulcrumapp.s3.amazonaws.com/signatures/e063496f-3288-4d2b-ab54-2121e23de722-9855e3f2-85a5-4b9f-9e62-0b1bbcfef091.png"
  }
}
```
