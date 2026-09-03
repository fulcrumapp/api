---
title: Calendar View Report with FullCalendar.js
excerpt: Query date-range records from a Fulcrum app and render them as an interactive monthly calendar using the FullCalendar.js library, with color-coded event types and multi-view navigation.
---

This example shows how to build an HTML Report Builder template that renders Fulcrum records as calendar events using [FullCalendar v3](https://fullcalendar.io/). Records with `date_from` / `date_to` fields are queried server-side, mapped to FullCalendar event objects, and rendered as a color-coded monthly calendar with week and day views.

## Use Cases

- Attendance, leave, and time-off tracking
- Scheduled work orders or inspections across a date range
- Any app where records have start/end dates that benefit from a calendar view

## Dependencies

FullCalendar v3 requires jQuery and Moment.js. Load all three from CDN:

```html
<!-- FullCalendar CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" rel="stylesheet" />

<!-- jQuery (required by FullCalendar v3) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Moment.js (required by FullCalendar v3) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>

<!-- FullCalendar JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
```

## EJS Report Template

```html
<%
/**
 * Calendar View Report
 *
 * Queries records from a Fulcrum app and displays them as calendar events.
 * Each record must have at minimum:
 *   - a date_from field (event start)
 *   - a type or category field (used for color coding)
 *   - a label field (shown as the event title)
 *
 * Replace "YOUR_APP_TABLE_NAME" with your app's data_name or form_id.
 * Adjust the SELECT columns and field references to match your schema.
 */
const rows = QUERY(`
  SELECT
    label_field,
    type_field,
    comment_field,
    date_from,
    date_to
  FROM "YOUR_APP_TABLE_NAME"
`).rows;
%>

<link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>

<div id="calendar"></div>

<script>
$(function () {
  // Inject the server-side query results as a JSON array
  const records = <%= JSON.stringify(rows) %>;

  // Map event type strings to display colors.
  // Customize these to match your app's choice field values.
  function getColorByType(type) {
    const colors = {
      'Excused Absence':    'dodgerblue',
      'Unexcused Absence':  'orangered',
      'Late':               'gold',
      'Scheduled Time Off': 'limegreen',
      'No Call/No Show':    'crimson',
    };
    return colors[type] || 'gray'; // Default for unrecognized types
  }

  // Convert Fulcrum records to FullCalendar event objects
  const events = records.map(record => {
    const startDate = moment(record.date_from).format('YYYY-MM-DDTHH:mm:ss');
    const endDate   = record.date_to
      ? moment(record.date_to).format('YYYY-MM-DDTHH:mm:ss')
      : null;

    return {
      title:           record.label_field,
      start:           startDate,
      end:             endDate,
      overlap:         true,
      backgroundColor: getColorByType(record.type_field),
      description:     record.comment_field || '',
      allDay:          !record.date_from.includes('T'), // No time = all-day
      extendedProps: {
        type: record.type_field,
      },
    };
  });

  // Initialize the FullCalendar widget
  $('#calendar').fullCalendar({
    defaultView:  'month',
    defaultDate:  new Date().toISOString().slice(0, 10),
    header: {
      left:   'prev,next today',
      center: 'title',
      right:  'month,agendaWeek,agendaDay',
    },
    events: events,

    // Optionally append a tooltip description beneath each event title
    eventRender: function (event, element) {
      if (event.description) {
        element.append(
          `<div class="fc-description" style="font-size:0.75em;opacity:0.85;">
             ${event.description}
           </div>`
        );
      }
    },
  });
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Lucida Grande', Helvetica, Arial, Verdana, sans-serif;
  font-size: 14px;
  width: 100% !important;
}
#calendar {
  max-width: 900px;
  margin: 40px auto;
}
</style>
```

## How It Works

The `QUERY()` call runs server-side during EJS rendering and returns an array of row objects. That array is serialized with `JSON.stringify()` and injected directly into the `<script>` block as `records`, so FullCalendar initializes with real data the moment the page loads — no client-side API calls needed.

Each row is mapped to a FullCalendar event object. The `allDay` flag is set automatically: if `date_from` contains a time component, the event is timed; otherwise it spans the full day. The `getColorByType()` function maps choice-field values to colors — adjust the keys to match your app's vocabulary.

FullCalendar renders a standard month grid with prev/next navigation and view toggles (Month / Week / Day).

## Customization

**Add a legend:** Render a color swatch key below the calendar using the same `getColorByType` map.

**Filter by date range:** Add a `WHERE date_from >= '...' AND date_from <= '...'` clause to the QUERY, or use `$params.query` to accept date range filters via URL parameter (see [Dynamic Reports with EJS $params](./dynamic-reports-with-ejs-params.md)).

**FullCalendar v5+:** The v3 API shown here uses jQuery. FullCalendar v5+ has a native JavaScript API without jQuery. The event object shape is the same; initialization changes to:
```javascript
const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), { ... });
calendar.render();
```
