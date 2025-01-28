---
title: GEOMETRYDISTANCE
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Calculates the distance between two points in degrees, radians, miles, or kilometers.

# Parameters

`from` Coord (**required**) - from coordinate

`to` Coord (**required**) - to coordinate

`options` object - options

# Returns

number - distance between the two points

# Examples

```js javascript
const from = GEOMETRYPOINT([-75.343, 39.984]);
const to = GEOMETRYPOINT([-75.534, 39.123]);

INSPECT(GEOMETRYDISTANCE(from, to, { units: 'miles' }))

// returns
// 60.35329997171415
```