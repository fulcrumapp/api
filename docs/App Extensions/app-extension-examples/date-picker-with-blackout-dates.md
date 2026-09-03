---
title: Date picker with blackout dates
excerpt: >-
  This App Extension opens a popup calendar that prevents users from selecting
  blacked-out date ranges. Blackout dates are loaded dynamically from a
  separate Fulcrum app using LOADRECORDS, so administrators can manage blocked
  dates without touching the data event code.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Date picker with blackout dates

This example uses an App Extension to display a Flatpickr-powered calendar popup that restricts users from selecting certain dates. Blackout date ranges are stored in a separate Fulcrum app and loaded at runtime via `LOADRECORDS`, so administrators can add or remove blocked dates without updating the Data Event.

When the user clicks a button on the form, `OPENEXTENSION` launches the calendar. The selected date is returned to the form and written to a date field.

## How it works

1. A separate **blackout dates app** stores date range records (start date / end date).
2. On `load-record`, the Data Event fetches those ranges via `LOADRECORDS` and stores them in a variable.
3. When the user clicks the calendar button, `OPENEXTENSION` opens `calendar_picker.html` — a self-contained HTML page that uses [Flatpickr](https://flatpickr.js.org/) to render the calendar.
4. The blackout ranges are passed to the HTML page via the `data` option. Flatpickr disables those date ranges in the calendar.
5. When the user picks a date, the HTML page sends it back via `Fulcrum.finish()`, and the Data Event writes it to an appointment date field.

## Setup

1. Create a **blackout dates app** with two Date fields:
   - `start` — the first day of the blocked range
   - `end` — the last day of the blocked range (inclusive)
   Note the **App ID** and the field keys for `start` and `end`.
2. Upload `calendar_picker.html` (below) as a **Reference File** in your Fulcrum org, or attach it directly to your app.
3. In your data collection app, add:
   - A **Date** field for the appointment result (e.g. data name: `appointment_date`)
   - A **Button** field to trigger the calendar (e.g. data name: `open_calendar`)
4. Add the Data Event code below to the app and update the configuration constants.

> **Note:** The Flatpickr calendar requires an internet connection when using the CDN version below. For fully offline use, replace the CDN links with a locally hosted or embedded copy of Flatpickr.

## Data Event Code

```js
// ─── Configuration ───────────────────────────────────────────────────────────

// App ID of the blackout dates app
const BLACKOUT_FORM_ID = 'YOUR-BLACKOUT-DATES-APP-ID-HERE';

// Field key of the start date field in the blackout app
const START_DATE_KEY = 'start';

// Field key of the end date field in the blackout app
const END_DATE_KEY = 'end';

// Data name of the date field to write the selected appointment date to
const APPOINTMENT_FIELD = 'appointment_date';

// Data name of the button field that opens the calendar
const CALENDAR_BUTTON = 'open_calendar';

// ─── Load blackout ranges on record open ─────────────────────────────────────

let blackoutRanges = [];

ON('load-record', () => {
  LOADRECORDS({ form_id: BLACKOUT_FORM_ID }, (err, result) => {
    if (err) {
      console.log('Error loading blackout dates:', INSPECT(err));
      return;
    }

    // Build an array of { start, end } objects from the loaded records
    blackoutRanges = (result.records || []).map(rec => ({
      start: rec.form_values[START_DATE_KEY] || '',
      end:   rec.form_values[END_DATE_KEY]   || ''
    })).filter(range => range.start && range.end);
  });
});

// ─── Open the calendar extension ─────────────────────────────────────────────

ON('click', CALENDAR_BUTTON, () => {
  if (!blackoutRanges.length) {
    // Allow the calendar to open even if no blackout dates loaded yet
    console.log('No blackout ranges loaded; opening calendar without restrictions.');
  }

  OPENEXTENSION({
    url: 'attachment://calendar_picker.html',
    title: 'Select Appointment Date',
    width: 400,
    height: 500,
    data: {
      blackoutRanges: blackoutRanges,
      today: new Date().toISOString().split('T')[0]
    },
    onMessage: ({ data }) => {
      if (data.selectedDate) {
        SETVALUE(APPOINTMENT_FIELD, data.selectedDate);
      }
    }
  });
});
```

## HTML Extension File (`calendar_picker.html`)

Save the content below as `calendar_picker.html` and attach it to your Fulcrum app as a Reference File. This file is loaded inside the `OPENEXTENSION` popup.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Calendar</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      text-align: center;
      padding: 20px;
      background-color: #f9f9f9;
    }
    h2 { margin-bottom: 10px; }
    #calendar { margin: 0 auto; max-width: 340px; }
    .flatpickr-calendar { margin: 0 auto; font-size: 16px !important; }
    button {
      display: inline-block;
      padding: 10px 18px;
      margin-top: 20px;
      font-size: 16px;
      border-radius: 6px;
      border: none;
      background: #007aff;
      color: white;
      cursor: pointer;
    }
    button:hover { background: #005fcc; }
  </style>

  <!-- Flatpickr date picker library (requires internet connection) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

  <!-- Fulcrum App Extension communication bridge -->
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
</head>

<body>
  <h2>Select Appointment Date</h2>
  <div id="calendar"></div>
  <button id="cancel">Cancel</button>

  <script>
Fulcrum.load(({ data }) => {
  const blackoutRanges = data.blackoutRanges || [];

  // Convert blackout ranges to the format Flatpickr expects for disabled dates
  // Each range disables all dates from start through end (inclusive)
  const disabledDates = blackoutRanges.map(r => {
    const start = new Date(r.start);
    const end = new Date(r.end);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() + 1); // include the full end day

    return { from: start, to: end };
  });

  flatpickr('#calendar', {
    inline: true,
    minDate: data.today,      // Prevent selecting dates in the past
    disable: disabledDates,   // Grey out the blackout date ranges
    dateFormat: 'Y-m-d',      // ISO format compatible with Fulcrum date fields
    onChange: (selectedDates) => {
      if (selectedDates[0]) {
        const selected = selectedDates[0].toISOString().split('T')[0];
        // Send the selected date back to the Data Event and close the extension
        Fulcrum.finish({ selectedDate: selected });
      }
    }
  });

  // Cancel button closes the extension without setting a date
  document.getElementById('cancel').addEventListener('click', () => {
    Fulcrum.finish({});
  });
});
  </script>
</body>
</html>
```

## Notes

- The blackout date ranges are fetched each time the record is opened. If the blackout app is updated while a user has the form open, they will need to close and reopen the record to get the latest dates.
- Flatpickr's `disable` option accepts an array of `{ from, to }` objects. Dates within those ranges are greyed out and unselectable in the calendar UI.
- The `minDate: data.today` setting prevents users from selecting any date in the past.
- The `Fulcrum.finish({ selectedDate })` call sends the result back to the Data Event's `onMessage` handler and closes the extension popup.
