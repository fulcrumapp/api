---
title: Google Maps & Street View Open
excerpt: >-
  [Google Street View](https://www.google.com/maps/streetview/) provides
  panoramic views from positions along many streets in the world. This example
  assumes you have a Hyperlink field with a data name of `show_street_view` and
  shows how you can script a click event to directly open Street View at your
  record location when the button is tapped. **NOTE:** This data event will only
  apply when the geometry type of a record is set to `Point`. Unless you have
  [enabled Lines and
  Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app)
  for your app, the `Point` type will be the only available geometry type for
  records in this app.
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
ON('click', 'show_street_view', function (event) {
  if (LATITUDE() && LONGITUDE()) {
    OPENURL('https://maps.google.com/maps?layer=c&cbll=' + LATITUDE() + ',' + LONGITUDE());
  } else {
    ALERT('No location provided!', 'A location is required to show Street View.')
  }
});
```

Note that the Google Maps app must be installed for this to work on mobile.

Alternatively if you would like to use regular Google Maps for routing to a record location, this example can be used with a Hyperlink field having a data name `open_google_maps` and uses a click event to directly open the Google Maps app at your record location when the button is tapped.

```js
ON('click', 'open_google_maps', function (event) {
  if (LATITUDE() && LONGITUDE()) {
    OPENURL('https://maps.google.com/?q=' + LATITUDE() + ',' + LONGITUDE());
  } else {
    ALERT('No location provided!', 'A location is required to show Google Maps.')
  }
});
```

**NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.