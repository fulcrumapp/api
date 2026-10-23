# Change: Document FastFill Forms API response semantics

## Why

FLCRM-22922 tracks the Forms API contract documentation in PR #100. Open review threads identify ambiguity between saved Photo FastFill configuration and the response-only `off` state, and between a saved Audio setting and effective access in form responses.

## What Changes

- Separate Photo FastFill request and response schemas so requests accept only saved modes while responses can include `off`.
- Mark effective `FormData.fastfill_audio_enabled` as read-only and clarify its omission from basic-info responses.
- Keep the existing `FormData` schema shared across detailed and basic-info responses; document its endpoint-dependent optional fields instead of duplicating the whole form shape.
- Leave Rails behavior unchanged.

## Capabilities

### Modified Capabilities

- `fastfill-forms-api-docs`: Accurate FastFill request and response semantics in Forms API OpenAPI schemas.

## Impact

- `reference/rest-api.json` only; API implementation behavior is not changed.
