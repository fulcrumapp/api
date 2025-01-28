---
title: LEFT
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
Returns a substring from the beginning of a given string.

# Parameters

`value` String (__required__) - The string value from which the left portion will be returned.

`number_of_characters` Number (optional)  [default = 1] - The number of characters to return from the left side of the string.

# Returns

String

# Examples

```js
LEFT("Fulcrum", 3)

// returns "Ful"
```

```js
LEFT("Fulcrum")

// returns "F"
```