---
title: Degrees Decimal Minutes
excerpt: >-
  Use these in calculation fields to return latitude/longitude in degrees
  decimal minutes format.
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
/***
Return degrees decimal minutes from LATITUDE() & LONGITUDE().
Please consider FLOOR versus CEILING for your respective hemisphere/side-of-dateline.
Below are 2 expression blocks, intended for 2 separate Calculation fields (Display Format: Text) within a Fulcrum app.
***/

if (LATITUDE()) {
  var lat = FLOOR(LATITUDE(), 1);
  var latdm = ROUND(ABS((LATITUDE() - lat) * 60), 6);
  SETRESULT(lat + " " + latdm);
} else {
  SETRESULT(null);
}

if (LONGITUDE()) {
  var lon = CEILING(LONGITUDE(), 1);
  var londm = ROUND(ABS((LONGITUDE() - lon) * 60), 6);
  SETRESULT(lon + " " + londm);
} else {
  SETRESULT(null);
}
```