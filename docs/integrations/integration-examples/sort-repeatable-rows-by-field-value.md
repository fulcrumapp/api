---
title: Sort Repeatable Rows by Field Value via the API
excerpt: Use the Fulcrum Python SDK to fetch records, sort the rows of a repeatable section by a specified field value, and write the new order back via the API — useful for standardizing data presentation when rows were entered out of order.
---

Fulcrum stores repeatable rows in the order they were entered and doesn't provide a native sort mechanism. This script uses the Fulcrum Python SDK to fetch records, sort their repeatable rows by any field value, and PATCH the records back with the corrected order.

## Prerequisites

```bash
pip install fulcrum
```

## Script

```python
from fulcrum import Fulcrum

# ── Configuration ─────────────────────────────────────────────────────────────
API_TOKEN          = 'YOUR-API-TOKEN'
REPEATABLE_KEY     = 'YOUR_REPEATABLE_FIELD_KEY'  # Key of the repeatable field to sort
SORT_FIELD_KEY     = 'YOUR_SORT_FIELD_KEY'         # Key of the field inside the repeatable to sort by
RECORD_IDS         = ['record-id-1', 'record-id-2']  # List of record IDs to process

fulcrum = Fulcrum(key=API_TOKEN)


def get_sorted_indexes(repeatable_rows, sort_field_key):
    """
    Returns a list of indexes that, when applied, put the repeatable rows
    in ascending order by the value of sort_field_key.

    Raises if duplicate sort values are found (sort key must be unique per record).
    """
    value_to_index = {}
    for index, row in enumerate(repeatable_rows):
        sort_value = row['form_values'].get(sort_field_key)
        if sort_value in value_to_index:
            raise ValueError(f"Duplicate sort value '{sort_value}' — sort field must be unique within the repeatable.")
        value_to_index[sort_value] = index

    sorted_keys = sorted(value_to_index.keys())
    return [value_to_index[k] for k in sorted_keys]


def sort_repeatable_rows(record_id):
    record      = fulcrum.records.find(record_id)
    old_rows    = record['record']['form_values'].get(REPEATABLE_KEY, [])

    if not old_rows:
        print(f"  Skipping {record_id} — repeatable is empty.")
        return

    new_order = get_sorted_indexes(old_rows, SORT_FIELD_KEY)
    new_rows  = [old_rows[i] for i in new_order]

    record['record']['form_values'][REPEATABLE_KEY] = new_rows
    fulcrum.records.update(record_id, record)
    print(f"  ✅ {record_id} — sorted {len(new_rows)} rows.")


# ── Run ───────────────────────────────────────────────────────────────────────
print(f"Sorting {len(RECORD_IDS)} records...")
for rid in RECORD_IDS:
    try:
        sort_repeatable_rows(rid)
    except Exception as e:
        print(f"  ❌ {rid} — {e}")

print("Done.")
```

## Finding Field Keys

Field keys are short alphanumeric strings (e.g., `6d81`, `3e2f`) that Fulcrum assigns to each field. You can find them in the App Designer's debug mode (enable with `window.localStorage.setItem('app-designer-debug-mode', true); location.reload()`) or by fetching the form schema: `fulcrum.forms.find('YOUR-FORM-ID')`.

## Extending to All Records in a Form

To sort repeatables across every record in a form rather than a specific list of IDs:

```python
FORM_ID = 'YOUR-FORM-ID'

page = 1
while True:
    result = fulcrum.records.search(url_params={'form_id': FORM_ID, 'page': page, 'per_page': 100})
    records = result.get('records', [])
    if not records:
        break
    for record in records:
        sort_repeatable_rows(record['id'])
    page += 1
```

## Notes

**Sort values must be unique within a record.** The script raises if two repeatable rows share the same sort value. For numeric sequences, dates, or ordered codes this is typically guaranteed. For non-unique fields (e.g., a status), prefer sorting by two fields: sort the value list yourself as tuples before mapping back to indexes.

**This modifies records.** Test on a small set of records first. Consider filtering to a project or date range rather than running on all records at once.

**The Fulcrum API enforces record validation.** If any required fields in the repeatable are empty, the PATCH may be rejected. Ensure the records are otherwise valid before running the sort.
