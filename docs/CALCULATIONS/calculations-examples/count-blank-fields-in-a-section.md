---
title: Count Blank Fields in a Section
excerpt: >-
  This example sums up the number of unanswered (blank) fields in a defined
  section.
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
var elements = FIELD('section_one').elements;

var blankCount = 0;

for (var i = 0; i < elements.length; i++) {
  if (ISBLANK(VALUE(elements[i].data_name))) {
    blankCount += 1;
  }
}

SETRESULT(blankCount);
```