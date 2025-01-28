---
title: Return Sum of Specific Type
excerpt: >-
  Designed to be used in conjunction with a [repeatable
  section](http://help.fulcrumapp.com/field-types/what-are-repeatable-sections).
  This example can be used to return the sum of values for a specific variable
  that is captured in a choice field inside a repeatable section.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
In the example code below the `cost_field` captures the cost while the `item_type_field` is used to capture the type of item that the cost is associated with in a child record. The code then loops through comparing the two arrays and returns a sum of all values in the `cost_field` where the `item_type_field` is equal to `Item A`.

```js
  var cost = REPEATABLEVALUES($repeatable_section, 'cost_field');
  var items = REPEATABLEVALUES($repeatable_section, 'item_type_field').map(CHOICEVALUE);

  var total = 0;

  for (var i = 0; i < cost.length; ++i) {
    if (items[i] === 'Item A') {
      total += NUM(cost[i]);
    }
  }

  SETRESULT(total)
}
```