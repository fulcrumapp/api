# Design: FastFill Forms API response semantics

## Context

FLCRM-22922 requires response documentation for effective Audio access and the Photo `off` state, with updated schemas referenced by list, single-form, and history responses. The Rails Forms API uses `basic_info=true` to omit `fastfill_audio_enabled`; normal list and single-form templates include it. `Form::PhotoField#to_hash` emits saved FastFill settings, and `from_json` copies them from input. The form validator's `PHOTO_FASTFILL_TYPES` permits only `generic` and `text_extraction`, so submitting `off` is invalid.

## Decisions

### 1. Use request-specific Photo element schemas

Keep `FormPhotoFieldElement` and `FormElement` as response schemas, including `off`. Add a request-specific Photo schema and request element union. Request-specific repeatable and section schemas preserve request restrictions recursively in nested elements. This is required because `FormBody` accepts `FormElement` and otherwise advertises `off` as writable even though the validator rejects it.

### 2. Mark effective Audio state read-only

`FormBody.fastfill_audio_enabled` remains the write-only saved setting. `FormData.fastfill_audio_enabled` is the response read model and is marked `readOnly`. Its description explicitly states that it is absent when `basic_info=true`.

### 3. Do not add a separate basic-info form schema

The same list and single-form endpoints have detailed and `basic_info=true` render paths. A second form schema would duplicate the broad response shape just to express one omitted property. Keep the property optional on `FormData`, mark its conditional omission, and retain the existing schema references for list, single-form, and history responses.

### 4. Keep prose concise

Keep the FastFill property descriptions short and structured so the raw OpenAPI remains maintainable without adding escaped line breaks to the JSON strings.

## Verification evidence

- `app/views/api/v2/forms/attributes.rabl` includes `fastfill_audio_enabled` only when `basic_info` is not true.
- `app/views/api/v2/forms/index.rabl` and `show.rabl` use the shared base/attributes templates and omit form elements for basic-info responses.
- `app/classes/form/photo_field.rb` copies settings from request JSON and emits non-empty settings in `to_hash`.
- `app/models/validators/form/photos.rb` permits only `generic` and `text_extraction` for submitted Photo FastFill settings.
- `spec/classes/form/photo_field_spec.rb` verifies settings survive parse and re-serialization.

These Rails sources were inspected read-only in `fulcrumapp/fulcrum` at the default-branch snapshot available during this review. No Rails behavior is changed by this API documentation change.
