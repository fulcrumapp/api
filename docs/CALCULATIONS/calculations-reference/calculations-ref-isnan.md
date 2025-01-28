---
title: ISNAN
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
Test whether a value is not a number

# Parameters

`value` Number (**required**) - a value

# Returns

Boolean

# Examples

```js
ISNAN(NaN)

// returns true
```

```js
ISNAN('aaa' / 7)

// returns true
```

```js
ISNAN(7)

// returns false
```
