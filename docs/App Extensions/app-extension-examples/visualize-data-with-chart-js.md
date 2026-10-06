---
title: Visualize field data with Chart.js
excerpt: >-
  This example shows how to use a Fulcrum App Extension to display an
  interactive chart from field data. It uses Chart.js in an HTML attachment,
  opened via OPENEXTENSION, and sends a result back to the Fulcrum record using
  onMessage.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Visualize field data with Chart.js

This example demonstrates how to build an App Extension that renders an interactive bar chart using [Chart.js](https://www.chartjs.org/). The chart is driven by data collected in the Fulcrum form — the user taps a button, the extension opens a chart view, and can optionally write a result back to the record.

This is useful for giving field workers a real-time visual summary of their collected data. The example loads Chart.js from a CDN, so the device must be online; see [Offline use](#offline-use) to bundle it for offline work.

## How it works

1. A button field (`view_chart`) triggers the `ON('click', ...)` handler.
2. `OPENEXTENSION()` opens an HTML attachment (`survey_chart.html`) with form field values passed as `data`.
3. The HTML file renders a bar chart using Chart.js.
4. When the user taps a "Done" button in the chart view, `onMessage` receives the result and writes it back to a field in the record.

## Data Event Code

```js
/**
 * When the user taps the "View Chart" button, open the chart extension.
 *
 * Replace 'view_chart' with the data name of your button field.
 * Replace the field references ($field_name) with the data names
 * of the fields you want to visualize.
 */
ON('click', 'view_chart', () => {

  OPENEXTENSION({
    // The HTML file must be attached to the form as an attachment file.
    // See the setup section below for instructions.
    url: 'attachment://survey_chart.html',

    // Title shown in the extension header
    title: 'Survey Data Chart',

    // Pass field values to the HTML extension as a data object.
    // These are available in the HTML via Fulcrum.load().
    data: {
      surveyDate: $survey_date,
      locationName: $location_name,
      sampleCount: $sample_count,
      temperatureC: $temperature_c,
      dissolvedOxygen: $dissolved_oxygen_mgl,
      depthM: $depth_m,
      velocityMs: $velocity_ms
    },

    // Receive a result back from the HTML extension.
    // The HTML calls Fulcrum.finish({ result: '...' })
    onMessage: ({ data }) => {
      // Write the result to a field in the record
      // Replace 'review_status' with your target field's data name
      SETVALUE('review_status', data.result);
      ALERT('Chart result saved', `Status set to: ${data.result}`);
    }
  });

});
```

## HTML Extension File (`survey_chart.html`)

The HTML file uses Chart.js loaded from a CDN to render a bar chart. It uses the Fulcrum App Extension bridge (`Fulcrum.load()` and `Fulcrum.finish()`) to receive the data from the Data Event, builds the chart, and provides a button to send a result back.

> **Note:** Because this file uses a CDN-hosted Chart.js, the device must be online when opening the extension. For fully offline use, see the [offline bundling note](#offline-use) below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Survey Data Chart</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 20px;
      background: #f9f9f9;
    }
    h2 {
      color: #333;
      margin-bottom: 4px;
    }
    .subtitle {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
    }
    canvas {
      max-width: 100%;
      height: 350px;
    }
    button {
      margin-top: 20px;
      padding: 12px 28px;
      font-size: 16px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background: #1d4ed8;
    }
  </style>
</head>
<body>

  <h2 id="chart-title">Survey Data Chart</h2>
  <p class="subtitle" id="chart-subtitle"></p>
  <canvas id="surveyChart"></canvas>
  <br>
  <button onclick="sendResult()">Mark as Reviewed</button>

  <!-- Fulcrum App Extension communication bridge.
       This is the standard bridge snippet from the App Extensions introduction
       (https://docs.fulcrumapp.com/docs/app-extensions-introduction). It provides
       Fulcrum.load() and Fulcrum.finish(). Copy the current version from that page. -->
  <script>
  (()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);
  var o=s((a,r)=>{var l=new URLSearchParams(location.search);
  function c(e){try{return JSON.parse(e)}catch(i){return null}}
  r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",
  initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e?.id,Fulcrum.url=e?.url,Fulcrum.data=e?.data,Fulcrum.origin=e?.origin,(i=Fulcrum.onLoadOnce)?.call(Fulcrum)},
  load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},
  send:(e,{close:i=!1}={})=>{var u;e=e||{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};
  (u=window.webkit)?.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):
  window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},
  receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},
  finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?
  window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();
  </script>

  <!-- Load Chart.js from CDN (requires internet connection) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>

  <script>
    let chartData = {};
    let chartInstance = null;

    /**
     * Receive the data object passed from the Data Event's OPENEXTENSION call.
     * Fulcrum.load() fires once the extension has been initialized.
     */
    Fulcrum.load(function ({ data }) {
      chartData = data || {};

      // Update the chart title and subtitle with the received data
      document.getElementById('chart-title').textContent =
        'Survey: ' + (chartData.locationName || 'Unknown Location');
      document.getElementById('chart-subtitle').textContent =
        'Date: ' + (chartData.surveyDate || '');

      // Build the chart once data is received
      renderChart(chartData);
    });

    /**
     * Render a bar chart with the received field values.
     * Customize the labels and data fields to match your form.
     */
    function renderChart(data) {
      const ctx = document.getElementById('surveyChart').getContext('2d');

      // Destroy existing chart instance before creating a new one to prevent stacking and memory leaks
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          // Labels for each measurement
          labels: [
            'Sample Count',
            'Temperature (°C)',
            'Dissolved O₂ (mg/L)',
            'Depth (m)',
            'Velocity (m/s)'
          ],
          datasets: [{
            label: 'Measurements',
            data: [
              parseFloat(data.sampleCount) || 0,
              parseFloat(data.temperatureC) || 0,
              parseFloat(data.dissolvedOxygen) || 0,
              parseFloat(data.depthM) || 0,
              parseFloat(data.velocityMs) || 0
            ],
            backgroundColor: [
              'rgba(37, 99, 235, 0.7)',
              'rgba(220, 38, 38, 0.7)',
              'rgba(5, 150, 105, 0.7)',
              'rgba(217, 119, 6, 0.7)',
              'rgba(124, 58, 237, 0.7)'
            ],
            borderColor: [
              'rgb(37, 99, 235)',
              'rgb(220, 38, 38)',
              'rgb(5, 150, 105)',
              'rgb(217, 119, 6)',
              'rgb(124, 58, 237)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Field Measurements'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    /**
     * Send a result message back to the Fulcrum record.
     * The onMessage handler in the Data Event will receive this.
     */
    function sendResult() {
      // Sends the result to onMessage and closes the extension
      Fulcrum.finish({ result: 'reviewed' });
    }
  </script>

</body>
</html>
```

## Setup

1. Save the HTML above as `survey_chart.html`.
2. In the Fulcrum Form Builder, open your form and go to **Media** → **Attachments**.
3. Upload `survey_chart.html` as a form attachment.
4. The file will be available at `attachment://survey_chart.html` in your Data Event.
5. Add a **Button** field to your form and note its data name (e.g. `view_chart`).
6. Add the Data Event code above, updating the field names to match your form.

> The bridge `<script>` in the HTML is the standard snippet from the [App Extensions introduction](https://docs.fulcrumapp.com/docs/app-extensions-introduction). Copy the current version from there if it changes.

## Offline use

The example above loads Chart.js from a CDN and requires an internet connection. To make the extension work fully offline, download the Chart.js bundle and inline it in the HTML file:

1. Download the minified Chart.js file from [cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js](https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js).
2. In the HTML file, replace the `<script src="...">` tag with a `<script>` tag containing the full minified source inline.
3. The resulting HTML file will be larger (~200KB) but will work without any network connection.
