---
title: Return the Repeatable Latest Date
excerpt: >-
  This will return the latest date captured in a date field that is in a
  repeatable section.
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
var dates = REPEATABLEVALUES($inspections, 'rep_date') || [];

SETRESULT(LAST(dates.sort()));
```

Or if you need to customize the logic for how it gets calculated, you can use this equivalent example:

```js
var dates = REPEATABLEVALUES($repeatable_section, 'date_field');
var maxDate;

if (dates && dates.length > 0) {
  maxDate = dates[0];

  dates.forEach(function(currentDate) {
    if (currentDate > maxDate) {
      maxDate = currentDate;
    }
  });

  SETRESULT(maxDate);
}
```