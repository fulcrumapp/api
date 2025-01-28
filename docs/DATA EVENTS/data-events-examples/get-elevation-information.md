---
title: Get elevation information
excerpt: >-
  Similar to automating weather collection, data events allow you to tap into
  any API that supports point coordinates. This example uses the [MapQuest Open
  Elevation
  API](https://developer.mapquest.com/documentation/open/elevation-api/elevation-profile/get/)
  to determine the elevation at the point you are collecting data. It assumes
  you have a numeric (integer) field called `mq_elevation`.
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
function getElevation() {
  var options = {
    url: 'https://open.mapquestapi.com/elevation/v1/profile',
    qs: {
      key: 'your_api_key',
      shapeFormat: 'raw',
      latLngCollection: LATITUDE() + ',' + LONGITUDE()
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      elevation = JSON.parse(body);
      SETVALUE('mq_elevation', elevation.elevationProfile[0].height);
    }
  });
}

ON('change-geometry', getElevation);
```