---
title: Sketches API
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
The Sketches API gives you access to a record's sketches. In order to upload a record with sketches, you must first upload each sketch individually. By default, fetching the records will generate the URLs for the sketch, if a sketch exists for that record.

# Properties

| Property        | Type    | Required | Readonly | Description                                                                                                                                             |
| --------------- | ------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access\_key     | string  | yes      | no       | The ID of the sketch.                                                                                                                                   |
| created\_at     | string  | no       | yes      | Timestamp when the sketch was created.                                                                                                                  |
| updated\_at     | string  | no       | yes      | Timestamp when the sketch was last updated.                                                                                                             |
| created\_by     | string  | no       | yes      | The name of user who created the sketch.                                                                                                                |
| created\_by\_id | string  | no       | yes      | The id of user who created the sketch.                                                                                                                  |
| updated\_by     | string  | no       | yes      | The name of user who last updated the sketch.                                                                                                           |
| updated\_by\_id | string  | no       | yes      | The id of user who last updated the sketch.                                                                                                             |
| uploaded        | boolean | no       | yes      | The file has been uploaded, but might not be fully stored on the backend yet. This is the least useful indicator unless you're writing a synchronizer. |
| stored          | boolean | no       | yes      | The `original` attribute is available for download.                                                                                                     |
| processed       | boolean | no       | yes      | The additional versions of the media are available for download. (thumbnails or small versions).                                                        |
| record\_id      | string  | no       | yes      | The id of the record the sketch is associated with.                                                                                                     |
| form\_id        | string  | no       | yes      | The id of the form the sketch is associated with.                                                                                                       |
| file\_size      | number  | no       | yes      | The size of the sketch file in bytes.                                                                                                                   |
| content\_type   | string  | no       | yes      | The content type of the sketch file.                                                                                                                    |
| url             | string  | no       | yes      | The URL to access the sketch.                                                                                                                           |
| thumbnail       | string  | no       | yes      | The URL to access the thumbnail version of the sketch.                                                                                                  |
| large           | string  | no       | yes      | The URL to access the large version of the sketch.                                                                                                      |
| original        | string  | no       | yes      | The URL to access the original version of the sketch.                                                                                                   |

# Validations

The following properties must be included in order to create/update a sketch object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property              | Type                | Description            | Example                                   |
| --------------------- | ------------------- | ---------------------- | ----------------------------------------- |
| sketch\[access\_key]  | string              | The id of the sketch.  | `"8C9E4F1B-A52C-4D3E-BA17-F8D04EBF2F33"`  |
| sketch\[file]         | multipart/form-data | The sketch file.       | See [example](#upload-a-new-sketch) below.|

Example validation response if `access_key` is not included:

```json
{
  "sketch": {
    "errors": {
      "access_key": ["must be provided"]
    }
  }
}
```

# Notes

* There is no `DELETE` method for sketches. Sketches can be effectively deleted by unlinking them from their associated record.

# Sample Response

```json
{
  "sketch": {
    "access_key": "6c9e27d8-5304-498f-973e-ce465f4a9c2e",
    "created_at": "2015-07-15T18:22:35Z",
    "updated_at": "2015-07-15T18:22:36Z",
    "uploaded": true,
    "stored": true,
    "processed": true,
    "record_id": "a1b2c3d4-e5f6-4a5b-8c9d-1e2f3a4b5c6d",
    "form_id": "8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d",
    "file_size": 156789,
    "content_type": "image/jpeg",
    "url": "https://web.fulcrumapp.com/api/v2/sketches/6c9e27d8-5304-498f-973e-ce465f4a9c2e",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "thumbnail": "https://fulcrumapp.s3.amazonaws.com/sketches/thumb_514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-6c9e27d8-5304-498f-973e-ce465f4a9c2e.jpeg",
    "large": "https://fulcrumapp.s3.amazonaws.com/sketches/large_514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-6c9e27d8-5304-498f-973e-ce465f4a9c2e.jpeg",
    "original": "https://fulcrumapp.s3.amazonaws.com/sketches/514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-6c9e27d8-5304-498f-973e-ce465f4a9c2e.jpeg"
  }
}
```
