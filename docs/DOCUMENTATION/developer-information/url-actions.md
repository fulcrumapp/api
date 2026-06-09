---
title: URL Actions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# Introduction 

You can directly launch Fulcrum, create new records and update existing records via URL parameters on both the web and mobile apps. This allows you to easily integrate Fulcrum with other applications and services to build custom workflows, such as:

* Scheduling work outside of Fulcrum and sending daily worksheets to your field crews.

* Adding record links to calendar events for scheduling and notification.

* Sending a text message with a record link for immediate inspection.

* Passing coordinates from another application or web map to create a new Fulcrum record.

# Web Actions

Records can be viewed, created, and edited directly on the web using the following actions:

| Action                                                     | Description                                                                                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `https://web.fulcrumapp.com/dash/{form_id}`                | Open a form to view or edit records. Optional `mode` parameter to define view mode with the following values: `map`, `split`, `table` |
| `https://web.fulcrumapp.com/records/new`                   | Create a new record                                                                                                                   |
| `https://web.fulcrumapp.com/records/{record_id}`           | Open an existing record                                                                                                               |
| `https://web.fulcrumapp.com/records/{record_id}?mode=edit` | Edit an existing record                                                                                                               |

# Mobile Actions

Both the Android and iOS apps support opening the app using the `fulcrumapp://` URL scheme.

| Action                     | Description             |
| -------------------------- | ----------------------- |
| `fulcrumapp://open`        | Launch the Fulcrum app  |
| `fulcrumapp://new-record`  | Create a new record     |
| `fulcrumapp://edit-record` | Edit an existing record |

# Open Parameters

| Parameter | Required | Description                               |
| --------- | -------- | ----------------------------------------- |
| `form_id` | no       | The form ID to open when Fulcrum launches |

# New Record Parameters

| Parameter       | Required | Description                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------- |
| `form_id`       | yes      | The form ID to activate and use for the new record                                          |
| `project_id`    | no       | The project ID of the new record                                                            |
| `status`        | no       | The status of the new record                                                                |
| `latitude`      | no       | The latitude of the new record                                                              |
| `longitude`     | no       | The latitude of the new record                                                              |
| `...attributes` | no       | Any other URL encoded attributes should be `data_name=value` pairs to set on the new record |

# Edit Record Parameters

| Parameter       | Required | Description                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------- |
| `record_id`     | yes      | The record ID to edit                                                                   |
| `project_id`    | no       | The project ID of the record                                                            |
| `status`        | no       | The status of the record                                                                |
| `latitude`      | no       | The latitude of the record                                                              |
| `longitude`     | no       | The longitude of the record                                                             |
| `...attributes` | no       | Any other URL encoded attributes should be `data_name=value` pairs to set on the record |

# Supported Field Types

| Field                                   | Description                                                           |
| --------------------------------------- | --------------------------------------------------------------------- |
| Text                                    | *Uri encoded text value*                                              |
| Yes/No                                  | *Uri encoded text value*                                              |
| Barcode                                 | *Uri encoded text value*                                              |
| Hyperlink                               | *Uri encoded text value*                                              |
| SingleChoice ('Other' is not supported) | *Uri encoded text value*                                              |
| Classification                          | *Uri encoded, comma delimited list of values. ex:`1%2C2%2Chello%2C4`* |
| Date                                    | *YYYY-MM-DD*                                                          |
| Time                                    | *HH:MM*                                                               |

# Validation

* `form_id` must exist for `new-record` action
* `record_id` must exist for `edit-record` action
* If `project_id` is passed
  * the project must exist
  * the active account's role must have permission to change projects
* If `status` is passed, the active account's role must have permission to change the status
* `latitude` must be a number and must be: -90 \<= latitude \<= 90
* `longitude` must be a number and must be: -180 \<= longitude \<= 180

# Examples

* `fulcrumapp://new-record?form_id=c55adab9-916d-46e9-98aa-7a2388a77b24&number_of_floors=3&sq_footage=2300`

* `fulcrumapp://new-record?form_id=c55adab9-916d-46e9-98aa-7a2388a77b24&status=incomplete&sq_footage=2300&name=My%20Awesome%20Building&number_of_floors=3&latitude=28.038046&longitude=-81.952514`

* `fulcrumapp://edit-record?record_id=11fb2a54-5158-4848-8695-c405c54525e4&status=incomplete&sq_footage=2300&name=SNI&number_of_floors=3&latitude=28.038046&longitude=-81.952514`

# Notes

* **Compatibility with Core Android Apps:** Several core Android apps, including Gmail and Messenger do not support custom schemes and will not correctly link to Fulcrum if you try to use the following `<a href="fulcrumapp://new-record?form_id=123-xyz">Create new record</a>`. We have set up a dedicated HTTP page to help overcome this issue by providing a web link, which opens the browser and redirects to open the Fulcrum app. If you are dealing with this issue, try the following:\ <br />
  * `<a href="https://web.fulcrumapp.com/action/#new-record?form_id=123-xyz">Create new record</a>` for new records
  * `<a href="https://web.fulcrumapp.com/action/#edit-record?record_id=xyz-123">Edit record</a>` for existing edits\ <br />\
    This solution should work for both Android and iOS.\ <br />
* **URL Actions and Record Updates**: When `OPENURL()` is triggered while a record is in edit mode, Fulcrum will prompt you to save the current record as a draft before opening the new record. This prevents data loss and ensures the target record opens fresh and ready for updates.\
  **Recommended pattern:** Call `SAVE()` before `OPENURL()`. When `SAVE()` is called first, the current record is saved automatically and the app navigates directly to the target record without displaying a confirmation prompt — on both iOS and Android.\
  \
  > **Note:** On Android, navigating via a URL action preserves the previous navigation history, so users can navigate back to prior screens. On iOS, the app navigates directly to the target record.
