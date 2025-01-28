---
title: ALERT
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
Display a message as an alert.

# Description

ALERT displays a message to the user. You can provide both the title and message of the alert box.

# Parameters

`title` String (__required__) - A short title for the alert

`message` String (__required__) - The message content for the alert

# Examples

```js
ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?');

// Displays an alert that looks like
// +-------------------------------------------+
// | Warning!                                  |
// +-------------------------------------------|
// |                                           |
// | A depth of 98 feet is high. Are you sure? |
// |                                           |
// +-------------------------------------------+
```