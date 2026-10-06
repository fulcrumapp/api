# gps-device-capture-docs Specification

## Purpose

Developer documentation for `gps_device_capture` on Records API v2, Query API, and Data Events.

## Requirements

### Requirement: Records intro documents gps_device_capture

The Records API intro properties table SHALL include `gps_device_capture` as an optional object. The description SHALL state that it is flexible device-dependent GPS metadata, additional keys are allowed, and `null` clears the value on write.

#### Scenario: Integrator looks up record properties

- **WHEN** a developer reads Records API intro
- **THEN** they see `gps_device_capture` listed with type object and a short description of known keys (`device_name`, `manufacturer`, `fix_type`, `satellite_count`, `hdop`, `vdop`, `pdop`, `geometry`)

### Requirement: Request and response examples include GPS metadata

Create/update request examples and get-record response examples SHALL include a `gps_device_capture` object with device-dependent keys and nested GeoJSON `geometry`.

#### Scenario: Create record example includes GPS capture

- **WHEN** a developer copies the create-record example
- **THEN** the JSON includes `gps_device_capture` with at least `device_name`, `manufacturer`, `fix_type`, `satellite_count`, `hdop`, and `geometry`

### Requirement: Query API documents JSONB filtering

The Query API form system-columns table SHALL include `_gps_device_capture` (jsonb). Docs SHALL include SQL examples that filter on inner keys with `->>` and `@>`.

#### Scenario: Query records by device name

- **WHEN** a developer wants records from a Trimble R2
- **THEN** docs show `WHERE _gps_device_capture->>'device_name' = 'Trimble R2'`

#### Scenario: Query records by fix type containment

- **WHEN** a developer wants RTK fixes
- **THEN** docs show `WHERE _gps_device_capture @> '{"fix_type": "RTK"}'`

### Requirement: change-geometry documents added event data

Data Events `change-geometry` docs SHALL keep `event.value` as the GeoJSON geometry and SHALL document optional top-level `event.gpsData` (sibling of `value`) when external GPS metadata is available. Docs SHALL NOT invent a canonical key list inside `gpsData`.

Verified: Android `GeometryChangeEventHelper`; iOS `NMEALocationEventPayload` event destination. Gaps: `fulcrum-core` has no Data Events payload; `fulcrum-expressions` `GeometryEvent` does not declare `gpsData`; iOS camelCase vs Android snake_case keys.

#### Scenario: Developer handles geometry changes

- **WHEN** a developer reads `change-geometry` in the Data Events reference or `ON` docs
- **THEN** they still see `ON('change-geometry', callback)`
- **AND** they learn that `event.value` is the geometry and `event.gpsData` may be present
- **AND** they are pointed to record `gps_device_capture` for persisted snake_case metadata

### Requirement: OpenAPI schema is not rewritten

This change SHALL NOT remove or rename `GpsDeviceCaptureBase` / `GpsDeviceCaptureRequest`. It SHALL NOT document `geometry_matches_capture`.
