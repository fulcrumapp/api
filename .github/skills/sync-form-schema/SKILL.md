---
name: sync-form-schema
description: >
  Synchronize the form element OpenAPI schemas in reference/rest-api.json with the upstream
  source of truth in fulcrumapp/fulcrum-schema. Use when: form schemas are out of date, a new
  element type was added to fulcrum-schema, element properties changed, syncing OpenAPI with
  fulcrum-schema, updating FormElement schemas, refreshing form API spec.
---

# Sync Form Schema from fulcrum-schema

This skill keeps the form-related OpenAPI schemas in `reference/rest-api.json` in sync with the
canonical Fulcrum form model defined in `fulcrumapp/fulcrum-schema` and `fulcrumapp/fulcrum-core`.

## Source of Truth

The authoritative form model lives in two GitHub repos:

| Repo | File | What it defines |
|------|------|-----------------|
| `fulcrumapp/fulcrum-schema` | `src/data-elements.js` | Complete list of element `type` enum values |
| `fulcrumapp/fulcrum-schema` | `src/schema.js` | SQL column definitions per element — reveals what fields each type stores |
| `fulcrumapp/fulcrum-schema` | `test/fixtures/form-v5.json` | Real form fixture — definitive JSON shape for all element types |
| `fulcrumapp/fulcrum-core` | `src/form.js` | Form-level attributes (geometry_types, script, projects_enabled, etc.) |
| `fulcrumapp/fulcrum-core` | `src/elements/` | Per-element class attributes |

## OpenAPI Schemas to Keep Current

All schemas live inline in `reference/rest-api.json` under `components.schemas`. The ones that
map to the form model are:

| OpenAPI Schema | Maps From |
|----------------|-----------|
| `FormBaseElement` | Common base properties on all elements (`key`, `data_name`, `label`, `required`, `hidden`, `disabled`, conditions, etc.) |
| `FormElement` | `oneOf` discriminated union — must list ALL element types from `data-elements.js` |
| `FormTextFieldElement` | `TextField` — numeric, format, min, max, pattern, min_length, max_length |
| `FormChoiceFieldElement` | `ChoiceField` — choices, choice_list_id, multiple, allow_other |
| `FormClassificationFieldElement` | `ClassificationField` — classification_set_id, classification_set_schema |
| `FormYesNoFieldElement` | `YesNoField` — positive, negative, neutral, neutral_enabled |
| `FormPhotoFieldElement` | `PhotoField` — min_length, max_length |
| `FormVideoFieldElement` | `VideoField` — track_enabled, audio_enabled |
| `FormAudioFieldElement` | `AudioField` |
| `FormSignatureFieldElement` | `SignatureField` — agreement_text |
| `FormBarcodeFieldElement` | `BarcodeField` |
| `FormDateTimeFieldElement` | `DateTimeField` |
| `FormDateFieldElement` | `DateField` |
| `FormTimeFieldElement` | `TimeField` |
| `FormAddressFieldElement` | `AddressField` — auto_populate |
| `FormHyperlinkFieldElement` | `HyperlinkField` |
| `FormCalculatedFieldElement` | `CalculatedField` — expression, display, default_values |
| `FormRecordLinkFieldElement` | `RecordLinkField` — allow_existing_records, linked_form_id, etc. |
| `FormAttachmentFieldElement` | `AttachmentField` |
| `FormCheckboxFieldElement` | `CheckboxField` |
| `FormDynamicFieldElement` | `DynamicField` |
| `FormLocationFieldElement` | `LocationField` |
| `FormButtonFieldElement` | `ButtonField` |
| `FormSketchFieldElement` | `SketchField` — min_length, max_length |
| `FormLabelElement` | `Label` |
| `FormSectionElement` | `Section` — display, nested elements |
| `FormRepeatableElement` | `Repeatable` — nested elements, title_field_keys, geometry_types |
| `FormStatusField` | Status field — choices (with color), default_value, enabled, read_only |
| `FormBody` | `fulcrum-core/src/form.js` — top-level form attributes |
| `FormRequest` | Wrapper `{ "form": FormBody }` |
| `FormElementCondition` | Visibility/required condition rule |
| `FormElementChoice` | Choice option (label, value, color) |
| `FormClassificationItem` | Hierarchical classification item (recursive) |
| `FormYesNoOption` | Yes/No option shape |
| `FormCalculatedDisplay` | Calculated field display style |

## Sync Workflow

### Step 1 — Fetch Upstream Sources

Read the key source files from GitHub to understand the current state:

```
# Element type list
GET https://raw.githubusercontent.com/fulcrumapp/fulcrum-schema/main/src/data-elements.js

# Column definitions per element (reveals which fields each type stores)
GET https://raw.githubusercontent.com/fulcrumapp/fulcrum-schema/main/src/schema.js

# Real form fixture (authoritative JSON shape for all element types)
GET https://raw.githubusercontent.com/fulcrumapp/fulcrum-schema/main/test/fixtures/form-v5.json

# Form-level attributes
GET https://raw.githubusercontent.com/fulcrumapp/fulcrum-core/main/src/form.js
```

Use `fetch_webpage` or `mcp_github_github_get_file_contents` to retrieve these.

### Step 2 — Diff Against Current Schemas

Compare the upstream source against `reference/rest-api.json`:

1. **New element types**: Check if `data-elements.js` lists any `type` values not yet in the `FormElement.oneOf` array or the `FormBaseElement.properties.type.enum`.
2. **Changed element properties**: For each element type, compare properties in `form-v5.json` against the corresponding `Form*Element` schema. Look for new, removed, or renamed properties.
3. **Form-level attributes**: Compare `form.js` attributes against `FormBody.properties`.
4. **Status field changes**: Check if status field structure changed.

### Step 3 — Apply Updates

For each change identified:

- **New element type**: Create a new `Form{TypeName}Element` schema (allOf base + type-specific properties), add it to `FormElement.oneOf`, and add the type string to `FormBaseElement.properties.type.enum`.
- **Changed properties**: Update the relevant `Form*Element` schema properties.
- **Removed properties**: Remove deprecated properties (flag with a comment in PR description if this is a breaking change).
- **New form-level fields**: Add to `FormBody.properties`.

Use `replace_string_in_file` or `multi_replace_string_in_file`. All schemas must stay inline
in `rest-api.json` — **never use external `$ref` file paths**.

### Step 4 — Validate (MANDATORY)

Per `AGENTS.md`, run ALL of these after any edit to `rest-api.json`:

```bash
# 1. JSON syntax
node -e "const fs = require('fs'); try { JSON.parse(fs.readFileSync('reference/rest-api.json', 'utf-8')); console.log('✅ Valid JSON'); } catch(e) { console.log('❌ Invalid JSON:', e.message); }"

# 2. OpenAPI spec validation
cd reference && npx --yes rdme openapi validate rest-api.json

# 3. VS Code errors
# Use get_errors tool on reference/rest-api.json

# 4. RAW_BODY anti-pattern check (must be 0)
grep -c "RAW_BODY" reference/rest-api.json

# 5. External ref check (must be 0)
grep -c '"./components/schemas' reference/rest-api.json
```

Fix any errors before proceeding.

### Step 5 — Open PR

After validation passes, commit and open a PR:

```bash
git checkout -b chore/sync-form-schema-$(date +%Y%m%d)
git add reference/rest-api.json
git commit -m "chore: sync form element schemas from fulcrum-schema"
gh pr create \
  --base v2 \
  --title "chore: sync form element OpenAPI schemas from fulcrum-schema" \
  --body "Automated sync of form element schemas in reference/rest-api.json from fulcrumapp/fulcrum-schema.

## Changes
<!-- List each schema changed and why -->

## Validation
- [ ] JSON syntax valid
- [ ] OpenAPI spec validates (rdme)
- [ ] No RAW_BODY patterns
- [ ] No external \$ref paths
- [ ] VS Code shows no errors"
```

## Schema Conventions

- **Naming**: `Form{TypeName}Element` for element schemas (PascalCase matching the type string)
- **Structure**: All typed elements use `allOf: [{ $ref: FormBaseElement }, { type: object, properties: { type: { enum: ["TypeName"] }, ...extra props } }]`
- **References**: Internal only — `"$ref": "#/components/schemas/SchemaName"`
- **Recursive refs**: `FormSectionElement` and `FormRepeatableElement` reference `FormElement` for their `elements` arrays — this is intentional and valid
- **Nullable**: Properties that can be null in the API response should include `"nullable": true`
- **Descriptions**: Every property should have a `"description"` explaining its purpose

## Critical Rules (from AGENTS.md)

- **Never use external `$ref` files** — ReadMe won't render them
- **Never add RAW_BODY properties** — anti-pattern
- **Always validate after every change** — even small edits
- **All schemas must be in `components.schemas`** — no inline anonymous schemas in endpoints
