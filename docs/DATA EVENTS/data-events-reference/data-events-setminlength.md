---
title: SETMINLENGTH
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
Set the minimum length for a field.

# Description

The SETMINLENGTH function can be used to set the minimum number of characters for a text field or the minimum count of repeatables, photos, videos, or audio files. Note that the minimum length is only enforced for non-empty fields. You must also make the field required to enforce the minimum length for empty fields.

# Parameters

`field` String (**required**) - The data name for the field

`length` number,null (**required**) - The minimum length of the field

# Examples

```js
SETMINLENGTH('weather_summary', 25);

// Sets the minimum length of the weather summary field to 25
```

```js
// Unsets any override previously set by SETMINLENGTH and uses the original setting from the form schema
SETMINLENGTH('weather_summary', null);
```
