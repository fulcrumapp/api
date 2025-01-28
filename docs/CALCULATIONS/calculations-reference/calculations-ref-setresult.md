---
title: SETRESULT
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
Sets the current result value for the current expression. This is useful in multiline expressions to set the result value.

# Parameters

`value` or `field` \* (**required**) - the value or the value of the field to set as the result of the expression

# Returns

The current result value after the value has been set

# Examples

```js
SETRESULT(1)

// returns 1
```

```js
SETRESULT($site_id)

// returns the value of site_id field
```
