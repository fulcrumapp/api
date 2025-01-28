---
title: SETHIDDEN
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
Set the visibility of a field.

# Description

The `SETHIDDEN` function hides a form field. It can be used to add custom conditional logic above and beyond what can be configured in the Fulcrum builder. It has the same behavior as the 'Hidden' checkbox in the builder, except data is not automatically cleared out when hiding a field.

# Parameters

`field` String (**required**) - The data name for the field

`hidden` boolean,null (**required**) - Boolean value representing whether the field should be hidden, or `null` to restore the original value

# Examples

```js
// Hides the weather summary field
SETHIDDEN('weather_summary', true);
```

```js
// Shows the weather summary field
SETHIDDEN('weather_summary', false);
```

```js
// Unsets any override previously set by SETHIDDEN and uses the original setting from the form schema
SETHIDDEN('weather_summary', null);
```
