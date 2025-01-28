---
title: PROMPT
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
Display a text field to get input from the user and a callback to respond to the result.

# Parameters

`title` String (**required**) - A short title for the alert

`message` String (**required**) - The message content for the alert

`callback` function (**required**) - invoked when the message box is dismissed



# `result` properties

`input` String - the text value that was entered by the user

`value` String - the option clicked by the user. One of "Cancel" or "Okay"

`index` int - integer representation of the clicked option. 0 for cancel, 1 for okay 

# Examples

```js
PROMPT('Current Year', 'Please enter the current year', function (result) {
  if (NUM(result.input) === new Date().getFullYear()) {
    // Correct
  } else {
    // Incorrect
  }
});
```