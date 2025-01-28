---
title: Auto-populate Last Value
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
This example can be utilized to pull the value in a field in the last child record and then automatically populate that value into another field in a new child record.

```js
ON('new-repeatable', 'repeatable_section', function(event){
  var last = LAST(REPEATABLEVALUES($repeatable_section, 'field_2'));
  SETVALUE('field_1', last);
});
```
