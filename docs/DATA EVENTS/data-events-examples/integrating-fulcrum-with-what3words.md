---
title: Integrating Fulcrum with what3words
excerpt: >-
  [what3words](http://what3words.com/) is a unique combination of just 3 words
  that identifies a 3mx3m square, anywhere on the planet. The [what3words
  API](https://developer.what3words.com/public-api/docs) provides programmatic
  access to convert a 3 word address to coordinates (forward geocoding) and to
  convert coordinates to a 3 word address (reverse geocoding). You can sign up
  for a free what3words API key at
  [https://what3words.com/select-plan](https://what3words.com/select-plan).
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The example below demonstrates how to listen for a `'change-geometry'` event to automatically update a text field (`w3w_address`) with the what3words address for the record's location. It also demonstrates using the [`SETLOCATION`](https://docs.fulcrumapp.com/docs/data-events-setlocation) function to manually update the record's location from a known what3words address.

Both the `getw3w` and `setw3w` functions use the [REQUEST](https://docs.fulcrumapp.com/docs/data-events-request) function to make an API call to what3words to fetch the info we need. The JSON response from the API is parsed and used to update the Fulcrum record accordingly.

**NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.

```javascript w3w API v3
var w3wApiKey = 'my_api_key';

function getw3w() {
  var options = {
    url: 'https://api.what3words.com/v3/convert-to-3wa',
    qs: {
      key: w3wApiKey,
      coordinates: LATITUDE() + ',' + LONGITUDE()
    }
  };

  PROGRESS('Loading', 'Finding the right words...');

  REQUEST(options, function(error, response, body) {
    PROGRESS();
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var result = JSON.parse(body);
      SETVALUE('w3w_address', result.words);
    }
  });
}

function setw3w() {
  if ($w3w_address && $w3w_address.split('.') && $w3w_address.split('.').length == 3) {
    var options = {
      url: 'https://api.what3words.com/v3/convert-to-coordinates',
      qs: {
        key: w3wApiKey,
        words: $w3w_address
      }
    };

    PROGRESS('Loading', 'Finding the location...');

    REQUEST(options, function(error, response, body) {
      PROGRESS();
      if (error) {
        ALERT('Error with request: ' + INSPECT(error));
      } else {
        var result = JSON.parse(body);
        if (result.coordinates) {
          SETLOCATION(result.coordinates.lat, result.coordinates.lng);
          ALERT('Succes!', 'Your position has been updated to: ' + result.coordinates.lat + ', ' + result.coordinates.lng);
        } else if (result.error) {
          ALERT(result.error.code, result.error.message);
        }
      }
    });
  } else {
    ALERT('Error', 'A 3 word address must be provided in the following format: index.home.raft');
  }
}

ON('change-geometry', getw3w);
ON('click', 'update_location', setw3w);
```
```javascript w3w API v2
var w3wApiKey = 'my_api_key';

function getw3w() {
  var options = {
    url: 'https://api.what3words.com/v2/reverse',
    qs: {
      key: w3wApiKey,
      coords: LATITUDE() + ',' + LONGITUDE()
    }
  };

  PROGRESS('Loading', 'Finding the right words...');

  REQUEST(options, function(error, response, body) {
    PROGRESS();
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var result = JSON.parse(body);
      SETVALUE('w3w_address', result.words);
    }
  });
}

function setw3w() {
  if ($w3w_address && $w3w_address.split('.') && $w3w_address.split('.').length == 3) {
    var options = {
      url: 'https://api.what3words.com/v2/forward',
      qs: {
        key: w3wApiKey,
        addr: $w3w_address
      }
    };

    PROGRESS('Loading', 'Finding the location...');

    REQUEST(options, function(error, response, body) {
      PROGRESS();
      if (error) {
        ALERT('Error with request: ' + INSPECT(error));
      } else {
        var result = JSON.parse(body);
        if (result.geometry) {
          SETLOCATION(result.geometry.lat, result.geometry.lng);
          ALERT('Succes!', 'Your position has been updated to: ' + result.geometry.lat + ', ' + result.geometry.lng);
        } else if (result.message) {
          ALERT('w3w message', result.message);
        }
      }
    });
  } else {
    ALERT('Error', 'A 3 word address must be provided in the following format: index.home.raft');
  }
}

ON('change-geometry', getw3w);
ON('click', 'update_location', setw3w);
```
