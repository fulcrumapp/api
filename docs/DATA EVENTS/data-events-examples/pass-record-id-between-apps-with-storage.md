---
title: Pass a Record ID Between Apps Using STORAGE()
excerpt: Use Fulcrum's STORAGE() API in Data Events to automatically pre-populate a Record Link field when creating a child record from a parent — without URL actions.
---

When a user creates a new child record from inside a parent record (for example, tapping a Record Link field to create a new Defect from an Asset), the child app has no way to know which parent it came from by default. This pattern solves that using Fulcrum's `STORAGE()` API to pass the parent record's ID across the app boundary, then sets the child's Record Link field automatically on `new-record`.

## How It Works

1. In the **parent app**, when the user interacts with the field that triggers child record creation, the parent stores its own `RECORDID()` in device-local storage.
2. In the **child app**, the `new-record` event fires when the new record opens. The child retrieves the stored ID and calls `SETVALUE()` to pre-populate its Record Link field pointing back to the parent.
3. Both apps clear storage immediately after use to prevent stale values from affecting future records.

## Parent App Code

Add this to the parent app's Data Events script. Replace `'create_defect'` with the `data_name` of the field that launches the child app (typically a Record Link field configured with "Create new record").

```javascript
// ── Parent App ─────────────────────────────────────────────────────────────

const storage = STORAGE();

// When the user taps the field that creates a new child record,
// save this record's ID so the child app can link back to it.
ON('change', 'create_defect', () => {
  storage.setItem('parentRecordID', RECORDID());
});

// Clean up on record unload. Note: if the navigation to the child app
// is very fast, a race condition is possible — that's why the child
// also clears storage immediately after reading it.
ON('unload-record', () => {
  storage.clear();
});
```

## Child App Code

Add this to the child app's Data Events script. Replace `'asset'` with the `data_name` of the Record Link field in the child app that should point back to the parent.

```javascript
// ── Child App ──────────────────────────────────────────────────────────────

const storage = STORAGE();

ON('new-record', () => {
  const parentRecordID = storage.getItem('parentRecordID');

  if (parentRecordID) {
    // IMPORTANT: Record Link fields require an array, even for a single record.
    SETVALUE('asset', [parentRecordID]);

    // Clear storage immediately after use to prevent stale values.
    storage.clear();

    console.log('[Child App] Linked to parent record:', parentRecordID);
  } else {
    console.log('[Child App] No parent ID found — record created independently.');
  }
});
```

## Key Notes

**Record Link fields require array syntax.** `SETVALUE('asset', parentRecordID)` will not work. You must pass an array: `SETVALUE('asset', [parentRecordID])`.

**`STORAGE()` is device-local.** Data stored with `STORAGE()` persists only on the current device and is not synced to Fulcrum's servers. It behaves like `localStorage` in a browser.

**The `new-record` event is the correct hook.** It fires when a brand-new record is opened for the first time, before any user input. Using `load-record` would fire for existing records too.

**Clean up in both apps.** The parent clears on `unload-record` as a safety net. The child clears immediately after reading to handle the race condition where the parent might unload before the child finishes initializing.

## Example Output

When a user opens an Asset record and taps "Create Defect", the new Defect record opens with the Asset's Record Link field already populated, creating the two-way relationship without any URL actions or manual entry.
