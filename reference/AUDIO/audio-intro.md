---
title: Audio API
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
The Audio API gives you access to a record's audio files, including the GPS track. In order to upload a record with audio attachments, you must first upload each audio file individually. By default, fetching the records will generate the URLs for the audio, if a recording exists for that record.

# Properties

| Property | Type | Required | Readonly | Description |
|----------|------|----------|----------|-------------|
| access_key | string | yes | no | The id of the audio. |
| created_at | string | no | yes | Timestamp when the audio was created. |
| updated_at | string | no | yes | Timestamp when the audio was last updated. |
| created_by | string | no | yes | The name of user who created the audio. |
| created_by_id | string | no | yes | The id of user who created the audio. |
| updated_by | string | no | yes | The name of user who last updated the audio. |
| updated_by_id | string | no | yes | The id of user who last updated the audio. |
| uploaded | boolean | no | yes | The file has been uploaded, but might not be fully stored on the backend yet. This is the least useful indicator unless you're writing a synchronizer. |
| stored | boolean | no | yes | The `original` attribute is available for download. |
| processed | boolean | no | yes | The additional versions of the media are available for download. (thumbnails or small versions). |
| record_id | string | no | yes | The id of the record the audio is associated with. |
| form_id | string | no | yes | The id of the form the audio is associated with. |
| file_size | number | no | yes | The size of the audio file in bytes. |
| content_type | string | no | yes | The content type of the audio file. |
| url | string | no | yes | The URL to access the audio recording. |
| track | string | no | yes | The URL to access the audio GPS track. |
| metadata | metadata object | no | yes | The audio's metadata (varies by device). |

# Validations

The following properties must be included in order to create/update an audio object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| audio[access_key] | string | The id of the audio. | `"2d956eb0-bc2a-747f-fc56-1100936ce515"` |
| audio[file] | multipart/form-data | The audio file. | See [example](#upload-a-new-audio-file) below. |

Example validation response if `access_key` is not included:

```json
{
  "audio": {
    "errors": {
      "access_key": ["must be provided"]
    }
  }
}
```

# Notes

- There is no `DELETE` method for audio. Audio files can be effectively deleted by unlinking them from their associated record.

# Sample Response

```json
{
  "audio": {
    "access_key": "f0eb217d-3d4b-4ade-81b7-bac63788f396",
    "created_at": "2016-05-13T13:48:42Z",
    "updated_at": "2016-05-13T13:48:44Z",
    "uploaded": true,
    "stored": true,
    "processed": true,
    "record_id": "1bfe797c-ad97-4f25-bf5c-d83a02d0145c",
    "form_id": "33d2f8d7-9aea-41a6-825b-f55da4b68a4b",
    "file_size": 558962,
    "content_type": "audio/m4a",
    "url": "https://api.fulcrumapp.com/api/v2/audio/f0eb217d-3d4b-4ade-81b7-bac63788f396",
    "track": "https://api.fulcrumapp.com/api/v2/audio/f0eb217d-3d4b-4ade-81b7-bac63788f396/track.json",
    "created_by": "Bryan McBride",
    "created_by_id": "50633f84a934480d260001db",
    "updated_by": "Bryan McBride",
    "updated_by_id": "50633f84a934480d260001db",
    "metadata": {
      "streams": [{
        "index": 0,
        "codec_name": "aac",
        "codec_long_name": "AAC (Advanced Audio Coding)",
        "profile": "LC",
        "codec_type": "audio",
        "codec_time_base": "1/44100",
        "codec_tag_string": "mp4a",
        "codec_tag": "0x6134706d",
        "sample_fmt": "fltp",
        "sample_rate": "44100",
        "channels": 1,
        "channel_layout": "mono",
        "bits_per_sample": 0,
        "r_frame_rate": "0/0",
        "avg_frame_rate": "0/0",
        "time_base": "1/44100",
        "start_pts": 0,
        "start_time": "0.000000",
        "duration_ts": 2924479,
        "duration": "66.314717",
        "bit_rate": "65556",
        "max_bit_rate": "96000",
        "nb_frames": "2856",
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
          "creation_time": "2016-05-12 21:32:59",
          "language": "eng",
          "handler_name": "SoundHandle"
        }
      }],
      "format": {
        "nb_streams": 1,
        "nb_programs": 0,
        "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
        "format_long_name": "QuickTime / MOV",
        "start_time": "0.000000",
        "duration": "66.315000",
        "size": "558962",
        "bit_rate": "67431",
        "probe_score": 100,
        "tags": {
          "major_brand": "mp42",
          "minor_version": "0",
          "compatible_brands": "isommp42",
          "creation_time": "2016-05-12 21:32:59"
        }
      }
    },
    "small": "https://fulcrumapp.s3.amazonaws.com/audio/small_9e10a61a-aec5-465e-9683-93e062b222ae-f0eb217d-3d4b-4ade-81b7-bac63788f396.m4a?AWSAccessKeyId=AKIAINLD3OFR6WK7JO3Q&Signature=IZ942FBS9NVE3J0ZkeapZX0Gdmg%3D&Expires=1510302466",
    "medium": "https://fulcrumapp.s3.amazonaws.com/audio/medium_9e10a61a-aec5-465e-9683-93e062b222ae-f0eb217d-3d4b-4ade-81b7-bac63788f396.m4a?AWSAccessKeyId=AKIAINLD3OFR6WK7JO3Q&Signature=6hZJVlq/wqgDvIgHdaXWzbXuOJ4%3D&Expires=1510302466",
    "original": "https://fulcrumapp.s3.amazonaws.com/audio/9e10a61a-aec5-465e-9683-93e062b222ae-f0eb217d-3d4b-4ade-81b7-bac63788f396.m4a?AWSAccessKeyId=AKIAINLD3OFR6WK7JO3Q&Signature=rq0G2MYhaOyH9a6lxy4UleYYsE0%3D&Expires=1510302466"
  }
}
```

# Audio Track

```json
{
  "tracks": [{
    "track": [
      [1463088713169, null, null, null, null, null, null, null, 0.0, 0.0],
      [1463088718361, 42.8319061, -73.8938649, null, 18.569, null, null, null, 149.0, 0.0],
      [1463088723234, 42.8318624, -73.8938189, null, 19.889, null, null, null, 234.0, -21.0],
      [1463088727213, 42.8319061, -73.8938649, null, 19.112, null, null, null, 234.0, -21.0],
      [1463088733266, 42.8318624, -73.8938189, null, 19.906, null, null, null, 234.0, -23.0],
      [1463088738273, 42.8319061, -73.8938649, null, 19.015, null, null, null, 261.0, 37.0],
      [1463088742254, 42.8319061, -73.8938649, null, 18.802, null, null, null, 248.0, 28.0],
      [1463088748361, 42.8319061, -73.8938649, null, 19.108, null, null, null, 260.0, 38.0],
      [1463088753319, 42.8319061, -73.8938649, null, 19.003, null, null, null, 265.0, 43.0],
      [1463088757315, 42.8319061, -73.8938649, null, 18.827, null, null, null, 189.0, 0.0],
      [1463088763388, 42.8319061, -73.8938649, null, 18.904, null, null, null, 189.0, 0.0],
      [1463088769018, 42.8319061, -73.8938649, null, 19.045, null, null, null, 190.0, 0.0],
      [1463088773030, 42.8319061, -73.8938649, null, 50.0, null, null, null, 279.0, 57.0],
      [1463088779118, 42.8319061, -73.8938649, null, 50.0, null, null, null, 136.0, 0.0]
    ]
  }]
}
```

Each audio track consists of an array of track point arrays. Each track point array may include the following items in this order:

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