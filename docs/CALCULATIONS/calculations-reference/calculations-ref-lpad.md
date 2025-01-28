---
title: LPAD
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
Pads a string on the left side

# Parameters

`value` String (**required**) - The string to pad

`count` Number (**required**) - The number of characters to pad

`character` String (optional)  \[default = ' '] - The character to use for padding

# Returns

String

# Examples

```js
LPAD('2', 4, '0')

// returns "0002"
```

```js
LPAD('2', 6, '0')

// returns "000002"
```
