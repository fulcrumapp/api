---
title: SHUFFLE
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
Randomizes an array of items

# Parameters

`value` Array (**required**) - an array of items to randomize

# Returns

Array

# Examples

```js
var items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
INSPECT(SHUFFLE(items)) != INSPECT(items[0])

// returns true
```
