---
title: NUMS
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
Converts multiple parameters to an array of numbers

# Parameters

`var_args_values` \* (**required**) - the values to convert to numbers

# Returns

Number

# Examples

```js
NUMS('1' ,'2', '3')

// returns [1,2,3]
```

```js
NUMS('1' ,'2', 'a')

// returns [1,2,null]
```
