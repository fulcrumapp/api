---
title: INVALID
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
Display a validation error message and prevent the record or repeatable item from being saved.

# Description

The INVALID function is designed for the sole purpose of doing custom validations when saving records. It's a special purpose function that's intended to only be used within the `validate-record` and `validate-repeatable` events. It's different from `ALERT` in a couple of ways. First, it instructs the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints. This allows custom validation logic to be displayed in a natural way to the end user as if it were a built-in validation.

# Parameters

`message` String (**required**) - The validation error message content for the alert

# Examples

```js
// Displays an alert and stops the record from being saved
INVALID('Depth must be less than 20.');
```

```js
// Use with the 'validate-record' event to stop a record from being saved
ON('validate-record', function (event) {
   if (NUM($depth) >= 20) {
     INVALID('Depth must be less than 20.');
   }
});
```

```js
// Use with the 'validate-repeatable' event to stop a repeatable from being saved
ON('validate-repeatable', 'repeatable_field_name', function (event) {
   if (!ISSELECTED($choice_field, 'Purple')) {
     INVALID('You gotta pick purple!');
   }
});
```
