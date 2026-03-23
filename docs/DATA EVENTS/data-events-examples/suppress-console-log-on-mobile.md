---
title: Suppress console.log on mobile devices
excerpt: >-
  Override console.log and console.clear at the top of your data event so that
  debug logging never fires on mobile devices. This prevents accidental console
  calls from surfacing errors for field crews while keeping full logging
  available on web/desktop during development.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Suppress console.log on mobile devices

## Overview

`console.log` and `console.clear` are invaluable for debugging data events during development. However, leaving them in production code can cause unexpected errors or UI interruptions on the Fulcrum mobile app.

This snippet overrides both functions at the top of your data event so that:

- **On web/desktop** — logging works exactly as normal.
- **On mobile** — `console.log` and `console.clear` calls are silently ignored.

Place this block at the very top of any data event to make all subsequent `console.log` calls safe to leave in production.

## Code

```javascript
// ─── SAFE CONSOLE LOGGING (add to the top of every data event) ───────────────

// Store the original functions
const _originalLog   = console.log;
const _originalClear = console.clear;

// Override console.log — no-op on mobile, normal on web/desktop
console.log = function (...args) {
  if (!ISMOBILE()) {
    _originalLog.apply(console, args);
  }
};

// Override console.clear — no-op on mobile, normal on web/desktop
console.clear = function (...args) {
  if (!ISMOBILE()) {
    _originalClear.apply(console, args);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Your data event code below — console.log is now safe to use anywhere
// ─────────────────────────────────────────────────────────────────────────────

ON('load-record', () => {
  console.log('Record loaded:', RECORDID()); // safe on mobile — silently ignored
  // ...
});
```

## Notes

- Place the override block **before** any `ON()` handlers or function declarations so it takes effect for the entire script.
- This uses `ISMOBILE()`, which is a built-in Fulcrum expression that returns `true` when the record is open in the iOS or Android app.
- This pattern is safe to add to all data events as a best practice. It has zero performance impact on mobile since the function body returns immediately without executing anything.
- `console.error` and `console.warn` are not overridden here — those are typically intentional and less likely to cause mobile issues. Add them to the override if needed.

*Credit: Mike Meesseman, Kyle Pennell*
