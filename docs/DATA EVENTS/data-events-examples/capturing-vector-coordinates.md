---
title: Capturing vector coordinates
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The examples below demonstrate how to use the [`CURRENTLOCATION`](https://docs.fulcrumapp.com/currentlocation/) function in conjunction with [`SETINTERVAL`](https://docs.fulcrumapp.com/setinterval/) and [`CLEARINTERVAL`](https://docs.fulcrumapp.com/clearinterval/) to capture the coordinates of simple line or polygon features. This could be used for "digitizing" pipe lengths, pavement features, wetland boundaries, etc. While Fulcrum only currently supports point geometries in the map view, this workflow allows you to capture simple vector geometries for use outside of Fulcrum in various GIS applications.

**Capturing A Line Feature**

In the example below, our form is setup with the following fields:

* `start_digitizing`: Hyperlink button used to trigger GPS logging at the start of the feature
* `stop_digitizing`: Hyperlink button used to stop GPS logging the end of the feature
* `line`: Text field used to store the line feature coordinates in [WKT](https://en.wikipedia.org/wiki/Well-known_text) format.

```js
var lineCoords = [],
  digitizeLine;

ON('click', 'start_digitizing', function(event) {
  lineCoords = [];
  digitizeLine = SETINTERVAL(function() {
    if (CURRENTLOCATION()) {
      lineCoords.push(CURRENTLOCATION().longitude + ' ' + CURRENTLOCATION().latitude);
    }
    SETVALUE('line', 'LINESTRING (' + lineCoords + ')');
  }, 1000);
});

ON('click', 'stop_digitizing', function(event) {
  CLEARINTERVAL(digitizeLine);
});
```

**Capturing A Polygon Feature**

In the example below, our form is setup with the following fields:

* `start_digitizing`: Hyperlink button used to trigger GPS logging at the start of the feature
* `stop_digitizing`: Hyperlink button used to stop GPS logging the end of the feature
* `polygon`: Text field used to store the polygon feature coordinates in [WKT](https://en.wikipedia.org/wiki/Well-known_text) format.

```js
var polygonCoords = [],
  digitizePolygon;

ON('click', 'start_digitizing', function(event) {
  polygonCoords = [];
  digitizePolygon = SETINTERVAL(function() {
    if (CURRENTLOCATION()) {
      polygonCoords.push(CURRENTLOCATION().longitude + ' ' + CURRENTLOCATION().latitude);
    }
    SETVALUE('polygon', 'POLYGON ((' + polygonCoords + ',' + polygonCoords[0] + '))');
  }, 1000);
});

ON('click', 'stop_digitizing', function(event) {
  CLEARINTERVAL(digitizePolygon);
});
```

In the above examples, the GPS capture interval is 1 second (1,000 milliseconds). This could be modified to emphasize greater precision (more coordinate pairs) for smaller features- or a longer interval for a more general representation of larger features.

To view the polygon vector geometries in [CARTO](https://carto.com/), you could use the following SQL query, where `polygon` is the name of the geometry field and `repeatable_vector_geometries` is the name of the table:

```sql
SELECT cartodb_id, ST_Transform (ST_GeomFromText(polygon, 4326), 3857) AS the_geom_webmercator FROM repeatable_vector_geometries
```

**Note also that this workflow should be considered highly experimental and is not officially supported. Capturing lots of coordinates at a fast interval while Fulcrum is running in the background could cause memory and performance issues.**
