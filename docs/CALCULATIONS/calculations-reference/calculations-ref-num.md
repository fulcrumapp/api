---
title: NUM
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
Converts any value to a number

# Parameters

`value` * (__required__) - a value to convert to a number

# Returns

Number

# Examples

```js
NUM('12')

// returns 12
```

```js
NUM(12)

// returns 12
```

```js
NUM('a')

// returns NaN
```