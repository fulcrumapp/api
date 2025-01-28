---
title: ISSELECTED
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
Checks whether a given choice is selected for a choice field or classification field

# Parameters

`value` * (__required__) - The choice field, classification field to check for a value being selected

`choice` String (__required__) - The choice value to check for

# Returns

Boolean

# Examples

```js
// $choice_field has Red, Green, and Blue selected
ISSELECTED($choice_field, 'Red')

// returns true
```

```js
// $choice_field has Red, Green, and Blue selected
ISSELECTED($choice_field, 'Orange')

// returns false
```