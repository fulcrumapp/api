---
title: SETCHOICES
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
Set the available choices for a choice field.

# Description

The `SETCHOICES` function allows for dynamic modification of the choice options on choice fields. For example, if you want to limit or completely replace the pick list options depending on other data scenarios on the form, you can use `SETCHOICES` to modify the options. Depending on what's required, it might be easier to use [SETCHOICEFILTER](https://docs.fulcrumapp.com/docs/data-events-setchoicefilter/), which is a similar function except it doesn't completely redefine the choices, it only applies a filter to them.

The `choices` parameter can be in 3 possible formats. The first format is provided for simplicity, and the last 2 formats are for more sophisticated scenarios where you want control over the label and value properties of the choices. The examples below demonstrate all 3 formats.

* Array of strings - simplest format, the label and value are the same
* Array of arrays - each choice item is an array in `[label, value]` order
* Array of objects - each object has a `label` and `value` attribute

# Parameters

`field` String (__required__) - The data name for the field

`choices` Array,null (__required__) - The choices for the choice field, or `null` to restore the original choices.

# Examples

```js
choices = ['Rain', 'Hail', 'Snow', 'Graupel'];

// Sets the available choices of the weather summary field to an array of values
SETCHOICES('weather_summary', choices);
```

```js
choices = [
  ['Light Rain', 'light_rain'],
  ['Heavy Rain', 'heavy_rain']
];

// Sets the available choices of the weather summary field to an array of labels and values in [<label>, <value>] order
SETCHOICES('weather_summary', choices);
```

```js
choices = [
  { label: 'Light Rain', value: 'light_rain' },
  { label: 'Heavy Rain', value: 'heavy_rain' }
];

// Sets the available choices of the weather summary field to an array of labels and values in an object containing "label" and "value" keys
SETCHOICES('weather_summary', choices);
```

```js
// Unsets any override previously set by SETCHOICES and uses the original setting from the form schema
SETCHOICES('weather_summary', null);
```