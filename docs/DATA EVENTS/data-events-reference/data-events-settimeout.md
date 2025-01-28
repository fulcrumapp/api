---
title: SETTIMEOUT
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
Calls a function after a specified delay.

# Description

The SETTIMEOUT function can be used to delay execution of a function for a specified amount of time. It's nearly identical to the web platform standard [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).

# Parameters

`function` function (**required**) - The function to execute after the delay

`delay` Number (**required**) - The number of milliseconds to delay (e.g. 1000 is 1 second)

# Examples

```js
ON('load-record', function(event) {
  var fiveMinutes = 1000 * 60 * 5;

  SETTIMEOUT(function() {
    ALERT("You've been editing this record for 5 minutes.");
  }, fiveMinutes);
});
```
