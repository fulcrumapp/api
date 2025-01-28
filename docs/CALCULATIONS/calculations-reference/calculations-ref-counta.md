---
title: COUNTA
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
Returns a count of values in a dataset.

# Parameters

`value` Array (**required**) - an array of values

# Returns

Number - the count of items in the array

# Examples

```js
COUNTA([11, 22, 33, 44, 55])

// returns 5
```

```js
// since it counts all arguments
COUNTA(['a', 'b', 'c', 'd', 'e'])

// returns 5
```
