---
title: Snap Point to Line
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
The below example uses the turf.js library to snap a point collected in a repeatable to a line created at the parent level. **NOTE:** You will need to [enable Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for an app in order for this data event to work.

```js

let line;

ON('change-geometry', () => {
  if (GEOMETRY() && GEOMETRY().type == "LineString") {
    line = GEOMETRY();
  }
})

ON('change-geometry', 'repeatable', () => {
  if (GEOMETRY() && GEOMETRY().type == "Point") {
    let point = GEOMETRY();
    let nearestPointOnLine = turf.nearestPointOnLine(line, point, {units: 'feet'});
    ALERT(`Selected Point was ${ROUND(nearestPointOnLine.properties.dist, 2)} feet from the line. Moving point to line.`)
    SETGEOMETRY(nearestPointOnLine.geometry)
  }
})
```