---
title: Prevent changes after signing
excerpt: >-
  This example shows how to set all of your form fields to read-only once a
  signature has been added to the record.
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
ON('edit-record', function (event) {
  if ($signature) {
    DATANAMES().forEach(function(dataName) {
      SETREADONLY(dataName, true);
    });
  }
});
```
