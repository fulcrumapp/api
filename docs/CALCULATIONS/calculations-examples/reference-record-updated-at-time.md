---
title: Reference Record Updated At Time
excerpt: >-
  The record's `this` object contains a handful of information including record
  created/updated time, location, and duration.  The expression below will
  generate a time stamp of record update date and time.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
```js
var unix = new Date(this.featureUpdatedAt * 1000);
var year = unix.getFullYear();
var month = unix.getMonth()+1;
var date = unix.getDate();
var hour = unix.getHours();
var min = unix.getMinutes();
var sec = unix.getSeconds();
var updated_time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;

SETRESULT(updated_time);
```
