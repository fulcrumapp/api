---
title: SETSTATUSFILTER
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
Set the allowable status values for a record.

# Description

The `SETSTATUSFILTER` function allows for dynamic filtering of the available status options. This is similar to [SETCHOICEFILTER](https://docs.fulcrumapp.com/docs/data-events-setchoicefilter) except it operates on the status field. Using this function it's possible to change the available status options by user role or any other data conditions on record.

# Parameters

`statuses` Array,null (**required**) - The allowable status values for the record, or `null` to restore the original options

# Examples

```js
// Sets the allowable status values for the record to be 'inspection_pending' or 'in_inspection'
SETSTATUSFILTER(['inspection_pending', 'in_inspection']);
```

```js
// Unsets any previous status filters and allows any status to be selected for the record
SETSTATUSFILTER(null);
```

```js
// Sets the allowable status values for the record to be 'inspection_pending' or 'in_inspection' for Standard Users
ON('load-record', function(event) {
  if (ROLE() === 'Standard User') {
    SETSTATUSFILTER(['inspection_pending', 'in_inspection']);
  }
});
```
