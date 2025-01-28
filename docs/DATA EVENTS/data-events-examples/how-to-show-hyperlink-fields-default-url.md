---
title: How to show hyperlink field's default URL
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
ON('save-record', function(event) {
  if(!$hyperlink_field) {
    SETVALUE('hyperlink_field', 'hyperlink_url');
  }
})
```
