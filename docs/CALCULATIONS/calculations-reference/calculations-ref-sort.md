---
title: SORT
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
Returns the sorted values within an array

# Parameters

`values` Array (**required**) - The values to sort

`callback` function (optional) - A transform function to use when sorting objects

# Returns

Array

# Examples

```js
SORT([1, 2, 3, 3, 1])

// returns [1,1,2,3,3]
```

```js
SORT(['a', 'c', 'b', 'a', 'b'])

// returns ["a","a","b","b","c"]
```
