---
title: Compare Values
excerpt: >-
  Use this in a calculation field to compare multiple values and return a
  specific value based on the values entered.
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
// Define the variables that you wish to use
var firstField = $field_one;
var secondField = $field_two;

// Create a function that looks at two or more variables and compares their results.
// If choice 1 is equal to 'this value' and choice 2 is equal to 'this value' then return 'this value'
function compare (choice1, choice2) {
  if (choice1 === 'A value' && choice2 === 'A value') {
    return 'A value';
  } else if (choice1 === 'A value' && choice2 === 'B value') {
    return 'B value';
  } else if (choice1 === 'B value' && choice2 === 'B value') {
    return 'C value';
  } else if (choice1 === 'B value' && choice2 === 'C value') {
    return 'D value';
  }
}

//Runs the compare function using the variables defined above and creates a 'result' variable with the value returned from the compare function.
var result = compare(firstField, secondField);

SETRESULT(result);
```