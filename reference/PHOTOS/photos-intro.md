---
title: Photos API
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
The Photos API gives you access to a record's photos, including thumbnails. In order to upload a record with photos, you must first upload each photo individually. By default, fetching the records will generate the URLs for the photo and the thumbnail, if a photo exists for that record.

# Properties

| Property        | Type        | Required | Readonly | Description                                                                                                                                           |
| --------------- | ----------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| access\_key     | string      | yes      | no       | The ID of the photo.                                                                                                                                  |
| created\_at     | string      | no       | yes      | Timestamp when the photo was created.                                                                                                                 |
| updated\_at     | string      | no       | yes      | Timestamp when the photo was last updated.                                                                                                            |
| created\_by     | string      | no       | yes      | The name of user who created the photo.                                                                                                               |
| created\_by\_id | string      | no       | yes      | The id of user who created the photo.                                                                                                                 |
| updated\_by     | string      | no       | yes      | The name of user who last updated the photo.                                                                                                          |
| updated\_by\_id | string      | no       | yes      | The id of user who last updated the photo.                                                                                                            |
| uploaded        | boolean     | no       | yes      | The file has been uploaded, but might not be fully stored on the backend yet. This is the least useful indicator unless you're writing a synchronizer |
| stored          | boolean     | no       | yes      | The `original` attribute is available for download.                                                                                                   |
| processed       | boolean     | no       | yes      | The additional versions of the media are available for download. (thumbnails or small versions).                                                      |
| record\_id      | string      | no       | yes      | The id of the record the photo is associated with.                                                                                                    |
| form\_id        | string      | no       | yes      | The id of the form the photo is associated with.                                                                                                      |
| file\_size      | number      | no       | yes      | The size of the photo file in bytes.                                                                                                                  |
| content\_type   | string      | no       | yes      | The content type of the photo file.                                                                                                                   |
| latitude        | number      | no       | yes      | The photo latitude in WGS 84 decimal degrees.                                                                                                         |
| longitude       | number      | no       | yes      | The photo longitude in WGS 84 decimal degrees.                                                                                                        |
| url             | string      | no       | yes      | The URL to access the photo.                                                                                                                          |
| thumbnail       | string      | no       | yes      | The URL to access the thumbnail version of the photo.                                                                                                 |
| large           | string      | no       | yes      | The URL to access the large version of the photo.                                                                                                     |
| original        | string      | no       | yes      | The URL to access the original version of the photo.                                                                                                  |
| exif            | exif object | no       | yes      | The photo's EXIF metadata (varies by device).                                                                                                         |

# Validations

The following properties must be included in order to create/update a photo object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property            | Type                | Description          | Example                                   |
| ------------------- | ------------------- | -------------------- | ----------------------------------------- |
| photo\[access\_key] | string              | The id of the photo. | `"7A8ABC73-A41B-4F1E-BA16-F7C03DAE1E22"`  |
| photo\[file]        | multipart/form-data | The photo file.      | See [example](#upload-a-new-photo) below. |

Example validation response if `access_key` is not included:

```json
{
  "photo": {
    "errors": {
      "access_key": ["must be provided"]
    }
  }
}
```

# Notes

* There is no `DELETE` method for photos. Photos can be effectively deleted by unlinking them from their associated record.

# Sample Response

```json
{
  "photo": {
    "access_key": "5b8d16c7-4203-487f-862d-bf454f3de6e1",
    "created_at": "2015-06-06T16:16:40Z",
    "updated_at": "2015-06-06T16:16:41Z",
    "uploaded": true,
    "stored": true,
    "processed": true,
    "record_id": "9028ec24-fa06-4355-861b-78544299d766",
    "form_id": "7a0c3378-b63a-4707-b459-df499698f23c",
    "file_size": 924235,
    "content_type": "image/jpeg",
    "latitude": 42.82525,
    "longitude": -73.89618,
    "url": "https://web.fulcrumapp.com/api/v2/photos/5b8d16c7-4203-487f-862d-bf454f3de6e1",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "thumbnail": "https://fulcrumapp.s3.amazonaws.com/photos/thumb_514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-5b8d16c7-4203-487f-862d-bf454f3de6e1.jpg",
    "large": "https://fulcrumapp.s3.amazonaws.com/photos/large_514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-5b8d16c7-4203-487f-862d-bf454f3de6e1.jpg",
    "original": "https://fulcrumapp.s3.amazonaws.com/photos/514f7b5b-c5e8-44d6-a0dc-f48d409a1f9e-5b8d16c7-4203-487f-862d-bf454f3de6e1.jpg",
    "exif": {
      "image_width": 3264,
      "image_length": 2448,
      "make": "samsung",
      "model": "SM-G900V",
      "x_resolution": "72.0",
      "y_resolution": "72.0",
      "resolution_unit": 2,
      "software": "G900VVRU1BOC4",
      "date_time": "2015-06-06T12:00:08.000+00:00",
      "ycb_cr_positioning": 1,
      "exposure_time": "0.0027397260273972603",
      "f_number": "2.2",
      "exposure_program": 2,
      "iso_speed_ratings": 40,
      "date_time_original": "2015-06-06T12:00:08.000+00:00",
      "date_time_digitized": "2015-06-06T12:00:08.000+00:00",
      "shutter_speed_value": "0.0027472527472527475",
      "aperture_value": "2.2",
      "brightness_value": "7.22",
      "exposure_bias_value": "0.0",
      "max_aperture_value": "2.28",
      "metering_mode": 2,
      "light_source": 0,
      "flash": 0,
      "focal_length": "4.8",
      "subsec_time": "943",
      "subsec_time_original": "943",
      "subsec_time_digitized": "943",
      "color_space": 1,
      "pixel_x_dimension": 810,
      "pixel_y_dimension": 1080,
      "sensing_method": 2,
      "exposure_mode": 0,
      "white_balance": 0,
      "focal_length_in_35mm_film": 31,
      "scene_capture_type": 0,
      "image_unique_id": "F16QLHF01S",
      "gps_latitude_ref": "N",
      "gps_latitude": ["42.0", "49.0", "30.8953"],
      "gps_longitude_ref": "W",
      "gps_longitude": ["73.0", "53.0", "46.2451"],
      "gps_altitude_ref": "\u0000",
      "gps_altitude": "107.0",
      "gps_time_stamp": ["16.0", "0.0", "5.0"],
      "gps_date_stamp": "2015:06:06"
    }
  }
}
```
