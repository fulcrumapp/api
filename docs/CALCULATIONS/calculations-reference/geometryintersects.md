---
title: GEOMETRYINTERSECTS
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
Returns true when two geometries intersect.

# Parameters

`feature1` Feature (**required**) - input feature 1

`feature2` Feature (**required**) - input feature 2

# Returns

boolean - returns true if the features intersect

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations

# Examples

```js javascript
const point = GEOMETRYPOINT([2, 2]);
const line = GEOMETRYLINESTRING([[1, 1], [1, 2], [1, 3], [1, 4]]);

GEOMETRYINTERSECTS(line, point);

// returns
// true
```