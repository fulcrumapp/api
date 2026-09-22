---
title: Bulk Update App Settings via the API
excerpt: Use the Fulcrum Forms API to fetch multiple apps by ID, modify their settings programmatically, and save the changes back — useful for renaming a batch of apps, updating descriptions, changing status configurations, or applying a consistent setting across many forms at once.
---

When you need to update a property across many Fulcrum apps at once — changing a naming convention, adding a description, or toggling a setting — doing it one at a time in the UI is slow. The Forms API lets you fetch, modify, and update any number of apps in a loop.

## JavaScript (Browser / Node.js)

```javascript
// ── Configuration ────────────────────────────────────────────────────────────
const API_TOKEN = 'YOUR-API-TOKEN';
const BASE_URL  = 'https://api.fulcrumapp.com/api/v2';

// IDs of the apps you want to update
const FORM_IDS = [
  'YOUR-FORM-ID-1',
  'YOUR-FORM-ID-2',
  'YOUR-FORM-ID-3'
];

const HEADERS = {
  'Content-Type': 'application/json',
  'X-ApiToken': API_TOKEN
};

// ── Apply your changes here ───────────────────────────────────────────────────
function applyChanges(form) {
  // Example: append a suffix to every app name
  // form.name = form.name + ' (Archived)';

  // Example: set a description
  // form.description = 'Managed by the SE team. Contact se@example.com for access.';

  // Example: disable the title field
  // form.auto_assign = false;

  return form;
}

// ── Fetch, modify, and save each form ────────────────────────────────────────
async function updateForms(formIds) {
  for (const formId of formIds) {
    try {
      // 1. Fetch the current form schema
      const getRes = await fetch(`${BASE_URL}/forms/${formId}.json`, {
        headers: HEADERS
      });
      if (!getRes.ok) throw new Error(`GET failed: ${getRes.status}`);
      const { form } = await getRes.json();

      console.log(`Updating: ${form.name} (${form.id})`);

      // 2. Apply your modifications
      const updated = applyChanges(form);

      // 3. Save the updated form back to Fulcrum
      const putRes = await fetch(`${BASE_URL}/forms/${form.id}.json`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({ form: updated })
      });
      if (!putRes.ok) throw new Error(`PUT failed: ${putRes.status}`);

      console.log(`  ✅ Saved`);

    } catch (err) {
      console.error(`  ❌ ${formId} — ${err.message}`);
    }
  }

  console.log('\nDone.');
}

updateForms(FORM_IDS);
```

## Python Version

```python
import requests

API_TOKEN = 'YOUR-API-TOKEN'
BASE_URL  = 'https://api.fulcrumapp.com/api/v2'
HEADERS   = {'Content-Type': 'application/json', 'X-ApiToken': API_TOKEN}

FORM_IDS = [
    'YOUR-FORM-ID-1',
    'YOUR-FORM-ID-2',
]

def apply_changes(form):
    # Modify the form dict here — examples:
    # form['name'] = form['name'] + ' (Archived)'
    # form['description'] = 'Updated by migration script.'
    return form

for form_id in FORM_IDS:
    try:
        # Fetch
        r = requests.get(f"{BASE_URL}/forms/{form_id}.json", headers=HEADERS)
        r.raise_for_status()
        form = r.json()['form']
        print(f"Updating: {form['name']}")

        # Modify
        updated = apply_changes(form)

        # Save
        r = requests.put(f"{BASE_URL}/forms/{form_id}.json",
                         headers=HEADERS, json={'form': updated})
        r.raise_for_status()
        print(f"  ✅ Saved")

    except Exception as e:
        print(f"  ❌ {form_id} — {e}")

print("Done.")
```

## Update All Forms in an Organization

To apply a change to every app in your organization rather than a specific list:

```python
# Fetch all forms
all_forms = requests.get(f"{BASE_URL}/forms.json", headers=HEADERS).json()['forms']

for form in all_forms:
    form_id = form['id']
    # Fetch full schema (the list endpoint returns minimal data)
    full = requests.get(f"{BASE_URL}/forms/{form_id}.json", headers=HEADERS).json()['form']
    updated = apply_changes(full)
    requests.put(f"{BASE_URL}/forms/{form_id}.json",
                 headers=HEADERS, json={'form': updated}).raise_for_status()
    print(f"✅ {full['name']}")
```

## Common applyChanges Patterns

**Append text to app names:**
```javascript
form.name = form.name.replace(/\s+\(OLD\)$/, '') + ' (NEW)';
```

**Set a consistent status field configuration:** Modify `form.status_field` to set the label, default value, or choices for the built-in status field.

**Enable/disable a setting globally:** Set properties like `form.auto_assign`, `form.allow_update_location`, or `form.geometry_required` to the same value across all apps.

## Notes

**Always fetch before modifying.** The Forms API requires the full form schema in PUT requests — you can't send a partial update. Fetch the current form first to avoid accidentally overwriting fields.

**Test on one app first.** Before running on all forms, test your `applyChanges` function on a single app to confirm the modification looks correct.

**Role requirement:** Only Organization Owners and Administrators can modify form schemas via the API.
