---
title: RECORDID
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
Returns the ID of the current record. This function will always return the top level record ID even when used inside a repeatable. To get the repeatable item ID, use the `REPEATABLEID()` function.

# Parameters

No parameters

# Returns

String - The ID of the current record

# Examples

```js
RECORDID()

// returns "96eb35f5-13d8-4666-b188-8108019d0984"
```