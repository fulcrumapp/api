---
title: Sum Nullable Fields
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
Sometimes you need to sum up fields that don't always have values. If you want the blank value to be treated as zero, this can be done using the following pattern:

```js
SETRESULT(($number_1 || 0) + ($number_2 || 0) + ($number_3 || 0));

// OR
// SETRESULT(SUM($number_1 || 0, $number_2 || 0, $number_3 || 0));
```