---
title: Prevent creating duplicate repeatables
excerpt: >-
  This example shows how to prevent a user from creating more repeatable
  entries than intended. It compares the current repeatable number against a
  choice field value and blocks saving if the user tries to exceed it. It also
  demonstrates the OFF() function to clean up event listeners when a repeatable
  is unloaded.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Prevent creating duplicate repeatables

In some workflows, you may want to limit how many entries a user can create in a repeatable section based on a choice they've made in the parent record. For example, if a user selects "Visit 1" in a choice field, they should only be able to create one repeatable entry — not two.

This Data Event uses `REPEATABLENUMBER()`, `CHOICEVALUE()`, and the `OFF()` function to enforce that limit and properly clean up event listeners when the repeatable is closed.

## Data Event Code

```js
/**
 * Validation callback used to block saving an over-limit repeatable.
 * Stored as a named function so it can be detached with OFF() later.
 */
const invalidateFunction = () => {
  INVALID('This repeatable cannot be saved. It exceeds the allowed number of entries.');
};

/**
 * When a new repeatable entry is created, check whether the entry number
 * exceeds the value selected in the parent record's "visit type" choice field.
 *
 * Replace 'inspection' with your repeatable section's data name.
 * Replace $visit_type with the data name of the choice field that
 * controls the maximum number of entries allowed.
 */
ON('new-repeatable', 'inspection', () => {

  // REPEATABLENUMBER() returns the 1-based index of the current entry.
  // CHOICEVALUE($visit_type) returns the selected choice value as a string (e.g. "1", "2").
  // If the entry number exceeds the allowed count, block it.
  if (REPEATABLENUMBER() > parseInt(CHOICEVALUE($visit_type))) {
    ALERT(
      'Too many entries',
      'You cannot add more entries than your current visit type allows.'
    );

    // Make all fields in this repeatable read-only to prevent data entry
    FIELDNAMES('inspection').forEach((field) => {
      SETREADONLY(field, true);
    });

    // Attach a validation listener to block saving this repeatable
    ON('validate-repeatable', 'inspection', invalidateFunction);
  }
});

/**
 * When a repeatable entry is unloaded (user navigates away or closes it),
 * reset any read-only state and remove the validation listener.
 *
 * This prevents the block from carrying over to other valid entries
 * in the same session.
 */
ON('unload-repeatable', 'inspection', () => {

  // Reset all fields in the repeatable back to editable
  FIELDNAMES('inspection').forEach((field) => {
    SETREADONLY(field, false);
  });

  // Detach the validation listener using OFF() to avoid memory leaks
  // and unintended blocking of future valid entries
  OFF('validate-repeatable', 'inspection', invalidateFunction);
});
```

## Key concepts

**`REPEATABLENUMBER()`** returns the 1-based position of the current repeatable entry being viewed or edited. If this is the 3rd entry, it returns `3`.

**`CHOICEVALUE($field_name)`** returns the currently selected choice value as a string. Use `parseInt()` to compare it numerically.

**`ON('new-repeatable', ...)`** fires when a user taps the "+" button to create a new repeatable entry — before any data has been entered.

**`ON('validate-repeatable', ...)`** fires when the user tries to save the repeatable. Calling `INVALID()` inside this handler prevents it from being saved.

**`OFF('validate-repeatable', ...)`** removes a previously attached event listener. Passing the named function reference (rather than an anonymous function) is required for `OFF()` to work correctly. This is essential for cleanup — without it, the validation block would carry over to other entries in the same session.

## Customization

- Replace `'inspection'` with the **data name** of your repeatable section.
- Replace `$visit_type` with the **data name** of the choice field in the parent record that determines the maximum number of entries.
- The choice field values should be numeric strings like `"1"`, `"2"`, `"3"` for this comparison to work.
