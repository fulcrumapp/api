---
title: COUNT
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
Returns a count of the number of numeric values in a dataset.

# Parameters

`values` Array (**required**) - an array of numbers

# Returns

Number - the count of numeric values in the array

# Examples

```js
COUNT([11, 22, 33, 44, 55])

// returns 5
```

```js
// since it only counts numeric arguments
COUNT(['a', 'b', 'c', 'd', 'e'])

// returns 0
```
