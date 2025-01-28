---
title: HASOTHER
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
Tests whether a choice field or classification field has an 'Other' value entered

# Parameters

`field` Object (**required**) - the choice field or classification to test

# Returns

Boolean

# Examples

```js
if ($my_choice_field) {
HASOTHER($my_choice_field) ? 'true' : 'false'
}
```
