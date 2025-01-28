---
title: Calculate Standard Deviation
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
This code will calculate the standard deviation from values entered into a numeric field in a repeatable section. Much of this code was taken from [derickbailey.com](https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/) and adapted for use in Fulcrum's calculation fields.

```js
var values = REPEATABLEVALUES($repeatable_section, 'repeatable_field');

function standardDeviation(values){
  var avg = average(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
if($repeatable_section) {
  SETRESULT(standardDeviation(values));
}
```

Copy and paste the entire code block above into the expression section of your calculation field, making sure to replace `$repeatable_section` with the data name of your repeatable section and replace `repeatable_field` with the data name of your repeatable field.
