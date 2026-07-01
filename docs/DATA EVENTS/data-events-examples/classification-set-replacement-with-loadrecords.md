---
title: Classification set replacement with LOADRECORDS
excerpt: >-
  Use LOADRECORDS and SETCHOICES to simulate a multi-level classification set
  when you need to capture more than one attribute per selection. Records from a
  linked app drive the choice lists, letting users drill down through cascading
  dropdowns before making a final selection.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Classification set replacement with LOADRECORDS

## Overview

Fulcrum's built-in Classification Set field only returns a single hierarchy of values. When you need to capture **multiple attributes** (e.g. building + component + sub-component) from a lookup table, you can replicate the drill-down experience using a linked app as the data source and LOADRECORDS + SETCHOICES to build cascading choice fields dynamically.

**How it works:**

1. A separate "lookup" app holds every valid combination as individual records (e.g. each record has a `building`, `component`, and `sub_component` field).
2. On `load-record`, all records from the lookup app are fetched into memory.
3. A choice field for the first level (`building`) is populated with unique values from the lookup set.
4. As the user selects each level, the next level's choices are filtered down to only the values that match the current selection.
5. The final selection can then auto-populate other fields in the record (cost codes, specs, etc.) via additional `ON('change', ...)` handlers.

This pattern works entirely offline after the initial load, since LOADRECORDS caches the result set.

## Configuration

Replace the following values before deploying:

| Constant | Description |
|---|---|
| `LOOKUP_APP_ID` | The form ID of your lookup / reference app |
| `'building'` | The `data_name` of the first-level choice field |
| `'component_choice'` | The `data_name` of the second-level choice field |
| `'3150'` | The field **key** in the lookup app for the first-level attribute |
| `'1aba'` | The field **key** in the lookup app for the second-level attribute |

> **Finding field keys:** In your lookup app's Data Events editor, run `ALERT(INSPECT(records[0].form_values))` after the LOADRECORDS callback to see all field keys and their current values.

## Code

```javascript
// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const LOOKUP_APP_ID       = 'YOUR-LOOKUP-APP-ID';
const LEVEL1_FIELD        = 'building';           // data_name of first choice field
const LEVEL2_FIELD        = 'component_choice';   // data_name of second choice field
const LEVEL1_KEY          = '3150';               // field key in lookup app for level 1
const LEVEL2_KEY          = '1aba';               // field key in lookup app for level 2
// ─────────────────────────────────────────────────────────────────────────────

let lookupRecords;

ON('load-record', () => {
  LOADRECORDS({ form_id: LOOKUP_APP_ID }, (err, result) => {
    if (err) {
      ALERT(INSPECT(err));
      return;
    }

    lookupRecords = result.records;

    // Build unique list of level-1 values and populate the first choice field
    const level1Values = lookupRecords
      .map(r => CHOICEVALUE(r.form_values[LEVEL1_KEY]))
      .filter(onlyUnique);

    SETCHOICES(LEVEL1_FIELD, level1Values);
  });
});

ON('change', LEVEL1_FIELD, () => {
  if (ISBLANK(VALUE(LEVEL1_FIELD))) return;

  // Filter lookup records to those matching the current level-1 selection
  const level2Values = lookupRecords
    .filter(r => CHOICEVALUE(r.form_values[LEVEL1_KEY]) === CHOICEVALUE(VALUE(LEVEL1_FIELD)))
    .map(r => CHOICEVALUE(r.form_values[LEVEL2_KEY]))
    .filter(onlyUnique);

  SETCHOICES(LEVEL2_FIELD, level2Values);
});

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
```

## Extending to more levels

Add additional `ON('change', ...)` handlers for each subsequent level, filtering `lookupRecords` further on each step. Each handler re-filters the full `lookupRecords` array using all selections made so far:

```javascript
ON('change', LEVEL2_FIELD, () => {
  if (ISBLANK(VALUE(LEVEL2_FIELD))) return;

  const level3Values = lookupRecords
    .filter(r =>
      CHOICEVALUE(r.form_values[LEVEL1_KEY]) === CHOICEVALUE(VALUE(LEVEL1_FIELD)) &&
      CHOICEVALUE(r.form_values[LEVEL2_KEY]) === CHOICEVALUE(VALUE(LEVEL2_FIELD))
    )
    .map(r => CHOICEVALUE(r.form_values[LEVEL3_KEY]))
    .filter(onlyUnique);

  SETCHOICES(LEVEL3_FIELD, level3Values);
});
```

## Notes

- LOADRECORDS returns up to 20,000 records. For very large lookup tables, consider pre-filtering with a `form_values` query parameter.
- The lookup app can be hidden from end users using project or role restrictions — it only needs to be accessible to the data event context.
- To also auto-populate non-choice fields on final selection (e.g. cost code, description), add a handler on the last level field that finds the matching lookup record and calls `SETVALUE()` for each field.

*Credit: Mike Meesseman*
