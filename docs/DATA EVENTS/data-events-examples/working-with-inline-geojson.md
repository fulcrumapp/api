---
title: Working with inline GeoJSON
excerpt: >-
  This example populates a choice list from an inline GeoJSON Feature
  Collection. The GeoJSON can also be used as a lookup to set other field values
  from the properties of the selected feature.
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
var lookup = {};
var geojson = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "Buffalo"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-78.881948, 42.881924]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "New York"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-73.981963, 40.751925]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Rochester"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-77.621896, 43.172371]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Syracuse"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-76.150014, 43.049994]
    }
  }]
};

ON('load-record', function(event) {
  var features = geojson.features;
  var choices = [];

  for (var i = 0; i < features.length; i++) {
    choices.push({
      label: features[i].properties.name,
      value: features[i].properties.name
    });

    lookup[features[i].properties.name] = {
      lng: features[i].geometry.coordinates[0],
      lat: features[i].geometry.coordinates[1]
    };
  }

  SETCHOICES('geojson_feature', choices);
});

ON('change', 'geojson_feature', function(event) {
  var choice = CHOICEVALUE($geojson_feature);
  SETVALUE('geojson_lat', lookup[choice].lat);
  SETVALUE('geojson_lng', lookup[choice].lng);
});
```