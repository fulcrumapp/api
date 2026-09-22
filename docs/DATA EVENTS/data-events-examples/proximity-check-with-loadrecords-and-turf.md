---
title: Proximity check using LOADRECORDS and built-in Turf functions
excerpt: >-
  This example shows how to use LOADRECORDS alongside Fulcrum's built-in
  GEOMETRYBUFFER and GEOMETRYWITHIN functions to perform an in-app spatial
  intersection. When a record is opened, it checks whether any points from a
  second Fulcrum app fall within a defined buffer distance of the current
  location — without any external GIS service.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Proximity check using LOADRECORDS and built-in Turf functions

Fulcrum's `GEOMETRYBUFFER` and `GEOMETRYWITHIN` functions expose a subset of [Turf.js](https://turfjs.org/) geometry operations directly inside Data Events. Combined with `LOADRECORDS`, this means you can perform real-time spatial joins between two Fulcrum apps entirely in client-side JavaScript — no Carto, PostGIS, or external API required.

This example checks whether any records from a separate "reference" app fall within a configurable buffer distance of the current record's location, and alerts the user if a proximity match is found.

## Setup

1. Create a Fulcrum app to store your reference points (e.g. high-risk locations, exclusion zones, inspection sites). Note its **Form ID**.
2. In the app that will run this Data Event, add a field to capture the proximity result (e.g. a Yes/No field named `nearby_match`).
3. Replace the placeholder values in the configuration section below.

## Data Event Code

```js
// ─── Configuration ───────────────────────────────────────────────────────────

// Form ID of the reference app whose points you want to check proximity against
const REFERENCE_FORM_ID = 'YOUR-REFERENCE-FORM-ID-HERE';

// Buffer radius in kilometers (0.3048 km ≈ 1000 ft)
const BUFFER_RADIUS_KM = 0.3048;

// Maximum number of reference records to load (adjust based on dataset size)
const RECORD_LIMIT = 1000;

// Field key in the reference app for the label shown in the alert message
// (find this in the form builder or via the API)
const LABEL_FIELD_KEY = 'your_label_field_key';

// Field data name in this app to store whether a nearby match was found
const RESULT_FIELD = 'nearby_match';

// ─── Main Logic ──────────────────────────────────────────────────────────────

ON('load-record', function () {
  const currentLat = LATITUDE();
  const currentLng = LONGITUDE();

  // Skip the check if no location has been set yet
  if (!currentLat || !currentLng) {
    return;
  }

  // Build a GeoJSON Point from the current record location
  const currentPoint = {
    type: 'Point',
    coordinates: [currentLng, currentLat]
  };

  try {
    // Create a circular buffer around the current location
    const buffer = GEOMETRYBUFFER(currentPoint, BUFFER_RADIUS_KM);

    // Load all records from the reference app
    LOADRECORDS({
      form_id: REFERENCE_FORM_ID,
      limit: RECORD_LIMIT
    }, function (error, result) {
      if (error) {
        ALERT('Error loading reference records: ' + error.message);
        return;
      }

      const nearbyRecords = [];

      // Check each reference record for proximity
      result.records.forEach(function (record) {
        // Skip records with no geometry or incomplete coordinates
        if (
          !record.geometry ||
          !record.geometry.coordinates ||
          record.geometry.coordinates.length < 2
        ) {
          return;
        }

        const referencePoint = {
          type: 'Point',
          coordinates: [
            record.geometry.coordinates[0],
            record.geometry.coordinates[1]
          ]
        };

        // GEOMETRYWITHIN returns true if the point falls inside the buffer polygon
        if (GEOMETRYWITHIN(referencePoint, buffer)) {
          nearbyRecords.push({
            label: record.form_values[LABEL_FIELD_KEY] || 'Unknown'
          });
        }
      });

      if (nearbyRecords.length > 0) {
        // Build a summary alert for the user
        let message = `⚠️ WARNING: ${nearbyRecords.length} reference record(s) found within ${BUFFER_RADIUS_KM * 1000}m of this location.\n\n`;

        nearbyRecords.forEach(function (rec, index) {
          message += `${index + 1}. ${rec.label}\n`;
        });

        message += '\nPlease review before proceeding.';

        ALERT(message);
        SETVALUE(RESULT_FIELD, 'yes');
      } else {
        // No nearby matches — clear the result field
        SETVALUE(RESULT_FIELD, 'no');
      }
    });
  } catch (e) {
    ALERT('Error in proximity check: ' + e.message);
  }
});
```

## How it works

When the record loads, the event:

1. Reads the current record's `LATITUDE()` and `LONGITUDE()`.
2. Creates a GeoJSON `Point` from those coordinates.
3. Uses `GEOMETRYBUFFER` to expand that point into a circular polygon with the configured radius.
4. Calls `LOADRECORDS` to fetch all records from the reference app.
5. Loops through each reference record and uses `GEOMETRYWITHIN` to test whether its location falls inside the buffer.
6. If any matches are found, an alert summarizes them and sets a result field to `'yes'`. Otherwise it sets the field to `'no'`.

## Notes

- `GEOMETRYBUFFER` and `GEOMETRYWITHIN` are wrappers around Turf.js operations built into the Fulcrum Data Events runtime — no external libraries need to be loaded.
- Performance depends on the number of reference records. Datasets of several thousand points typically process in under a second. Use the `limit` parameter and consider filtering by a bounding box for very large datasets.
- This check runs on `load-record`, so it uses the coordinates already stored on the record. To also check as the user moves the pin, add the same logic to an `ON('change-geometry', ...)` handler.
