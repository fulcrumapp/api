---
title: Feature Updated Location Properties
excerpt: Access the GPS coordinates, altitude, and accuracy recorded at the time a feature was most recently updated on the mobile device.
deprecated: false
hidden: false
metadata:
  title: ''
  description: Access the GPS coordinates, altitude, and accuracy recorded at the time a feature was most recently updated on the mobile device.
  robots: noindex
next:
  description: ''
---
The record's `this` object exposes the GPS location captured at the moment the feature (record or repeatable item) was most recently updated on the mobile device. These four properties give you access to that update-time snapshot: latitude, longitude, altitude, and horizontal accuracy.

For a feature that has never been edited after creation, these values will match the corresponding `featureCreated*` properties.

These properties are available in both calculation fields and data events.

# this.featureUpdatedLatitude

Returns the latitude recorded at the time the feature was most recently updated.

## Syntax

```js
this.featureUpdatedLatitude
```

## Returns

Number — Decimal degrees (WGS84). Returns `null` if no GPS fix was available at the time of the update, or if the feature was updated from the web.

## Examples

```js
// Return the update latitude
this.featureUpdatedLatitude
// returns 27.771203451892
```

```js
// Calculate distance moved between creation and last update (approximate, flat-earth)
var latDiff = this.featureUpdatedLatitude - this.featureCreatedLatitude;
var lonDiff = this.featureUpdatedLongitude - this.featureCreatedLongitude;
var approxMeters = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111320;
SETRESULT(ROUND(approxMeters, 1) + 'm');
```

## Notes

- Returns `null` for records updated on the Fulcrum web app.
- Returns `null` if the device did not have a GPS fix at the time of the update.
- For a newly created feature that has not yet been edited, this value matches `this.featureCreatedLatitude`.
- For repeatable items, reflects the GPS location of the repeatable at the time of the most recent save.

---

# this.featureUpdatedLongitude

Returns the longitude recorded at the time the feature was most recently updated.

## Syntax

```js
this.featureUpdatedLongitude
```

## Returns

Number — Decimal degrees (WGS84). Returns `null` if no GPS fix was available at the time of the update, or if the feature was updated from the web.

## Examples

```js
// Return the update longitude
this.featureUpdatedLongitude
// returns -82.637204
```

```js
// Display updated coordinates as a formatted string
'Last updated at: ' + this.featureUpdatedLatitude + ', ' + this.featureUpdatedLongitude
// returns "Last updated at: 27.771203451892, -82.637204"
```

## Notes

- Returns `null` for records updated on the Fulcrum web app.
- Returns `null` if the device did not have a GPS fix at the time of the update.
- For a newly created feature that has not yet been edited, this value matches `this.featureCreatedLongitude`.

---

# this.featureUpdatedAltitude

Returns the altitude (in meters above sea level) recorded at the time the feature was most recently updated.

## Syntax

```js
this.featureUpdatedAltitude
```

## Returns

Number — Meters above sea level (WGS84 ellipsoid). Returns `null` if altitude data was unavailable at the time of the update, or if the feature was updated from the web.

## Examples

```js
// Return the update altitude
this.featureUpdatedAltitude
// returns 29.112456
```

```js
// Show elevation change between creation and last update
var gain = this.featureUpdatedAltitude - this.featureCreatedAltitude;
SETRESULT(ROUND(gain, 2) + 'm elevation change');
// returns "1.34m elevation change"
```

## Notes

- Returns `null` if the device hardware does not support altitude or no GPS fix was available at the time of update.
- Returns `null` for records updated on the Fulcrum web app.
- For a newly created feature that has not yet been edited, this value matches `this.featureCreatedAltitude`.

---

# this.featureUpdatedAccuracy

Returns the horizontal GPS accuracy (in meters) recorded at the time the feature was most recently updated.

## Syntax

```js
this.featureUpdatedAccuracy
```

## Returns

Number — Meters. A lower value indicates a more precise GPS fix. Returns `null` if accuracy data was unavailable at the time of the update, or if the feature was updated from the web.

## Examples

```js
// Return the update GPS accuracy
this.featureUpdatedAccuracy
// returns 4.8
```

```js
// Prevent saving if GPS accuracy at update is too low
ON('save-record', function(event) {
  var accuracy = this.featureUpdatedAccuracy;
  if (accuracy !== null && accuracy > 20) {
    INVALID('GPS accuracy is too low (' + accuracy + 'm). Move to an open area and try again.');
  }
});
```

## Notes

- Returns `null` for records updated on the Fulcrum web app.
- Returns `null` if accuracy data was not available at the time of the update.
- For a newly created feature that has not yet been edited, this value matches `this.featureCreatedAccuracy`.
