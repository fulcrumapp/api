---
title: Hours Between Two Time Fields
excerpt: >-
  This will return the difference between two time fields in hours.  In this
  example, $time_1 field is the starting time and $time_2 field is the ending
  time.
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
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();
var hour1 = parseInt($time_1.slice(0, 2));
var min1 = parseInt($time_1.slice(3));
var hour2 = parseInt($time_2.slice(0, 2));
var min2 = parseInt($time_2.slice(3));

var date1 = new Date(year, month, date, hour1, min1);
var date2 = new Date(year, month, date, hour2, min2);

var timeDiff = Math.abs(date2.getTime() - date1.getTime()) / (1000*3600);
SETRESULT(timeDiff.toFixed(2));
```