---
title: Interactive Web Map with Linked Data Table
excerpt: Use QUERY() to fetch records from a Fulcrum app and display them as an interactive Leaflet map alongside a searchable data table. Clicking a map marker highlights the corresponding table row, and clicking a table row zooms the map to that location.
---

This example shows how to build a fully interactive HTML Report Builder template that combines a Leaflet map with a data table. Records are queried server-side, rendered as map markers, and displayed in a synchronized table. Selecting either a marker or a row cross-highlights the other. A text search filters both views simultaneously, and a mobile button opens the selected record in the Fulcrum mobile app via a URL action.

## Use Cases

- Field inspection or work order status dashboards
- Asset management with location-based filtering
- Any app where managers need to visualize record data geographically and scan it in a table at the same time

## Dependencies

```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

## EJS Report Template

```html
<%
/**
 * Interactive Web Map + Data Table
 *
 * Queries records from a Fulcrum app and renders them as an interactive
 * Leaflet map with a synchronized, searchable data table.
 *
 * Replace "YOUR_APP_TABLE_NAME" with your app's data_name or form_id.
 * Adjust SELECT columns to match your schema. The _latitude and _longitude
 * system columns are always available for any Fulcrum app with GPS enabled.
 */
const rows = QUERY(`
  SELECT
    _record_id,
    _title,
    _latitude,
    _longitude,
    _status,
    _created_at,
    field_a,
    field_b
  FROM "YOUR_APP_TABLE_NAME"
  WHERE _latitude IS NOT NULL
  ORDER BY _created_at DESC
`).rows;
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Record Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    #toolbar {
      background: #2c3e50;
      color: white;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    #search-input {
      flex: 1;
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
    }

    #record-count {
      font-size: 12px;
      opacity: 0.7;
      white-space: nowrap;
    }

    #main {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    #map {
      flex: 1;
      min-width: 0;
    }

    #table-panel {
      width: 380px;
      overflow-y: auto;
      border-left: 1px solid #ddd;
      background: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead th {
      background: #f5f5f5;
      position: sticky;
      top: 0;
      padding: 8px 12px;
      text-align: left;
      border-bottom: 2px solid #ddd;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
    }

    tbody tr {
      cursor: pointer;
      border-bottom: 1px solid #eee;
      transition: background 0.15s;
    }

    tbody tr:hover    { background: #f0f7ff; }
    tbody tr.selected { background: #dbeafe; }

    tbody td {
      padding: 8px 12px;
      vertical-align: top;
    }

    .open-mobile-btn {
      display: inline-block;
      margin-top: 4px;
      padding: 3px 8px;
      background: #3b82f6;
      color: white;
      border-radius: 4px;
      font-size: 11px;
      text-decoration: none;
    }

    .open-mobile-btn:hover { background: #2563eb; }

    /* Highlight selected marker */
    .leaflet-marker-selected {
      filter: hue-rotate(90deg) brightness(1.3);
    }

    @media (max-width: 700px) {
      #main { flex-direction: column; }
      #table-panel { width: 100%; height: 40vh; border-left: none; border-top: 1px solid #ddd; }
      #map { height: 60vh; flex: none; }
    }
  </style>
</head>
<body>

  <div id="toolbar">
    <input id="search-input" type="text" placeholder="Search records…" oninput="filterRecords(this.value)">
    <span id="record-count"></span>
  </div>

  <div id="main">
    <div id="map"></div>
    <div id="table-panel">
      <table>
        <thead>
          <tr>
            <th>Record</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </div>

<script>
// ── Data (injected by EJS server-side) ─────────────────────────────────────
const ALL_RECORDS = <%= JSON.stringify(rows) %>;

// ── Map initialization ─────────────────────────────────────────────────────
const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ── State ──────────────────────────────────────────────────────────────────
let markers       = {};   // record_id → L.Marker
let selectedId    = null;
let visibleRecords = [...ALL_RECORDS];

// ── Render ─────────────────────────────────────────────────────────────────
function renderAll(records) {
  visibleRecords = records;

  // Clear existing markers
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  const bounds = [];

  records.forEach(record => {
    if (!record._latitude || !record._longitude) return;

    const latlng = [parseFloat(record._latitude), parseFloat(record._longitude)];
    bounds.push(latlng);

    const marker = L.marker(latlng).addTo(map);
    marker.bindPopup(`<strong>${record._title || record._record_id}</strong><br>${record._status || ''}`);
    marker.on('click', () => selectRecord(record._record_id));
    markers[record._record_id] = marker;
  });

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  renderTable(records);
  updateCount(records.length);
}

function renderTable(records) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  records.forEach(record => {
    const tr = document.createElement('tr');
    tr.dataset.id = record._record_id;
    if (record._record_id === selectedId) tr.classList.add('selected');

    tr.innerHTML = `
      <td>
        <strong>${record._title || record._record_id}</strong><br>
        <span style="color:#999;font-size:12px;">${record.field_a || ''}</span><br>
        <a class="open-mobile-btn"
           href="fulcrumapp://records/${record._record_id}">
          Open in App
        </a>
      </td>
      <td>${record._status || '—'}</td>
    `;

    tr.addEventListener('click', () => selectRecord(record._record_id));
    tbody.appendChild(tr);
  });
}

// ── Selection ──────────────────────────────────────────────────────────────
function selectRecord(id) {
  selectedId = id;

  // Highlight table row
  document.querySelectorAll('#table-body tr').forEach(tr => {
    tr.classList.toggle('selected', tr.dataset.id === id);
  });

  // Scroll row into view
  const selectedRow = document.querySelector(`#table-body tr[data-id="${id}"]`);
  if (selectedRow) selectedRow.scrollIntoView({ block: 'nearest' });

  // Zoom map to marker
  const marker = markers[id];
  if (marker) {
    map.setView(marker.getLatLng(), 15);
    marker.openPopup();
  }
}

// ── Search ─────────────────────────────────────────────────────────────────
function filterRecords(query) {
  const q = query.toLowerCase();
  const filtered = ALL_RECORDS.filter(r =>
    JSON.stringify(r).toLowerCase().includes(q)
  );
  renderAll(filtered);
}

function updateCount(n) {
  document.getElementById('record-count').textContent =
    `${n} record${n !== 1 ? 's' : ''}`;
}

// ── Bootstrap ──────────────────────────────────────────────────────────────
renderAll(ALL_RECORDS);
</script>
</body>
</html>
```

## How It Works

`QUERY()` fetches records server-side using the Fulcrum SQL API. The `_latitude`, `_longitude`, `_title`, `_status`, and `_record_id` columns are available on every Fulcrum app with location enabled. The result is injected as `ALL_RECORDS` via `JSON.stringify()`.

On the client, Leaflet renders a marker for each record that has coordinates. Clicking a marker highlights the corresponding table row and scrolls it into view. Clicking a table row pans and zooms the map to that marker.

The text search runs `JSON.stringify(record).toLowerCase().includes(q)` — a simple but effective approach that matches against any field value in the record without needing to specify field names.

The **Open in App** link uses the `fulcrumapp://records/{id}` URL scheme, which opens the record directly in the Fulcrum mobile app on iOS and Android.

## Customization

**Custom marker colors:** Replace `L.marker()` with `L.circleMarker()` and vary the `color` option based on `record._status` or another field.

**Clustering:** Add [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) for better performance with large datasets.

**Filter by status:** Add dropdown filters above the table and call `renderAll(filtered)` on change.

**Esri basemap:** Replace the OpenStreetMap tile URL with an Esri tile layer:
```javascript
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri'
}).addTo(map);
```
