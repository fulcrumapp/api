---
title: MESSAGEBOX
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
Display a message box with configurable title, message, buttons and optional text input.

# Description

MESSAGEBOX displays a message to the user. You can provide both the title and message of the alert box. Using the `buttons` parameter you can specify the button titles that are displayed in the message box.

<Image title="messagebox.gif" alt={304} src="https://files.readme.io/47f6317-messagebox.gif">
  MESSAGEBOX
</Image>

# Parameters

`options` Object (**required**) - The options for the message box

`callback` function (**required**) - invoked when the message box is dismissed

# Examples

Basic example.

```js
MESSAGEBOX({title: 'Confirm', message: 'You have selected a critical safety violation. Are you sure?', buttons: ['Yes', 'No']}, function (result) {
  if (result.value === 'Yes') {
    // Selected Yes
  } else {
    // Selected No
  }
});
```

Example seen in GIF animation.

```js
ON('change', 'violations_observed', function(event) {
  if (CHOICEVALUE($violations_observed) == 'Critical violation(s)') {
    var options = {
      title: 'Question',
      message: 'Does this violation require dispatching a supervisor?',
      buttons: ['Yes, immediately', 'Yes, when possible', 'No', 'N/A'],
      input: true,
      placeholder: 'Enter a comment about the violation'
    };

    MESSAGEBOX(options, function(result) {
      if (result.input) {
        SETVALUE('violation_comment', result.input);
      }
    });
  }
});
```
