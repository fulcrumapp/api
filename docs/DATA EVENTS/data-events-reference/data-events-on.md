---
title: 'ON'
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
Attaches an event handler that listens for record, repeatable, or field events.

# Description

The `ON` function is the starting point for most data event scripts. It wires up an event to a function that gets called when that event happens. Events are things like a record being opened, edited, saved, validated, a field changing, or the record location changing. Using the `ON` function you can add custom logic to be performed when the events happen. The `ON` function by itself is not useful unless it's combined with the other data event functions to manipulate the record data and perform other actions like custom alerts and validations.

# Parameters

`event` string (__required__) - The event name

`callback` function (__required__) - The function to call when the specified event is triggered

# Examples

```js
var callback = function () {
  if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
    INVALID('Latitude must be between 40 and 41.');
  }
};

// Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
ON('validate-record', callback);
```

```js
var callback = function () {
  // Do something with the new $weather_summary values
};

// Listens for changes to the weather summary field and executes callback
ON('change', 'weather_summary', callback);
```

```js
var callback = function () {
  // Do something with the location via LATITUDE() AND LONGITUDE() values
};

// Listens for changes to a record's geometry (location) and executes callback
ON('change-geometry', callback);
```

```js
var callback = function () {
  // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
};

// Listens for changes to a repeatable item's geometry and executes callback
ON('change-geometry', 'repeatable_item', callback);
```