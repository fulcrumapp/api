---
title: Prevent users from uploading photos from the device gallery
excerpt: >-
  This example will enforce users to take a new photo instead of uploading
  photos from the gallery.
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
ON('load-record', function() {  
  var config = {
    media_gallery_enabled: false
  };
 SETFORMATTRIBUTES(config);
});
```