---
title: TIMEDIFF
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
Returns the difference between 2 time fields

# Parameters

`startTimeField` String (**required**) - The time field containing the start time

`endTimeField` String (**required**) - The time field containing the end time

`format` String (optional)  \[default = 'hours'] - The format of the output. Either `hours` (default) or `minutes`.

# Returns

Number - The number of hours (default) or the number of minutes between the 2 specified times

# Examples

```js
TIMEDIFF('09:00', '17:00')

// returns 8
```

```js
TIMEDIFF('09:00', '11:00', 'minutes')

// returns 120
```

```js
TIMEDIFF('02:00', '01:00')

// returns 23
```

```js
// This returns the time elapsed in the format '__ hours __ minutes'
// (or '__ hours', '1 hour __ minutes', etc.)
// Other tests:
// start_time => '03:30', stop_stop => '04:30', returns '1 hour'
// start_time => '02:15', stop_stop => '03:16', returns '1 hour 1 minute'
// start_time => '01:00', stop_stop => '01:00', returns '24 hours'

var time = TIMEDIFF('09:22', '10:09', 'minutes');
var hours = FLOOR((time / 60), 1);
var minutes = time % 60;

if ( hours < 1 && minutes < 1 ) {
SETRESULT('N/A');
}
else if ( hours == 1 && minutes < 1 ) {
SETRESULT('1 hour');
}
else if ( hours > 1 && minutes < 1 ) {
SETRESULT(hours + ' hours');
}
else if ( hours < 1 && minutes == 1 ) {
SETRESULT('1 minute');
}
else if ( hours == 1 && minutes == 1 ) {
SETRESULT('1 hour 1 minute');
}
else if ( hours > 1 && minutes == 1 ) {
SETRESULT(hours + ' hours 1 minute');
}
else if ( hours < 1 && minutes > 1 ) {
SETRESULT(minutes + ' minutes');
}
else if ( hours == 1 && minutes > 1 ) {
SETRESULT('1 hour ' + minutes + ' minutes');
}
else if ( hours > 1 && minutes > 1 ) {
SETRESULT(hours + ' hours ' + minutes + ' minutes');
}
else {
SETRESULT('');
}

// returns "47 minutes"
```
