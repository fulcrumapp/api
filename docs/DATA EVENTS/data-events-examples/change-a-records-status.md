---
title: Change a record's status
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
This example listens for changes to the `inspection_date` field and updates the record status to 'inspected' if a date value was entered. If the date was cleared (no value), the status reverts to the default state, 'created'.

```js
function changeStatus(event) {
  if (event.value) {
    // There is a value, so set the status
    SETSTATUS('inspected');
  } else {
    // There is no value. It could have been cleared from the field.
    // Revert status to 'created'.
    SETSTATUS('created');
  }
}

ON('change', 'inspection_date', changeStatus);
```

Another common use case is to just change the record's status any time the record is saved on the mobile device. Here we'll listen to the `'save-record'` event and simply set it to 'inspected'.

```js
function changeStatus(event) {
  SETSTATUS('inspected');
}

ON('save-record', changeStatus);
```

This example sets the status of a record based upon a choice list. In this example `damage_type` is a single choice field, which will get its values from the Status Field. On a change to  `damage_type` the status is also changed. The `damage_type` field is required and the Status Field may optionally be hidden, or set to read-only to prevent users from manually overriding it.

This workflow allows you to place the status choice anywhere in your form, and supports visibility and requirement rules.

```js
function setChoices(event) {
  // Get the array of status choice objects
  var statuses = this.form.status_field.choices;
  // Get choice labels and values
  var choices = [];
  for (var i = 0; i < statuses.length; i++) {
    choices.push([statuses[i].label, statuses[i].value]);
  }
  SETCHOICES('damage_type', choices);
}

function changeStatus(event) {
  SETSTATUS(CHOICEVALUE($damage_type));
}

ON('load-record', setChoices);
ON('change', 'damage_type', changeStatus);
```