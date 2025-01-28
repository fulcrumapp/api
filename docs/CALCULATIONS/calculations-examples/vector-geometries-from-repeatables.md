---
title: Vector Geometries from Repeatables
excerpt: >-
  Assume you have a repeatable field called `vector_vertices` with location
  enabled, location required, and a minimum count set to 2. Every repeatable
  record will act as a vector node or vertex and we can use calculation fields
  to combine all of these vertices into a well-known text (WKT) geometry object
  field at the parent record level.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
**Line Geometry:**

```js
var coords = [];
if ($vector_vertices) {
  for (var i = 0; i < $vector_vertices.length; ++i) {
    coords.push($vector_vertices[i].geometry.coordinates[0] + ' ' + $vector_vertices[i].geometry.coordinates[1]);
  }
  SETRESULT('LINESTRING (' + coords + ')');
} else {
  SETRESULT(null);
}
```

**Polygon Geometry:**

```js
var coords = [];
if ($vector_vertices && $vector_vertices.length > 2) {
  for (var i = 0; i < $vector_vertices.length; ++i) {
    coords.push($vector_vertices[i].geometry.coordinates[0] + ' ' + $vector_vertices[i].geometry.coordinates[1]);
  }
  coords.push($vector_vertices[0].geometry.coordinates[0] + ' ' + $vector_vertices[0].geometry.coordinates[1]);
  SETRESULT('POLYGON ((' + coords + '))');
} else {
  SETRESULT(null);
}
```

To view the polygon vector geometries in [CARTO](https://carto.com/), you could use the following SQL query, where `polygon_wkt` is the name of the calculation field and `repeatable_vector_geometries` is the name of the table:

```sql
SELECT cartodb_id, ST_Transform (ST_GeomFromText(polygon_wkt, 4326), 3857) AS the_geom_webmercator FROM repeatable_vector_geometries
```

**NOTE** With the release of the [Lines and Polygons feature](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app), you can now set a record's geometry to a `Polygon` or `LineString`, which allows you to view these geometry types from within Fulcrum