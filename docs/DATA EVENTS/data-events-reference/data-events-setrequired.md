---
title: SETREQUIRED
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
Set whether or not a field is required.

# Parameters

`field` String (**required**) - The data name for the field

`required` boolean,null (**required**) - Boolean value representing whether the field should be required, or `null` to restore the original state

# Examples

```js
// Sets the weather summary field as required
SETREQUIRED('weather_summary', true);
```

```js
// Sets the weather summary field as not required
SETREQUIRED('weather_summary', false);
```

```js
// Unsets any override previously set by SETREQUIRED and uses the original setting from the form schema
SETREQUIRED('weather_summary', null);
```
