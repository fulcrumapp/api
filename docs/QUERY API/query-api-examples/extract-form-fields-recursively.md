---
title: Extract All Form Fields Recursively with a CTE
excerpt: Use a recursive Common Table Expression (CTE) over the Fulcrum Query API's system `forms` table to walk the nested JSON element tree of any app and return a flat list of every field's data_name and label — including fields inside sections and repeatables.
---

Fulcrum stores a form's field definitions as a nested JSON array in the `forms` system table. Top-level fields sit directly in `elements`, but fields inside Sections and Repeatables are nested under their own `elements` arrays. A recursive CTE unfolds this tree in a single query, returning every field at any depth.

## Query

```sql
WITH RECURSIVE extracted_elements AS (

  -- Base case: extract top-level fields from the form's elements array.
  SELECT
    f.form_id,
    elem->>'data_name'  AS data_name,
    elem->>'label'      AS label,
    elem->'elements'    AS nested_elements  -- NULL for leaf fields; populated for sections/repeatables
  FROM forms f,
    LATERAL jsonb_array_elements(f.elements::jsonb) AS elem
  WHERE f.form_id = 'YOUR-FORM-ID'     -- Replace with your app's form_id
    AND elem ? 'data_name'             -- Skip structural elements that have no data_name

  UNION ALL

  -- Recursive case: descend into nested elements arrays (sections, repeatables).
  SELECT
    e.form_id,
    nested_elem->>'data_name',
    nested_elem->>'label',
    nested_elem->'elements'
  FROM extracted_elements e,
    LATERAL jsonb_array_elements(e.nested_elements) AS nested_elem
  WHERE nested_elem ? 'data_name'

)
SELECT
  form_id,
  data_name,
  label
FROM extracted_elements
WHERE data_name IS NOT NULL
ORDER BY data_name;
```

## How It Works

The `forms` system table contains one row per Fulcrum app. The `elements` column holds the full field schema as a JSONB array. `jsonb_array_elements()` expands that array into individual rows — one per element — and `->>'data_name'` / `->>'label'` extract the text values from each element object.

The base case selects all top-level elements. Any element that has its own `elements` child array (Sections and Repeatables) carries that array forward in the `nested_elements` column. The recursive case then expands those nested arrays and continues until no further nesting remains (`nested_elements` is NULL for leaf fields).

The final `SELECT` filters to rows where `data_name` is not null, excluding container elements (like Section labels) that don't correspond to data-bearing fields.

## Finding Your Form ID

Run this query to look up form IDs by name:

```sql
SELECT form_id, name FROM forms ORDER BY name;
```

Or find it in the Fulcrum web app URL when viewing an app's records: `https://web.fulcrumapp.com/forms/YOUR-FORM-ID/records`.

## Extending the Query

**Add field type:** Include `elem->>'type' AS field_type` in both the base and recursive SELECT lists to see each field's type (TextField, ChoiceField, PhotoField, etc.).

**Add key:** Include `elem->>'key' AS key` to capture the short key used in report templates and some API responses.

**Filter by type:** Add `WHERE field_type = 'ChoiceField'` to the outer SELECT to narrow results to a specific field type.

**All forms at once:** Remove the `WHERE f.form_id = '...'` clause to extract fields from every form in the organization simultaneously.

## Example Output

| form_id | data_name | label |
|---|---|---|
| 8dd8d007-... | asset_id | Asset ID |
| 8dd8d007-... | inspection_date | Inspection Date |
| 8dd8d007-... | notes | Notes |
| 8dd8d007-... | photos | Photos |
| 8dd8d007-... | defect_type | Defect Type (nested inside a repeatable) |
