---
title: SUBSTITUTE
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
Replaces existing text with new text in a string.

# Parameters

`text` String (__required__) - A text value to look in

`search_for` String (__required__) - A text value to replace

`replace_with` String (__required__) - A text value to replace it with

`occurrence` String (__required__) - The instance of the search text to replace (e.g. 4 will only replace the 4th instance)

# Returns

String - the new text string

# Examples

```js
// replaces all occurrences
SUBSTITUTE('The data is stored in a database', 'data', 'record data')

// returns "The record data is stored in a record database"
```

```js
// replaces the first occurrence
SUBSTITUTE('The data is stored in a database', 'data', 'record data', 1)

// returns "The record data is stored in a database"
```

```js
// replaces the 2nd occurrence
SUBSTITUTE('The data is stored in a database', 'data', 'record data', 2)

// returns "The data is stored in a record database"
```

```js
SUBSTITUTE('The data is stored in a database', 'a', 'A')

// returns "The dAtA is stored in A dAtAbAse"
```