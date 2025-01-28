---
title: SETLABEL
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
Set the label of a field.

# Parameters

`field` String (__required__) - The data name for the field

`hidden` String,null (__required__) - The text for the field label, or `null` to restore the original label

# Examples

```js
// Sets the field's label to 'Weather Report'
SETLABEL('weather_summary', 'Weather Report');
```

```js
// Unsets any override previously set by SETLABEL and uses the original setting from the form schema
SETLABEL('weather_summary', null);
```