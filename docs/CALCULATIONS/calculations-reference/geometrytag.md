---
title: GEOMETRYTAG
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
Takes a set of points and a set of polygons and/or multipolygons and performs a spatial join.

# Parameters

`points` FeatureCollection &lt;Point&gt; (**required**) - input points

`polygons` FeatureCollection &lt;Polygon&gt; (**required**) - input polygons

`field` string - property in polygons to add to joined features

`outField` string - property in points in which to store joined property from polygons

# Returns

FeatureCollection &lt;Point&gt; - points with containingPolyId property containing values from polyId

# Examples

```js javascript
const point1 = GEOMETRYPOINT([-77, 44]);
const point2 = GEOMETRYPOINT([-77, 38]);
const polygon1 = GEOMETRYPOLYGON([[
  [-81, 41],
  [-81, 47],
  [-72, 47],
  [-72, 41],
  [-81, 41]
]], { pop: 3000 });
const polygon2 = GEOMETRYPOLYGON([[
  [-81, 35],
  [-81, 41],
  [-72, 41],
  [-72, 35],
  [-81, 35]
]], { pop: 1000 });

const points = GEOMETRYFEATURECOLLECTION([point1, point2]);
const polygons = GEOMETRYFEATURECOLLECTION([polygon1, polygon2]);

GEOMETRYTAG(points, polygons, 'pop', 'population');

// returns
// {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: { population: 3000 },
//       geometry: { type: "Point", coordinates: [-77, 44] },
//     },
//     {
//       type: "Feature",
//       properties: { population: 1000 },
//       geometry: { type: "Point", coordinates: [-77, 38] },
//     },
//   ],
// };
```