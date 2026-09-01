# Change: Document GPS device capture in API docs

## Why

Integrators need accurate Records v2, Query API, and Data Events docs for `gps_device_capture`. [api#75](https://github.com/fulcrumapp/api/pull/75) added the OpenAPI schema only. [FLCRM-20930](https://fulcrumapp.atlassian.net/browse/FLCRM-20930) still lacks human-readable field docs, request/response examples, Query API JSONB examples, and `change-geometry` event notes.

## What Changes

- Document `gps_device_capture` on the Records API intro properties table.
- Add JSON request/response examples showing flexible, device-dependent metadata.
- Document Query API column `_gps_device_capture` and SQL examples that filter on inner keys.
- Document `change-geometry` event data only where the payload can be verified.
- Do not change the existing OpenAPI schema from api#75. Do not re-document `geometry_matches_capture`.

## Capabilities

### New Capabilities

- `gps-device-capture-docs`: Public developer documentation for GPS device capture on Records v2, Query API, and Data Events.

### Modified Capabilities

- None. This is a documentation-only change in `fulcrumapp/api`.

## Impact

- **Docs site**: Records intro, record create/update examples, Query intro, Data Events reference.
- **OpenAPI**: Example payloads only in `reference/rest-api.json`.
- **Backend / mobile**: No code changes.
