---
title: Alert user if photo is not geotagged
excerpt: >-
  This example loops through all the fields in the app and adds an
  [add-photo](intro/#media-events) event to look for location metadata. If
  `latitude` and `longitude` are missing, it will alert the user to enable
  geotagging on their device and prevent the photo from being attached to the
  record.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
function validateGeotags(event) {
  if (!event.value.latitude || !event.value.longitude) {
    INVALID('This photo is NOT geotagged. Enable photo geotagging on your device and try again.');
  }
}

ON('load-record', function (event) {
  DATANAMES('PhotoField').forEach(function(dataName) {
    ON('add-photo', dataName, validateGeotags);
  });
});
```
