---
title: GEOMETRYBEARING
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)

# Parameters

`start` Coord (**required**) - starting Point

`end` Coord (**required**) - ending Point

`options` object - options

# Returns

number - bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)

# Examples

```js javascript
const point1 = {
  type: 'Point',
  coordinates: [-75.343, 39.984]
};

const point2 = {
  type: 'Point',
  coordinates: [-75.534, 39.123]
};

INSPECT(GEOMETRYBEARING(point1, point2))

// returns
// -170.2330491349224
```
