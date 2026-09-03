---
title: Export a Field Mapping CSV from the App Designer
excerpt: Run one of these browser console scripts inside the Fulcrum App Designer to instantly generate a CSV mapping every field's data_name, key, label, and type — useful for building Report Builder templates, setting up the Query API, and onboarding new team members to an app's schema.
---

When building Report Builder templates or writing Query API SQL, knowing each field's `data_name` and `key` is essential. The App Designer displays this information in its field inspector panel, but copying it field by field is tedious. These scripts read the inspector DOM directly and produce a downloadable CSV in one click.

Run any of these snippets in the browser's developer console while the App Designer is open. The CSV is printed to the console; copy it from there or adapt the script to trigger a file download.

## Version 1 — data_name and key only

The most common lookup: map every field's `data_name` to its `key`.

```javascript
let csv = "data_name,key\n";

$$('p.form-label.pull-left').forEach(p => {
  // Skip container types that don't have a data_name/key of their own
  if (
    p.innerHTML.includes('type: Section') ||
    p.innerHTML.includes('type: Repeatable') ||
    p.innerHTML.includes('type: Label')
  ) return;

  const html = p.innerHTML;
  const dataName = html.match(/data_name:\s*([\w-]+)/)?.[1] ?? "";
  const key      = html.match(/key:\s*([\w-]+)/)?.[1]       ?? "";

  csv += `${dataName},${key}\n`;
});

console.log(csv);
```

## Version 2 — label and field type

Useful for documentation and onboarding: produces a human-readable list of every field label alongside its Fulcrum field type.

```javascript
let csv = "label,field_type\n";

$$('p.form-label.pull-left').forEach(p => {
  if (
    p.innerHTML.includes('type: Section') ||
    p.innerHTML.includes('type: Repeatable') ||
    p.innerHTML.includes('type: Label')
  ) return;

  const label     = p.textContent.split(" _")[0];
  const fieldType = p.innerHTML.match(/type:\s*([\w-]+)/)?.[1] ?? "";

  csv += `${label}: ${fieldType}\n`;
});

console.log(csv);
```

## Version 3 — Full mapping: label, data_name, key, and field type

The most complete version. Useful as a reference sheet for any developer working on the app.

```javascript
let csv = "label,dataname,key,fieldtype\n";

$$('p.form-label.pull-left').forEach(p => {
  if (
    p.innerHTML.includes('type: Section') ||
    p.innerHTML.includes('type: Repeatable') ||
    p.innerHTML.includes('type: Label')
  ) return;

  const label     = p.textContent.split(" _")[0];
  const fieldType = p.innerHTML.match(/type:\s*([\w-]+)/)?.[1]      ?? "";
  const dataName  = p.innerHTML.match(/data_name:\s*([\w-]+)/)?.[1] ?? "";
  const key       = p.innerHTML.match(/key:\s*([\w-]+)/)?.[1]       ?? "";

  csv += `${label},${dataName},${key},${fieldType}\n`;
});

console.log(csv);
```

## How to Use

1. Open the Fulcrum App Designer for the app you want to inspect.
2. Open the browser developer console (F12 → Console tab, or right-click → Inspect → Console).
3. Paste the script and press Enter.
4. The CSV text is printed to the console. Select and copy it, then paste into a spreadsheet or text editor.

## Key Notes

**`$$()` is a console shorthand for `document.querySelectorAll()`.** It works in Chrome, Firefox, and Edge developer consoles but is not available in regular JavaScript — don't use it in production code.

**Sections, Repeatables, and Labels are excluded.** These container/display elements appear in the App Designer DOM but don't have their own `data_name` or `key`, so they're filtered out. If you need to include them, remove or adjust the `if` guard at the top of each `forEach`.

**The script reads the current scroll state.** The App Designer may use virtual rendering — if a long form isn't fully scrolled, not all fields may be present in the DOM. Scroll to the bottom of the form before running the script to ensure all fields are captured.
