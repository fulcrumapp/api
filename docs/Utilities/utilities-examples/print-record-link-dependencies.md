---
title: Print Record Link Dependencies for All Apps
excerpt: Use the Fulcrum Python SDK to recursively scan every app in your organization, identify all RecordLinkField targets, and print a dependency map showing which apps link to which — essential before migrations, org restructuring, or debugging broken record links.
---

When an organization has many apps connected by Record Link fields, it can be difficult to know which apps depend on which others. This script fetches all form schemas, recursively finds every `RecordLinkField` in each schema (including those inside Sections and Repeatables), and prints a full dependency map.

## Prerequisites

```bash
pip install fulcrum
```

## Script

```python
import json
from fulcrum import Fulcrum

# ── Configuration ─────────────────────────────────────────────────────────────
API_TOKEN = 'YOUR-API-TOKEN'
BASE_URL  = 'https://api.fulcrumapp.com'   # Change for regional instances (e.g., https://api.fulcrumapp-ca.com)

fulcrum = Fulcrum(key=API_TOKEN, uri=BASE_URL)


def extract_record_link_targets(elements):
    """Recursively find all form_ids referenced by RecordLinkFields."""
    targets = []
    for element in elements:
        if element.get('type') == 'RecordLinkField':
            target_id = element.get('form_id')
            if target_id:
                targets.append(target_id)
        if 'elements' in element:
            targets.extend(extract_record_link_targets(element['elements']))
    return targets


def print_record_link_dependencies():
    print("Fetching forms...")
    forms       = fulcrum.forms.search()['forms']
    form_lookup = {f['id']: f['name'] for f in forms}
    print(f"Found {len(forms)} apps\n")

    print("App Record Link Dependencies")
    print("=" * 40)

    for form in forms:
        linked_ids   = extract_record_link_targets(form['elements'])
        linked_names = [form_lookup.get(fid, f"[Unknown: {fid}]") for fid in set(linked_ids)]

        if linked_names:
            print(f"\n📱 {form['name']} links to:")
            for name in sorted(linked_names):
                print(f"   ↳ {name}")
        else:
            print(f"\n📱 {form['name']} — no record links")


print_record_link_dependencies()
```

## Example Output

```
Found 8 apps

App Record Link Dependencies
========================================

📱 Work Orders — no record links

📱 Assets links to:
   ↳ Work Orders

📱 Inspections links to:
   ↳ Assets
   ↳ Work Orders

📱 Personnel — no record links

📱 Daily Reports links to:
   ↳ Personnel
   ↳ Work Orders
```

## Find Apps That Link to a Specific App

To find all apps that reference a particular app (reverse lookup):

```python
TARGET_APP_NAME = 'Assets'   # Replace with the app name you're looking for

forms       = fulcrum.forms.search()['forms']
form_lookup = {f['id']: f['name'] for f in forms}
target_id   = next((f['id'] for f in forms if f['name'] == TARGET_APP_NAME), None)

if not target_id:
    print(f"App '{TARGET_APP_NAME}' not found.")
else:
    print(f"Apps that link to '{TARGET_APP_NAME}':")
    for form in forms:
        if target_id in extract_record_link_targets(form['elements']):
            print(f"  ↳ {form['name']}")
```

## Notes

**Runs entirely client-side via the Forms API.** No record data is accessed — only form schemas. This makes it safe and fast to run on any organization regardless of record volume.

**Useful before org migrations.** When migrating an organization to a new Fulcrum account, Record Link fields must be recreated in the correct order (targets before sources). This script shows the dependency graph so you can plan the migration sequence. See also the org migration script for automating the transfer.

**`form_id` on a RecordLinkField may reference a form in a different organization.** If your org uses cross-org record links, those form IDs won't appear in the lookup and will show as `[Unknown: ...]`.
