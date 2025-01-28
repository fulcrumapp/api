---
title: Convert decimal feet to x' y"
excerpt: >-
  This expression will convert the feet measurement in decimal to feet' inches"
  format.  In order to achieve this, you will need a numeric field `feet in
  decimal` and a calculation field for feet' inches".  The following code can be
  copied and pasted into the calculation field's expression builder.
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
let feet = Math.floor($feet_in_decimal);
let inches = Math.round(($feet_in_decimal-feet)*12);

if($feet_in_decimal) {
  SETRESULT(feet+"'"+inches+'"');
}
```
