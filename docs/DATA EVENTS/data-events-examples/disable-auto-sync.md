---
title: Disable auto-sync for a specific app
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
You can use data events to turn off [auto-sync (non-blocking sync)](https://help.fulcrumapp.com/en/articles/8104466-how-does-syncing-on-the-mobile-app-work#h_a6c9d09e88) on a per-app basis. You can do this by adding the following code to your app:

```javascript
ON('load-record', function() {
  var config = {
    auto_sync_enabled: false,
  };
  SETFORMATTRIBUTES(config);
});
```
