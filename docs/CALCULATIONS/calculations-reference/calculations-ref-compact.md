---
title: COMPACT
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
Removes empty items from an array

# Parameters

`value` Array (__required__) - an array of items

# Returns

Array

# Examples

```js
COMPACT([null, 1, undefined, null, 2, 3])

// returns [1,2,3]
```