---
title: GEOMETRYFEATURE
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Wraps a GeoJSON Geometry in a GeoJSON Feature.

# Parameters

`geometry` Geometry (**required**) - GeoJSON geometry

`properties` object - properties to add to the feature

`options` object - options

# Returns

Feature - the GeoJSON Feature object

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations

# Examples

```js javascript
const geometry = {
  type: 'Point',
  coordinates: [110, 50]
};

INSPECT(GEOMETRYFEATURE(geometry, { name: "US 19" }))

// returns
// {
//   type: "Feature",
//   properties: {
//.    name: "US 19"
//.  },
//   geometry: { type: "Point", coordinates: [110, 50] },
// };
```