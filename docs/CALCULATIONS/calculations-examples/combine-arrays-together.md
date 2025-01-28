---
title: Combine Arrays Together
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
What this expression does is combine two arrays together into a single string that is displayed in the calculation field.

Field types like choice fields and classification sets create arrays from the values selected. In situations where you wish to combine two arrays together use the expression below.

```js
var combined = ARRAY(CHOICEVALUES($first_choice_field),
                     CHOICEVALUES($another_choice_field));

SETRESULT(combined.join(', '));
```
