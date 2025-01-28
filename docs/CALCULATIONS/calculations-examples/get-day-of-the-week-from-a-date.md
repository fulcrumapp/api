---
title: Get Day of the Week From a Date
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
```js
// define an array of the days of the week to use as a lookup structure
var daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// This converts a date field in the record to a JavaScript date object
var d = DATEVALUE($the_date_field);

// If you wanted to use today's date or any other specific date ...
// var d = new Date();
// var d = new Date('4/15/1984');

SETRESULT(daysOfWeek[d.getDay()]);
```