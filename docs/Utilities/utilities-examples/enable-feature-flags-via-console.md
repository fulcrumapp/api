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
