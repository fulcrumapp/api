---
title: Reference Record Created At Time
excerpt: >-
  The record's `this` object contains a handful of information including record
  created/updated time, location, and duration.  The expression below will
  generate a time stamp of record creation date and time.
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
var unix = new Date(this.featureCreatedAt * 1000);
var year = unix.getFullYear();
var month = unix.getMonth()+1;
var date = unix.getDate();
var hour = unix.getHours();
var min = unix.getMinutes();
var sec = unix.getSeconds();
var created_time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;

SETRESULT(created_time);
```
