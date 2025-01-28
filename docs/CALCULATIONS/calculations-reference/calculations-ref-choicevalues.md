---
title: CHOICEVALUES
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Returns the selected values for a choice field or classification field

# Parameters

`field` Object (**required**) - The choice field or classification field

# Returns

Array - the selected value(s). Fulcrum displays this as a comma separated list that looks like a string but is still an array object.

# Examples

```js
CHOICEVALUES($choice_field)

// returns ["Red","Green","Blue"]
```
