---
title: Hours Between Pair of Date and Time Fields
excerpt: >-
  This code will calculate the hours between a pair a start date and start time
  field and a end date and end time field.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Copy and paste the entire code block above into the expression section of your calculation field, making sure to replace `$start_date_field`, `$start_time_field`,  `$end_date_field`, and `$end_time_field` with the data names of your date and time fields.

```js
function diff_hours(dt2, dt1) {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

var startDate = $start_date_field;
var startTime = $start_time_field;
var endDate = $end_date_field;
var endTime = $end_time_field;

var startTimeStamp = new Date(startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate() + ' ' + startTime + ':00');
var endTimeStamp = new Date(endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate() + ' ' + endTime + ':00');

SETRESULT(diff_hours(endTimeStamp, startTimeStamp));
```

This is a simpler code example that leverages `DATEVALUE()` to produce the full timestamp from the date and time fields.

```js
var startDate = $start_date_field;
var startTime = $start_time_field;
var endDate = $end_date_field;
var endTime = $end_time_field;

var current = DATEVALUE(endDate, endTime);
var previous = DATEVALUE(startDate, startTime);
var duration = ((((current - previous)/1000)/60)/60);
//for minutes use:
//var duration = (((current - previous)/1000)/60);
SETRESULT(duration);
```
