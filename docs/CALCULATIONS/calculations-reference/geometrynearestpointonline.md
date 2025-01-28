---
title: GEOMETRYNEARESTPOINTONLINE
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
Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.

# Parameters

`lines` LineString | MultiLineString (**required**) - line(s) to snap to

`point` Point - input point

`options` object - options

# Returns

Feature &lt;Point&gt; - closest point on the line to point. The properties object will contain three values: index : closest point was found on nth line part, dist : distance between pt and the closest point, location : distance along the line between start and the closest point.

# Examples

```js javascript
const line = GEOMETRYLINESTRING([
  [-77.031669, 38.878605],
  [-77.029609, 38.881946],
  [-77.020339, 38.884084],
  [-77.025661, 38.885821],
  [-77.021884, 38.889563],
  [-77.019824, 38.892368]
]);

const point = GEOMETRYPOINT([-77.037076, 38.884017]);

GEOMETRYNEARESTPOINTONLINE(line, point, { units: 'miles' });

// returns
// {
//   type: "Feature",
//   properties: {
//     dist: 0.4239819718628416,
//     location: 0.2112562928236486,
//     index: 0,
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [-77.02996941477018, 38.881361463229524],
//   },
// };
```