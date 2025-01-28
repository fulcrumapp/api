---
title: Return the Most Frequent Repeatable Value
excerpt: >-
  This example uses the
  [REPEATABLEVALUES()](https://docs.fulcrumapp.com/docs/calculations-ref-repeatablevalues)
  expression to return the most frequent value captured in a field in a
  repeatable section.
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
function mostFrequentValue(array) {
  if (array === null) {
    return null;
  }
  var frequencies = {};
  var mostFrequentCount = 0;
  var mostFrequentValue = null;
  array.forEach(function(value) {
    if (frequencies[value] === null) {
      frequencies[value] = 1;
    } else {
      frequencies[value] += 1;
    }
    if (frequencies[value] > mostFrequentCount) {
      mostFrequentCount = frequencies[value];
      mostFrequentValue = value;
    }
  });
  return mostFrequentValue;
}
var values = REPEATABLEVALUES($repeatable_section, 'field_in_repeatable');
var value = mostFrequentValue(values);
SETRESULT(value);
```
