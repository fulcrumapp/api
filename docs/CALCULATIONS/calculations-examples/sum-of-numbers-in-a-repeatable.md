---
title: Sum of numbers in a repeatable
excerpt: >-
  This example grabs numeric values from a choicefield (with options N/A, 0, 1,
  2, 3) located in a repeatable. It converts the string values to numbers and
  then calculates the sum.
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
var array = REPEATABLEVALUES($name_of_repeatable, 'data_name_of_choicefield_score');

var totalScore = 0;

for (var i = 0; i < array.length; i++) {
  var value = CHOICEVALUE(array[i]);

  var score = 0;

  if (value === 'N/A'){
    score = 0;
  } else {
    score = Number(value);
  }

  totalScore += score;
}

SETRESULT(totalScore);
```
