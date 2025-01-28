---
title: 'OFF'
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
Detaches an event handler set by `ON`.

# Parameters

`event` string (__required__) - The event name

`callback` function (__required__) - The function to detach

# Examples

```js
OFF('validate-record', callback);

// Detaches an event handler from the validate-record event
```

```js
OFF('validate-record');

// Detaches all event handlers listening to the 'validate-record' event
```