---
title: Pivot App Columns to Rows (EAV Format)
excerpt: Use the Fulcrum Query API's system.columns table and jsonb_each_text() to convert every user-defined field in an app into a separate row, producing a record_id / data_name / value output useful for generic reporting, exports, and schema-agnostic processing.
---

By default, a Fulcrum app query returns one column per field. When you need a schema-agnostic, entity–attribute–value (EAV) layout — where each field value becomes its own row — you can pivot using `system.columns` to discover field names dynamically and `jsonb_each_text()` to explode the record into key/value pairs.

## Query

```sql
WITH cols AS (
  -- Get the data_names of all user-defined fields in this app.
  -- system.columns contains one row per column for each Fulcrum app table.
  SELECT name
  FROM system.columns
  WHERE table_name = 'Your App Name'   -- Replace with your app's exact name (or use form_id)
    AND field_type IS NOT NULL         -- Filters out internal system columns (_record_id, etc.)
)
SELECT
  _record_id,
  q.key   AS data_name,
  q.value AS value
FROM "Your App Name",
  jsonb_each_text(to_jsonb("Your App Name")) AS q
WHERE q.key IN (SELECT name FROM cols)
ORDER BY _record_id, q.key;
```

## Result Shape

| _record_id | data_name | value |
|---|---|---|
| abc-123 | asset_id | A-001 |
| abc-123 | inspection_date | 2025-03-01 |
| abc-123 | notes | Crack in east wall |
| def-456 | asset_id | A-002 |
| def-456 | inspection_date | 2025-03-05 |
| def-456 | notes | (null) |

## How It Works

`system.columns` is a Fulcrum Query API meta-table that describes every column available for every app in the organization. Filtering to `field_type IS NOT NULL` isolates the user-defined fields (text, choice, number, date, etc.) and excludes system columns like `_record_id`, `_status`, and `_created_at`.

`to_jsonb("App Name")` converts the entire current row into a JSONB object. `jsonb_each_text()` then expands that object into `(key, value)` pairs — one pair per column. The `WHERE q.key IN (SELECT name FROM cols)` clause filters to only the user-defined field columns identified by the CTE, dropping internal columns from the output.

## Finding Your App Name

The `table_name` value in `system.columns` matches the app's name as shown in the Fulcrum web interface. To see all available table names:

```sql
SELECT DISTINCT table_name FROM system.columns ORDER BY table_name;
```

## Common Variations

**Include system columns:** Remove the `field_type IS NOT NULL` filter (or add specific system column names like `_status`, `_created_at`) to include record metadata in the output.

**Filter to specific records:** Add `WHERE _record_id IN ('id1', 'id2')` to the outer query to pivot only a subset of records.

**Pivot back to columns:** Use this output as a subquery with `crosstab()` or conditional aggregation to reshape the EAV output back into a wide table with a dynamic or fixed set of columns.

**Filter to non-null values:** Add `AND q.value IS NOT NULL` to the outer `WHERE` clause to suppress empty fields from the output.
