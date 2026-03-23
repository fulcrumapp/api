---
title: Stall Puppeteer for async rendering
excerpt: >-
  Report Builder uses Puppeteer to render PDFs. By default it captures the page
  as soon as network activity goes idle, which cuts off async operations like
  PDF merging or large map rendering before they complete. This snippet keeps
  the renderer waiting until your async work is done.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Stall Puppeteer for async rendering

## Overview

Fulcrum's Report Builder renders PDFs using [Puppeteer](https://pptr.dev/), which captures the page once it detects that the network has gone idle. This works well for simple reports, but fails when your report performs async work **after** initial page load — such as:

- Rendering large maps or satellite imagery
- Fetching and appending PDF attachments from record fields
- Running multiple API calls in sequence

When Puppeteer fires too early, the PDF is cut off or blank in the async sections.

**The fix:** Issue a long-running network request at startup to keep Puppeteer in a "network active" state, then abort that request when your async work finishes. Puppeteer detects the abort as network idle and captures the page at the right moment.

## Code

### 1 — Place this `<script>` block before your `main()` function

```html
<script>
  // Keep Puppeteer waiting by maintaining an open network request.
  // This must run before main() so it's active before any async work begins.
  window.__idleBlocker = new AbortController();

  fetch('https://httpbin.org/delay/60', { signal: window.__idleBlocker.signal })
    .catch(() => {}); // ignore AbortError
</script>
```

### 2 — Place these two lines at the very end of your `main()` async function

```javascript
async function main() {
  // ... your async report logic here ...

  // Wait for the next two animation frames to ensure all canvas/DOM updates
  // have been committed before releasing Puppeteer.
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  // Release the idle blocker — Puppeteer will now detect network idle and
  // capture the page.
  if (window.__idleBlocker) {
    window.__idleBlocker.abort();
  }
}
```

## Full example structure

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'></script>

<script>
  // Start idle blocker before main() runs
  window.__idleBlocker = new AbortController();
  fetch('https://httpbin.org/delay/60', { signal: window.__idleBlocker.signal })
    .catch(() => {});
</script>

<div class='root'>
  <!-- EJS template content rendered server-side -->
  <%- /* your EJS here */ %>

  <!-- Canvas elements for async PDF pages will be appended here by main() -->
</div>

<script async>
  async function main() {
    // Perform all async work here...
    // e.g. fetch PDF attachments, render map tiles, etc.

    // Signal completion — Puppeteer will now capture the page
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (window.__idleBlocker) window.__idleBlocker.abort();
  }

  main();
</script>
```

## How it works

1. `fetch('https://httpbin.org/delay/60', ...)` makes a request to an endpoint that intentionally delays 60 seconds. Puppeteer sees ongoing network activity and waits.
2. Your `main()` function runs all async operations.
3. `requestAnimationFrame` (called twice) ensures any final DOM mutations from the last async operation have been painted.
4. `window.__idleBlocker.abort()` cancels the long-running fetch. The browser fires an `AbortError` which is caught and ignored.
5. Puppeteer now sees the network go idle and captures the complete page.

## Notes

- This technique does not affect normal report rendering speed — if your async work finishes in 2 seconds, Puppeteer captures the page in 2 seconds.
- The `https://httpbin.org/delay/60` endpoint is a reliable public utility. If your org restricts outbound network access from the report renderer, substitute any URL that takes a long time to respond (or times out gracefully).
- This pattern pairs well with the [concat PDF attachments to a report](./concat-pdf-attachments-to-report) example, which requires async rendering to complete before Puppeteer captures the page.

*Credit: Mike Meesseman*
