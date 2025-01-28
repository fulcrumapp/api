---
title: GEOMETRYPOINT
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
Creates a Point Feature from an Array of Positions.

# Parameters

`coordinates` Array (**required**) - an array of Positions

`properties` an Object of key-value pairs to add as properties

`options` object - options

# Returns

Feature `<Point>` - Point Feature

# Examples

```js javascript
GEOMETRYPOINT([-75.343, 39.984], { name: "Point A" });

// returns
// {
//   type: "Feature",
//   properties: {
//     name: "Point A"
//   },
//   geometry: { type: "Point", coordinates: [-75.343, 39.984] },
// };
```