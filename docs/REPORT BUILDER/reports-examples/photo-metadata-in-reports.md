---
title: Display photo EXIF metadata in reports
excerpt: >-
  Use the QUERY function to fetch GPS coordinates, altitude, direction, and
  capture timestamp for each photo in a report, and display that metadata
  alongside the photo image.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Display photo EXIF metadata in reports

## Overview

Fulcrum stores EXIF metadata for every photo captured on mobile — including GPS coordinates, altitude, compass direction, and timestamp. This data lives in the `photos` system table and can be queried in a Report Builder template using `QUERY()`.

This snippet replaces the standard `<img>` block in the default report's photo section with a two-column layout that shows the photo on the left and its metadata on the right.

## Where to add this

This snippet is designed to replace the photo rendering block inside the default Fulcrum report template. Find the section that iterates over `value.items` inside a `isPhotoElement` block and replace the inner `<img>` element with the code below.

The default report structure looks like:

```ejs
<% } else if (element.isPhotoElement) { %>
  ...
  <% value.items.forEach((item, index) => { %>
    <div class='photo-column'>
      <!-- ↓ Replace this block ↓ -->
      <img class="<%= IMAGE_SIZE() %>" src='<%= PHOTOURL(item.mediaID) %>' />
      <!-- ↑ Replace this block ↑ -->
    </div>
  <% }); %>
```

## Code

Replace the `<img>` element inside the photo column loop with the following:

```ejs
<%
  // Fetch EXIF metadata for this specific photo from the photos system table
  const imageData  = QUERY(`SELECT * FROM photos WHERE photo_id = '${item.mediaID}'`);
  const meta       = imageData.rows[0];
  const latitude   = meta.latitude;
  const longitude  = meta.longitude;
  const altitude   = meta.altitude;
  const direction  = meta.direction;

  // Format the capture timestamp to YYYY-MM-DD
  const capturedAt     = new Date(meta.updated_at);
  const formattedDate  = capturedAt.toISOString().split('T')[0];
%>

<div class="photo-container" style="display: flex; align-items: center; justify-content: center; gap: 15px;">

  <img class="<%= IMAGE_SIZE() %>" src="<%= PHOTOURL(item.mediaID) %>" />

  <div class="photo-meta" style="
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    max-width: 300px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
  ">
    <p style="margin: 5px 0;"><strong style="color: #545454;">Latitude:</strong>  <%= latitude  %></p>
    <p style="margin: 5px 0;"><strong style="color: #545454;">Longitude:</strong> <%= longitude %></p>
    <p style="margin: 5px 0;"><strong style="color: #545454;">Altitude:</strong>  <%= altitude  %> m</p>
    <p style="margin: 5px 0;"><strong style="color: #545454;">Direction:</strong> <%= direction %>°</p>
    <p style="margin: 5px 0;"><strong style="color: #545454;">Date:</strong><br><%= formattedDate %></p>
  </div>

</div>
```

## Available photo metadata fields

The `photos` system table contains the following columns you can query:

| Column | Description |
|---|---|
| `photo_id` | UUID matching `item.mediaID` |
| `latitude` | GPS latitude at capture |
| `longitude` | GPS longitude at capture |
| `altitude` | Altitude in meters |
| `direction` | Compass bearing (degrees) |
| `accuracy` | GPS accuracy in meters |
| `updated_at` | Capture timestamp (ISO 8601) |
| `created_by` | Username of the field user |
| `record_id` | The parent record ID |

## Notes

- `QUERY()` is executed server-side during report generation, not in the browser. Each call adds a small amount of rendering time — for reports with many photos, consider batching the query to fetch all photo IDs at once and building a lookup map.
- If a photo was uploaded from a device without GPS (or with location disabled), `latitude` and `longitude` will be `null`. Add a null check before displaying.
- `direction` is the compass bearing the device camera was facing at the moment of capture, not the direction of travel. It may be `null` if the device does not have a compass.
- This snippet works inside both the default report and custom HTML report templates.

*Credit: Diego Caplan, Gus Ferrara, Diego Osorio*
