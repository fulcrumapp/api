---
title: SETFORMATTRIBUTES
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
Configure specific device functionality and behaviors at the form level.

# Description

Allows you to configure specific device functionality and behaviors at the form level. These configuration options help you control what features the user has available, improving the workflow and data quality for that particular form. You can currently control the following:

* Disable adding photos from the camera roll
* Force record to be sync’d upon save
* Control the minimum accuracy required for the GPS location
* Disable the ability to manually move the record location
* Disable the “Save as Draft” feature
* Control photo and video quality settings

The following table contains the available properties that be set:

| Property                         | Type    | Description                                                                    | Default         |
| -------------------------------- | ------- | ------------------------------------------------------------------------------ | --------------- |
| `auto_sync_enabled`              | boolean | auto-sync this record after saving                                             | user-preference |
| `auto_location_enabled`          | boolean | auto-populate the record location                                              | true            |
| `auto_location_minimum_accuracy` | integer | minimum accuracy in meters for the auto-populated location                     | 1500            |
| `manual_location_enabled`        | boolean | allow manually changing the record location                                    | true            |
| `media_gallery_enabled`          | boolean | allow media from the gallery or camera roll                                    | true            |
| `media_capture_enabled`          | boolean | allow media from the camera                                                    | true            |
| `photo_quality`                  | integer | maximum dimension of photos in pixels, or 'native'                             | user-preference |
| `video_quality`                  | string  | video resolution, one of: 480p, 720p, 1080p, 2160p (device/platform dependent) | user-preference |
| `drafts_enabled`                 | boolean | allow saving record as a draft                                                 | true            |
| `edit_locations_enabled`         | boolean | track the locations of record edits                                            | true            |
| `edit_durations_enabled`         | boolean | track the durations of record edits                                            | true            |

# Parameters

`config` Object (**required**) - A configuration object with the following optional properties

# Examples

```js
ON('load-record', function() {
  // This is just an example, it's not required to specify properties you don't want to override.
  var config = {
    auto_sync_enabled: true,
    auto_location_enabled: true,
    auto_location_minimum_accuracy: 10,
    manual_location_enabled: false,
    media_gallery_enabled: false,
    media_capture_enabled: true,
    photo_quality: '2048',
    video_quality: '720p',
    drafts_enabled: false,
    edit_locations_enabled: true,
    edit_durations_enabled: true
  };

  SETFORMATTRIBUTES(config);
});
```
