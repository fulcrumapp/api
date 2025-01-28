---
title: SETSTATUS
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
Set the status of a record.

# Parameters

`status` String (__required__) - The status value for the record. Must be a valid status option!

# Examples

```js
// Sets the status of a record
SETSTATUS('inspection_pending');
```