---
title: DATEADD
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Adds a number of days to a given date

# Parameters

`date` Date (**required**) - date

`days` Number (**required**) - the number of days to add

# Returns

Date

# Examples

```js
DATEADD('2015-01-01', 10)

// returns 2015-01-11
```

```js
DATEADD('2015-01-31', 90)

// returns 2015-05-01
```
