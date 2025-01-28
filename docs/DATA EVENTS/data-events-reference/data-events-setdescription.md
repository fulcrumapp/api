---
title: SETDESCRIPTION
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
Set the description of a field.

# Parameters

`field` String (__required__) - The data name for the field

`value` String (__required__) - The value to set for the field's description, or `null` to restore the original description

# Examples

```js
SETDESCRIPTION('weather_summary', 'Could not automatically fetch weather data. Briefly describe the current weather.');

// Sets the description of a weather summary field
```