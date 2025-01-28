---
title: GEOMETRYWITHIN
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
Returns true if the first geometry is completely within the second geometry.

# Parameters

`feature1` Feature (**required**) - input feature 1

`feature2` Feature (**required**) - input feature 2

# Returns

boolean - returns true if the first geometry is completely within the second geometry.

# Examples

```js javascript
const line = GEOMETRYLINESTRING([[1, 1], [1, 2], [1, 3], [1, 4]]);
const point = GEOMETRYPOINT([1, 2]);

GEOMETRYWITHIN(point, line);

// returns
// true
```
