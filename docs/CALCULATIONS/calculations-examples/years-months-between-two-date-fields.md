---
title: Years & Months Between Two Date Fields
excerpt: This will return the difference between two date fields in years and months.
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
function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();

  return months <= 0 ? 0 : months;
}

var months = monthDiff($date_1, $date_2) // Change $date_1 and $date_2 to your date fields
var years = months/12

function yearsToYearsMonthsDays(value) {
  var totalDays = value * 365;
  var years = Math.floor(totalDays/365);
  var months = Math.floor((totalDays-(years *365))/30);
  var days = Math.floor(totalDays - (years*365) - (months * 30));
  var result = years + " years, " + months + " months, "
  SETRESULT(result)
}

yearsToYearsMonthsDays(years)

```
