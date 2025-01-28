---
title: RPAD
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
Pads a string on the right side

# Parameters

`value` String (__required__) - The string to pad

`count` Number (__required__) - The number of characters to pad

`character` String (optional)  [default = ' '] - The character to use for padding

# Returns

String

# Examples

```js
RPAD('2', 4, '0')

// returns "2000"
```

```js
RPAD('2', 6, '0')

// returns "200000"
```