---
title: Forms API
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
The Forms API gives you access to your form fields, or app schema.

# Properties

| Property                 | Type    | Required | Readonly | Description                                                                                                                                                                |
| ------------------------ | ------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                     | string  | yes      | no       | The name you've given this form.                                                                                                                                           |
| elements                 | array   | yes      | no       | Custom form elements (see form elements table below).                                                                                                                      |
| id                       | string  | no       | yes      | The unique ID of the form.                                                                                                                                                 |
| description              | string  | no       | no       | The description you've given this form.                                                                                                                                    |
| bounding\_box            | array   | no       | yes      | Bounding box containing all the form's records. Format is \[min\_lat, min\_long, max\_lat, max\_long]                                                                      |
| title\_field\_keys       | array   | no       | no       | Array of strings, where the strings are keys for fields in the elements attribute.                                                                                         |
| status\_field            | object  | no       | no       | Status field object (see status field table below).                                                                                                                        |
| form\_links (beta)       | object  | no       | yes      | Used in conjuncture with a record link field, this object stores form\_id’s to or from which the app is linked.                                                            |
| auto\_assign             | boolean | no       | no       | Assigns records to the user who creates them.                                                                                                                              |
| hidden\_on\_dashboard    | boolean | no       | no       | Is the form visible in the mobile dashboard?                                                                                                                               |
| geometry\_required       | boolean | no       | no       | Requiring the location will force a location to be saved with each record.                                                                                                 |
| projects\_enabled        | boolean | no       | no       | Are [projects](http://help.fulcrumapp.com/web-app/what-are-projects) enabled for this form?                                                                                |
| assignment\_enabled      | boolean | no       | no       | Is [record assignment](http://help.fulcrumapp.com/web-app/what-is-record-assignment) enabled for this form?                                                                |
| attachment\_ids          | array   | no       | no       | List of Reference Files that are attached to the form                                                                                                                      |
| fastfill\_audio\_enabled | boolean | no       | no       | Is [Audio FastFill](https://help.fulcrumapp.com/en/articles/10074106-audio-fastfill)  enabled for this form?                                                               |
| geometry\_types          | array   | no       | no       | Either an array with one or more geometry types (`Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`), or an empty array to disable location |
| script                   | string  | no       | no       | Custom Data Events script.                                                                                                                                                 |
| record\_count            | number  | no       | yes      | The number of records in this form.                                                                                                                                        |
| created\_at              | string  | no       | yes      | Timestamp when the form was created.                                                                                                                                       |
| updated\_at              | string  | no       | yes      | Timestamp when the form was last updated.                                                                                                                                  |
| image                    | string  | no       | yes      | The URL to the original image which was uploaded as this app's icon.                                                                                                       |
| image\_thumbnail         | string  | no       | yes      | The URL to the thumbnail-sized image which was uploaded as this app's icon. 160x160 px                                                                                     |
| image\_small             | string  | no       | yes      | The URL to the small-sized image which was uploaded as this app's icon. 320x320 px                                                                                         |
| image\_large             | string  | no       | yes      | The URL to the large-sized image which was uploaded as this app's icon. 640x640 px                                                                                         |
| report\_templates        | object  | no       | no       | The linked report templates                                                                                                                                                |

## Status Field Properties

| Property                 | Type    | Default         | Description                                             |
| ------------------------ | ------- | --------------- | ------------------------------------------------------- |
| type                     | string  | `"StatusField"` | The type of field.                                      |
| label                    | string  | `"Status"`      | The label for this field.                               |
| key                      | string  | `"@status"`     | The key for this field.                                 |
| data\_name               | string  | `"status"`      | The data name for this field.                           |
| default\_value           | string  | `""`            | The default value for this field.                       |
| enabled                  | boolean | `false`         | Whether this form has the status field enabled.         |
| read\_only               | boolean | `false`         | Whether status can be modified by user.                 |
| hidden                   | boolean | `false`         | Whether status is visible on mobile.                    |
| description              | string  | `""`            | The description for this field.                         |
| choices                  | array   | `[]`            | See status field choices below.                         |
| required                 | boolean | `false`         | Whether status value is required.                       |
| default\_previous\_value | boolean | `false`         | Whether to automatically set the previously used value. |

## Status Field Choice Properties

| Property | Type   | Default     | Description                                                                                            |
| -------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| label    | string | `""`        | What's shown to the user in the web and mobile apps when they select a status for records in this app. |
| value    | string | `""`        | What's stored in the record.                                                                           |
| color    | string | `"#CB0D0C"` | The hexadecimal value for the color used for the status and the marker color on the map.               |

## Form Element Properties (all field types)

| Property                   | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                       | string  | yes      | Must be one of the valid element types: `"TextField"`, `"YesNoField"`, `"Label"`, `"Section"`, `"ChoiceField"`, `"ClassificationField"`, `"PhotoField"`, `"VideoField"`, `"AudioField"`, `"SketchField"`, `"BarcodeField"`, `"DateTimeField"`, `"TimeField"`, `"Repeatable"`, `"AddressField"`, `"SignatureField"`, `"HyperlinkField"`, `"CalculatedField"`, `"RecordLinkField"`. |
| key                        | string  | yes      | The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses system generated 4 character codes.                                                                                                                                                                                                                                              |
| label                      | string  | yes      | The field label, visible to mobile and web users.                                                                                                                                                                                                                                                                                                                             |
| data\_name                 | string  | yes      | Can be set manually or auto generated using the label of the element. This field will be the column name on all exported files. It is recommended to use something that works easily with Esri Shapefiles that have a 10 character maximum column heading limitation.                                                                                                         |
| required                   | boolean | yes      | Is this field required?                                                                                                                                                                                                                                                                                                                                                       |
| disabled                   | boolean | yes      | Is this field read only?                                                                                                                                                                                                                                                                                                                                                      |
| hidden                     | boolean | yes      | Is this field visible on mobile?                                                                                                                                                                                                                                                                                                                                              |
| default\_value             | string  | yes      | The attribute to use as default value.                                                                                                                                                                                                                                                                                                                                        |
| description                | string  | no       | Helper text for the user.                                                                                                                                                                                                                                                                                                                                                     |
| visible\_conditions\_type  | string  | no       | Match all or any of the conditions to display this field. (`"all"` or `"any"`)                                                                                                                                                                                                                                                                                                |
| visible\_conditions        | array   | no       | Array of objects containing visibility conditions (see conditions table below).                                                                                                                                                                                                                                                                                               |
| required\_conditions\_type | string  | no       | Match all or any of the conditions to make this field required. (`"all"` or `"any"`)                                                                                                                                                                                                                                                                                          |
| required\_conditions       | array   | no       | Array of objects containing requirement conditions (see conditions table below).                                                                                                                                                                                                                                                                                              |

## TextField

General free text entry. Launches the standard alphanumeric keyboard on mobile if `numeric` is false or the numeric keyboard if true. Non-numeric text fields support regex pattern validation.

| Property                 | Type    | Required | Description                                                                                                                                             |
| ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numeric                  | boolean | no       | Is it a numeric field?                                                                                                                                  |
| format                   | string  | no       | If it a numeric field, what is the format (`"decimal"` or `"integer"`)?                                                                                 |
| pattern                  | string  | no       | Custom validation pattern using a regular expression (regex) pattern. [More information](https://www.w3.org/TR/html5/forms.html#the-pattern-attribute). |
| pattern\_description     | string  | no       | Description to show user on validation error.                                                                                                           |
| min\_length              | number  | no       | Minimum length of text string (when numeric=false).                                                                                                     |
| max\_length              | number  | no       | Maximum length of text string (when numeric=false).                                                                                                     |
| min                      | number  | no       | Minimum number (when numeric=true).                                                                                                                     |
| max                      | number  | no       | Maximum number (when numeric=true).                                                                                                                     |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.                                                                                                 |

## DateTimeField

Formatted date entry. Launches the native calendar picker on mobile. Format for import is `YYYY-MM-DD`.

| Property                 | Type    | Required | Description                                                                  |
| ------------------------ | ------- | -------- | ---------------------------------------------------------------------------- |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.                      |
| default\_value           | string  | no       | The attribute to use as default value. Use `now` to default to today's date. |

## TimeField

Relative time (no timezone) with in 24-hour format (`13:30`). Launches the native time picker on mobile. Format for import is `hh:mm`.

| Property                 | Type    | Required | Description                                                                      |
| ------------------------ | ------- | -------- | -------------------------------------------------------------------------------- |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.                          |
| default\_value           | string  | no       | The attribute to use as default value. Use `now` to default to the current time. |

## YesNoField

For simple yes/no questions with optional neutral state.

| Property                 | Type    | Required            | Description                                                          |
| ------------------------ | ------- | ------------------- | -------------------------------------------------------------------- |
| neutral\_enabled         | boolean | yes                 | Enable N/A choice?                                                   |
| neutral                  | object  | if neutral\_enabled | Label/Value for neutral choice (`{"label": "N/A","value": "n/a"}`).  |
| positive                 | object  | yes                 | Label/Value for positive choice (`{"label": "Yes","value": "yes"}`). |
| negative                 | object  | yes                 | Label/Value for negative choice (`{"label": "No","value": "no"}`).   |
| default\_previous\_value | boolean | `false`             | Whether to automatically set the previously used value.              |

## ChoiceField

Choices can be specified inline or referenced from a predefined choice list. Allowing “Other” will allow users to enter a custom value. Choice labels are displayed in the form while values are saved in the database.

| Property                 | Type    | Required | Description                                                           |
| ------------------------ | ------- | -------- | --------------------------------------------------------------------- |
| choices                  | array   | yes      | Array of choice objects (`{"label":"My Label", "value":"My Value"}`). |
| multiple                 | boolean | no       | Multiple choice field?                                                |
| allow\_other             | boolean | no       | Allow other values?                                                   |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.               |

## ClassificationField

Similar to single choice field, but can have nested choices to give a logical grouping or hierarchy to the choices. `ClassificationField` elements *must* have a `classification_set_id` field that contains a **valid** `id` of an existing classification set object.

| Property                 | Type    | Required | Description                                             |
| ------------------------ | ------- | -------- | ------------------------------------------------------- |
| classification\_set\_id  | string  | yes      | The id of the classification set to reference.          |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value. |

## PhotoField

Associate photos with this field by launching the camera or selecting from the camera roll. Each Photo field allows any number of photos to be added to it.

| Property                  | Type    | Required | Description                                     |
| ------------------------- | ------- | -------- | ----------------------------------------------- |
| min\_length               | number  | no       | Minimum number of photos.                       |
| max\_length               | number  | no       | Maximum number of photos.                       |
| annotations\_enabled      | boolean | no       | Photo Annotations (markup) enabled?             |
| deidentification\_enabled | boolean | no       | Photo De-Identification (blurred face) enabled? |
| timestamp\_enabled        | boolean | no       | Photo Timestamps enabled?                       |

## VideoField

Associate videos with this field by launching the camera or selecting from the camera roll. Each Video field allows any number of videos to be added to it. Enabling the GPS track allows for spatial video playback with synced map.

| Property       | Type    | Required | Description               |
| -------------- | ------- | -------- | ------------------------- |
| track\_enabled | boolean | no       | GPS track enabled?        |
| audio\_enabled | boolean | no       | Audio enabled?            |
| min\_length    | number  | no       | Minimum number of videos. |
| max\_length    | number  | no       | Maximum number of videos. |

## AudioField

Associate audio recordings with this field by launching the microphone or selecting from the camera roll. Each Audio field allows any number of audio files to be added to it. Enabling the GPS track allows for spatial audio playback with synced map.

| Property       | Type    | Required | Description                         |
| -------------- | ------- | -------- | ----------------------------------- |
| track\_enabled | boolean | no       | GPS track enabled?                  |
| min\_length    | number  | no       | Minimum number of audio recordings. |
| max\_length    | number  | no       | Maximum number of audio recordings. |

## SketchField

Associate sketches with this field by drawing on a canvas with an optional background. Each Sketch field allows any number of sketches to be added to it.

| Property                      | Type    | Required | Description                                                                 |
| ----------------------------- | ------- | -------- | --------------------------------------------------------------------------- |
| backgrounds                   | array   | no       | Array of background image objects.                                          |
| min\_length                   | number  | no       | Minimum number of sketches.                                                 |
| max\_length                   | number  | no       | Maximum number of sketches.                                                 |
| map\_background\_enabled      | boolean | no       | Enable map background option for sketches. Defaults to `false`.             |
| blank\_canvas\_enabled        | boolean | no       | Enable blank canvas option for sketches. Defaults to `true`.                |
| custom\_background\_enabled   | boolean | no       | Enable custom background image option for sketches. Defaults to `false`.    |

## Section

Use sections to group fields together to better organize your form for presentation to the user. Also includes display options: inline display simply provides a group heading while drill-down display makes the section display in a separate page.

| Property | Type   | Required | Description                                        |
| -------- | ------ | -------- | -------------------------------------------------- |
| display  | string | yes      | Display type (`"inline"`, `"drilldown"`)           |
| elements | array  | yes      | Array of field elements nested within the section. |

## AddressField

Store a single street address. Can autopopulate on mobile devices by reverse geocoding the record’s location coordinates to determine the nearest address.

| Property       | Type    | Required | Description                                         |
| -------------- | ------- | -------- | --------------------------------------------------- |
| auto\_populate | boolean | no       | Automatically reverse geocode to determine address? |

## SignatureField

Capture electronic signatures to attach to the record with optional agreement text.

| Property        | Type   | Required | Description                                     |
| --------------- | ------ | -------- | ----------------------------------------------- |
| agreement\_text | string | no       | The text that appears below the signature line. |

## HyperlinkField

Include a link to open a URL in the browser. Can also be used as an action button with data events.

| Property     | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| default\_url | string | no       | Optional default URL. |

## CalculatedField

Define dynamic expressions and perform calculations using values from other fields and JavaScript.

| Property                 | Type    | Required | Description                                                          |
| ------------------------ | ------- | -------- | -------------------------------------------------------------------- |
| display                  | object  | yes      | Calculation display object (`{"style": "number","currency": null}`). |
| expression               | string  | no       | Calculation expression.                                              |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.              |

## BarcodeField

Scan a barcode or QR code and store the text value.

| Property                 | Type    | Required | Description                                             |
| ------------------------ | ------- | -------- | ------------------------------------------------------- |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value. |

## RecordLinkField

Select or create records from other apps you have access to.

| Property                 | Type    | Required | Description                                                                                                |
| ------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| allow\_existing\_records | boolean | yes      | Whether to allow the user to select existing records from the app linked in the record link field.         |
| allow\_creating\_records | boolean | yes      | Whether to allow the user to create new records in the app that is linked to the record link field.        |
| allow\_updating\_records | boolean | yes      | Whether to allow the user to update data in existing records in the app linked to the record link field.   |
| allow\_multiple\_records | boolean | yes      | Whether to allow the user to select multiple records to link from the app linked to the record link field. |
| form\_id                 | string  | yes      | The form id of the linked app to reference.                                                                |
| record\_conditions\_type | string  | no       | Match all or any of the conditions to filter linked records. (`"all"` or `"any"`)                          |
| record\_conditions       | array   | no       | Array of objects containing conditions to filter linked records (see conditions table below).              |
| record\_defaults         | array   | no       | Array of objects containing conditions to filter linked records (see defaults table below).                |
| default\_previous\_value | boolean | `false`  | Whether to automatically set the previously used value.                                                    |

### Record Link Default Properties

| Property                | Type   | Description                       |
| ----------------------- | ------ | --------------------------------- |
| source\_field\_key      | string | The key of the source field.      |
| destination\_field\_key | string | The key of the destination field. |

## Report Templates Properties

| Property    | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| id          | string | The ID of the report template.   |
| name        | string | The name of the report template. |
| description | string | The description of the report.   |

## Conditions

Every element in the form may have two types of conditionals: `required_conditions` (to force data entry into the given field) and `visible_conditions` (to hide/show fields dynamically -- to enable "decision tree"-like functionality). These allow for special conditions to be met before a field can be shown or a record can be created on the mobile device. These conditions are *not* used in the validation process for record imports.

| Property   | Type   | Description                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------ |
| field\_key | string | The key of the field to match.                                                             |
| operator   | string | Condition operator (`"equal_to"`, `"not_equal_to"`, `"is_empty"`, `"is_not_empty"`).       |
| value      | string | The value to match against key field. (empty string for `"is_empty"` and `"is_not_empty"`) |

# Validations

The following properties must be included in order to create/update a form object in our system. Any validation errors will return a `422: Unprocessable Entity` and an object with a list of validation errors.

## Required Form Properties

| Property | Type   | Description                      | Example                                                                                    |
| -------- | ------ | -------------------------------- | ------------------------------------------------------------------------------------------ |
| name     | string | The name you've given this form. | `"Fire Hydrant Inventory"`                                                                 |
| elements | array  | Custom form elements.            | Required element properties vary by field type (see form element properties tables above). |

Example validation response if the `name` is not included:

```json
{
  "form": {
    "errors": {
      "name": ["cannot be blank"]
    }
  }
}
```

# Notes

* The entire form object is required when making an update. Omitting existing elements will result in data loss! The typical workflow for updating an existing form is to fetch the form object, modify it, and then submit the PUT request.

# Sample Response

```json
{
  "form": {
    "name": "Fire Hydrant Inventory",
    "description": "Inventory of fire hydrant structures.",
    "bounding_box": [27.7644875, -87.9042981472685, 42.8251769, -73.8936123],
    "record_title_key": "8373",
    "title_field_keys": ["8373", "2832"],
    "status_field": {
      "type": "StatusField",
      "label": "Color",
      "key": "@status",
      "data_name": "color",
      "default_value": "Unknown",
      "enabled": true,
      "read_only": false,
      "hidden": false,
      "description": "",
      "choices": [{
        "label": "Unknown",
        "value": "Unknown",
        "color": "#B3B3B3"
      },
      {
        "label": "Blue",
        "value": "Blue",
        "color": "#1891C9"
      },
      {
        "label": "Green",
        "value": "Green",
        "color": "#87D30F"
      },
      {
        "label": "Orange",
        "value": "Orange",
        "color": "#FF8819"
      },
      {
        "label": "Red",
        "value": "Red",
        "color": "#CB0D0C"
      },
      {
        "label": "White",
        "value": "White",
        "color": "#FFFFFF"
      },
      {
        "label": "Yellow",
        "value": "Yellow",
        "color": "#FFD300"
      }],
      "required": false,
      "disabled": false
    },
    "auto_assign": false,
    "record_count": 97,
    "id": "7a0c3378-b63a-4707-b459-df499698f23c",
    "created_at": "2015-04-16T13:20:10Z",
    "updated_at": "2015-04-29T19:57:21Z",
    "image": "https://fulcrumapp.s3.amazonaws.com/form-images/7a0c3378-b63a-4707-b459-df499698f23c-0fe97096-fac5-41ec-81a6-b961b9ed9b24.png",
    "image_thumbnail": "https://fulcrumapp.s3.amazonaws.com/form-images/thumb_7a0c3378-b63a-4707-b459-df499698f23c-0fe97096-fac5-41ec-81a6-b961b9ed9b24.png",
    "image_small": "https://fulcrumapp.s3.amazonaws.com/form-images/small_7a0c3378-b63a-4707-b459-df499698f23c-0fe97096-fac5-41ec-81a6-b961b9ed9b24.png",
    "image_large": "https://fulcrumapp.s3.amazonaws.com/form-images/large_7a0c3378-b63a-4707-b459-df499698f23c-0fe97096-fac5-41ec-81a6-b961b9ed9b24.png",
    "report_templates": [
      {
        "id": "bec301b5-22f3-4009-93f5-6df3ef4c44af",
        "name": "Report",
        "description": ""
      }
    ],
    "elements": [{
      "type": "TextField",
      "key": "2832",
      "label": "ID Tag",
      "description": "Enter the asset tag ID",
      "required": false,
      "disabled": false,
      "hidden": false,
      "data_name": "id_tag",
      "default_value": null,
      "visible_conditions_type": null,
      "visible_conditions": null,
      "required_conditions_type": null,
      "required_conditions": null,
      "numeric": false,
      "pattern": null,
      "pattern_description": null,
      "min_length": null,
      "max_length": null
    },
    {
      "type": "ChoiceField",
      "key": "8373",
      "label": "Hydrant Type",
      "description": "What style of hydrant is it?",
      "required": false,
      "disabled": false,
      "hidden": false,
      "data_name": "hydrant_type",
      "default_value": null,
      "visible_conditions_type": null,
      "visible_conditions": null,
      "required_conditions_type": null,
      "required_conditions": null,
      "multiple": false,
      "allow_other": false,
      "choices": [{
        "label": "Pillar",
        "value": "Pillar"
      },
      {
        "label": "Pond",
        "value": "Pond"
      },
      {
        "label": "Standpipe",
        "value": "Standpipe"
      },
      {
        "label": "Underground",
        "value": "Underground"
      },
      {
        "label": "Wall",
        "value": "Wall"
      }]
    },
    {
      "type": "ChoiceField",
      "key": "11f8",
      "label": "Position",
      "description": "Where is the hydrant installed?",
      "required": false,
      "disabled": false,
      "hidden": false,
      "data_name": "position",
      "default_value": null,
      "visible_conditions_type": null,
      "visible_conditions": null,
      "required_conditions_type": null,
      "required_conditions": null,
      "multiple": false,
      "allow_other": false,
      "choices": [{
        "label": "Building",
        "value": "Building"
      },
      {
        "label": "Green Space",
        "value": "Green Space"
      },
      {
        "label": "Lane",
        "value": "Lane"
      },
      {
        "label": "Parking Lot",
        "value": "Parking Lot"
      },
      {
        "label": "Sidewalk",
        "value": "Sidewalk"
      }]
    },
    {
      "type": "TextField",
      "key": "57c9",
      "label": "Diameter",
      "description": null,
      "required": false,
      "disabled": false,
      "hidden": false,
      "data_name": "diameter",
      "default_value": null,
      "visible_conditions_type": null,
      "visible_conditions": null,
      "required_conditions_type": null,
      "required_conditions": null,
      "numeric": true,
      "format": "decimal",
      "min": null,
      "max": null,
      "min_length": null,
      "max_length": null
    },
    {
      "type": "PhotoField",
      "key": "193f",
      "label": "Photo",
      "description": null,
      "required": false,
      "disabled": false,
      "hidden": false,
      "data_name": "photo",
      "default_value": null,
      "visible_conditions_type": null,
      "visible_conditions": null,
      "required_conditions_type": null,
      "required_conditions": null,
      "min_length": null,
      "max_length": null
    }]
  }
}
```
