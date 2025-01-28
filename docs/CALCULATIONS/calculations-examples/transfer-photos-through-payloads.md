---
title: Transfer Photos through payloads
excerpt: >-
  Zapier and Fulcrum webhooks do not permit images to be transferred through
  them. You can work around this limitation by creating a calculation field that
  pulls in the photo through the Fulcrum data shares.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This calculation field requires access to your form's data share, so you will need to make sure you have that data share enabled for the form. The code loops through all of the photos in the `Photo` field and creates an HTML img tag with the proper photo ids.

Make sure to change the link in there with your form's data share! Enjoy!

```js
var html = "";
$photos.forEach(function(photo) {
html += "<p><img src='https://web.fulcrumapp.com/shares/c73c346bb80ab660/photos/" + photo.photo_id + "/thumbnail.jpg'></p>"
})
SETRESULT(html);
```

For getting photos out of a repeatable section

```js
var html = "";

var photos = REPEATABLEVALUES($repeatable_section, 'photos');
var flatPhotos = FLATTEN(photos);

flatPhotos.forEach(function(photo) {
html += "<p><img src='https://web.fulcrumapp.com/shares/c73c346bb80ab660/photos/" + photo.photo_id + "/thumbnail.jpg'></p>"
})
SETRESULT(html);
```
