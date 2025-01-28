---
title: GEOMETRYNEARESTPOINT
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
Takes a reference point and a FeatureCollection of Features with Point geometries and returns the point from the FeatureCollection closest to the reference.

# Parameters

`targetPoint` Coord (**required**) - the reference point

`points` FeatureCollection <Point> - input points

# Returns

Feature <Point> - the closest point in the set to the reference point

# Examples

```js javascript
const targetPoint = GEOMETRYPOINT([28.965797, 41.010086]);
const points = GEOMETRYFEATURECOLLECTION([
  GEOMETRYPOINT([28.973865, 41.011122]),
  GEOMETRYPOINT([28.948459, 41.024204]),
  GEOMETRYPOINT([28.938674, 41.013324])
]);

GEOMETRYNEARESTPOINT(targetPoint, points);

// returns
// {
//   type: "Feature",
//   properties: { featureIndex: 0, distanceToPoint: 0.6866892586431127 },
//   geometry: { type: "Point", coordinates: [28.973865, 41.011122] },
// };
```