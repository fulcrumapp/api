---
title: Geofencing with LOADRECORDS and GEOMETRY
excerpt: >-
  This data event hides all form fields until a user drops their GPS pin inside
  a valid polygon boundary loaded from a separate Fulcrum app. When a match is
  found, fields are revealed and the user is alerted with the name of the area
  they have entered. Useful for location-based access control and site
  check-ins.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Geofencing with LOADRECORDS and GEOMETRY

This Data Event restricts data entry to specific geographic areas by checking whether the user's GPS pin falls within any polygon stored in a separate Fulcrum "boundary layer" app. Until the user's location is confirmed to be inside a valid polygon, all form fields remain hidden and the record cannot be filled in.

When a matching boundary is found, the fields are revealed and the user sees an alert identifying which area they are in.

**Example use case:** An inspector must physically be at a port site before they can begin an inspection. The port boundaries are stored as polygon records in a separate app. The data event checks their GPS location against those polygons and only opens the form when they arrive on site.

## Setup

1. Create a Fulcrum **boundary layer app** with polygon geometry enabled.
   - Add a text field for the area name (e.g. `area_name`). Note its **field key**.
   - Create polygon records for each valid location.
   - Note the **App ID** (found in the URL when viewing the app in the web editor).
2. In your primary data collection app, add this Data Event.
3. Replace `BUFFER_APP_ID` and `NAME_FIELD_KEY` with your values.

## Data Event Code

```js
// ─── Configuration ───────────────────────────────────────────────────────────

// App ID of the app containing your boundary polygons
// Find this in the URL when editing the app: /apps/YOUR-APP-ID/edit
var BUFFER_APP_ID = 'YOUR-BOUNDARY-APP-ID-HERE';

// Field key of the text field in the boundary app that holds the area name
// Used in the alert message when the user enters a boundary
var NAME_FIELD_KEY = 'your_area_name_field_key';

// ─── Core Function ───────────────────────────────────────────────────────────

/**
 * Loads all boundary polygon records and checks whether the current
 * GPS pin falls within any of them. If inside a polygon, reveals all
 * fields and alerts the user. If not inside any polygon, hides all fields.
 */
var updateFormWithBufferInfo = function () {
  // If no location has been set yet, keep everything hidden
  if (isNaN(parseFloat(LONGITUDE())) || isNaN(parseFloat(LATITUDE()))) {
    DATANAMES().forEach(function (element) {
      SETHIDDEN(element, true);
    });
    return;
  }

  // Build a GeoJSON Point from the current GPS coordinates
  var point = GEOMETRYPOINT([parseFloat(LONGITUDE()), parseFloat(LATITUDE())]);

  // Load all polygon records from the boundary app
  LOADRECORDS({
    form_id: BUFFER_APP_ID,
    include_geometry: true
  }, function (error, result) {
    if (error) {
      ALERT('Error loading boundary records: ' + INSPECT(error));
      // Keep fields hidden if there's an error
      DATANAMES().forEach(function (element) {
        SETHIDDEN(element, true);
      });
      return;
    }

    var records = result.records || [];
    var matchedRecord = null;

    // Check each polygon record to see if the current point falls inside it
    records.forEach(function (record) {
      if (record && record.geometry && GEOMETRYWITHIN(point, record.geometry)) {
        matchedRecord = record;
      }
    });

    if (!matchedRecord) {
      // Point is not inside any polygon — hide all fields
      DATANAMES().forEach(function (element) {
        SETHIDDEN(element, true);
      });
      ALERT('This location is not within a defined boundary area. Please move to a valid location before collecting data.');
      return;
    }

    // Point is inside a polygon — reveal all fields
    var fieldValues = matchedRecord.form_values || {};
    var areaName = fieldValues[NAME_FIELD_KEY] || 'Unknown Area';

    DATANAMES().forEach(function (element) {
      SETHIDDEN(element, false);
    });

    ALERT('You are within: ' + areaName + '. You may now collect data.');
  });
};

// ─── Event Hooks ─────────────────────────────────────────────────────────────

// On initial load, hide all fields and prompt the user to set their location
ON('load-record', function () {
  DATANAMES().forEach(function (element) {
    SETHIDDEN(element, true);
  });
  ALERT('Please use "Locate +" to confirm your GPS location before collecting data.');
});

// Re-run the boundary check whenever the user moves or places the map pin
ON('change-geometry', updateFormWithBufferInfo);

// Also run the check when an existing record is opened for editing
ON('edit-record', updateFormWithBufferInfo);
```

## How it works

1. **On load** — All fields are hidden and the user is prompted to verify their GPS location.
2. **On geometry change** — Whenever the user places or moves their pin, `updateFormWithBufferInfo` fires.
3. **Boundary check** — `LOADRECORDS` fetches all polygon records from the boundary app. The current GPS point is tested against each polygon using `GEOMETRYWITHIN` (a Turf.js function built into Fulcrum Data Events).
4. **Match found** — If the point falls inside a polygon, all fields are revealed and the user sees the name of the area.
5. **No match** — If the point is outside all polygons, fields remain hidden and the user is told to move to a valid location.

## Notes

- If users need to access this form offline, make sure the boundary app is synced to their device before going into the field.
- `GEOMETRYWITHIN` works with polygon and multipolygon geometry types.
- For large boundary datasets, consider loading a subset of records using a bounding box filter, or splitting the boundary app into regional sub-apps.
- To add more context when a match is found (e.g. auto-populate fields from the matched polygon), read additional `matchedRecord.form_values` keys and use `SETVALUE` to fill in form fields.
