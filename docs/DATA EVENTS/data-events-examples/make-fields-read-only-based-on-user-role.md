---
title: Make fields read-only based on user role
excerpt: >-
  This example shows how to conditionally disable fields depending on the user's
  role. Sometimes it's desirable to disable portions of the form for certain
  users.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
For this to work, each field you want to make disabled should have the 'Read Only' checkbox checked in the app builder so that the field is disabled by default. If you leave the fields enabled in the builder you will need to negate the logic in the example.

```js
ON('load-record', function(event) {
  var adminRoles = ['Owner', 'Manager', 'Custom Admin Role'];

  // enable the fields if the current role is one of the designated admin roles...
  if (ISROLE(adminRoles)) {
    // make some fields editable by turning off the read-only flag
    SETREADONLY('field_1', false);
    SETREADONLY('field_2', false);
    SETREADONLY('@status', false); // @status is the special data name for the status field
  }
});
```