---
title: High Energy Hazard Selector
author: ''
excerpt: >-
  Launch a hazard selection interface from a Fulcrum form using OPENEXTENSION(),
  then save selected hazard values back to a target text field.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This app extension example gives users a custom hazard selection interface in Fulcrum. It opens a dedicated HTML extension from a Hyperlink field, allows users to select high energy hazards, and writes the selected values back to a target text field.

Use this when you want a guided hazard selection workflow that runs from inside a Fulcrum form and uses a Reference File for offline-friendly access in the mobile app.

## Demo Clip
Watch a short clip of the extension workflow:

[Download clip: high-energy-hazard-selector.mp4](https://reportassets.fulcrumapp.com/readme-assets/Using%20Fulcrum%20OPENEXTENSION%20for%20Enhanced%20User%20Experiences%20and%20Workflows.mp4)

What this clip shows:
- Launching a custom HTML web application from Fulcrum using OPENEXTENSION()
- Configuring the app and data event to trigger the extension
- Interacting with a visual, icon-based hazard selection interface
- Returning and storing selected values back in Fulcrum

## Setup
1. Download [high-energy-hazard-selector.html](https://reportassets.fulcrumapp.com/readme-assets/high-energy-hazard-selector.html) and upload it as a **Reference File** in your app.
2. Add a trigger field (commonly a Hyperlink field) with a data name such as `select_high_energy_hazards`.
3. Add a target Text field with a data name such as `high_energy_hazards`.
4. Paste the Data Event below into your app and update the field data names as needed.

## Data Event Script
```js
/**
 * Fulcrum Data Event — High Energy Hazard Selector
 * ─────────────────────────────────────────────────
 * Paste this script into the Data Events editor for your app.
 *
 * HOW IT WORKS
 * ────────────
 * 1. The user taps the trigger field (for example, a Hyperlink field labelled
 *    "Launch Hazard Selector").
 * 2. The high-energy-hazard-selector.html extension opens from a Reference File.
 * 3. The user selects one or more hazards in the custom interface.
 * 4. The extension sends the selected values back to Fulcrum.
 * 5. Fulcrum writes the returned values into the target text field using
 *    SETVALUE().
 *
 * FIELD SETUP (in the form builder)
 * ───────────────────────────────────
 * • Trigger field  – a Hyperlink field (or a Label/Button field).
 *   Recommended label: "Launch Hazard Selector"
 *   Data name (example): select_high_energy_hazards
 *
 * • Target field   – a Text field.
 *   This field stores the returned hazard values.
 *   Data name (example): high_energy_hazards
 *
 * Replace BOTH data names below in the data event with your actual field data names.
 */

ON('click', 'select_high_energy_hazards', () => {
  OPENEXTENSION({
    url: 'https://high-energy-icon-selector.netlify.app/',
    title: 'High Energy Hazards',
    data: { high_energy_hazards: $high_energy_hazards },
    onMessage: ({ data }) => {
      SETVALUE('high_energy_hazards', data.high_energy_hazards);
    }
  });
});
```

## Extension File
The full extension file is available here: [rich-text-editor.html](https://reportassets.fulcrumapp.com/readme-assets/high-energy-hazard-selector.html)
