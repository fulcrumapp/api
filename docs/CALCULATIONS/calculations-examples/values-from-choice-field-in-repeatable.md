---
title: Values from Choice Field in Repeatable
excerpt: >-
  Due to the nature of choice fields, the
  [REPEATABLEVALUES()](https://docs.fulcrumapp.com/docs/calculations-ref-repeatablevalues/)
  expression cannot be used on its own when pulling values from a choice field
  inside a repeatable section. Instead use the example below.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
 if ($repeatable_section == null){
   SETRESULT(null);
 } else {
   REPEATABLEVALUES($repeatable_section, 'choice_field_data_name').map(CHOICEVALUE);
 }
```