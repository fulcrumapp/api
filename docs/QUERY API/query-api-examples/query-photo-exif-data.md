---
title: Query Photo EXIF Data
excerpt: Use the Fulcrum Query API's photos system table to extract camera make, model, exposure settings, GPS coordinates, and other EXIF metadata from photos attached to records — useful for equipment audits, image quality checks, and location verification workflows.
---

Every photo uploaded to Fulcrum stores its EXIF metadata in the `photos` system table as a JSON column named `exif`. You can extract individual EXIF fields by casting the column to JSON and using the `->>` operator, which returns the value as text.

## Query

```sql
SELECT
  photo_id,
  (exif::json)->>'make'                          AS exif_make,
  (exif::json)->>'model'                         AS exif_model,
  (exif::json)->>'software'                      AS exif_software,
  (exif::json)->>'date_time'                     AS exif_date_time,
  ((exif::json)->>'exposure_time')::float        AS exif_exposure_time,
  ((exif::json)->>'f_number')::float             AS exif_f_number,
  ((exif::json)->>'iso_speed_ratings')::float    AS exif_iso,
  ((exif::json)->>'focal_length')::float         AS exif_focal_length,
  ((exif::json)->>'gps_latitude')::float         AS exif_gps_latitude,
  ((exif::json)->>'gps_longitude')::float        AS exif_gps_longitude,
  ((exif::json)->>'gps_altitude')::float         AS exif_gps_altitude,
  (exif::json)->>'lens_make'                     AS exif_lens_make,
  (exif::json)->>'lens_model'                    AS exif_lens_model
FROM photos
WHERE record_id = 'YOUR-RECORD-ID'   -- Replace with a specific record_id, or remove to query all
LIMIT 100;
```

## Finding a Photo ID

The `photo_id` is the second UUID segment in a Fulcrum photo URL. For example, in the URL:

```
https://fulcrumapp.s3.amazonaws.com/uploads/photos/abc123/059c6e25-1327-437f-801f-b4a8f320df5e/original.jpg
```

The `photo_id` is `059c6e25-1327-437f-801f-b4a8f320df5e`.

## Join to Records

To pull EXIF data alongside record fields, join `photos` to your app table on `record_id`:

```sql
SELECT
  r._record_id,
  r._title,
  p.photo_id,
  (p.exif::json)->>'make'   AS camera_make,
  (p.exif::json)->>'model'  AS camera_model,
  (p.exif::json)->>'date_time' AS photo_taken_at,
  ((p.exif::json)->>'gps_latitude')::float   AS photo_lat,
  ((p.exif::json)->>'gps_longitude')::float  AS photo_lng
FROM "Your App Name" r
JOIN photos p ON p.record_id = r._record_id
ORDER BY r._updated_at DESC;
```

## Available EXIF Fields

Not all cameras write all EXIF fields. Common fields available in Fulcrum:

| Field | Type | Description |
|---|---|---|
| `make` | text | Camera manufacturer (e.g., Apple, Samsung) |
| `model` | text | Camera model |
| `software` | text | Firmware/OS version |
| `date_time` | text | When the photo was taken |
| `exposure_time` | float | Shutter speed in seconds |
| `f_number` | float | Aperture f-stop |
| `iso_speed_ratings` | float | ISO sensitivity |
| `focal_length` | float | Focal length in mm |
| `gps_latitude` | float | GPS latitude from photo |
| `gps_longitude` | float | GPS longitude from photo |
| `gps_altitude` | float | GPS altitude from photo |
| `lens_make` | text | Lens manufacturer |
| `lens_model` | text | Lens model |

## Notes

**GPS coordinates in EXIF may differ from the record's location.** Fulcrum records the device's GPS location at submission time, while EXIF GPS is written by the camera at capture time. These can diverge if photos were taken offline or imported from a camera roll.

**`exif` may be null** for photos captured by apps that strip EXIF metadata, or for photos uploaded without camera metadata. Use `WHERE exif IS NOT NULL` to filter those out.

**Numeric EXIF fields are stored as text in the JSON.** Cast them to `::float` or `::numeric` for arithmetic operations or sorting.
