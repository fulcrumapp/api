---
title: Query Esri REST services
excerpt: >-
  This example passes your Fulcrum latitude and longitude as a point parameter
  in an Intersect query against data hosted on an Esri REST Service. Three text
  fields are required in the app, for the particular properties we're interested
  in here. **NOTE:** The
  [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and
  [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude)
  functions will only return values if a record's geometry type is set to
  `Point`, and there is a
  [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata)
  set. Unless you have [enabled Lines and
  Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app)
  for your app, the `Point` type will be the only available geometry type for
  records in the app.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
``` js
function getFloodInfo() {

  var options = {
    url: 'https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHLWMS/MapServer/28/query',
    qs: {
      geometry: LONGITUDE() + ',' + LATITUDE(),
      geometryType: 'esriGeometryPoint',
      inSR: '4326',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      returnGeometry: false,
      f: 'pjson'
    }
  };

  REQUEST(options, function (err, res, body) {
    if (err) {
      ALERT('Error: ' + err.message);
    } else {
      var result = JSON.parse(body);
      if (result && result.features[0]) {
        SETVALUE('flood_zone', result.features[0].attributes['FLD_ZONE']);
        SETVALUE('flood_zone_subtype', result.features[0].attributes['ZONE_SUBTY']);
        SETVALUE('dfirm_id', result.features[0].attributes['DFIRM_ID']);
      } else {
        SETVALUE('flood_zone', 'NA');
        SETVALUE('flood_zone_subtype', 'NA');
        SETVALUE('dfirm_id', 'NA');
      }
    }
  });
}

ON('change-geometry', getFloodInfo);
```