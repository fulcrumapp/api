---
title: Create an Export
excerpt: >-
  Trigger a data export for an app or a SQL query
api:
  file: rest-api.json
  operationId: exports-create
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Exports are processed asynchronously. The request returns immediately with the new export. Poll [Get an Export](https://docs.fulcrumapp.com/reference/exports-get) until `state` is `completed` (or `failed`), then download the file from the `file` URL. Exports expire 7 days after they are created.

This is useful for automated reporting pipelines, scheduled data extracts, and integrations that need fresh Fulcrum data on a regular basis.

## Request body

```json
{
  "export": {
    "queries": [
      { "form_id": "YOUR-FORM-ID" }
    ],
    "format": "csv",
    "options": {
      "use_labels_as_headers": false
    }
  }
}
```

Each entry in `queries` is either `{ "form_id": "..." }` to export an app, or `{ "name": "...", "sql": "..." }` to export the results of a [Query API](https://docs.fulcrumapp.com/reference/query-intro) SQL statement. At least one query is required.

## Supported formats

| Value | Description |
|---|---|
| `csv` | Comma-separated values |
| `xlsx` | Excel workbook |
| `shp` | Shapefile |
| `kml` | KML |
| `geojson` | GeoJSON |
| `json` | JSON |
| `sqlite` | SQLite database |
| `spatialite` | SpatiaLite database |
| `geopackage` | GeoPackage |
| `gdb` | File geodatabase |
| `postgres` | PostgreSQL SQL script |
| `none` | Media only. Requires at least one `include_*` media option. |

## Example with curl

```bash
curl -X POST https://api.fulcrumapp.com/api/v2/exports \
  -H "Content-Type: application/json" \
  -H "X-ApiToken: YOUR-API-TOKEN" \
  -d '{
    "export": {
      "queries": [
        { "form_id": "YOUR-FORM-ID" }
      ],
      "format": "csv"
    }
  }'
```

## Example with Python

```python
import requests
import time

API_TOKEN = 'YOUR-API-TOKEN'
HEADERS   = {'Content-Type': 'application/json', 'X-ApiToken': API_TOKEN}

# 1. Trigger the export
response = requests.post(
    'https://api.fulcrumapp.com/api/v2/exports',
    headers=HEADERS,
    json={
        'export': {
            'queries': [{'form_id': 'YOUR-FORM-ID'}],
            'format': 'csv'
        }
    }
)
response.raise_for_status()
export = response.json()['export']
export_id = export['id']
print(f'Export triggered: {export_id}')

# 2. Poll until the export finishes
while export['state'] not in ('completed', 'failed'):
    time.sleep(5)
    export = requests.get(
        f'https://api.fulcrumapp.com/api/v2/exports/{export_id}',
        headers=HEADERS
    ).json()['export']
    print(f'State: {export["state"]}')

if export['state'] == 'failed':
    raise SystemExit(f'Export failed: {export.get("error")}')

# 3. Download the file
download_url = export['file']
print(f'Download URL: {download_url}')
```
