---
title: CONTAINS
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
Determines whether an array or string contains a given value

# Parameters

`haystack` Array,String (**required**) - The array of values or string to check

`needle` String (**required**) - The value to look for

`fromIndex` Number (**required**) - The starting index to use

# Returns

Boolean - true if the value is found

# Examples

```js
CONTAINS("abcd", "a")

// returns true
```

```js
CONTAINS(['a', 'b', 'c', 'd'], 'b')

// returns true
```

```js
CONTAINS("abcd", "e")

// returns false
```
