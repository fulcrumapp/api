---
title: EXISTS
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
Tests whether a value exists

# Parameters

`var_args_values` Object (**required**) - The value(s) to check for existence

# Returns

Boolean

# Examples

```js
EXISTS(1)

// returns true
```

```js
EXISTS(null)

// returns false
```

```js
EXISTS([])

// returns false
```
