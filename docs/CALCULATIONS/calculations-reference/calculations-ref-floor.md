---
title: FLOOR
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
Rounds a number down to the nearest integer multiple of specified significance.

# Parameters

`value` Number (__required__) - Number to round down.

`significance` Number (__required__) - The number to whose multiples `value` will be rounded.

# Returns

Number

# Examples

```js
FLOOR(126.25, 1)

// returns 126
```


```js
FLOOR(126.25, 10)

// returns 120
```