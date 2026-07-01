---
title: Feature Duration Properties
excerpt: Access the total time spent on the most recent update session and the cumulative editing time for a feature on the mobile device.
deprecated: false
hidden: false
metadata:
  title: ''
  description: Access the total time spent on the most recent update session and the cumulative editing time for a feature on the mobile device.
  robots: noindex
next:
  description: ''
---
The record's `this` object exposes two duration properties that measure time spent editing a feature (record or repeatable item) on the mobile device. `featureUpdatedDuration` measures the time spent in the most recent editing session. `featureEditedDuration` measures the total cumulative time spent editing the feature across all sessions.

These properties complement `this.featureCreatedDuration` and are useful for auditing field workflows, flagging unusually short or long edits, and measuring field productivity.

These properties are available in both calculation fields and data events.

# this.featureUpdatedDuration

Returns the number of seconds spent in the most recent editing session before the feature was last saved.

## Syntax

```js
this.featureUpdatedDuration
```

## Returns

Number — Seconds. Returns `null` if the duration was not recorded, or if the feature was updated from the web. Returns `0` if the feature has not been edited since creation.

## Examples

```js
// Return the most recent edit duration in seconds
this.featureUpdatedDuration
// returns 87
```

```js
// Display as a readable time string
var secs = this.featureUpdatedDuration;
if (secs !== null) {
  var mins = Math.floor(secs / 60);
  var remainder = secs % 60;
  SETRESULT(mins + 'm ' + remainder + 's');
} else {
  SETRESULT('Not available');
}
// returns "1m 27s"
```

```js
// Flag if the most recent edit was unusually brief
ON('edit-record', function(event) {
  var duration = this.featureUpdatedDuration;
  if (duration !== null && duration < 5) {
    ALERT('The last edit of this record lasted less than 5 seconds. Please review the data.');
  }
});
```

## Notes

- Measures the wall-clock time of the most recent editing session only. It does not accumulate across edits. To measure total time across all edits, use `this.featureEditedDuration`.
- Returns `null` for records updated on the Fulcrum web app.
- Returns `null` if the mobile app did not capture duration data (for example, records updated with older versions of the app).
- Does not exclude time when the app was backgrounded during the edit session.

---

# this.featureEditedDuration

Returns the total cumulative number of seconds spent editing the feature across all editing sessions.

## Syntax

```js
this.featureEditedDuration
```

## Returns

Number — Seconds. Returns `null` if duration data was not captured. Returns `0` if the feature has never been edited after creation.

## Examples

```js
// Return total editing time across all sessions
this.featureEditedDuration
// returns 430
```

```js
// Display total editing time in minutes
var total = this.featureEditedDuration;
if (total !== null) {
  SETRESULT(ROUND(total / 60, 1) + ' minutes total editing time');
} else {
  SETRESULT('Not available');
}
// returns "7.2 minutes total editing time"
```

```js
// Compare total editing time against creation time
var created = this.featureCreatedDuration || 0;
var edited = this.featureEditedDuration || 0;
var totalTime = created + edited;
SETRESULT(ROUND(totalTime / 60, 1) + ' minutes total field time');
```

## Notes

- Accumulates the duration of all editing sessions, including `featureUpdatedDuration` from the most recent save. It does not include the original creation time — to include that, add `this.featureCreatedDuration`.
- Returns `0` for features that have never been edited after their initial creation.
- Returns `null` if the mobile app did not capture duration data (for example, records created and never edited with older versions of the app that did not support duration tracking).
- Returns `null` for records edited exclusively on the Fulcrum web app.
- Does not exclude time when the app was backgrounded during editing sessions.
