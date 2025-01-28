---
title: Disable requirements by user or role
excerpt: >-
  The examples below show how to disable requirement validation for all of your
  form fields, based on a list of user emails or Fulcrum roles.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
**Email:**

```js
ON('load-record', function(event) {
  var emails = ['john.doe@gmail.com', 'jane.doe@gmail.com'];
  if (CONTAINS(emails, EMAIL())) {
    DATANAMES().forEach(function(dataName) {
      SETREQUIRED(dataName, false);
    });
  }
});
```

**Role:**

```js
ON('load-record', function(event) {
  if (ISROLE('Owner', 'Manager')) {
    DATANAMES().forEach(function(dataName) {
      SETREQUIRED(dataName, false);
    });
  }
});
```
