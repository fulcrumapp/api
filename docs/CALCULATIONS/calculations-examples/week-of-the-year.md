---
title: Week Number
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
To display the week of the year, make sure that the Format is set to number. The formula should be wrapped in ONCE(), which means it will only calculate the first time it is used. However, if you want the week number to update every time the record is updated, remove the ONCE() function from the formula.

```
function getCurrentWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const currentWeekNumber = getCurrentWeekNumber();
ONCE(SETRESULT(currentWeekNumber));
```