---
title: Make all fields within a section read-only
excerpt: >-
  This example uses the
  [FIELDNAMES](https://docs.fulcrumapp.com/docs/calculations-ref-fieldnames)
  function to grab the fields within a section and set them to read-only if the
  record is being updated. The `sections: true` option includes fields within
  nested sections.
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
ON('load-record', function (event) {
  if (ISUPDATE()) {
    var dataNames = FIELDNAMES('my_section', {sections: true, repeatables: false});
    dataNames.forEach(function(field) {
      SETREADONLY(field, true);
    });
  }
});
```