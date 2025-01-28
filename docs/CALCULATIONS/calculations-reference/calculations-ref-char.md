---
title: CHAR
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
Convert a number into a character according to the current Unicode table.

# Parameters

`number` Number (__required__) - The number of the character to look up from the current Unicode table in decimal format.

# Returns

String

# Examples

```js
CHAR(65)

// returns "A"
```


```js
CHAR(1337)

// returns "Թ"
```