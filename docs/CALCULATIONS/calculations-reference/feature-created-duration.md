---
title: Feature Created Duration
excerpt: Access the total time in seconds spent creating a feature on the mobile device.
deprecated: false
hidden: false
metadata:
  title: ''
  description: Access the total time in seconds spent creating a feature on the mobile device.
  robots: noindex
next:
  description: ''
---
The record's `this` object includes the total elapsed time the user spent creating the feature (record or repeatable item) on the mobile device before saving it for the first time. This is measured in seconds and reflects the active editing session from the moment the new record was opened until it was first saved.

This property is available in both calculation fields and data events.

# this.featureCreatedDuration

Returns the total number of seconds spent creating the feature before it was first saved.

## Syntax

```js
this.featureCreatedDuration
```

## Returns

Number — Seconds. Returns `null` if the duration was not recorded, or if the feature was created from the web.

## Examples

```js
// Return the creation duration in seconds
this.featureCreatedDuration
// returns 142
```

```js
// Display duration as minutes and seconds
var secs = this.featureCreatedDuration;
if (secs !== null) {
  var mins = Math.floor(secs / 60);
  var remainder = secs % 60;
  SETRESULT(mins + 'm ' + remainder + 's');
} else {
  SETRESULT('Duration unavailable');
}
// returns "2m 22s"
```

```js
// Flag records created very quickly (possible data quality concern)
var duration = this.featureCreatedDuration;
if (duration !== null && duration < 10) {
  ALERT('This record was created in under 10 seconds. Please verify the data is complete.');
}
```

## Notes

- Measures the wall-clock time between when the new record was opened and when it was first saved. It does not exclude time when the app was backgrounded.
- Returns `null` for records created on the Fulcrum web app.
- Returns `null` if the mobile app did not capture duration data (for example, records created with older versions of the app).
- This value is fixed after first save. It does not update on subsequent edits. To measure time spent on updates, use `this.featureUpdatedDuration` or `this.featureEditedDuration`.
