---
title: FORMAT
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
Formats a string

# Parameters

`value` String (**required**) - string format. Use %s for strings and %d for numbers.

`var_args_values` \* (**required**) - Value(s) to substitute into the format string

# Returns

String - formatted string

# Examples

```js
FORMAT('The pole height is %d meters and has %d issues detected.', 20, 3)

// returns "The pole height is 20 meters and has 3 issues detected."
```

```js
FORMAT('%s/%s/%s %s:%s:%s', 11, 11, 2015, 12, 30, 30)

// returns "11/11/2015 12:30:30"
```
