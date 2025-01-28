---
title: CONFIRM
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
Display a question to the user with an "Okay" or "Cancel" response and a callback to respond to the result.

# Description

CONFIRM displays a message to the user and allows a callback function that will be invoked to respond to the result of the question.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/90d7d2c-confirm.gif",
        "confirm.gif",
        304,
        540,
        "#e7e7e8"
      ],
      "caption": "Confirm"
    }
  ]
}
[/block]
# Parameters

`title` String (__required__) - A short title for the alert

`message` String (__required__) - The message content for the alert

`callback` function (__required__) - invoked when the message box is dismissed

# Examples

Basic example.

```js
CONFIRM('Confirm', 'You have selected a critical safety violation. Are you sure?', function (result) {
  if (result.value === 'Okay') {
    // Selected Okay
  } else {
    // Selected Cancel
  }
});
```

Example seen in GIF animation.

```js
ON('change', 'violations_observed', function(event) {
  if (CHOICEVALUE($violations_observed) == 'Critical violation(s)') {
    CONFIRM('Confirm', 'You have selected a critical safety violation. Are you sure?', function(result) {
      if (result.value === 'Cancel') {
        SETVALUE('violations_observed', null);
      }
    });
  }
});
```