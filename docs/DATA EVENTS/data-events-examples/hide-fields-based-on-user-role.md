---
title: Hide fields based on user role
excerpt: >-
  This example shows how to conditionally display fields depending on the user's
  role. Sometimes it's desirable to hide certain portions of the form for
  certain users because it's either irrelevant or sensitive information.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
For this to work, each field you want to make hidden should have the 'Hidden' checkbox checked in the app builder so that the field is hidden by default. It's desirable to have the logic be based on who _can_ see it, rather than who _cannot_ see it.

```js
ON('load-record', function(event) {
  var adminRoles = ['Owner', 'Manager', 'Custom Admin Role'];

  // if the current role is one of the designated admin roles...
  if (ISROLE(adminRoles)) {
    // make the fields visible
    SETHIDDEN('sensitive_field_1', false);
    SETHIDDEN('sensitive_field_2', false);
  }
});
```