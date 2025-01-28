---
title: SETSTATUSREADONLY
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
Sets the status field to be read-only or editable.

# Parameters

`readOnly` boolean,null (**required**) - Boolean value representing whether the field should be read-only, or `null` to restore the original state

# Examples

```js
SETSTATUSREADONLY(true);

// Sets the status field to read only, not editable by the user
```
