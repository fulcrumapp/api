---
title: Array of fields with certain settings
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
This example can be used to create an array of all the fields that have their field options enabled for required, hidden, or read-only when a record is loaded.

This array can then be used to make these fields not be in this state or event back to this state under defined conditions within other data events.

The example below is for fields that are set to be required. If you wish to obtain an array of the fields that are set to be hidden `element.required` can be changed to `element.hidden`. If you wish to obtain an array of the fields that are set to be read-only `element.required` can be changed to `element.disabled`.

```js
var requiredFields = [];

ON('load-record', function(event){
  var elements = this.elements;
  elements.forEach(function(element){
    if(element.required == true){
      requiredFields.push(element.data_name);
    }
  });
});
```