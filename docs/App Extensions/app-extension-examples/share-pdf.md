---
title: Share PDF
author: ''
excerpt: >-
  Convert an extension's HTML to a PDF that users can save, share, or print from mobile.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

App Extensions let you create focused workflows that make work easier for field users. Use them to present familiar, task-specific information without requiring people to leave the record they are completing.

This page shows how to add a **Share** button to an App Extension. When a mobile user taps the button, the app converts the extension's HTML into a PDF file and presents the platform-native Save, Share, or Print actions.

## Share PDF

Use this when you want field users to generate a shareable, printable, or savable PDF snapshot of the information shown in an extension — for example a completed inspection ticket or a chain-of-custody record.

No changes are needed in the extension's HTML or JavaScript to support this. Any existing App Extension file works as-is — the Share button is controlled entirely by the Data Event, not by anything in the extension page itself.

### Add the Share PDF Data Event

Configure the `OPENEXTENSION` data event by adding `actions: ['sharePDF']` to the `data` object.

```js
ON('click', 'open_app_extension', () => {
  OPENEXTENSION({
    url: 'attachment://sharePDF.html',
    title: 'Share PDF Example',
    data: {
      record_id: RECORDID(),
      actions: ['sharePDF'],
    },
    onMessage: () => {},
  });
});
```

### Enabling the Share Button

The Share button that lets users save, share, or print the generated PDF only appears when the Data Event's `data` object includes:

```js
actions: ['sharePDF']
```

If this array is omitted, or the value is misspelled, the extension will render normally but the Share button will not be visible, and users will have no way to export the content as a PDF.

### How It Works

1. The user taps the button configured with the `open_app_extension` Data Event.
2. `OPENEXTENSION` loads the extension file and passes the record data, including the `actions: ['sharePDF']` flag.
3. Because `sharePDF` is present in `actions`, the host app displays a Share button on the extension screen.
4. When the user taps Share, the app converts the extension's rendered HTML into a PDF — no special code in the extension's HTML is required for this step.
5. The user is presented with the platform-native Save, Share, or Print options for that PDF.
