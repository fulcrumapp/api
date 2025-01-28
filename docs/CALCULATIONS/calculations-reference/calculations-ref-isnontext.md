---
title: ISNONTEXT
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
Tests whether a value is non-textual.

# Parameters

`value` String (__required__) - The value to test as non-text.

# Returns

Boolean

# Examples

```js
ISNONTEXT(4)

// returns true
```

```js
ISNONTEXT("Some text")

// returns false
```