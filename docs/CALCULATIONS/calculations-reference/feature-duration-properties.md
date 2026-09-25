---
title: Feature Duration Properties
excerpt: Access the most recent mobile creation or update session duration and cumulative time across a feature's creation and updates.
deprecated: false
hidden: false
metadata:
  title: ''
  description: Access the most recent mobile creation or update session duration and cumulative time across a feature's creation and updates.
  robots: noindex
next:
  description: ''
---
The record's `this` object exposes two duration properties that measure time spent in mobile creation and update sessions for a feature (record or repeatable item). On initial mobile creation, the creation session is recorded in `featureCreatedDuration`, `featureUpdatedDuration`, and `featureEditedDuration`. Each later mobile update replaces `featureUpdatedDuration` with that update session's duration and adds the session to `featureEditedDuration`.

These properties complement `this.featureCreatedDuration` and are useful for auditing field workflows, flagging unusually short or long edits, and measuring field productivity.

These properties are available in both calculation fields and data events.

# this.featureUpdatedDuration

Returns the number of seconds spent in the most recent mobile session before the feature was saved. On initial mobile creation, this is the creation session; after each later mobile update, it is that update session.

## Syntax

```js
this.featureUpdatedDuration
```

## Returns

Number — Seconds. Returns `null` if the duration was not recorded or the latest save was from the web.

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

- Measures the wall-clock time of the most recent mobile session only. The initial creation session is reported here until a later mobile update replaces it. It does not accumulate across sessions; use `this.featureEditedDuration` for the total.
- Is not necessarily `0` before a later edit: on mobile, the initial creation session is recorded as the first session.
- Returns `null` for records updated on the Fulcrum web app.
- Returns `null` if the mobile app did not capture duration data (for example, records updated with older versions of the app).
- Does not exclude time when the app was backgrounded during the edit session.

---

# this.featureEditedDuration

Returns the total cumulative number of seconds spent in the feature's initial mobile creation session and all later mobile update sessions.

## Syntax

```js
this.featureEditedDuration
```

## Returns

Number — Seconds. Returns `null` if duration data was not captured. The total includes the initial mobile creation session, even if the feature has not been updated since creation.

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
// Total field time already includes the initial creation session
var total = this.featureEditedDuration;
if (total !== null) {
  SETRESULT(ROUND(total / 60, 1) + ' minutes total field time');
} else {
  SETRESULT('Not available');
}
```

## Notes

- Accumulates the initial mobile creation session and all later mobile update sessions, including the session reported by `featureUpdatedDuration`.
- Do not add `this.featureCreatedDuration` to this value; the creation session is already included.
- For a mobile feature with no later updates, includes the initial creation session rather than returning `0`.
- Returns `null` if the mobile app did not capture duration data (for example, a record created with an older app version that did not support duration tracking) or if no duration was captured on mobile, such as for a record created and edited on the Fulcrum web app.
- Does not exclude time when the app was backgrounded during editing sessions.
