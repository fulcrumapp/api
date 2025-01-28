---
title: REPEATABLESUM
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
Return the sum of a specific numeric field across multiple repeatable items

# Parameters

`repeatableVariable` Object (__required__) - The repeatable field variable

`dataName` String (__required__) - The data name of the field to extract from each repeatable item

# Returns

Number - The sum of the `dataName` field within each repeatable item

# Examples

```js
REPEATABLESUM($repeatable_field, 'cost')

// returns 6
```