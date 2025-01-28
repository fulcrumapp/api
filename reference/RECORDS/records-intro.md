---
title: Records API
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
The Records API gives you access to the data records that have been collected or imported into your Fulcrum account.

## Filtering Between Dates

Using the before and since filters, you can retrieve records between a date range.

For instance, you can combine the `client_created_since` and `client_created_before` parameters to find the records that were created by your field crew between two dates.

When using the various created and updated time parameters, you must give the date since epoch in seconds: `2012-04-24 15:05:22 -0400 = 1335294322`.

Records will still be ordered according to the `updated_at` column, even when filtering with the other before/since parameters.

# Optional Headers

These headers work for create, update, and delete actions.

*Note*: These headers only work with the records API. Batch API calls will always use the configurations as set in the webhooks and workflows interface.

| Property        | Type    | Required | Default | Description                                                                   |
| --------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------- |
| x-skipworkflows | boolean | no       | false   | When `true`, the API call does not trigger workflows associated with the form |
| x-skipwebhooks  | boolean | no       | false   | When `true`, the API call does not trigger webhooks associated with the form  |

# Properties

| Property             | Type    | Required | Readonly | Description                                                                                                                                                                        |
| -------------------- | ------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| form\_id             | string  | yes      | yes      | The form ID                                                                                                                                                                        |
| latitude             | number  | yes      | no       | The record latitude in WGS 84 decimal degrees.                                                                                                                                     |
| longitude            | number  | yes      | no       | The record longitude in WGS 84 decimal degrees.                                                                                                                                    |
| form\_values         | object  | yes      | no       | Must be present and an object. The keys of this object must reflect the keys in the form schema. Different form types require different values (see table below).                  |
| status               | string  | no       | no       | Sets the color of the marker.                                                                                                                                                      |
| version              | number  | no       | yes      | Autoincremented version of the record for history tracking.                                                                                                                        |
| id                   | string  | no       | yes      | The id of the record.                                                                                                                                                              |
| created\_at          | string  | no       | yes      | Timestamp when the record was synced to the cloud.                                                                                                                                 |
| updated\_at          | string  | no       | yes      | Timestamp when the record was last synced to or processed while in the cloud.                                                                                                      |
| client\_created\_at  | string  | no       | no       | Timestamp when the user first created the record.                                                                                                                                  |
| client\_updated\_at  | string  | no       | no       | Timestamp when the record was last modified by the user.                                                                                                                           |
| created\_by          | string  | no       | yes      | The name of user who created the record.                                                                                                                                           |
| created\_by\_id      | string  | no       | yes      | The id of user who created the record.                                                                                                                                             |
| updated\_by          | string  | no       | yes      | The name of user who last updated the record.                                                                                                                                      |
| updated\_by\_id      | string  | no       | yes      | The id of user who last updated the record.                                                                                                                                        |
| changeset\_id        | string  | no       | no       | The id of the [changeset](changesets/) associated with the record.                                                                                                                 |
| project\_id          | string  | no       | no       | The id of the [project](http://help.fulcrumapp.com/web-app/what-are-projects) tagged to the record.                                                                                |
| assigned\_to         | string  | no       | yes      | The name of the user the record is assigned to.                                                                                                                                    |
| assigned\_to\_id     | string  | no       | no       | The id of the user the record is assigned to (`user_id`).                                                                                                                          |
| created\_duration    | number  | no       | no       | The number of seconds spent creating the record.                                                                                                                                   |
| updated\_duration    | number  | no       | no       | The number of seconds spent updating the record.                                                                                                                                   |
| edited\_duration     | number  | no       | no       | The total cumulative seconds spent editing the record (creating + all updates).                                                                                                    |
| created\_location    | object  | no       | no       | The location of where the record was created from. It has 4 `number` attributes: `latitude`, `longitude`, `altitude`, `horizontal_accuracy`                                        |
| updated\_location    | object  | no       | no       | The location of where the record was updated from. It has 4 `number` attributes: `latitude`, `longitude`, `altitude`, `horizontal_accuracy`                                        |
| altitude             | number  | no       | yes      | Meters above/below (+/-) sea level.                                                                                                                                                |
| speed                | number  | no       | yes      | Meters per second.                                                                                                                                                                 |
| course               | number  | no       | yes      | Only recorded if the device is moving and has no relation to how the device is oriented; course is in degrees (0.0-360); if no course can be determined then 0.0 will be returned. |
| horizontal\_accuracy | number  | no       | yes      | Accuracy of the latitude and longitude in meters.                                                                                                                                  |
| vertical\_accuracy   | number  | no       | yes      | Accuracy of the altitude value in meters.                                                                                                                                          |
| geometry             | GeoJSON | no       | no       | Point, LineString or Polygon of the record. [See below](https://docs.fulcrumapp.com/reference/records-intro#using-the-new-geometry-field)                                          |

## Form Value Field Types

| Field           | Type                                                                                                                     | Example                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text            | string                                                                                                                   | `"Hello world!"`                                                                                                                                                                               |
| Numeric         | string                                                                                                                   | `"50"`                                                                                                                                                                                         |
| Yes/No          | string                                                                                                                   | `"yes"`                                                                                                                                                                                        |
| Date            | string                                                                                                                   | `"2015-12-31"`                                                                                                                                                                                 |
| Time            | string                                                                                                                   | `"13:50"`                                                                                                                                                                                      |
| Barcode         | string                                                                                                                   | `"123456789"`                                                                                                                                                                                  |
| Hyperlink       | string                                                                                                                   | `"https://www.fulcrumapp.com"`                                                                                                                                                                 |
| Calculation     | string                                                                                                                   | `"6"`                                                                                                                                                                                          |
| Single Choice   | object with the following keys: `choice_values` (array of selected options) `other values` (array, empty or with values) | `{"choice_values": ["Red"],"other_values": []}`                                                                                                                                                |
| Multiple Choice | object with the following keys: `choice_values` (array of selected options) `other values` (array, empty or with values) | `{"choice_values": ["Red","White"],"other_values": []}`                                                                                                                                        |
| Classification  | object with the following keys: `choice_values` (array of selected options) `other values` (array, empty or with values) | `{"choice_values": ["Ford","Mustang"],"other_values": []}`                                                                                                                                     |
| Address         | address object                                                                                                           | `{"sub_thoroughfare": "360","thoroughfare": "Central Ave","suite": "","locality": "St. Petersburg","sub_admin_area": "","admin_area": "FL","postal_code": "33701","country": "United States"}` |
| Photo           | array of photo objects                                                                                                   | `[{"photo_id":"a8d1df96-44e5-75e9-7312-7e2c5e902496,"caption": ""}]`                                                                                                                           |
| Video           | array of video objects                                                                                                   | `[{"video_id":"712850b4-4de2-4d66-a6cc-034201245b52,"caption": ""}]`                                                                                                                           |
| Audio           | array of audio objects                                                                                                   | `[{"audio_id":"f81d51b5-1ce9-465b-be0b-27f1eca41e2c,"caption": ""}]`                                                                                                                           |
| Signature       | signature object                                                                                                         | `{"timestamp": "2015-07-09T14:54:04Z","signature_id": "9855e3f2-85a5-4b9f-9e62-0b1bbcfef091"}`                                                                                                 |
| Record Link     | array of record objects                                                                                                  | `[{"record_id": "988b963c-896c-4f50-be7b-5b5d151f2ed7"},{"record_id": "8a91ba6c-f99e-47a1-8246-807b4a44b28a"}]`                                                                                |
| Repeatable      | array of repeatable objects                                                                                              | `[{"id":"d67801a0-adc1-6f60-4b0d-ec3a7191b34b","geometry":{"type":"Point","coordinates":[-73.123456,42.123456]},"form_values": {"0129": "Hello world"}}]`                                      |

# Validations

The following properties must be included in order to create/update a record object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property     | Type   | Description                                                                                                                                                       | Example                                                                      |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| form\_id     | string | The form ID.                                                                                                                                                      | `"7a0c3378-b63a-4707-b459-df499698f23c"`                                     |
| latitude     | number | The record latitude in WGS 84 decimal degrees.                                                                                                                    | `27.770787`                                                                  |
| longitude    | number | The record longitude in WGS 84 decimal degrees.                                                                                                                   | `-82.638039`                                                                 |
| form\_values | object | Must be present and an object. The keys of this object must reflect the keys in the form schema. Different form types require different values (see table above). | `{"2832": "My string value","8373": {"choice_values": ["My choice value"]}}` |

Example validation response if the `form_id` is not included:

```json
{
  "record": {
    "errors": {
      "form_id": ["cannot be blank"]
    }
  }
}
```

# Using the `geometry` field

Users have the option to send in a `geometry` field with their API call to set the location of a record. In return, the record’s latitude and longitude will be updated to reflect this new geometry value. Needs to be valid a GeoJSON. We accept `Point`, `LineString`, `Polygon`, `MultiLineString`, and `MultiPolygon` geometry types. When setting the coordinates of your geometry, remember that longitude is written before latitude. Here is an example of a Record JSON object with valid Point geometry:

```json
{
  "form_id": "123",
  "form_values": {
    "6tgy": "My record",
    "765n": "876"
  },
  "geometry": {
  "type": "Point",
    "coordinates": [
      125.6,     // longitude
      10.1       // latitude
    ]
  }
}

```

If Fulcrum receives a `Point` geometry, the record’s `latitude` & `longitude` will be updated to reflect that new point. 

If Fulcrum receives a `LineString` geometry, the record’s `latitude` & `longitude` will be updated to reflect the line’s midpoint. 

If Fulcrum receives a `Polygon` geometry, the record’s `latitude` & `longitude` will be updated to reflect the polygon’s centroid.

If a user would prefer to set `latitude` and `longitude` themselves in addition to the `geometry`, they can send all three values: `geometry`, `latitude`, and `longitude`. Fulcrum will set all values it receives in this case.

# Using latitude and longitude

Users can still forgo `geometry` and update a record’s location via the `latitude` and `longitude` attributes. If Fulcrum receives record JSON that contains ONLY `latitude` and `longitude`, it will set the record’s `latitude` and `longitude` as well as update the  `geometry` to a `Point` reflecting the new coordinates.

**Warning**:\
Providing two options to update a record’s location means that `latitude` and `longitude` are no longer required, nor is `geometry`. However, Fulcrum strongly recommends sending in complete location information when you want to create a record or make changes to an existing one. For example, if you only want to update a record’s `latitude` property, you should still send in a `latitude` and `longitude` pair or a GeoJSON `geometry` value which contains both coordinates. 

If you do not wish to update a record’s location, there is no need to send in any location information - existing values will not change.

# Notes

* The Records API *does not* enforce any validation against your custom form fields.

* The entire record object is required when making an update. Omitting fields with existing data will result in data loss! The typical workflow for updating an existing record is to fetch the record object, modify it, and then submit the PUT request.

* A repeatable's `updated_at` is only updated from device, similar to the `client_updated_at` in the parent record. A repeatable cannot have a server updated at different than its parent because they save/sync at the same time.

* If an assigned\_to user does not exist in the organization, the record will be created with no assignee.

* If the project does not exist in the organization, the record will be created with no project.

# Sample Response

```json
{
  "record": {
    "status": "Red",
    "version": 1,
    "id": "4e1c33ad-5496-4818-826f-504e66239b4d",
    "created_at": "2015-05-30T15:47:19Z",
    "updated_at": "2015-05-30T15:47:19Z",
    "client_created_at": "2015-05-30T14:47:13Z",
    "client_updated_at": "2015-05-30T14:47:58Z",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "form_id": "7a0c3378-b63a-4707-b459-df499698f23c",
    "project_id": null,
    "assigned_to": null,
    "assigned_to_id": null,
    "form_values": {
      "8373": {
        "choice_values": ["Pillar"],
        "other_values": []
      },
      "2832": "183",
      "57c9": "4",
      "193f": [{
        "photo_id": "da1f58f5-f31d-452f-81fc-233f94bcf48a",
        "caption": null
      }],
      "11f8": {
        "choice_values": ["Green Space"],
        "other_values": []
      }
    },
    "latitude": 42.8208336,
    "longitude": -73.8936123,
    "altitude": 98.0,
    "speed": null,
    "course": 170.0,
    "horizontal_accuracy": 3.9,
    "vertical_accuracy": null
  }
}
```
