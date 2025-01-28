---
title: SETMAXLENGTH
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
Set the maximum length for a field.

# Description

The `SETMAXLENGTH` function can be used to set the maximum number of characters for a text field or the maximum count of repeatables, photos, videos, or audio files.

# Parameters

`field` String (**required**) - The data name for the field

`length` number,null (**required**) - The maximum length of the field

# Examples

```js
SETMAXLENGTH('weather_summary', 25);

// Sets the maximum length of the weather summary field to 25
```

```js
// Unsets any override previously set by SETMAXLENGTH and uses the original setting from the form schema
SETMAXLENGTH('weather_summary', null);
```
