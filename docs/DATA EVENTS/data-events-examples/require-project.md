---
title: Require project
excerpt: >-
  This example uses the `validate-record` event in conjunction with the
  [INVALID](https://docs.fulcrumapp.com/docs/data-events-invalid) function and
  [PROJECTNAME](https://docs.fulcrumapp.com/docs/calculations-ref-projectname/)
  expression to prevent saving if the user has not associated a
  [project](http://help.fulcrumapp.com/web-app/what-are-projects) with the
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
ON('validate-record', function (event) {
  if (!PROJECTNAME()) {
    INVALID('Please select a project before saving.');
  }
});
```