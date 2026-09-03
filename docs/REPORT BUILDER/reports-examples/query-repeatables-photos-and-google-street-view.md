---
title: Query repeatables, photos, and Google Street View
excerpt: >-
  Use the QUERY function in a Report Builder template to pull repeatable records
  and their photo metadata, display each photo alongside a static map pin, and
  link to Google Street View at the photo's GPS coordinates.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Query repeatables, photos, and Google Street View

## Overview

This Report Builder template demonstrates three powerful techniques in a single pattern:

1. **Querying a repeatable child table** — Using `QUERY()` to fetch repeatable records for the current report record directly, with control over ordering.
2. **Rendering photos with captions and GPS metadata** — Each photo is displayed alongside its caption and coordinates pulled from the query result.
3. **Static map + Google Street View link** — For each photo that has GPS coordinates, a `STATICMAP()` pin is rendered beside the photo, with a clickable link to open Google Street View at that location.

## Configuration

Replace `YOUR_APP_NAME/repeatable_data_name` in the query with the actual path to your repeatable. The format is `"App Name/repeatable_field_data_name"`.

Also update the `data_name` references in the query columns to match your app's field names:
- `photo_number` — a numeric or text field used for ordering/labeling photos
- `observation_photo` — the photo field `data_name`
- `observations_details` — a text field for the photo caption

## Template

```ejs
<div class="photo-section">
  <h1 class="field-section-title">Photo Observations</h1>

  <%
  // Query the repeatable table for this record, ordered by photo number
  const observations = QUERY(`
    SELECT *
    FROM "YOUR_APP_NAME/photo_observations"
    WHERE _record_id = '${record.id}'
    ORDER BY photo_number ASC
  `);

  if (observations.rows && observations.rows.length > 0) {
  %>
    <div class="photo-grid">
      <% observations.rows.forEach((obs) => {
        const photoNumber  = obs.photo_number;
        const photoId      = obs.observation_photo ? obs.observation_photo[0] : null;
        const caption      = obs.observations_details;
        const hasLocation  = obs._latitude != null && obs._longitude != null;

        if (!photoId) return; // skip rows with no photo

        // Build a map marker for STATICMAP if we have coordinates
        const marker = hasLocation
          ? `size:mid|color:0xe00606|label:${photoNumber}|${obs._latitude},${obs._longitude}`
          : '';

        const mapOptions = hasLocation ? {
          size: '600x600',
          zoom: 18,
          scale: 2,
          markers: [marker]
        } : {};

        // Build the Google Street View URL
        const streetViewLink = hasLocation
          ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${obs._latitude},${obs._longitude}&heading=0&pitch=0&fov=80`
          : '';
      %>
        <div class="photo-observation">
          <div class="photo-map-container">

            <!-- Photo column -->
            <div class="photo-container">
              <div class="photo-number">Photo #<%= photoNumber %></div>
              <img class="photo" src="<%= PHOTOURL(photoId) %>" alt="Photo <%= photoNumber %>" />
              <div class="photo-info">
                <% if (caption) { %>
                  <div class="photo-caption"><%= caption %></div>
                <% } %>
                <% if (hasLocation) { %>
                  <div class="photo-location">
                    <span class="label">Location:</span>
                    <span class="value"><%= obs._latitude.toFixed(6) %>, <%= obs._longitude.toFixed(6) %></span>
                  </div>
                <% } %>
              </div>
            </div>

            <!-- Map column -->
            <div class="map-container">
              <% if (hasLocation) { %>
                <img class="map <%= SET_MAP_CLASS() %>"
                     src="<%= STATICMAP({...SET_MAP_OPTIONS(), ...mapOptions}) %>"
                     alt="Map for Photo <%= photoNumber %>" />
                <div class="street-view-link">
                  <a href="<%= streetViewLink %>" target="_blank">View on Google Street View</a>
                </div>
              <% } else { %>
                <p class="no-location">No location data available for this photo.</p>
              <% } %>
            </div>

          </div>
        </div>
      <% }); %>
    </div>

  <% } else { %>
    <p>No photo observations found for this record.</p>
  <% } %>
</div>
```

## CSS

```css
.photo-section {
  margin-top: 2em;
}

.photo-observation {
  margin-bottom: 2em;
  page-break-inside: avoid;
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 4px;
}

.photo-map-container {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}

.photo-container {
  flex: 1;
  min-width: 300px;
  position: relative;
}

.photo-number {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
}

.photo {
  width: 100%;
  height: 340px;
  object-fit: cover;
}

.photo-info {
  margin-top: 1em;
}

.photo-caption {
  font-style: italic;
  margin-bottom: 0.5em;
}

.photo-location {
  font-size: 0.9em;
  color: #666;
}

.map-container {
  flex: 1;
  min-width: 300px;
}

.map {
  width: 100%;
  height: 340px;
}

.street-view-link {
  margin-top: 0.5em;
  text-align: right;
}

.street-view-link a {
  color: #0066cc;
  text-decoration: none;
}

.no-location {
  padding: 1em;
  background: #f5f5f5;
  text-align: center;
  color: #666;
}
```

## Notes

- `QUERY()` in a report context runs against the Fulcrum Query API and accepts standard SQL. The table name format for a repeatable is `"App Name/repeatable_data_name"` — both names are case-sensitive.
- `obs.observation_photo` returns an array of photo IDs. `[0]` takes the first photo from each repeatable row. To display multiple photos per row, iterate over the array.
- `STATICMAP()` and `SET_MAP_OPTIONS()` / `SET_MAP_CLASS()` are Report Builder built-ins that generate Google Static Maps API URLs using your org's API key.
- The Google Street View link opens in a new tab. In a printed PDF it will appear as a hyperlink but won't be clickable — consider including the coordinates as plain text for printed output.
- `_latitude` and `_longitude` on repeatable rows refer to the GPS coordinates captured when the repeatable item was created on mobile.

*Credit: Kyle Pennell*
