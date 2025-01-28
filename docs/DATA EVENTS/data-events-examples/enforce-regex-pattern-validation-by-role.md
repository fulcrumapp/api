---
title: Enforce regex pattern validation by role
excerpt: >-
  This example uses the
  [ISROLE](https://docs.fulcrumapp.com/docs/calculations-ref-isrole) and
  [INVALID](https://docs.fulcrumapp.com/docs/data-events-invalid) functions to
  programmatically validate a text field against a regex pattern based on the
  user role. This could be used to force field user comments to be more succinct
  while allowing manager comments to be more detailed.
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
ON('validate-record', function(event) {
  if (ISROLE('Standard User', 'Field Crew')) {
    var str = $name;
    var re = /^[A-Za-z]{5}$/;
    var result = re.test(str);
    if (result == false) {
      INVALID('The value for the Name field must be exactly 5 characters');
    }
  }
});
```
