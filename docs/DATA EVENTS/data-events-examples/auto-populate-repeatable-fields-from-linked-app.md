---
title: Auto-populate repeatable fields from a linked app
excerpt: >-
  Fulcrum's record link field cannot natively auto-populate repeatable sections.
  This data event works around that limitation by serializing the source app's
  repeatable data into a JSON calculation field, transferring it via the record
  link's auto-populate feature, and then deserializing it into the target app's
  repeatable section on load.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Auto-populate repeatable fields from a linked app

## Overview

Fulcrum's **Record Link** field can auto-populate plain fields from a linked record, but it does not support auto-populating **repeatable sections**. This pattern works around that limitation using three components:

1. **A calculation field in the source (linked) app** — serializes the repeatable data to a JSON string.
2. **A text field in the target app** — receives the JSON string via the record link's auto-populate mapping.
3. **A data event in the target app** — watches for the JSON text field to be populated and deserializes it into the target app's repeatable section.

The result is that when a user selects a linked record, the repeatable section in their current record is automatically filled with matching data from the linked record.

> **Note:** If the source app already has records, you will need to open and re-save each one to populate the calculation field for the first time.

## Setup

### Step 1 — Add a calculation field to the source app

Add a **Calculation** field (can be hidden) to the repeatable section you want to export. Use the following expression, replacing `repeatable_field` with the actual `data_name` of your repeatable:

```javascript
SETRESULT(JSON.stringify($repeatable_field));
```

This serializes the entire repeatable array to a JSON string each time the record is saved.

### Step 2 — Set up the record link auto-populate

In the **target app**, add a hidden **Text** field. In the record link field settings, configure it to auto-populate the hidden text field with the value of the calculation field from the source app.

### Step 3 — Add the data event to the target app

Deploy the code below in the target app's Data Events editor.

## Configuration

| Variable | Description |
|---|---|
| `POPULATED_JSON_FIELD` | `data_name` of the hidden text field receiving the JSON |
| `RECORD_LINK_FIELD` | `data_name` of the record link field |
| `REPEATABLE_FIELD` | `data_name` of the repeatable section to populate in this app |

## Code

```javascript
// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const POPULATED_JSON_FIELD = 'populated_json_field'; // hidden text field receiving JSON
const RECORD_LINK_FIELD    = 'record_link_field';    // record link field data_name
const REPEATABLE_FIELD     = 'repeatable_field';     // target repeatable data_name
// ─────────────────────────────────────────────────────────────────────────────

ON('change', POPULATED_JSON_FIELD, () => {
  if (!VALUE(POPULATED_JSON_FIELD)) return;

  // Load the source app's form schema so we can map field keys by data_name
  LOADFORM({ id: FIELD(RECORD_LINK_FIELD).form_id }, (err, result) => {
    if (err) {
      ALERT(INSPECT(err));
      return;
    }

    const sourceRepJson = JSON.parse(VALUE(POPULATED_JSON_FIELD));

    // Map each source repeatable item to the target repeatable's field keys
    const reps = sourceRepJson.map((rep) => {
      const form_values = {};

      FIELDNAMES(REPEATABLE_FIELD).forEach((fieldDataName) => {
        // Find the corresponding field in the source app by data_name
        const sourceField = findElementByDataName(result.form, fieldDataName);
        if (sourceField) {
          form_values[FIELD(fieldDataName).key] = rep.form_values[sourceField.key];
        }
      });

      return { form_values };
    });

    // Write the mapped repeatable items directly to the field
    rawSetValue(REPEATABLE_FIELD, reps);
  });
});

// ─── UTILITIES ───────────────────────────────────────────────────────────────

/**
 * Writes a value directly to a repeatable field by injecting into the results
 * queue. This bypasses the normal SETVALUE limitation for repeatables.
 */
function rawSetValue(dataname, value) {
  const field_key = FIELD(dataname).key;
  CONFIG().results.push({
    type: 'set-value',
    key: field_key,
    value: JSON.stringify(value)
  });
}

/**
 * Recursively searches a form schema object for an element with a matching
 * data_name. Returns the element object if found, or null.
 */
function findElementByDataName(obj, dataName) {
  if (obj.data_name === dataName) return obj;

  if (Array.isArray(obj.elements)) {
    for (const element of obj.elements) {
      const found = findElementByDataName(element, dataName);
      if (found) return found;
    }
  }

  return null;
}
```

## How it works

1. When the user selects a linked record, the record link field auto-populates `POPULATED_JSON_FIELD` with the serialized repeatable JSON from the source app.
2. The `ON('change', POPULATED_JSON_FIELD, ...)` handler fires.
3. `LOADFORM` fetches the source app's schema so we can look up field keys by `data_name`.
4. Each item in the source JSON is mapped to a new repeatable item for the target app, matching fields by `data_name`.
5. `rawSetValue` injects the result directly into the record's form values, bypassing the normal SETVALUE limitation for repeatables.

## Notes

- Fields with the same `data_name` in both apps will be mapped automatically. Fields that exist in the source but not the target are silently ignored.
- This pattern works on both mobile and web.
- If the source and target apps have different field types for the same `data_name`, the value may not transfer correctly — test carefully.
- The `rawSetValue` technique directly manipulates the results queue and should be used with care. It is the only reliable way to programmatically populate a repeatable section.

*Credit: Mike Meesseman*
