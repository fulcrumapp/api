---
title: Feature Created Location Properties
excerpt: Access the GPS coordinates, altitude, and accuracy recorded at the moment a feature was first created on the mobile device.
deprecated: false
hidden: false
metadata:
  title: ''
  description: Access the GPS coordinates, altitude, and accuracy recorded at the moment a feature was first created on the mobile device.
  robots: noindex
next:
  description: ''
---
The record's `this` object exposes the GPS location captured at the moment the feature (record or repeatable item) was first created on the mobile device. These four properties give you access to that creation-time snapshot: latitude, longitude, altitude, and horizontal accuracy. All four values are captured together at the same instant and reflect the device's GPS state when the feature was first saved.

These properties are available in both calculation fields and data events.

# this.featureCreatedLatitude

Returns the latitude recorded at the time the feature was first created.

## Syntax

```js
this.featureCreatedLatitude
```

## Returns

Number — Decimal degrees (WGS84). Returns `null` if no GPS fix was available at the time of creation, or if the feature was created from the web.

## Examples

```js
// Return the creation latitude as a number
this.featureCreatedLatitude
// returns 27.770756908186286
```

```js
// Display creation coordinates as a formatted string
'Created at: ' + this.featureCreatedLatitude + ', ' + this.featureCreatedLongitude
// returns "Created at: 27.770756908186286, -82.638039"
```

```js
// Guard against null before using in a calculation
var lat = this.featureCreatedLatitude;
if (lat !== null) {
  SETRESULT(ROUND(lat, 6));
} else {
  SETRESULT('No GPS at creation');
}
```

## Notes

- Returns `null` for records created on the Fulcrum web app, since no GPS is captured in the browser.
- Returns `null` if the device did not have a GPS fix when the feature was created.
- For repeatable items, returns the GPS location of the repeatable at the time it was first saved, not the parent record's location.
- This value does not change after the feature is first saved. To access the most recent location, use `this.featureUpdatedLatitude`.

---

# this.featureCreatedLongitude

Returns the longitude recorded at the time the feature was first created.

## Syntax

```js
this.featureCreatedLongitude
```

## Returns

Number — Decimal degrees (WGS84). Returns `null` if no GPS fix was available at the time of creation, or if the feature was created from the web.

## Examples

```js
// Return the creation longitude as a number
this.featureCreatedLongitude
// returns -82.638039
```

```js
// Calculate displacement between creation and current longitude
var drift = Math.abs(LONGITUDE() - this.featureCreatedLongitude);
SETRESULT(ROUND(drift, 8));
// returns the absolute difference in decimal degrees
```

## Notes

- Returns `null` for records created on the Fulcrum web app.
- Returns `null` if the device did not have a GPS fix when the feature was created.
- For repeatable items, returns the longitude of the repeatable at the time it was first saved.
- This value does not change after the feature is first saved.

---

# this.featureCreatedAltitude

Returns the altitude (in meters above sea level) recorded at the time the feature was first created.

## Syntax

```js
this.featureCreatedAltitude
```

## Returns

Number — Meters above sea level (WGS84 ellipsoid). Returns `null` if altitude data was unavailable at the time of creation, or if the feature was created from the web.

## Examples

```js
// Return the creation altitude
this.featureCreatedAltitude
// returns 27.770756908186286
```

```js
// Display altitude in feet
var altMeters = this.featureCreatedAltitude;
if (altMeters !== null) {
  SETRESULT(ROUND(altMeters * 3.28084, 1) + ' ft');
} else {
  SETRESULT('Altitude unavailable');
}
// returns "91.1 ft"
```

## Notes

- Returns `null` if the device hardware does not support altitude or no GPS fix was available at creation.
- Altitude accuracy varies significantly by device and GPS conditions. It is generally less precise than latitude and longitude.
- Returns `null` for records created on the Fulcrum web app.

---

# this.featureCreatedAccuracy

Returns the horizontal GPS accuracy (in meters) recorded at the time the feature was first created.

## Syntax

```js
this.featureCreatedAccuracy
```

## Returns

Number — Meters. A lower value indicates a more precise GPS fix. Returns `null` if accuracy data was unavailable at the time of creation, or if the feature was created from the web.

## Examples

```js
// Return the creation GPS accuracy
this.featureCreatedAccuracy
// returns 5.2
```

```js
// Warn if the GPS accuracy at creation was poor
var accuracy = this.featureCreatedAccuracy;
if (accuracy !== null && accuracy > 10) {
  ALERT('Warning: This record was created with low GPS accuracy (' + accuracy + 'm).');
}
```

```js
// Display a quality label based on creation accuracy
var acc = this.featureCreatedAccuracy;
var label;
if (acc === null) {
  label = 'Unknown';
} else if (acc <= 5) {
  label = 'High';
} else if (acc <= 15) {
  label = 'Medium';
} else {
  label = 'Low';
}
SETRESULT(label);
```

## Notes

- Represents horizontal accuracy only. Vertical (altitude) accuracy is not separately exposed.
- Returns `null` for records created on the Fulcrum web app.
- GPS accuracy is influenced by sky visibility, atmospheric conditions, and device hardware. Values under 5 meters are typically considered high accuracy for field data collection.
