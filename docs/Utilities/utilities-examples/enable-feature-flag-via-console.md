---
title: Enable a Feature Flag via the Browser Console
excerpt: Use this browser console one-liner to reveal the advanced Report Builder options, which are gated behind a localStorage feature flag.
---

Some Report Builder options are hidden unless a feature flag is set in your browser. This console snippet sets the relevant `localStorage` key to unlock them.

## Enable the Advanced Report Builder options

Setting the `reportsEnabled` flag reveals an **Advanced** section in the Report Builder sidebar, plus **Output** (PDF or HTML) and **Format** (Default or Raw) selectors.

Open the Fulcrum web app in your browser, open the developer console (F12 → Console), and run:

```javascript
window.localStorage.setItem('reportsEnabled', '1');
```

Then refresh the page and open the Report Builder.

## Notes

- The flag is stored per browser. You need to set it again in other browsers or after clearing site data.
- To turn it off, run `window.localStorage.removeItem('reportsEnabled');` and refresh.
