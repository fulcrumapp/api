---
title: Import Data from an Esri Feature Service into Fulcrum
excerpt: Use Python to query an Esri ArcGIS feature service layer, download all features as JSON, write them to a CSV file, and then import the CSV into Fulcrum — useful for seeding a Fulcrum app with existing GIS data or running periodic syncs from an enterprise GIS.
---

Esri's ArcGIS REST API exposes feature service layers via a `/query` endpoint that returns features as JSON. This script queries all features from a layer, extracts the attribute fields, and writes them to a CSV that can be imported into Fulcrum using the standard CSV importer.

## Prerequisites

```bash
pip install requests
```

## Script

```python
import requests
import csv
import json

# ── Configuration ─────────────────────────────────────────────────────────────
# The base URL of the feature service layer. Format:
#   https://<server>/arcgis/rest/services/<folder>/<service>/FeatureServer/<layer_id>
FEATURE_SERVICE_URL = 'https://services.arcgis.com/YOUR-ORG-ID/arcgis/rest/services/YOUR_SERVICE/FeatureServer/0'
OUTPUT_CSV          = 'esri_features.csv'

# Optional: include geometry as latitude/longitude columns
INCLUDE_GEOMETRY    = True


def fetch_all_features(service_url):
    """
    Fetches all features from an ArcGIS feature service layer using
    offset-based pagination (required for large layers).
    """
    all_features = []
    offset       = 0
    page_size    = 1000   # ArcGIS default max per request

    while True:
        params = {
            'where':         '1=1',           # Return all features
            'outFields':     '*',             # Return all attribute fields
            'returnGeometry': INCLUDE_GEOMETRY,
            'outSR':         '4326',          # WGS 84 lat/lon
            'f':             'json',
            'resultOffset':  offset,
            'resultRecordCount': page_size
        }

        response = requests.get(f"{service_url}/query", params=params, timeout=30)
        response.raise_for_status()
        data = response.json()

        features = data.get('features', [])
        all_features.extend(features)
        print(f"  Fetched {len(all_features)} features so far...")

        # ArcGIS signals "no more pages" via exceededTransferLimit or empty page
        if not data.get('exceededTransferLimit', False) or len(features) < page_size:
            break

        offset += page_size

    return all_features


def features_to_csv(features, output_path):
    """Writes feature attributes (and optional lat/lon) to a CSV file."""
    if not features:
        print("No features to write.")
        return

    # Collect all attribute field names across features
    fieldnames = set()
    for f in features:
        fieldnames.update(f.get('attributes', {}).keys())
    fieldnames = sorted(fieldnames)

    if INCLUDE_GEOMETRY:
        fieldnames = ['latitude', 'longitude'] + fieldnames

    with open(output_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()

        for feature in features:
            row = dict(feature.get('attributes', {}))

            if INCLUDE_GEOMETRY and feature.get('geometry'):
                geom = feature['geometry']
                # Point geometry returns x (longitude) and y (latitude)
                row['longitude'] = geom.get('x')
                row['latitude']  = geom.get('y')

            writer.writerow(row)

    print(f"✅ Wrote {len(features)} rows to {output_path}")


# ── Run ───────────────────────────────────────────────name────────────────────
print(f"Querying {FEATURE_SERVICE_URL}...")
features = fetch_all_features(FEATURE_SERVICE_URL)
print(f"Total features: {len(features)}")
features_to_csv(features, OUTPUT_CSV)
print(f"\nCSV saved to: {OUTPUT_CSV}")
print("Next step: Import this CSV into Fulcrum via Settings → Imports.")
```

## Finding Your Feature Service URL

The feature service URL follows this pattern:

```
https://services.arcgis.com/{org-id}/arcgis/rest/services/{ServiceName}/FeatureServer/{layerIndex}
```

You can find it in ArcGIS Online by opening the feature layer's item page and clicking **View** → **View in Map Viewer** or by navigating to the service's REST endpoint directly and browsing the layer list.

## Importing the CSV into Fulcrum

1. In the Fulcrum web app, go to the app you want to import into.
2. Click the **Import** button and select **CSV**.
3. Upload `esri_features.csv`.
4. Map the CSV columns to your Fulcrum fields. If you included `latitude` and `longitude`, map them to the **Latitude** and **Longitude** system fields to place records on the map.

## Notes

**Pagination:** ArcGIS feature services cap responses at 1,000–2,000 features by default depending on the server configuration. The script uses offset pagination to retrieve all records in multiple requests. If the service sets `maxRecordCount` lower than 1,000, reduce `page_size` accordingly.

**Authentication:** Some feature services require authentication. Pass a token via the `token` query parameter: add `'token': 'YOUR-ARCGIS-TOKEN'` to `params`. Generate a token from your ArcGIS portal or use OAuth2.

**Feature type:** This script handles Point geometry (the most common type for Fulcrum imports). For Line or Polygon features, the geometry extraction logic would need to be adapted to serialize ring coordinates differently.

**Date fields:** ArcGIS stores dates as Unix timestamps in milliseconds. Convert them to ISO 8601 strings before importing if your Fulcrum app uses a Date field: `datetime.utcfromtimestamp(ts / 1000).isoformat()`.
