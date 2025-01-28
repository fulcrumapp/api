---
title: ISLANDSCAPE
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
Returns true if the photo or video is in landscape mode.

# Description

Returns true if the photo or video is in landscape mode. This is intended to be used inside of the `add-photo` and `add-video` events and operate on the parameter passed to the event handler.

# Parameters

`value` Object (__required__) - The value of the photo or video

# Examples

```js
ON('add-photo', 'photos', function (event) {
   if (ISLANDSCAPE(event.value)) {
     ALERT('Photo is landscape!');
   }
});
```