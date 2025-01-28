---
title: GROUP
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
Returns grouped values within an array

# Parameters

`values` Array (**required**) - The values to sort

`callback` function (optional) - A transform function to use when sorting objects

# Returns

Array

# Examples

```js
GROUP(['red', 'green', 'green', 'blue'])

// returns {"red":["red"],"green":["green","green"],"blue":["blue"]}
```

```js
GROUP([1, 1, 1, 2, 3])

// returns {"1":[1,1,1],"2":[2],"3":[3]}
```
