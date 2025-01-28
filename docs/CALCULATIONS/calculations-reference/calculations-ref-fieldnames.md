---
title: FIELDNAMES
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
Returns the child field names of a section or repeatable

# Parameters

`dataName` String (**required**) - The data name of the section or repeatable

`options` Object (**required**) - `repeatables` and `sections` boolean values to control whether to drill into further nested sections and repeatables when returning the child fields. For example, passing `{sections: false}` will not return fields that are in nested sections. This function is identical to `FIELDS` except it returns only the data name strings instead of the actual field objects.

# Returns

Array

# Examples

```js
FIELDNAMES('child_items')

// returns ["child_item_cost"]
```
