---
title: SETASSIGNMENT
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Set the assignment of a record.

# Parameters

`email` String (**required**) - The email, or `null` to clear the assignment

Requires user to have Assign Records permission. If the email address is not found, the record assignment is cleared.

# Examples

```js
// Sets the assignment of a record
SETASSIGNMENT('username@email.com');
```
