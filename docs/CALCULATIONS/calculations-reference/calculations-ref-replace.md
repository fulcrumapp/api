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

`text` String (**required**) - A piece of text to be searched.

`start_position` Number (**required**) - Position within the string to begin the search.

`num_characters` Number (**required**) - Number of characters in original string to be replaced.

`replacement` String (**required**) - String to replace `num_characters` with.

# Returns

String

# Examples

```js
// replaces 'survey' with 'inspection'
REPLACE("Data collection survey", 17, 6, "inspection")

// returns "Data collection inspection"
```
