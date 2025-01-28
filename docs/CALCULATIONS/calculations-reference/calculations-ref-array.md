---
title: ARRAY
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
Returns an array from its arguments, combining and flattening multiple arrays into a single array. It always returns an array regardless of the types and formats of the arguments.

# Parameters

`var_args_expressions` * (__required__) - Arrays or values to create an array from

# Returns

Array

# Examples

```js
ARRAY(1, 2, 3)

// returns [1,2,3]
```


```js
ARRAY([1, 2, 3])

// returns [1,2,3]
```


```js
ARRAY([1, 2, 3, [4, 5], [6, [7, 8]]])

// returns [1,2,3,4,5,6,7,8]
```


```js
ARRAY()

// returns []
```


```js
ARRAY([])

// returns []
```


```js
ARRAY(ARRAY(ARRAY([1, 2, ARRAY(3, 4)])))

// returns [1,2,3,4]
```