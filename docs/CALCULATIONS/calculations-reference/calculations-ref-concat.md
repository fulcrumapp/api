---
title: CONCAT
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
Returns the concatenation of multiple values. Alias for [`CONCATENATE()`](https://fulcrum.readme.io/docs/calculations-ref-concatenate)

# Description

**NOTE:** This can only be used on fields that store the values as a string. Fields like choice fields and classification sets store the values in an array.

# Parameters

`var_args_values` String (**required**) - Strings to append in sequence.

# Returns

String

# Examples

```js
CONCAT("This ", "is ", "a ", "sentence.")

// returns "This is a sentence."
```

```js
CONCAT(42, 31, 1)

// returns "42311"
```

```js
CONCAT("Age ", "is ", 42)

// returns "Age is 42"
```
