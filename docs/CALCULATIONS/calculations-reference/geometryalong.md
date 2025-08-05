---
title: GEOMETRYALONG
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Takes a LineString and returns a Point at a specified distance along the line.

# Parameters

`line` Feature<lineString /> (**required**) - input line

`distance` number (**required**) - distance along a line (in kilometers)

`options` object - options

# Returns

Feature<point /> - Point distance units along the line

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations, which may differ from other libraries.

# Examples

```js javascript
const lineString = {
  type: "LineString",
  coordinates: [
    [-82.47576689405734, 27.977757676187323],
    [-82.47699950483403, 27.974250052144896],
    [-82.47508211029273, 27.973524322585376],
    [-82.47357558600966, 27.97509673046042],
    [-82.47576689405734, 27.977757676187323]
  ]
};

INSPECT(GEOMETRYALONG(lineString, 5))

// returns
// {
//   type: 'Feature',
//   properties: {},
//   geometry: {
//     type: 'Point',
//     coordinates: [ -82.47576689405734, 27.977757676187323 ]
//   }
// }
```