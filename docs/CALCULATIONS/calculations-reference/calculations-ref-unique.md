---
title: UNIQUE
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Returns the unique values within an array

# Parameters

`values` Array (**required**) - The values to unique

`callback` function (optional) - A transform function to use when passing objects

# Returns

Array or `undefined` if passed an empty array, null or undefined 

# Examples

```js
UNIQUE([1, 2, 3, 3, 1])

// returns [1,2,3]
```

```js
UNIQUE(['blue', 'red', 'red', 'green', 'blue'])

// returns ["blue","red","green"]
```
