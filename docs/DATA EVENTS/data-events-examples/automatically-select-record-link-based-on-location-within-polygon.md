---
title: Automatically Select Record Link Based on Location within Polygon
excerpt: >-
  This example demonstrates how to import records from another app and
  automatically assign a linked record by determining which polygon the record's
  location falls within. This process allows for better data accuracy by
  automatically selecting records based on location instead of having users
  manually select it.
deprecated: false
hidden: false
metadata:
  title: Automatically Select Record Link Based on Location within Polygon
  robots: noindex
---
```js
let records;

ON('load-record', () => {
  PROGRESS('Loading records ...')
  LOADRECORDS({form_id: '7c54ec71-b155-4f12-8c78-4a956462ac30'}, (err, recordsResponse) => {
    if (err) {
      ALERT(INSPECT(err));
    } else {
      records = recordsResponse.records;
      PROGRESS();
    }
  })
})


ON("change-geometry", () => {
  if (GEOMETRY()) {
    records.forEach((rec) => {
      if (GEOMETRYINTERSECTS(rec.geometry, GEOMETRY())) {
        let record = rec.id;
        SETVALUE('project', [record]);
      }
    })
  }
})
```