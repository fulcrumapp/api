---
title: FIELDS
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
Returns the child fields of a section or repeatable

# Parameters

`dataName` String (**required**) - The data name of the section or repeatable

`options` Object (**required**) - `repeatables` and `sections` boolean values to control whether to drill into further nested sections and repeatables when returning the child fields. For example, passing `{sections: false}` will not return fields that are in nested sections.

# Returns

Array

# Examples

```js
FIELDS('child_items').length

// returns 1
```
