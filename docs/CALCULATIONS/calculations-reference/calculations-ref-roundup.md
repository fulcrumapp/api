---
title: ROUNDUP
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
Rounds a number up to a desired number of decimal places.

# Parameters

`value` Number (__required__) - The value to round up.

`places` Number (__required__) - The number of places to which to round up.

# Returns

Number

# Examples

```js
ROUNDUP(156.826, 2)

// returns 156.83
```

```js
ROUNDUP(156.826, 0)

// returns 157
```