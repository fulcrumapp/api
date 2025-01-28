---
title: Capture Timestamp
excerpt: >-
  This data event uses the Yes/No field to capture the current time (HH:MM:SS)
  and populates it into a text field.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: Set the time field's default value to 00:00:00
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d457ca9edfeb0f969e3f598f082fda34b1866907665c7a459b418b1639a306d7-Zight_Recording_2024-10-17_at_10.28.27_AM.gif",
        null,
        "Example of the data event results"
      ],
      "align": "center",
      "sizing": "500px",
      "border": true,
      "caption": "Example of the data event results"
    }
  ]
}
[/block]


```javascript JavaScript
ON('change', 'capture_time', function(event) { // The name of the Yes/No field
  var currentTimeField = 'time'; // The name of your Time text field

  if (event.value === 'capture') {
    // Capture the current time in HH:MM:SS format
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes + ':' + seconds;

    // Set the captured time in the Time field
    SETVALUE(currentTimeField, timeString);
  }
  else if (event.value === 'reset') {
    // Clear the Time field when reset is selected
    SETVALUE(currentTimeField, '00:00:00');
  }
});
```