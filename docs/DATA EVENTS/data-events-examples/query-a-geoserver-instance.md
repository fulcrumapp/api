---
title: Query a GeoServer instance
excerpt: >-
  This example demonstrates how to build an [OGC
  Filter](http://docs.geoserver.org/latest/en/user/filter/filter_reference.html#filter-fe-reference)
  to query a GeoServer WFS instance and use the results in a choice list. For
  this particular example, we want to list all the streets within 100 meters of
  our current location so we can do some field addressing without having to
  enter the street names.
  [MassGIS](https://www.mass.gov/orgs/massgis-bureau-of-geographic-information)
  maintains a GeoServer instance which includes roads from the Massachusetts
  Department of Transportation (MassDOT). We will be querying the
  `massgis:GISDATA.EOTROADS_ARC` layer, parsing the results as GeoJSON, and
  adding the `STREETNAME` property to a choice list. **NOTE:** The
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
ON('change-geometry', function(event) {

  // build spatial "distance within" filter (http://docs.geoserver.org/latest/en/user/filter/filter_reference.html#filter-fe-reference)
  var filter = "<Filter xmlns:gml='http://www.opengis.net/gml'>" +
    "<DWithin>" +
      "<PropertyName>SHAPE</PropertyName>" +
      "<gml:Point srsName='http://www.opengis.net/gml/srs/epsg.xml#4326'>" +
        "<gml:coordinates>" + LONGITUDE() + "," + LATITUDE() + "</gml:coordinates>" +
      "</gml:Point>" +
      "<Distance units='m'>100</Distance>" +
    "</DWithin>" +
  "</Filter>";

  // configure request options
  var options = {
    url: 'https://giswebservices.massgis.state.ma.us/geoserver/wfs',
    qs: {
      request: 'getfeature',
      version: '1.0.0',
      service: 'wfs',
      typename: 'massgis:GISDATA.EOTROADS_ARC',
      propertyname: 'STREETNAME',
      outputformat: 'json',
      filter: filter
    }
  };

  // give the user a loading indicator while it's fetching the data from GeoServer
  PROGRESS('Searching for nearby streets ...');

  // configure the http request
  REQUEST(options, function(error, response, body) {
    PROGRESS();  // dismiss the loading indicator
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body); // parse the JSON response
      var features = data.features; // grab the GeoJSON features
      var streets = []; // array holder for nearby streets
      // loop through the features returned
      for (var i = 0; i < features.length; i++) {
        var streetName = features[i].properties.STREETNAME;
        // if array doesn't already contain streetname, add it
        if (streets.indexOf(streetName) === -1) {
          streets.push(streetName);
        }
      }
      // if we've got some streets, use them in the choice list (sorted alphabetically)
      if (streets.length > 0) {
        SETCHOICES('street_name', streets.sort());
      } else {
        ALERT('No nearby streets found... Are you sure you are in Massachusetts?');
      }
    }
  });
});
```

**NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.