---
title: Rich Text Editor
author: ''
excerpt: >-
  Launch a full rich text editor from a Fulcrum form, then save formatted HTML
  back to a target text field for report output.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This app extension example gives users full rich text editing in Fulcrum. It opens a dedicated editor, loads the current value of a text field, and writes formatted HTML back to that field on save.

Use this when you want report-ready formatting such as headings, lists, links, emphasis, and text color preserved from field input to report output.

## Demo Clip
Watch a short clip of the extension workflow:

[Download clip: rich-text-editor-clip.mp4](https://reportassets.fulcrumapp.com/readme-assets/rich-text-editor-clip.mp4)

What this clip shows:
- Tapping the trigger field to launch the extension
- Editing formatted text (headings, lists, links, and styling)
- Saving and writing HTML back to the target Fulcrum text field
- Using that stored HTML in report output with formatting preserved

## Setup
1. Download [rich-text-editor.html](https://reportassets.fulcrumapp.com/readme-assets/rich-text-editor.html) and upload it as a Reference File in your app.
2. Add a trigger field (commonly a Hyperlink field) with a data name such as `open_rich_text_editor`.
3. Add a target Text field (multi-line) with a data name such as `notes`.
4. Paste the Data Event below into your app and update the two field data names as needed.

## Data Event Script
```js
/**
 * Fulcrum Data Event — Rich Text Editor Extension
 * ─────────────────────────────────────────────────
 * Paste this script into the Data Events editor for your app.
 *
 * HOW IT WORKS
 * ────────────
 * 1. The user taps the trigger field (e.g. a hyperlink field labelled
 *    "Edit Notes").
 * 2. The rich-text-editor.html extension opens, pre-loaded with the current
 *    value of the target text field.
 * 3. The user edits the content and taps "Save".
 * 4. The extension returns clean HTML which is written back to the target
 *    text field via SETVALUE().
 *
 * FIELD SETUP (in the form builder)
 * ───────────────────────────────────
 * • Trigger field  – a Hyperlink field (or a Label/Button field).
 *   Recommended label: "Edit Notes ✏️"
 *   Data name (example): open_rich_text
 *
 * • Target field   – a Text field (set to Multi-Line / no character limit).
 *   This field stores the HTML output.
 *   Data name (example): notes
 *
 * Replace BOTH data names below with your actual field data names.
 */

// ─── Configuration ────────────────────────────────────────────────────────────
var TRIGGER_FIELD = 'open_rich_text_editor'; // data name of the field the user taps
var TARGET_FIELD  = 'notes';          // data name of the field storing the HTML
// ─────────────────────────────────────────────────────────────────────────────

ON('click', TRIGGER_FIELD, function () {
  OPENEXTENSION({
    url:   'attachment://rich-text-editor.html',
    title: 'Rich Text Editor',
    data: {
      field_value: VALUE(TARGET_FIELD),
      field_name:  TARGET_FIELD,
      field_label: LABEL(TARGET_FIELD)
    },
    onMessage: function (result) {
      var data = result && result.data;
      if (data && data.action === 'submit') {
        SETVALUE(data.field_name, data.html_value);
      }
      // data.action === 'cancel' → do nothing, field is unchanged
    }
  });
});
```

## Extension File
The full extension file is available here: [rich-text-editor.html](https://reportassets.fulcrumapp.com/readme-assets/rich-text-editor.html)
