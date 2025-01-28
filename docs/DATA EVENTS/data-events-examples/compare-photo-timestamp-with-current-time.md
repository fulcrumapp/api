---
title: Compare photo timestamp with current time
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
This example demonstrates how to compare the timestamp of an attached photo with the current time to alert the user that they need to use a more recent photo. Using [`INVALID`](https://docs.fulcrumapp.com/docs/data-events-invalid) with the `add-photo` event prevents the photo from being attached to the record.

```js
function checkTime(event) {
  if (event.value.timestamp) {
    var minutes = Math.round((new Date().getTime() - new Date(event.value.timestamp.replace(/-/g, '/')).getTime()) / 60000);
    if (minutes > 15) {
      INVALID('This photo was taken over 15 minutes ago. Please use a more recent photo.');
    }
  }
}

ON('load-record', function(event) {
  // loop through the photo fields
  DATANAMES('PhotoField').forEach(function(dataName) {
    ON('add-photo', dataName, checkTime);
  });
});
```
