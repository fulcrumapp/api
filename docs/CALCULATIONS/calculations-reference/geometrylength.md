---
title: GEOMETRYLENGTH
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Takes a GeoJSON and measures its length in the specified units.

# Parameters

`geojson` GeoJSON (**required**) - geojson to measure

`options` object - options

# Returns

number - returns the length of the feature

* **Note:** Leverages Turf.js ([https://turfjs.org](https://turfjs.org)) for calculations, which may differ from other libraries.

# Examples

## Basic usage

```javascript
const line = GEOMETRYLINESTRING([[115, -32], [131, -22], [143, -25], [150, -34]]);

GEOMETRYLENGTH(line, { units: 'miles' });

// returns
// 2738.9663893575207
```

## Set the result of a calculation field to the length of a record's line geometry

```javascript
var res = 0;
if(GEOMETRY() && GEOMETRY()['type']==='LineString'){
  var line = GEOMETRYLINESTRING(GEOMETRY()['coordinates']);
  res = GEOMETRYLENGTH(line, { units: 'meters' });
}
SETRESULT(res);
```