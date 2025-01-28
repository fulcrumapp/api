---
title: REPLACE
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
Replaces a piece of a text string with a different string.

# Parameters

`text` String (__required__) - A piece of text to be searched.

`start_position` Number (__required__) - Position within the string to begin the search.

`num_characters` Number (__required__) - Number of characters in original string to be replaced.

`replacement` String (__required__) - String to replace `num_characters` with.

# Returns

String

# Examples

```js
// replaces 'survey' with 'inspection'
REPLACE("Data collection survey", 17, 6, "inspection")

// returns "Data collection inspection"
```