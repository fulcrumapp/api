---
title: Compare photo location to record location
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
This example demonstrates how to compare the geotagged location of an attached photo with the location of the record to alert the user if there may be an issue. **NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.

![](https://files.readme.io/ce5ecdd-23bc3ed-compare-photo-location.gif "23bc3ed-compare-photo-location.gif")

```js
// source: https://www.geodatasource.com/developers/javascript
function findDistance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

function validateDistance(event) {
  if (event.value.latitude && event.value.longitude) {
    var kilometers = findDistance(event.value.latitude, event.value.longitude, LATITUDE(), LONGITUDE(), 'K');
    var meters = Math.round(kilometers * 1000);
    if (meters > 20) {
      ALERT('This photo is over 20 meters from the record location. (' + meters + ' meters)');
    }
  }
}

ON('load-record', function(event) {
  // loop through the photo fields
  DATANAMES('PhotoField').forEach(function(dataName) {
    // listen for add-photo event
    ON('add-photo', dataName, validateDistance);
  });
});
```
