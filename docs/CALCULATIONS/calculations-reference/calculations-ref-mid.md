---
title: MID
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
Returns a segment of a string value.

# Parameters

`value` String (__required__) - The string to extract a segment from.

`start_position` Number (__required__) - Index from the left of the string from which to begin extracting. First character is index `1`.

`number_of_characters` Number (__required__) - Number of characters to extract.

# Returns

String

# Examples

```js
MID("Fulcrum for iOS", 13, 3)

// returns "iOS"
```