---
title: SAVE
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
Save the current record and close the editor. This function can be used inside `save-record` or `save-repeatable` to save the record after `PREVENTDEFAULT()` was previously called. Use this in combination with `PREVENTDEFAULT()`, `MESSAGEBOX()` and `ALERT()` to display custom warning messages when the user saves a record.

# Description

`SAVE` is used to implement custom warning messages when saving records. For example, displaying a custom confirmation message to the user when a special condition is met within the record to confirm that the user intends to save. It can be used as an extra layer of exception handling to present custom messages or make custom HTTP requests within the save process.

**NOTE**: The `save-record`event does not fire in the app designer's record preview. You will need to test the `SAVE` and `PREVENTDEFAULT`functions in the data viewer's record editor or the Fulcrum mobile app's record editor. 

# Example Data Event

```js
ON('save-record', () => {
  if (CHOICEVALUE($damage) === 'Critical') {
    PREVENTDEFAULT();

    const messageParams = {
      title: 'Confirm',
      message: 'You have selected a critical safety violation. Are you sure?',
      buttons: ['Yes', 'No']
    };

    MESSAGEBOX(messageParams, (result) => {
      if (result.value === 'Yes') {
        SAVE();
      }
    });
  }
});
```
