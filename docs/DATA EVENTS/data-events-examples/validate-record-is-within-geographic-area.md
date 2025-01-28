---
title: Validate record is within geographic area
excerpt: >-
  This example uses the
  [INVALID](https://docs.fulcrumapp.com/docs/data-events-invalid),
  [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude), and
  [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude)
  functions to keep records from being saved when their geometry isn't within
  the state of Colorado, a conveniently rectangular state. **NOTE:** The
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
```js
function validateLocation() {
  // The rough bounds of Colorado
  var minLatitude = 36.985;
  var maxLatitude = 40.979;
  var minLongitude = -109.028;
  var maxLongitude = -102.063;

  // The latitude and longitude of the record
  var lat = LATITUDE();
  var lng = LONGITUDE();

  if (!(lat <= maxLatitude && lat >= minLatitude && lng <= maxLongitude && lng >= minLongitude)) {
    INVALID("It looks like this record isn't within the State of Colorado. Please adjust the record's location to be within Colorado.");
  }
}

ON('validate-record', validateLocation);
```