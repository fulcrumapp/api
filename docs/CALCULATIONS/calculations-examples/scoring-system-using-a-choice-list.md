---
title: Scoring System using a Choice List
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
Suppose you have a choice list with numeric values as shown below:

<Image title="12bfed6-choice_list.png" alt={1502} src="https://files.readme.io/53f4b91-12bfed6-choice_list.png">
  choice list numbers
</Image>

You can use a set of choice fields using this pre-defined choice list and a calculation field to calculate the scores.  The example below is adding up 5 choice field values and assumes that they are all required fields.

```js
var scores = [];
scores.push(CHOICEVALUE($choice_field_1), CHOICEVALUE($choice_field_2), CHOICEVALUE($choice_field_3), CHOICEVALUE($choice_field_4), CHOICEVALUE($choice_field_5));

function getSum(a, b) {
  return parseInt(a) + parseInt(b);
}

var total = scores.reduce(getSum, 0);

SETRESULT(total);
```
