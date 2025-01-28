---
title: CLEAN
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
Returns the text with the non-printable ASCII characters removed.

# Parameters

`text` String (__required__) - The text whose non-printable characters are to be removed.

# Returns

String

# Examples

```js
CLEAN('Test' + CHAR(31))

// returns "Test"
```