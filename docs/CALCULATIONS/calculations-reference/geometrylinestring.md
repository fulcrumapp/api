---
title: GEOMETRYLINESTRING
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Creates a LineString Feature from an Array of Positions.

# Parameters

`coordinates` Array (**required**) - an array of Positions

`properties` an Object of key-value pairs to add as properties

`options` object - options

# Returns

Feature `<LineString>` - LineString Feature

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations

# Examples

```js javascript
const line = GEOMETRYLINESTRING([[115, -32], [131, -22], [143, -25], [150, -34]]);

GEOMETRYLINESTRING([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], { name: 'line 1' });

// returns
// {
//   type: "Feature",
//   properties: { name: "line 1" },
//   geometry: {
//     type: "LineString",
//     coordinates: [
//       [-24, 63],
//       [-23, 60],
//       [-25, 65],
//       [-20, 69],
//     ],
//   },
// };
```