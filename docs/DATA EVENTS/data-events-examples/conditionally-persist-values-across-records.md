---
title: Conditionally persist values across records
excerpt: >-
  This example demonstrates how to persist values across new records depending
  on a condition being met. Using this, you can achieve similar behavior to the
  "Default to Previous Value" field setting except you can control the logic
  used to determine when it's saved for the next record. In this example, we
  have a Yes/No field with a data name of `save_value` and a Text Field with a
  data name of `text_field`. The Yes/No field controls whether or not to save
  the value of Text Field with a data name of `text_field` as the current
  default value for usage on the next record.
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
var storage = STORAGE();

// when saving the record, save the value to storage to use next time
ON('save-record', function(event) {
  var shouldPersistValue = false;

  // modify the logic here to save the current values to storage
  if ($save_value === 'yes') {
    shouldPersistValue = true;
  }

  // either save or clear the value, 'last_text_value' is an arbitrary key used to store the variable
  if (shouldPersistValue) {
    storage.setItem('last_text_value', $text_field);
  } else {
    storage.removeItem('last_text_value');
  }
});

ON('new-record', function(event) {
  // when creating a new record, set the value of the text field to the last value used
  SETVALUE('text_field', storage.getItem('last_text_value'));
});
```
