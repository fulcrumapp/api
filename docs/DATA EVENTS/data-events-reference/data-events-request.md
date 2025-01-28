---
title: REQUEST
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Performs an HTTP request and executes the callback on completion.

# Description

The REQUEST function is for making external HTTP requests. It's one of the most powerful data event functions and enables you to retrieve external data while filling out a form. It can be combined with the other functions to create very dynamic forms that populate information on-demand from external sources. It contains the necessary options to perform any HTTP request, including support for PUT, POST, etc and custom headers.

# CORS and Web Browser Support

To work in the web browser, URLs fetched using REQUEST _require_ HTTPS & [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). This is not a limitation of Fulcrum - it's just the way modern web browsers work. Since Fulcrum is hosted on a secure website, all requests made from the site must also be secure and respond with the proper headers required by the browser. If you encounter CORS errors when trying to use an API with the REQUEST function, we recommend contacting the API provider and asking them to [add CORS support to their API](http://enable-cors.org). As a last resort, you can use a CORS proxy to proxy requests to URLs that don't support it. <http://cors-anywhere.herokuapp.com/> and <http://cors-proxy.htmldriven.com/> are various CORS proxies. Note that these are not Fulcrum services. Please also note, when using CORS proxies you are effectively exposing everything about a network request to an unknown host. This should be especially considered if sending information like passwords, tokens, etc.

# Parameters

`options` Object (**required**) - The options to pass for the request

`options.url` string (**required**) - The url for the request

`options.method` string (optional)  [default = GET] - The HTTP method for the request (POST, PUT, DELETE, etc.)

`options.followRedirect` boolean (optional)  [default = true] - Should the request follow any redirects

`options.headers` Object (optional)  [default = {}] - An object containing keys and values for additional header items

`options.qs` Object (optional) - An object containing query string parameters (url parameters)

`options.json` Object (optional) - An object to be passed in the request body, must be `JSON.stringify`able

`options.body` string (optional) - The request body to send with a POST or PUT request

`callback` function (**required**) - The function to call when the request is complete - The function is passed `error`, `response`, and `body` parameters

# Examples

```js
// This example looks up the place name from OpenStreetMap when the location changes and fills in a text
// field with the place name. Replace 'place_name' below with a text field on your form.

ON('change-geometry', function(event) {
  var options = {
    url: 'https://nominatim.openstreetmap.org/search/' + LATITUDE() + ',' + LONGITUDE(),
    qs: {
      format: 'json',
      polygon: 1,
      addressdetails: 1
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body);
      if (data.length) {
        SETVALUE('place_name', data[0].display_name);
      }
    }
  });
});
```