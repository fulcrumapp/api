---
title: RIGHT
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
Returns a substring from the end of a given string.

# Parameters

`value` String (__required__) - The string value from which the right portion will be returned.

`number_of_characters` Number (optional)  [default = 1] - The number of characters to return from the right side of the string.

# Returns

String

# Examples

```js
RIGHT("ABCDEFG", 4)

// returns "DEFG"
```

```js
RIGHT("000001")

// returns "1"
```