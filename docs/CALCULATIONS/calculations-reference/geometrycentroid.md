---
title: GEOMETRYCENTROID
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  robots: noindex
next:
  description: ''
---
Takes one or more features and calculates the centroid using the mean of all vertices.

# Parameters

`geojson` GeoJSON (**required**) - input geojson

`options` object - options

# Returns

Feature <Point> - the centroid of the input features

# Examples

```js javascript
const polygon = {
  type: "Polygon",
  coordinates: [
    [
      [-82.47576689405734, 27.977757676187323],
      [-82.47699950483403, 27.974250052144896],
      [-82.47508211029273, 27.973524322585376],
      [-82.47357558600966, 27.97509673046042],
      [-82.47576689405734, 27.977757676187323]
    ]
  ]
};

INSPECT(GEOMETRYCENTROID(polygon))

// returns
// {
//   type: "Feature",
//   properties: {},
//   geometry: {
//     type: "Point",
//     coordinates: [-82.47535602379844, 27.975157195344504],
//   },
// };
```