---
title: Star Ratings from a Numeric Range
excerpt: >-
  Assuming `$rating` is a numeric field with a minimum of 1 and a maximum of 5,
  generate a star rating out of a maximum of 5 stars.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This will take a numeric field value in `$rating` and convert it into actual star characters.

```js
SETRESULT(Array(FLOOR($rating + 1)).join('★') + Array(FLOOR(6 - $rating)).join('☆'));
```

Entering "3" gives the output: "★★★☆☆".