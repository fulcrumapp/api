---
title: GEOMETRYCONVEX
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Takes a Feature or a FeatureCollection and returns a convex hull Polygon.

# Parameters

`geojson` GeoJSON (**required**) - input geojson

`options` object - options

# Returns

Feature `<Polygon>` - the convex hull

# Examples

```js javascript
const points = GEOMETRYFEATURECOLLECTION([
  GEOMETRYPOINT([10.195312, 43.755225]),
  GEOMETRYPOINT([10.404052, 43.8424511]),
  GEOMETRYPOINT([10.579833, 43.659924]),
  GEOMETRYPOINT([10.360107, 43.516688]),
  GEOMETRYPOINT([10.14038, 43.588348]),
  GEOMETRYPOINT([10.195312, 43.755225])
]);

INSPECT(GEOMETRYCONVEX(points));

// returns
// {
//   type: "Feature",
//   properties: {},
//   geometry: {
//     type: "Polygon",
//     coordinates: [
//       [
//         [10.360107, 43.516688],
//         [10.14038, 43.588348],
//         [10.195312, 43.755225],
//         [10.404052, 43.8424511],
//         [10.579833, 43.659924],
//         [10.360107, 43.516688],
//       ],
//     ],
//   },
// };
```