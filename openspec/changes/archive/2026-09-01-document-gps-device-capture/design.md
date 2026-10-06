# Design: GPS device capture docs

## Context

`gps_device_capture` is a flexible JSON object on records. OpenAPI already defines `GpsDeviceCaptureBase` (response) and `GpsDeviceCaptureRequest` (create/update, nullable to clear). Known keys: `device_name`, `manufacturer`, `fix_type`, `satellite_count`, `hdop`, `vdop`, `pdop`, `differential_correction`, `antenna_height`, `firmware_version`, `geometry`. Additional device-specific keys are allowed.

Query API form tables expose the value as `_gps_device_capture` (schema v6+). Older form schemas may omit the column.

Ticket “Search API” means the Query API.

## Goals / Non-Goals

**Goals:**

- Make the field discoverable without reading raw OpenAPI.
- Show a realistic create/update/get payload.
- Show JSONB queries on inner keys.
- Update `change-geometry` docs only with verified event data.

**Non-Goals:**

- Schema changes, backend changes, Cypress tests.
- Re-adding `geometry_matches_capture`.
- Inventing Data Events fields that are not in source or published docs.

## Decisions

### 1. Example payload

Use the backend spec example:

```json
{
  "device_name": "Trimble R2",
  "manufacturer": "Trimble",
  "fix_type": "RTK",
  "satellite_count": 14,
  "hdop": 0.8,
  "geometry": { "type": "Point", "coordinates": [-82.637, 27.771] }
}
```

### 2. Query examples

Document `_gps_device_capture` as jsonb. Examples:

```sql
SELECT _record_id, _gps_device_capture
FROM "Form Name"
WHERE _gps_device_capture->>'device_name' = 'Trimble R2';

SELECT _record_id
FROM "Form Name"
WHERE _gps_device_capture @> '{"fix_type": "RTK"}';
```

Note that the column exists on schema v6 form tables.

### 3. change-geometry

`fulcrum-core` only serializes record `gps_device_capture`; it does not define the Data Events payload. `fulcrum-expressions` `GeometryEvent` still types `name` / optional `field` / `value` (GeoJSON).

Verified from mobile clients:

- Android `GeometryChangeEventHelper` and iOS `NMEALocationEventPayload` attach optional top-level `gpsData` as a **sibling of `value`** when external GPS metadata is available.
- iOS event keys are camelCase (`deviceName`, `fixType`, `satellites`). Android `LocationInfo.toMap()` currently emits snake_case (`device_name`, `fix_type`, `satellite_count`) plus `deviceName`.

Public docs MUST:

- Keep `event.value` as the GeoJSON geometry.
- Document optional `event.gpsData` without claiming a single canonical key list.
- Not invent fields beyond `gpsData` / `value` / `field` / `name`.

## File map

- `openspec/changes/document-gps-device-capture/` — this change
- `reference/RECORDS/records-intro.md`
- `reference/RECORDS/records-create.md`
- `reference/rest-api.json` (examples only)
- `reference/QUERY/query-intro.md`
- `docs/DATA EVENTS/data-events-reference/index.md`
- `docs/DATA EVENTS/data-events-reference/data-events-on.md`
