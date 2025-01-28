---
title: Alert user to take horizontal media
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
When photos are added to a field named `photos`, alert the user with a message if they're taken as portrait/vertical (where the width would be less than the height). For videos, we want to check the `orientation` property.

Note that using [`INVALID`](https://docs.fulcrumapp.com/docs/data-events-invalid) with `add-photo` or `add-video` media events prevents the media file from being attached to the record.

```js
ON('add-photo', 'photos', function(event) {
  if (event.value.width < event.value.height) {
    INVALID('Please retake the photo in landscape orientation.');
  }
});

ON('add-video', 'videos', function(event) {
  if (event.value.orientation == 90 || event.value.orientation == -90) {
    OPENURL('https://www.youtube.com/watch?v=f2picMQC-9E');
    INVALID('Please retake the video in landscape orientation.');
  }
});
```