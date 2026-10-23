# FastFill Forms API documentation

## Purpose

Describe the Forms API's saved FastFill configuration and response-only effective-access states.

## MODIFIED Requirements

### Requirement: Photo request and response modes are distinct

The OpenAPI contract SHALL allow only `generic` and `text_extraction` for saved Photo FastFill configuration in create/update requests. Photo FastFill responses MAY include `off` when configuration exists but effective access is unavailable. Responses SHALL preserve the saved `target_fields`.

#### Scenario: Create or update a Photo field

- **WHEN** a client submits `fastfill_settings`
- **THEN** the request schema allows `generic` and `text_extraction`
- **AND** the request schema does not allow `off`

#### Scenario: Read configured Photo FastFill without effective access

- **WHEN** Photo FastFill configuration exists but effective access is unavailable
- **THEN** the response may return `type: off`
- **AND** the response retains the saved `target_fields`

### Requirement: Audio effective access is read-only and conditionally omitted

The `FormData.fastfill_audio_enabled` property SHALL be marked read-only, SHALL describe effective access, and SHALL state that it is omitted from responses requested with `basic_info=true`.

#### Scenario: Read a detailed form response

- **WHEN** a form is returned without `basic_info=true`
- **THEN** the response may include `fastfill_audio_enabled` as an effective-access value

#### Scenario: Read a basic-info form response

- **WHEN** a form is returned with `basic_info=true`
- **THEN** `fastfill_audio_enabled` is omitted

### Requirement: Existing response schema coverage is preserved

The list, single-form, and history response schemas SHALL continue to reference the form response shape containing the FastFill response semantics. The OpenAPI contract SHALL not introduce a separate duplicated basic-info form schema solely to model conditional omission of `fastfill_audio_enabled`.

#### Scenario: Read forms through list, single, and history endpoints

- **WHEN** a client inspects the OpenAPI schemas for these endpoints
- **THEN** the responses reference the updated form response schemas

### Requirement: Forms API behavior remains unchanged

This documentation change SHALL NOT modify Rails API request parsing, serialization, validation, or persistence behavior.

#### Scenario: FastFill documentation is updated

- **WHEN** the OpenAPI contract changes
- **THEN** the change is limited to documentation schemas and descriptions
- **AND** Rails request handling and response behavior remain unchanged
