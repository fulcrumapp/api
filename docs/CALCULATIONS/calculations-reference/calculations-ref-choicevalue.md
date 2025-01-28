---
title: CHOICEVALUE
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
Returns the selected value for a choice field or classification field

# Parameters

`field` Object (**required**) - The choice field or classification field

# Returns

String - the selected value

* Note: If using a classification field as a parameter, it will only return the first entry of the classification field.  If you wish to get all the entries, use CHOICEVALUES() instead

# Examples

```js
CHOICEVALUE($choice_field)

// returns "Red"
```
