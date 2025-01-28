---
title: CLEARINTERVAL
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
Clears an interval that was previously started with `SETINTERVAL`.

# Description

The CLEARINTERVAL function clears an interval that was previously started with [SETINTERVAL](https://docs.fulcrumapp.com/docs/data-events-clearinterval).

# Parameters

`intervalID` Number (__required__) - The interval ID to clear

# Examples

```js
// Starts an interval to update the GPS accuracy every 5 seconds and stops updating after 2 minutes.
ON('load-record', function(event) {
  var fiveSeconds = 1000 * 5;
  var twoMinutes = 1000 * 60 * 2;

  var interval = SETINTERVAL(function() {
    if (CURRENTLOCATION()) {
      SETLABEL('accuracy', CURRENTLOCATION().accuracy);
    }
  }, fiveSeconds);

  SETTIMEOUT(function() {
    CLEARINTERVAL(interval);
  }, twoMinutes);
});
```