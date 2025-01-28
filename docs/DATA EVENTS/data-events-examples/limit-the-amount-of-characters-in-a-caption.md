---
title: Limit the amount of characters in a caption
excerpt: >-
  When viewing record's hyperlink field on record dashboard, it does not show
  the URL that is set to default.  In order to show this on the table, copy and
  paste the following code in the data event.
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
const maxCaptionLength = 4;
ON("change", 'photos', ()=>{
  $photos.forEach((photo)=>{
    if(photo && photo.caption && photo.caption.length > maxCaptionLength){
      ALERT(`Photo caption ${maxCaptionLength}`)
    }
  })
});
```
