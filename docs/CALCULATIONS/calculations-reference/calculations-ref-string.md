---
title: STRING
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
Converts the given parameter to a string value. If the parameter is a number that contains more than 3 digits after a decimal place, then the output of STRING will be rounded up to the thousandths place (3 digits after the decimal place). If you need all numbers after the decimal place included in the string, use the [toString method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString).

# Parameters

`anything` Object (__required__) - Any value

# Returns

String

# Examples

```js
STRING(1, 2, 3)

// returns "1, 2, 3"
```

```js
STRING($choice_field)

// returns "Red, Green, Blue"
```

```js
STRING(1)

// returns "1"
```

```js
STRING(true)

// returns "true"
```

```js
STRING([1, 2, 3])

// returns "1, 2, 3"
```

```js
STRING(null)

// returns ""
```