---
title: Combine Field Values
excerpt: >-
  Most fields in Fulcrum will create a string from the data entered into the
  field. In those cases the
  [CONCATENATE()](https://docs.fulcrumapp.com/docs/calculations-ref-concatenate)
  or the [CONCAT()](https://docs.fulcrumapp.com/docs/calculations-ref-concat)
  expression can be used to combine field values.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This can be useful when you want to customize or use more than five fields for the title.

```js
var concatenated = CONCAT($date_field, ", ", $text_field, "-", $numeric_field, ": ", 
                          "Version ", CHOICEVALUE($choice_field), "check");

SETRESULT(concatenated);

// Example Outcome: 2021/01/01 Damage-1: Version I-495 check
```