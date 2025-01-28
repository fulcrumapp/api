---
title: SETINTERVAL
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
Repeatedly calls a function with a fixed time delay between each call.

# Description

The `SETINTERVAL` function can be used to repeatedly call a function at a specified interval. It's nearly identical to the web platform standard [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval).

# Parameters

`function` function (**required**) - The function to execute at the interval

`interval` Number (**required**) - The number of milliseconds to delay between each call (e.g. 1000 is 1 second)

# Examples

```js
ON('load-record', function(event) {
  var fiveSeconds = 1000 * 5;

  SETINTERVAL(function() {
    if (CURRENTLOCATION()) {
      SETLABEL('accuracy', CURRENTLOCATION().accuracy);
    }
  }, fiveSeconds);
});

// Set a field label to the current GPS accuracy every 5 seconds
```
