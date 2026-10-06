---
title: Functions
excerpt: ""
deprecated: false
hidden: false
metadata:
  title: ""
  description: ""
  robots: index
next:
  description: ""
---

## API

Make a Fulcrum [REST API](https://fulcrum.readme.io/reference) call

### Parameters

`path` String (**required**) - API path

`options` Object - API request options

### Returns

String

### Examples

```js
API("/choice_lists", { qs: { per_page: 1 } });
```

---

## APIREQUEST

Make a synchronous HTTP request. Unlike `API()`, which only makes `GET` requests to the Fulcrum API, `APIREQUEST()` accepts a full request object, so you can use other methods (for example `POST`) and send a body and headers.

### Parameters

`options` Object (**required**) - Request options

- `url` String (**required**) - Request URL
- `method` String - HTTP method, such as `GET` or `POST`
- `headers` Object - Request headers
- `body` String - Request body
- `qs` Object - Query string parameters
- `json` Boolean - Send and expect JSON. The response `body` is then parsed into an object. Otherwise `body` is returned as a string.
- `api` Boolean - Set to `true` to send the report requester's Fulcrum API token with the request. Use this for calls to the Fulcrum API.
- `cache` Boolean - Responses to `api: true` requests may be cached for the duration of a report run. Set to `false` to always make a fresh request.

### Returns

Object - `{ statusCode, body, headers }`

### Examples

```js
// Generate a report for the current record using the Reports API
const response = APIREQUEST({
  url: "https://api.fulcrumapp.com/api/v2/reports.json",
  method: "POST",
  body: JSON.stringify({
    report: {
      record_id: RECORDID(),
      template_id: "YOUR-TEMPLATE-ID",
    },
  }),
  api: true,
  cache: false,
  headers: { "Content-Type": "application/json" },
});

const reportUrl = JSON.parse(response.body).report.url;
```

---

## AUDIOURL

Generate a public audio URL

### Parameters

`id` String (**required**) - The ID of the audio file

`options` Object - `{version: 'original', expires: null}`

### Returns

String

### Examples

```js
AUDIOURL($my_audio_field[0].audio_id, { version: "original" });
```

---

## BUFFER2BASE64

Encode a binary buffer, such as the result of `GETBLOB()`, as a Base64 string. This is useful for embedding a file's contents directly in the report HTML.

### Parameters

`arrayBuffer` ArrayBuffer (**required**) - The binary data to encode

### Returns

String

### Examples

```js
BUFFER2BASE64(GETBLOB("https://learn.fulcrumapp.com/img/branding/fulcrum-icon.png"));
```

---

## FORMATDATE

Format date

### Parameters

`date` Date (**required**) - The date to be formatted

`options` Object - [Intl.DateTimeFormat options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

### Returns

String

### Examples

```js
FORMATDATE(new Date());
```

---

## GET

Simple HTTP GET, synchronous

### Parameters

`url` String (**required**) - Request URL

`options` Object - Request options

### Returns

String

### Examples

```js
GET("https://jsonplaceholder.typicode.com/posts", { qs: { userId: 1 } });
```

---

## GETBLOB

Simple HTTP GET, returns ArrayBuffer, synchronous

### Parameters

`url` String (**required**) - Request URL

`options` Object

### Returns

String

### Examples

```js
GETBLOB("https://learn.fulcrumapp.com/img/branding/fulcrum-icon.png");
```

---

## JSONREQUEST

Similar to GET but auto parses JSON

### Parameters

`options` Object - Request options

### Returns

String

### Examples

```js
JSONREQUEST({
  url: "https://jsonplaceholder.typicode.com/posts",
  qs: { userId: 1 },
});
```

---

## LOG

Log something, appears in the output of reports for debugging

### Parameters

`string` String (**required**) - The thing to log

### Returns

String

### Examples

```js
LOG("Hello World");
```

---

## PHOTOURL

Generate a public photo URL

### Parameters

`id` String (**required**) - The ID of the photo

`options` Object - `{version: 'large', expires: null}`

### Returns

String

### Examples

```js
PHOTOURL($my_photo_field[0].photo_id, { version: "thumb" });
```

---

## QS

Generate a query string from an object (no need to string concat)

### Parameters

`object` Object (**required**) - The parts of the query string

### Returns

String

### Examples

```js
QS({name: "Robert", age: "20"}

// name=Robert&age=20
```

---

## QUERY

Run a SQL query on the Query API

### Parameters

`sql` String (**required**) - SQL query

`options` Object

### Returns

String

### Examples

```js
QUERY("SELECT name FROM forms", { format: "json" });
```

---

## QUERYVALUE

Run a SQL query on the Query API and return the first column of the first row (or null). Simple helper for returning scalar values.

### Parameters

`sql` String (**required**) - SQL query

### Returns

String

### Examples

```js
QUERYVALUE(`SELECT form_id FROM forms WHERE name = '${form.name}'`);
```

---

## RENDER

The RENDER function is created automatically in all new advanced report templates. It is like RENDERVALUES, but provides additional context on nesting fields like repeatables and sections. The function recursively iterates through all elements of the form and executes whatever the user has set as the `eachFunction` on all of the fields, which is also defined in the report builder.

### Parameters

`feature` Record or RepeatableItemValue (**required**) - The feature you are looking to render.

`options` System level variable that does not need to be defined.

`eachFunction` Function(element, value) (**required**) - The render function for each element, defined via callback in the advanced report.

`container`, `parent`, `index`, and `allValues` Defined in the code based on the original feature.

### Function Definition

```javascript
const RENDER = (
  feature,
  options,
  eachFunction,
  { container, parent, index, allValues } = {}
) => {
  if (!container) {
    container = feature.formValues.container;
  }

  if (!allValues) {
    allValues = feature.formValues;
  }

  for (const element of container.elements) {
    const formValue = feature.formValues.get(element.key);

    const renderSection = element.isSectionElement
      ? () => {
          global.RENDER(feature, options, eachFunction, {
            container: element,
            parent,
            feature,
            index,
            allValues,
          });
        }
      : null;

    const renderRepeatableItems = element.isRepeatableElement
      ? (eachItemFunction) => {
          if (!formValue) {
            return;
          }

          for (let i = 0; i < formValue.items.length; ++i) {
            const item = formValue.items[i];

            const newAllValues = allValues.copy();

            newAllValues.merge(item.formValues);
            newAllValues.merge(feature.formValues); // Add parent values too

            const renderItem = () => {
              global.RENDER(item, options, eachFunction, {
                container: element,
                parent: feature,
                feature: item,
                index: i,
                allValues: newAllValues,
              });
            };

            eachItemFunction({
              element,
              value: item,
              renderItem,
              container: element,
              parent: feature,
              feature: item,
              index: i,
              allValues: newAllValues,
            });
          }
        }
      : null;

    if (eachFunction) {
      eachFunction({
        element,
        value: formValue,
        renderSection,
        renderRepeatableItems,
        container,
        feature,
        index,
        parent,
        allValues,
      });
    }
  }
};
```

---

<br />

## RENDERVALUES

Recurse the form values to render dynamic reports

### Parameters

`feature` Feature (**required**) - The record of the report. Can also accept repeatable values.

`options` Object - Rendering options (`{recurseSections: true, recurseRepeatables: true}`).

`eachFunction` Function(element, value) (**required**) - The render function for each element.

### Returns

JSON - the feature `elements` and `values`

### Examples

```html
<% RENDERVALUES(record, null, function(element, value) { %>
  <% if (element.isSectionElement) { %>
    <h1 class="field-section"><%= element.label %></h1>
  <% } else if (element.isRepeatableElement) { %>
    <% if (value.length) { %>
      <h1 class="field-section"><%= element.label %> <%= value && `(${value.displayValue})` %></h1>
    <% } else { %>
      <h1 class="field-section"><%= value && value.displayValue %></h1>
    <% } %>
  <% } else if (element.isPhotoElement) { %>
    <div class="field">
      <h2 class="field-label"><%= element.label %></h2>
      <div class="field-value">
        <% value && value.items.forEach((item, index) => { %>
          <img class="photo" src="<%= PHOTOURL(item.mediaID) %>" />
          <% if (item.caption) { %>
            <p><%= item.caption %></p>
          <% } %>
        <% }); %>
      </div>
    </div>
  <% } else if (element.isSketchElement) { %>
    <div class="field">
      <h2 class="field-label"><%= element.label %></h2>
      <div class="field-value">
        <% value && value.items.forEach((item, index) => { %>
          <img class="sketch" src="<%= SKETCHURL(item.mediaID) %>" />
        <% }); %>
      </div>
    </div>
  <% } else if (element.isSignatureElement) { %>
    <div class="field">
      <h2 class="field-label"><%= element.label %></h2>
      <% if (value && !value.isEmpty) { %>
        <div class="field-value">
          <img class="signature" src="<%= SIGNATUREURL(value.id) %>" />
          <% if (value.timestamp) { %>
            <p><%= element.agreementText %></p>
            <p>Signed <%= FORMATDATE(value.timestamp) %></p>
          <% } %>
        </div>
      <% } %>
    </div>
  <% } else if (element.isRecordLinkElement) { %>
    <div class="field">
      <h2 class="field-label"><%= element.label %></h2>
      <% if (value && !value.isEmpty) { %>
        <div class="field-value"><%= value.items.map(item => item.displayValue).join(", ") %></div>
      <% } %>
    </div>
  <% } else { %>
    <div class="field">
      <h2 class="field-label"><%= element.label %></h2>
      <div class="field-value pre"><%= value && value.displayValue %></div>
    </div>
  <% } %>
<% }) %>
```

---

<br />

## SIGNATUREURL

Generate a public signature URL

### Parameters

`id` String (**required**) - The ID of the signature file

`options` Object - `{version: 'original', expires: null}`

### Returns

String

### Examples

```js
SIGNATUREURL($my_signature_field.signature_id, { version: "original" });
```

---

<br />

## SKETCHURL

Generate a public sketch URL

### Parameters

`id` String (**required**) - The ID of the sketch

`options` Object - `{version: 'large', expires: null}`

### Returns

String

### Examples

```js
SKETCHURL($my_sketch_field[0].mediaID, { version: "large" });
```

---

## STATICMAP

Generate a Google or Esri Static Map based on the value of the report template’s Map Engine.

### Parameters

`options` object (**required**) - [Google Static Maps API options](https://developers.google.com/maps/documentation/maps-static/dev-guide) `{center, zoom, size, scale, format, maptype, markers, path}`

To change the map engine in the STATICMAP function directly, update the options passed into the parameters of the STATICMAP function:

`<%= STATICMAP({mapEngine: 'esri', markers, ...SET_MAP_OPTIONS()}) %>`

### Returns

String

### Examples

```js Google
STATICMAP({mapEngine: 'google',markers: '34.052230,-118.243680', maptype: 'hybrid', size: '300x300'})
```

```js Esri
<img src="<%= STATICMAP({mapEngine: 'esri', ...SET_MAP_OPTIONS()}) %>" />
```

```html
<img
  src="<%= STATICMAP({markers: '34.052230,-118.243680', maptype: 'hybrid', size: '300x300'}) %>"
/>
```

---

## TOJSON

JSON.stringify helper

### Parameters

`json` JSON object (**required**)

### Returns

String

### Examples

```js
TOJSON(API("/choice_lists").choice_lists[0].name);
```

---

## VIDEOURL

Generate a public video URL

### Parameters

`id` String (**required**) - The ID of the video file

`options` Object - `{version: 'original', expires: null}`

### Returns

String

### Examples

```js
VIDEOURL($my_video_field[0].video_id, { version: "original" });
```
