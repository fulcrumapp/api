---
title: GEOMETRYFEATURECOLLECTION
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
Wraps a GeoJSON Geometry in a GeoJSON Feature.

# Parameters

`features` Array<feature /> (**required**) - input features

`options` object - options

# Returns

FeatureCollection - the GeoJSON Feature Collection object

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations

# Examples

```js javascript
const point1 = GEOMETRYPOINT([-77.343, 59.784], { name: 'Point A' });
const point2 = GEOMETRYPOINT([-77.835, 29.244], { name: 'Point B' });
const point3 = GEOMETRYPOINT([-73.534, 36.623], { name: 'Point C' });

GEOMETRYFEATURECOLLECTION([
  point1,
  point2,
  point3
]);

// returns
// {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: { name: "Point A" },
//       geometry: { type: "Point", coordinates: [-77.343, 59.784] },
//     },
//     {
//       type: "Feature",
//       properties: { name: "Point B" },
//       geometry: { type: "Point", coordinates: [-77.835, 29.244] },
//     },
//     {
//       type: "Feature",
//       properties: { name: "Point C" },
//       geometry: { type: "Point", coordinates: [-73.534, 36.623] },
//     },
//   ],
// };
```