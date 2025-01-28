---
title: Fulcrum Query Functions
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
In addition to the standard PostgreSQL & PostGIS functions, there are several Fulcrum-specific helper functions for formatting data and handling media attachments.

# FCM\_ConvertToFloat

`FCM_ConvertToFloat(input_value text)` RETURNS double precision

```sql
FCM_ConvertToFloat('1.2')   -- 1.2
FCM_ConvertToFloat('1000')  -- 1000
FCM_ConvertToFloat('a')     -- NULL
```

Convert a textual value to a floating point value. This function is similar to a cast, except it gracefully fails to `NULL` when the input cannot be converted to a number. This is useful for text data that's mostly numbers but might have some invalid values in it.

# FCM\_FormatTimestamp

`FCM_FormatTimestamp(ts timestamp without time zone, tz text DEFAULT 'UTC')` RETURNS text

Convert a timestamp to a different time zone. This is useful for localizing your timestamps to your own time zone. The `tz` argument is a string representing the time zone to use. This string can be in any format supported by the PostgreSQL `AT TIME ZONE` construct.

```sql
SELECT FCM_FormatTimestamp(current_timestamp, 'EST');                -- Eastern Standard Time
SELECT FCM_FormatTimestamp(current_timestamp, 'EDT');                -- Eastern Daylight-Saving Time
SELECT FCM_FormatTimestamp(current_timestamp, '-04:00');            -- 4 hours behind UTC
SELECT FCM_FormatTimestamp(current_timestamp, '-05:00');            -- 5 hours behind UTC
SELECT FCM_FormatTimestamp(current_timestamp, 'America/New_York');  -- New York time, either EST or EDT depending on the timestamp
```

The above examples show some of the ways the function can be used. The last form using `America/New_York` is the most useful because it takes into account the changes in the timezones given the exact timestamp. For example, New York is sometimes on EST and sometimes on EDT.

# FCM\_Photo (single)

`FCM_Photo(id text, version text DEFAULT NULL)` RETURNS fcm\_file

* `id` The photo ID
* `version` (optional, default `NULL`) The photo version. One of:
  * `NULL` (original)
  * `'large'` (jpg)
  * `'thumb'` (jpg)

Returns a photo URL in the output for a single photo.

The following will return a secure URL directly to the raw file, using its ID.

```sql
SELECT FCM_Photo('c515f1d6-e882-4027-9e5c-11e44b4c181c', 'thumb') AS photo_url;
```

The following will return a secure URL directly to the raw file for the second photo in a particular record.

```sql
SELECT FCM_Photo(photo_field[2], 'large') AS photo_url FROM "Building Inspections" WHERE _record_id='69daadc7-f68c-4c7c-8b40-7d9ea9e6d6c5';
```

The following will return secure URLs directly to the raw files for the first photos of all records in a table.

```sql
SELECT FCM_Photo(photo_field[1], 'thumb') AS photo_urls FROM "Building Inspections";
```

# FCM\_Photo (multiple)

`FCM_Photo(ids text[], version text DEFAULT NULL)` RETURNS fcm\_file\[]

* `ids` An array of photo IDs, this works naturally with the way photo fields are stored.
* `version` (optional, default `NULL`) The photo version. One of:
  * `NULL` (original)
  * `'large'` (jpg)
  * `'thumb'` (jpg)

Returns an array of photo URLs in the output.

The following will return secure URLs directly to the raw files. The consumer of the output needs to be able to handle multiple URLs.

```sql
SELECT FCM_Photo(unnest(photo_field), 'thumb') AS photo_urls FROM "Building Inspections";
```

*Here we use`unnest` to expand an array to a set of rows.*

# FCM\_Video (single)

`FCM_Video(id text, version text DEFAULT NULL)` RETURNS fcm\_file

* `id` The video ID
* `version` (optional, default `NULL`) The video version. One of:
  * `NULL` (original)
  * `small` (mp4)
  * `medium` (mp4)
  * `preview_small` (gif)
  * `preview_medium` (gif)
  * `thumbnail_small` (jpg)
  * `thumbnail_medium` (jpg)
  * `thumbnail_large` (jpg)
  * `thumbnail_huge` (jpg)
  * `thumbnail_small_square` (jpg)
  * `thumbnail_medium_square` (jpg)
  * `thumbnail_large_square` (jpg)
  * `thumbnail_huge_square` (jpg)

Returns video URLs in the output for a single video.

The following will return a secure URL directly to the raw file.

```sql
SELECT FCM_Video(video_field[1]) AS video_url FROM "Building Inspections";
```

# FCM\_Video (multiple)

`FCM_Video(ids text[], version text DEFAULT NULL)` RETURNS fcm\_file\[]

* `ids` The video IDs
* `version` (optional, default `NULL`) The video version. One of:
  * `NULL` (original)
  * `small` (mp4)
  * `medium` (mp4)
  * `preview_small` (gif)
  * `preview_medium` (gif)
  * `thumbnail_small` (jpg)
  * `thumbnail_medium` (jpg)
  * `thumbnail_large` (jpg)
  * `thumbnail_huge` (jpg)
  * `thumbnail_small_square` (jpg)
  * `thumbnail_medium_square` (jpg)
  * `thumbnail_large_square` (jpg)
  * `thumbnail_huge_square` (jpg)

Returns video URLs in the output for multiple videos.

The following will return secure URLs directly to the raw video files.

```sql
SELECT FCM_Video(video_field) AS video_urls FROM "Building Inspections";
```

# FCM\_Audio (single)

`FCM_Audio(id text, version text DEFAULT NULL)` RETURNS fcm\_file

* `id` The audio ID
* `version` (optional, default `NULL`) The audio version. One of:
  * `NULL` (original)
  * `small` (m4a)
  * `medium` (m4a)

Returns audio URLs in the output for a single audio file.

The following will return a secure URL directly to the raw audio file.

```sql
SELECT FCM_Audio(audio_field[1]) AS audio_url FROM "Building Inspections";
```

# FCM\_Audio (multiple)

`FCM_Audio(ids text[], version text DEFAULT NULL)` RETURNS fcm\_file\[]

* `ids` The audio IDs
* `version` (optional, default `NULL`) The audio version. One of:
  * `NULL` (original)
  * `small` (m4a)
  * `medium` (m4a)

Returns audio URLs in the output for multiple audio files.

The following will return secure URLs directly to the raw audio files.

```sql
SELECT FCM_Audio(audio_field) AS audio_urls FROM "Building Inspections";
```

# FCM\_Signature

`FCM_Signature(id text, version text DEFAULT NULL)` RETURNS fcm\_file

* `id` The signature ID
* `version` (optional, default `NULL`) The signature version. One of:
  * `NULL` (original)
  * `'large'` (png)
  * `'thumb'` (png)

Returns a signature URL in the output for a single signature.

The following will return secure URLs directly to the raw signature files.

```sql
SELECT FCM_Signature(signature_field) AS signature_url FROM "Building Inspections";
```
