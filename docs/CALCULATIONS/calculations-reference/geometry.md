---
title: GEOMETRY
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
GEOMETRY returns the geometry of the current feature (record or repeatable item). If your calculation field is in the parent record it will return the geometry of the parent and if it is in a repeatable it will return the geometry of the repeatable. In data events, it will return the geometry within the context you are in. For example if you are using the `load-repeatable` trigger it will return the geometry of the repeatable but if you are using the `load-record` trigger it will return the geometry of the parent.

# Parameters

No parameters

# Returns

Object with the following attributes.  

* type: any of the following strings, indicating the type of geometry:  `'Point', 'LineString', and 'Polygon'`
* coordinates: list of points represented as a list of `long, lat` coordinates
  * for points, the list of points only has a single list of coordinates
  * for line strings, the list always has at least two points
  * for polygons, the last pair of coordinates is always the same as the first pair
* If the record has no location, GEOMETRY returns `null`.

# Examples

```js
INSPECT(GEOMETRY())

// returns 
//	{ 
//		coordinates: 
//     	[ 
//        [ -72.78209769011013, 44.97776463427227 ], 
//        [ -72.78216633789711, 44.97700574720612 ], 
//        [ -72.78265827441359, 44.97700596306893 ] 
//      ],
//    type: 'LineString' 
//  }
```
