---
title: FIND
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
Returns the position at which a string is first found within text, case-sensitive.

# Parameters

`search_for` String (**required**) - String to search for within `text_to_search`.

`text_to_search` String (**required**) - Text to search for the first instance of `search_for`.

`starting_at` Number (**required**) - argument Position index to begin the search.

# Returns

Number

# Examples

```js
FIND("needle", "the needle is in the haystack")

// returns 5
```
