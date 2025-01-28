---
title: CLEARTIMEOUT
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
Clears a timeout that was previously started with `SETTIMEOUT`.

# Description

The CLEARTIMEOUT function clears a timeout that was previously started with [SETTIMEOUT](https://docs.fulcrumapp.com/docs/data-events-settimeout).

# Parameters

`timerID` Number (**required**) - The timer ID to clear

# Examples

```js
// Starts a timer to alert after five minutes, and another timeout that clears the first one after four minutes.
// No alert is ever displayed.
ON('load-record', function(event) {
  var fiveMinutes = 1000 * 60 * 5;
  var fourMinutes = 1000 * 60 * 4;

  var timer = SETTIMEOUT(function() {
    ALERT("You've been editing this record for 5 minutes.");
  }, fiveMinutes);

  SETTIMEOUT(function() {
    CLEARTIMEOUT(timer);
  }, fourMinutes);
});
```
