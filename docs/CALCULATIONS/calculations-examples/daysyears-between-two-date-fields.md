---
title: Days/Years Between Two Date Fields
excerpt: >-
  This will return the difference between two date fields in either years or
  days depending on which SETRESULT() function is used.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Resulting format looks like: `4`.

```js
var date1 = new Date($date_field1);
var date2 = new Date($date_field2);
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

SETRESULT(diffDays / 365); //for years
//OR
// SETRESULT(diffDays); //for days
```