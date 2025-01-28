---
title: Videos API
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
The Videos API gives you access to a record's videos, including the GPS track. In order to upload a record with videos, you must first upload each video individually. By default, fetching the records will generate the URLs for the video, if a video exists for that record.

# Properties

| Property | Type | Required | Readonly | Description |
|----------|------|----------|----------|-------------|
| access_key | string | yes | no | The id of the video. |
| created_at | string | no | yes | Timestamp when the video was created. |
| updated_at | string | no | yes | Timestamp when the video was last updated. |
| created_by | string | no | yes | The name of user who created the video. |
| created_by_id | string | no | yes | The id of user who created the video. |
| updated_by | string | no | yes | The name of user who last updated the video. |
| updated_by_id | string | no | yes | The id of user who last updated the video. |
| uploaded | boolean | no | yes | The file has been uploaded, but might not be fully stored on the backend yet. This is the least useful indicator unless you're writing a synchronizer. |
| stored | boolean | no | yes | The `original` attribute is available for download. |
| processed | boolean | no | yes | The additional versions of the media are available for download. (thumbnails or small versions). |
| record_id | string | no | yes | The id of the record the video is associated with. |
| form_id | string | no | yes | The id of the form the video is associated with. |
| file_size | number | no | yes | The size of the video file in bytes. |
| content_type | string | no | yes | The content type of the video file. |
| url | string | no | yes | The URL to access the video. |
| track | string | no | yes | The URL to access the video GPS track. |
| thumbnail_small | string | no | yes | The URL to access the small thumbnail version of the video. |
| thumbnail_medium | string | no | yes | The URL to access the medium thumbnail version of the video. |
| thumbnail_large | string | no | yes | The URL to access the large thumbnail version of the video. |
| thumbnail_huge | string | no | yes | The URL to access the huge thumbnail version of the video. |
| thumbnail_small_square | string | no | yes | The URL to access the small square thumbnail version of the video. |
| thumbnail_medium_square | string | no | yes | The URL to access the medium square thumbnail version of the video. |
| thumbnail_large_square | string | no | yes | The URL to access the large square thumbnail version of the video. |
| thumbnail_huge_square | string | no | yes | The URL to access the huge square thumbnail version of the video. |
| small | string | no | yes | The URL to access the small version of the video. |
| medium | string | no | yes | The URL to access the medium version of the video. |
| original | string | no | yes | The URL to access the original version of the video. |
| metadata | metadata object | no | yes | The video's metadata (varies by device). |

# Validations

The following properties must be included in order to create/update a video object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| video[access_key] | string | The id of the video. | `"2d956eb0-bc2a-747f-fc56-1100936ce515"` |
| video[file] | multipart/form-data | The video file. | See [example](#upload-a-new-video) below. |

Example validation response if `access_key` is not included:

```json
{
  "video": {
    "errors": {
      "access_key": ["must be provided"]
    }
  }
}
```

# Notes

- There is no `DELETE` method for videos. Videos can be effectively deleted by unlinking them from their associated record.

# Sample Response

```json
{
  "video": {
    "access_key": "83b0dc55-82d6-459c-99d6-08c6963eaf2b",
    "created_at": "2015-05-09T23:29:02Z",
    "updated_at": "2015-05-09T23:33:52Z",
    "uploaded": true,
    "stored": true,
    "processed": true,
    "record_id": "ff13bf1a-8090-4f9e-8aca-e2974d61f8a1",
    "form_id": "4a3f0a6d-c1d3-4805-9aab-7cdd39d58e5f",
    "file_size": 172627919,
    "content_type": "video/mp4",
    "url": "https://web.fulcrumapp.com/api/v2/videos/83b0dc55-82d6-459c-99d6-08c6963eaf2b",
    "track": "https://web.fulcrumapp.com/api/v2/videos/83b0dc55-82d6-459c-99d6-08c6963eaf2b/track.json",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "metadata": {
      "streams": [{
        "index": 0,
        "codec_name": "h264",
        "codec_long_name": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
        "profile": "Baseline",
        "codec_type": "video",
        "codec_time_base": "1/180000",
        "codec_tag_string": "avc1",
        "codec_tag": "0x31637661",
        "width": 720,
        "height": 480,
        "has_b_frames": 0,
        "sample_aspect_ratio": "0:1",
        "display_aspect_ratio": "0:1",
        "pix_fmt": "yuv420p",
        "level": 30,
        "r_frame_rate": "30/1",
        "avg_frame_rate": "1080360000/36005161",
        "time_base": "1/90000",
        "start_pts": 0,
        "start_time": "0.000000",
        "duration_ts": 36005161,
        "duration": "400.057344",
        "bit_rate": "3449206",
        "nb_frames": "12004",
        "disposition": {
          "default": 1,
          "dub": 0,
          "original": 0,
          "comment": 0,
          "lyrics": 0,
          "karaoke": 0,
          "forced": 0,
          "hearing_impaired": 0,
          "visual_impaired": 0,
          "clean_effects": 0,
          "attached_pic": 0
        },
        "tags": {
          "creation_time": "2015-05-09 20:31:10",
          "language": "eng",
          "handler_name": "VideoHandle"
        }
      }],
      "format": {
        "nb_streams": 1,
        "nb_programs": 0,
        "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
        "format_long_name": "QuickTime / MOV",
        "start_time": "0.000000",
        "duration": "400.057000",
        "size": "172627919",
        "bit_rate": "3452066",
        "probe_score": 100,
        "tags": {
          "major_brand": "mp42",
          "minor_version": "0",
          "compatible_brands": "isommp42",
          "creation_time": "2015-05-09 20:31:10"
        }
      }
    },
    "thumbnail_small": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_small_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_medium": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_medium_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_large": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_large_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_huge": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_huge_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_small_square": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_small_square_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_medium_square": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_medium_square_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_large_square": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_large_square_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "thumbnail_huge_square": "https://fulcrumapp.s3.amazonaws.com/videos/thumbnail_huge_square_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.jpg",
    "small": "https://fulcrumapp.s3.amazonaws.com/videos/small_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.mp4",
    "medium": "https://fulcrumapp.s3.amazonaws.com/videos/medium_1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.mp4",
    "original": "https://fulcrumapp.s3.amazonaws.com/videos/1bd31df8-09e5-46a9-99cc-cc7bf5b29954-83b0dc55-82d6-459c-99d6-08c6963eaf2b.mp4"
  }
}
```

# Video Track

```json
{
  "tracks": [
    {
      "track": [
        [1431203070243, null, null, null, null, null, null, null, 0, 0],
        [1431203070515, 42.8557467, -73.902393, 24, 4, null, 236, 0.43829214572906494, 223, -1],
        [1431203071515, 42.8557455, -73.90239, 24, 4, null, 236, 0.4294182062149048, 225, 0],
        [1431203072485, 42.8557415, -73.9023935, 23, 4, null, 236, 0.5299999713897705, 232, 1],
        [1431203073529, 42.8557323, -73.9023998, 23, 4, null, 236, 0.7382411360740662, 225, 0]
      ]
    }
  ]
}
```

Each video track consists of an array of track point arrays. Each track point array may include the following items in this order:

```
[
  timestamp (milliseconds since Unix Epoch),
  latitude,
  longitude,
  altitude,
  horizontal_accuracy,
  vertical_accuracy,
  course,
  speed,
  heading,
  inclination
]
```

Each item should be a number or null and the only required items are timestamp, latitude, and longitude.