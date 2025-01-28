---
title: Split Value Captured in a Field
excerpt: >-
  This can be used to split a value captured in a field and pull out only the
  part of the value that you wish to use or display. The different components of
  the values need to be separated by a common character. In the example below
  the common character is a dot `.`.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The most common use case is to split a choice value captured in a choice field that includes data that you want to use or display somewhere else the record. For example, if you have the cost associated with the choice and wish to use this value in a mathematical expression. So if you had a value of `wrench.15`, the expression below would return `15`.

```js
if (CHOICEVALUE($choice_field)!= null) {
  var selection = CHOICEVALUE($choice_field)
  // split the selection string into an array around the '.'
  var splitSelection = selection.split(".");

  //set the result to the second value in the splitSelection array, use [0] for the first value
  SETRESULT(splitSelection[1]);
}
```
