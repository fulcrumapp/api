---
title: Dynamic reports with EJS $params
excerpt: >-
  Pass runtime values into a Report Builder template via URL query parameters
  or POST body using $params.query and $params.post. This lets you filter,
  sort, or customize a single report template dynamically without creating
  multiple report templates for different views.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Dynamic reports with EJS $params

## Overview

Fulcrum's Report Builder EJS templates have access to a `$params` object that exposes values passed into the report URL at generation time. This lets you build a single report template that behaves differently depending on the context it's called from — without maintaining multiple templates.

A report is run by calling the report run URL with the template ID, the record to report on, and an API token:

```
https://api.fulcrumapp.com/run/YOUR-TEMPLATE-ID?record_id=YOUR-RECORD-ID&token=YOUR-API-TOKEN
```

This is the same URL the Report Builder uses for its preview. Both `GET` and `POST` are supported, and the token can be sent as the `token` query parameter or an `X-ApiToken` header. Any additional query-string or body values are passed to the template.

There are two ways to pass parameters:

| Method | Variable | How to use |
|---|---|---|
| URL query string (GET) | `$params.query` | Append `&key=value` to the report run URL |
| POST body | `$params.post` | Send a POST request with the values in the body to the report run URL |

## Accessing parameters in a template

```ejs
<%
  // $params.query contains URL query string parameters (GET)
  const statusFilter = $params.query.status || 'all';
  const sortOrder    = $params.query.sort   || 'asc';

  // $params.post contains POST body parameters
  const customTitle  = $params.post.title   || 'Field Report';
%>

<h1><%= customTitle %></h1>
<p>Showing records with status: <strong><%= statusFilter %></strong></p>
```

## Example: filter a QUERY by URL parameter

This example lets you generate the same report filtered to different statuses by changing the URL:

- `https://api.fulcrumapp.com/run/YOUR-TEMPLATE-ID?record_id=YOUR-RECORD-ID&token=YOUR-API-TOKEN&status=approved` → shows approved records
- `https://api.fulcrumapp.com/run/YOUR-TEMPLATE-ID?record_id=YOUR-RECORD-ID&token=YOUR-API-TOKEN&status=pending` → shows pending records
- `https://api.fulcrumapp.com/run/YOUR-TEMPLATE-ID?record_id=YOUR-RECORD-ID&token=YOUR-API-TOKEN` → shows all records (default)

```ejs
<%
  // Only allow known values into the SQL string (see "Security note" below)
  const allowedStatuses = ['approved', 'pending', 'rejected'];
  const statusFilter = allowedStatuses.includes($params.query.status)
    ? $params.query.status
    : null;
  const whereClause  = statusFilter
    ? `AND _status = '${statusFilter}'`
    : '';

  const records = QUERY(`
    SELECT _record_id, _title, _status, inspector_name, _updated_at
    FROM "YOUR_APP_NAME"
    WHERE 1=1 ${whereClause}
    ORDER BY _updated_at DESC
    LIMIT 100
  `);
%>

<h1>Inspection Report</h1>
<% if (statusFilter) { %>
  <p class="filter-note">Filtered by status: <strong><%= statusFilter %></strong></p>
<% } %>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Status</th>
      <th>Inspector</th>
      <th>Updated</th>
    </tr>
  </thead>
  <tbody>
    <% records.rows.forEach(row => { %>
      <tr>
        <td><%= row._title %></td>
        <td><%= row._status %></td>
        <td><%= row.inspector_name %></td>
        <td><%= new Date(row._updated_at).toLocaleDateString() %></td>
      </tr>
    <% }); %>
  </tbody>
</table>
```

## Example: change report title and logo via POST

When triggering a report via the Fulcrum API or a webhook, you can POST form data to customize the report:

```bash
curl -X POST \
  'https://api.fulcrumapp.com/run/YOUR-TEMPLATE-ID?record_id=YOUR-RECORD-ID' \
  -H 'X-ApiToken: YOUR-API-TOKEN' \
  -d 'title=Weekly+Inspection+Summary&logo=https://example.com/logo.png'
```

```ejs
<%
  const reportTitle = $params.post.title || 'Field Report';
  const logoUrl     = $params.post.logo  || null;
%>

<header>
  <% if (logoUrl) { %>
    <img src="<%= logoUrl %>" class="report-logo" />
  <% } %>
  <h1><%= reportTitle %></h1>
</header>
```

## Example: control page layout via parameter

```ejs
<%
  // Pass ?layout=compact or ?layout=full in the URL
  const layout = $params.query.layout || 'full';
%>

<% if (layout === 'compact') { %>
  <style>
    .photo { display: none; }
    .field { font-size: 11px; margin: 2px 0; }
  </style>
<% } %>
```

## Available $params properties

| Property | Type | Description |
|---|---|---|
| `$params.query` | Object | Key/value pairs from the URL query string |
| `$params.post` | Object | Key/value pairs from a POST request body |

All parameter values are strings. Parse them explicitly if you need numbers or booleans:

```ejs
const limit  = parseInt($params.query.limit, 10) || 50;
const showPhotos = $params.query.photos !== 'false'; // default true
```

## Security note

`$params` values come from external input, so never place them directly into a SQL string. The status example above checks the value against an allow-list before using it. If a value can't be allow-listed (for example a free-text project name), at minimum escape single quotes before embedding it:

```ejs
<%
  const rawName  = $params.query.name || '';
  const safeName = rawName.replace(/'/g, "''");   // escape single quotes for SQL
%>
```
