---
title: COUNTBLANK
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
Returns the number of blank values in a dataset.

# Parameters

`value` Array (**required**) - an array of items

# Returns

Number - the number of blank items in the array

# Examples

```js
// since null and '' are blank values
COUNTBLANK([null, null, '', 1])

// returns 3
```
