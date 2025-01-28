---
title: Grab Photo ID
excerpt: >-
  Assuming the max number of photos is 1, this expression grabs the one photo id
  in the form and adds it to the feature id field. `$feature_id` and `$photos`
  are both strings, so you can add them together with a '+'.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[block:callout]
{
  "type": "info",
  "body": "Photo elements have two properties. They look like this: ```json {\"photo_id: \"\", \"caption\": \"Test caption\"}```.",
  "title": "Note"
}
[/block]
```js
var photo;

if ($photos.length > 0) {
  photo = $photos[0].photo_id;
  SETRESULT($feature_id + photo);
} else {
  SETRESULT('');
}
```