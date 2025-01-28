---
title: FIELD
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
Returns definition object for a specified field. If the field does not exist this function will return `undefined`

# Parameters

`dataName` String (**required**) - The data name of the field 

# Returns

Object

# Examples

```js
FIELD('child_item_cost').label

// returns "Child Item Cost"
```

```js
FIELD('child_item_cost').parent.label

// returns "Child Items"
```
