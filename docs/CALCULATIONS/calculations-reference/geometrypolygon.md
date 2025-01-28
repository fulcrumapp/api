---
title: GEOMETRYPOLYGON
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
Creates a Polygon Feature from an Array of Positions.

# Parameters

`coordinates` Array (**required**) - an array of Positions

`properties` an Object of key-value pairs to add as properties

`options` object - options

# Returns

Feature &lt;Polygon&gt; - Polygon Feature

# Examples

```js javascript
GEOMETRYPOLYGON([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'Polygon 1' });

// returns
// {
//   type: "Feature",
//   properties: { name: "Polygon 1" },
//   geometry: {
//     type: "Polygon",
//     coordinates: [
//       [
//         [-5, 52],
//         [-4, 56],
//         [-2, 51],
//         [-7, 54],
//         [-5, 52],
//       ],
//     ],
//   },
// };
```