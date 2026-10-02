---
title: Trigger a Data Export via the API
excerpt: Use the Fulcrum Exports API to programmatically kick off a CSV, Excel, or other format export for one or more apps — useful for automated reporting pipelines, scheduled data extracts, and integrations that need fresh Fulcrum data on a regular basis.
---

The Fulcrum Exports API lets you trigger a data export for one or more apps in a single request, returning a job that processes asynchronously. Once complete, the export is available for download from the returned URL.

## Request

```
POST https://api.fulcrumapp.com/api/v2/exports
```

**Headers:**
```
Content-Type: application/json
X-ApiToken: YOUR-API-TOKEN
```

**Body:**
```json
{
  "export": {
    "queries": [
      { "form_id": "YOUR-FORM-ID-1" },
      { "form_id": "YOUR-FORM-ID-2" },
      { "form_id": "YOUR-FORM-ID-3" }
    ],
    "format": "csv"
  }
}
```

## Supported Formats

| Value | Description |
|---|---|
| `csv` | Comma-separated values (one file per app) |
| `xlsx` | Excel workbook |
| `json` | Fulcrum JSON format |
| `geojson` | GeoJSON (includes geometry) |
| `kml` | KML for Google Earth |
| `shp` | Shapefile |

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
            'queries': [
                {'form_id': 'YOUR-FORM-ID'}
            ],
            'format': 'csv'
        }
    }
)
export = response.json()['export']
export_id = export['id']
print(f'Export triggered: {export_id}')

# 2. Poll until complete
while export['status'] != 'complete':
    time.sleep(5)
    export = requests.get(
        f'https://api.fulcrumapp.com/api/v2/exports/{export_id}',
        headers=HEADERS
    ).json()['export']
    print(f'Status: {export["status"]}')

# 3. Download the file
download_url = export['download_url']
print(f'Download URL: {download_url}')
```

## Notes

**Exports process asynchronously.** The initial POST returns immediately with `status: "queued"`. Poll `GET /api/v2/exports/{id}` until `status` is `"complete"` before attempting to download.

**Including multiple form IDs** in the `queries` array produces a single export archive containing one file per app. This is useful for exporting a complete set of related apps in one operation.

**The `download_url`** in the completed export response is a time-limited pre-signed S3 URL. Download the file promptly after the export completes.
