---
title: GEOMETRYAREA
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
Takes one or more features and returns their area in square meters.

# Parameters

`geojson` GeoJSON (**required**) - input GeoJSON feature(s)

# Returns

number - Point distance units along the line

# Examples

```js javascript
INSPECT(GEOMETRYAREA(GEOMETRY())

// returns in sq meters
// 82487.30619407611

SETRESULT(parseFloat(INSPECT(GEOMETRYAREA(GEOMETRY()) / 4046.86)).toFixed(3))

// returns in Acres
// toFixed controls the number of decimal points
```

# Note:

GEOMETRYAREA leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations, which may differ from other libraries. Like Fulcrum data, Turf uses standard WGS84 coordinates. WGS84 uses geodesic calculations and assumes the Earth is a perfect sphere (has a constant radius). Different coordinate systems try to adjust for correct regional measurements in every part of the world, and it's never going to be exact.
