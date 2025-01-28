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

`haystack` Array,String (__required__) - The array of values or string to check

`needle` String (__required__) - The value to look for

`fromIndex` Number (__required__) - The starting index to use

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