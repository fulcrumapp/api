---
title: SETGEOMETRY
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
Sets the geometry of the record. This differs from SETLOCATION, which only sets the latitude and longitude. A valid geometry is an object with a parameter for `type` and `coordinates`  You can set the record's geometry `type` to one of `Point`, `LineString`, `Polygon`, or `null`. 

**NOTE:** You will need to [enable Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for an app in order for this data event to work.

Here is the syntax for setting the geometry to a polygon:

```javascript
const bermudaTriangle = {
  "type": "Polygon",
  "coordinates": [
    [
      [
        -79.74862160796863,
        25.986226039228605
      ],
      [
        -73.17093851680494,
        22.354017823781362
      ],
      [
        -72.38797220105869,
        29.610135918829936
      ],
      [
        -79.74862160796863,
        25.986226039228605
      ]
    ]
  ]
};
SETGEOMETRY(bermudaTriangle)
```

![](https://files.readme.io/86e468d-image.png)

Here is the syntax for setting the geometry to a line:

```javascript
const floridaGeorgiaLine = {
    "type": "LineString",
    "coordinates": [
        [
            -81.21292131657344,
            30.681309636666093
        ],
        [
            -82.03498820478659,
            30.79360861055468
        ],
        [
            -82.04843545968276,
            30.328237514273297
        ],
        [
            -82.23340059334976,
            30.546871141585903
        ],
        [
            -84.85681558663589,
            30.67958705566894
        ]
    ]
}
SETGEOMETRY(floridaGeorgiaLine)
```

If you are looking to set the geometry of a record to a `Point` type, you may want to use the [SETLOCATION](https://docs.fulcrumapp.com/docs/data-events-setlocation) function instead.