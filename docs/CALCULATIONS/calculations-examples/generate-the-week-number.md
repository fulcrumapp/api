---
title: Generate the Week Number
excerpt: >-
  Use this in a calculation field to return the week number from the current
  date or from a date field.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
function weekNum( d ) {
    // Create a copy of this date object
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // ISO week date weeks start on monday
    // so correct the day number
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return week number
    return weekNo;
}

// Use to pull current date
// var now = new Date();
// weekNum(now);

var date = DATEVALUE($date));
SETRESULT(weekNum(date));
```