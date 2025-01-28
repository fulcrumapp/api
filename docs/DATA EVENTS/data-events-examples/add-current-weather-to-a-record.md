---
title: Add current weather
excerpt: >-
  This example populates your current weather information into text fields
  automatically based on your location.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This example assumes you've signed up for an API key from [WeatherAPI.com](https://www.weatherapi.com/). WeatherAPI.com has a free tier under 1M calls per month. 

Here we're listening for the `'change-geometry'` event for a record, and then using the [REQUEST](https://docs.fulcrumapp.com/docs/data-events-request) function to make an API call to weatherapi.com. Once we get the response we parse it as JSON and use [SETVALUE](https://docs.fulcrumapp.com/docs/data-events-setvalue) to update the form values listed here.

```js
ON('change-geometry', function (event) {
  const apiKey = 'PLACE API TOKEN HERE'
  const location = `${LATITUDE()},${LONGITUDE()}`
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`

  const options = {
    url: weatherUrl,
  };

  REQUEST(options, function (error, response, body) {
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body);
      SETVALUE('current_temperature', data.current.temp_f)
      SETVALUE('condition', data.current.condition.text)
      SETVALUE('wind_mph', data.current.wind_mph)
      SETVALUE('humidity', data.current.humidity)
      SETVALUE('uv_index', data.current.uv)
    }
  })
});
```

This data event populates weather metrics, but many others are available under [Realtime API](https://www.weatherapi.com/docs/) and could be added as more fields in your app and add the SETVALUE to match.

**NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.