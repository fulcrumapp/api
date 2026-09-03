---
title: Enable Feature Flags via the Browser Console
excerpt: Use these browser console one-liners to enable advanced Fulcrum features — including the HTML Report Builder and App Designer debug mode — that are gated behind localStorage feature flags.
---

Some Fulcrum features are available in the web application but require a feature flag to be enabled manually. These console snippets set the relevant `localStorage` keys to unlock them for your browser session.

## Enable the HTML Report Builder

The advanced HTML Report Builder (which allows EJS templates, `QUERY()`, and full JavaScript) is enabled per-browser via a `localStorage` flag.

Open the Fulcrum web app in your browser, open the developer console (F12 → Console), and run:

```javascript
window.localStorage.setItem('reportsEnabled', '1');
```

Then refresh the page. The Report Builder option should now appear in your app's settings.

## Enable App Designer Debug Mode

App Designer debug mode surfaces additional field metadata in the App Designer UI — including `data_name`, `key`, and field type — which is useful when building Report Builder templates or writing Data Events scripts.

```javascript
window.localStorage.setItem('app-designer-debug-mode', true);
location.reload();
```

This flag persists across browser sessions until explicitly removed. To disable it:

```javascript
window.localStorage.removeItem('app-designer-debug-mode');
location.reload();
```

## Notes

These flags are stored in your browser's `localStorage` and apply only to your browser on your current device. They do not affect other users in your organization and do not sync to Fulcrum's servers.

If a feature flag stops working after a Fulcrum release, the flag name may have changed. Check with your Fulcrum SE team contact for the current value.
