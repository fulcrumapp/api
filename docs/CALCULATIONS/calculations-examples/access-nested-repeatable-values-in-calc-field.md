---
title: Access Nested Repeatable Values in a Calculation Field
excerpt: Use the raw form_values object and FIELD() key lookups to traverse a two-level nested repeatable hierarchy directly inside a Calculation field — useful when you need to flatten or summarize deeply nested data that REPEATABLEVALUES() can't reach in a single call.
---

`REPEATABLEVALUES()` extracts a flat array of values for a single field across all rows of a repeatable. When your app has a two-level repeatable hierarchy — a parent repeatable containing a child repeatable — and you need to cross-reference values from both levels in a single Calculation field, you can access the raw `form_values` object directly using `FIELD('data_name').key` lookups.

## How It Works

Each repeatable row in Fulcrum stores its field values in a `form_values` object keyed by each field's internal `key` string. You can retrieve that key at runtime using `FIELD('data_name').key`. This allows you to write portable code that doesn't hard-code fragile internal key strings.

The calculation iterates over rows of an outer repeatable (e.g., `$site`), then for each outer row iterates over a nested inner repeatable (e.g., visits), pulling field values from both levels.

## Calculation Field Code

```javascript
// Replace these data_names with your actual field data_names:
//   $site             — outer repeatable field variable
//   'visit'           — data_name of the inner repeatable field
//   'inspection_date' — field inside the inner repeatable
//   'inspector_name'  — field inside the inner repeatable
//   'notes'           — field inside the inner repeatable
//   'site_id'         — field inside the outer repeatable (for grouping/labeling)
//   'visit_num'       — field inside the inner repeatable (for labeling)

let lines = [];
let output = '';

$site?.forEach((site) => {
  // Access the inner repeatable rows via form_values[key]
  site?.form_values[FIELD('visit').key]?.forEach((visit) => {
    // Only include rows where the 'notes' field has a value
    if (visit.form_values[FIELD('notes').key]) {
      lines.push({
        site_id:    site.form_values[FIELD('site_id').key],
        visit_num:  visit.form_values[FIELD('visit_num').key],
        date:       visit.form_values[FIELD('inspection_date').key],
        inspector:  visit.form_values[FIELD('inspector_name').key],
        note:       visit.form_values[FIELD('notes').key]
      });
    }
  });
});

if (lines.length > 0) {
  lines.forEach((line) => {
    output += `• Site: ${line.site_id}  Visit: ${line.visit_num}  Date: ${line.date || '—'}  Inspector: ${line.inspector || '—'}  Note: ${line.note}\n`;
  });
}

SETRESULT(output);

/* Example output:
 * • Site: A-001  Visit: 1  Date: 2025-03-10  Inspector: Jane Smith  Note: Crack in foundation
 * • Site: A-001  Visit: 2  Date: 2025-03-24  Inspector: Bob Jones   Note: Crack widened
 */
```

## When to Use This vs. REPEATABLEVALUES()

`REPEATABLEVALUES($repeatable, 'data_name')` is the right choice when your repeatable is one level deep and you want parallel arrays for multiple fields. Use the `form_values` approach when:

- You have **two or more levels** of nesting (outer repeatable containing an inner repeatable).
- You need to **correlate values** from the outer and inner level in the same row (e.g., include the parent site ID next to each child visit note).
- You need **conditional filtering** — skipping rows where a specific nested field is empty.

## Key Notes

**`FIELD('data_name').key`** returns the short internal key Fulcrum uses for that field. Using `FIELD()` makes the code portable — if the key ever changes (rare), you only update the data_name string, not hard-coded key values spread through the code.

**Optional chaining (`?.`)** prevents errors when a repeatable row exists but the inner repeatable field hasn't been filled in yet, or when the outer repeatable itself has no rows.

**This runs in a Calculation field.** It does not require a Data Event and fires automatically when the record is opened or any field changes, making it suitable for titles, summary fields, and display-only aggregations.
