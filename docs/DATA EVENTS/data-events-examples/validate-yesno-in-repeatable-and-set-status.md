---
title: Validate yes/no in repeatable and set status
excerpt: >-
  This example will loop through yes/no fields throughout the form. It will
  total up the number of yes responses in your form which can be used in another
  calculation. Another option is to use it to set the status. If no is the
  choice made on any yes/no field within the repeatable section then the status
  of the record is set to `no`, otherwise the status is set to `yes`.
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
var yesNoResponse = [];

function findYesNoQuestions(repeatableField, array, parent){
  var fields = FIELDNAMES(repeatableField);
  for(var i = 0; i < fields.length; i++){
    if(FIELDTYPE(fields[i]) == 'YesNoField'){
      yesNoResponse.push(REPEATABLEVALUES(VALUE(parent), FLATTEN(ARRAY(FLATTEN(array), fields[i]))));
      if(i == fields.length - 1){
        array.pop();
      }
    }
    if(FIELDTYPE(fields[i]) == 'Repeatable'){
      array.push(fields[i]);
      findYesNoQuestions(fields[i], array, parent);
    }
  }
}

ON('validate-record', function(event){
  var count = 0;
  yesNoResponse = [];
  DATANAMES().forEach( function(element){
    if(FIELDTYPE(element) == 'Repeatable'){
      if(VALUE(element)){
        var fieldArray = [];
        findYesNoQuestions(element, fieldArray, element);
      }
    }
    else if(FIELDTYPE(element) == 'YesNoField'){
      if(VALUE(element)){
        yesNoResponse.push(VALUE(element));
      }
    }
  });

  //Gets count of yes responses to be used in a calculation
  FLATTEN(yesNoResponse).forEach(function(element){
    if(element == 'yes'){
      count++;
    }
  });
  SETVALUE('num', count);

  //Sets status of record if a no answer is found.
  /*
  if(CONTAINS(yesNoResponse, 'no'))
    SETSTATUS('no');
  else
    SETSTATUS('yes');

*/
});
```
