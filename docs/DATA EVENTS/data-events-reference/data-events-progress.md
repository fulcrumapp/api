---
title: PROGRESS
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
Display a non-dismissible progress message in the mobile app.

# Description

PROGRESS displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function. For example, while fetching data from an API using [REQUEST](https://fulcrum.readme.io/docs/data-events-request) it might be desirable to let the user know that the request is in progress. This is an advanced function that requires thorough testing and error checking in your logic since the message is not dismissible by the user. To dismiss the progress message, call `PROGRESS();`.

# Parameters

`title` String (__required__) - A short title for the progress message

`message` String (__required__) - The message content for the progress alert

# Examples

```js
var url = 'https://example.com';

// show progress message while request is happening
PROGRESS('Searching for nearby facilities ...');

REQUEST(url, function(error, response, body) {
  PROGRESS();

  if (error) {
    ALERT(INSPECT(error));
  } else {
    // do something with the API response
  }
});

// Displays an progress message that looks like this while the request is in progress
// +-------------------------------------------+
// | Searching for nearby facilities ...       |
// +-------------------------------------------+
```