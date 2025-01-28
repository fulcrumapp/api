---
title: FLATTEN
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
Flatten nested arrays into a flat array

# Parameters

`value` Array (__required__) - Array to flatten

# Returns

Array

# Examples

```js
FLATTEN([[1, 2, 3]])

// returns [1,2,3]
```


```js
FLATTEN([[1, 2, 3], [4, 5, 6]])

// returns [1,2,3,4,5,6]
```