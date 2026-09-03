---
title: Append PDF attachments to a report
excerpt: >-
  Render PDF files attached to a Fulcrum record as additional pages at the end
  of a generated report. Uses the Fulcrum Attachments API and PDF.js to decode
  each PDF and render its pages as canvas elements, which Puppeteer captures as
  part of the final PDF output.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Append PDF attachments to a report

## Overview

Some workflows require that uploaded PDF files (inspection certs, third-party reports, permits, etc.) be merged into the generated Fulcrum PDF report for that record. This example shows how to:

1. Fetch all attachment metadata for the current record using the Fulcrum [Attachments API](https://developer.fulcrumapp.com/reference/attachments).
2. Download each `.pdf` attachment and encode it as a Base64 string using `GETBLOB` and `BUFFER2BASE64`.
3. Decode each PDF in the browser using **PDF.js** and render every page to a `<canvas>` element.
4. Append each canvas to the document body — Puppeteer includes them in the final PDF.

> **Important:** Because this process is async, you must also use the [Puppeteer stall technique](./puppeteer-stall-for-async-rendering) to prevent the renderer from capturing the page before all PDF pages are drawn.

## Dependencies

Add this `<script>` tag to the `<head>` of your report template:

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'></script>
```

## Code

Add the Puppeteer idle-blocker before `main()`, then include the PDF attachment section inside your `main()` function:

```html
<script>
  // Keep Puppeteer waiting until all async rendering is complete
  window.__idleBlocker = new AbortController();
  fetch('https://httpbin.org/delay/60', { signal: window.__idleBlocker.signal })
    .catch(() => {});
</script>

<div class='root'>
  <!-- Your standard EJS report content here -->
  <%- /* RENDER(...) or other EJS output */ %>

  <!-- PDF attachment pages will be appended here by main() -->
</div>

<script async>
  async function main() {

    // ── 1. Collect Base64-encoded PDF data server-side (EJS) ──────────────────
    const pdfBytesArray = [];

    <% const allAttachments = API(`/attachments?record_id=${RECORDID()}&owner_type=record`); %>
    <% for (let i = 0; i < allAttachments.attachments.length; i++) { %>
      <% if (allAttachments.attachments[i].name.toLowerCase().endsWith('.pdf')) { %>
        pdfBytesArray.push("<%= BUFFER2BASE64(GETBLOB(allAttachments.attachments[i].download_url)) %>");
      <% } %>
    <% } %>

    // ── 2. Render each PDF as canvas pages ────────────────────────────────────

    function base64ToUint8Array(base64) {
      const raw = atob(base64);
      const arr = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
      return arr;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    for (let i = 0; i < pdfBytesArray.length; i++) {
      const uint8Array  = base64ToUint8Array(pdfBytesArray[i]);
      const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
      const pdf         = await loadingTask.promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page     = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.1 });

        const canvas     = document.createElement('canvas');
        const ctx        = canvas.getContext('2d');
        canvas.height    = viewport.height;
        canvas.width     = viewport.width;
        canvas.style.display    = 'block';
        canvas.style.pageBreakBefore = 'always';

        await page.render({ canvasContext: ctx, viewport }).promise;
        document.body.appendChild(canvas);
      }
    }

    // ── 3. Release Puppeteer ───────────────────────────────────────────────────
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (window.__idleBlocker) window.__idleBlocker.abort();
  }

  main();
</script>
```

## How it works

| Step | Where it runs | What it does |
|---|---|---|
| `API('/attachments?...')` | Server (EJS) | Fetches attachment metadata for the record |
| `GETBLOB(url)` | Server (EJS) | Downloads the raw binary content of each PDF |
| `BUFFER2BASE64(blob)` | Server (EJS) | Encodes the binary as a Base64 string embedded in the HTML |
| `base64ToUint8Array()` | Browser (JS) | Decodes the Base64 string back to binary |
| `pdfjsLib.getDocument()` | Browser (JS) | Parses the binary PDF |
| `page.render()` | Browser (JS) | Draws each page to a `<canvas>` element |
| `document.body.appendChild(canvas)` | Browser (JS) | Appends each page to the document for Puppeteer to capture |
| `window.__idleBlocker.abort()` | Browser (JS) | Signals Puppeteer that rendering is complete |

## Notes

- `API()` and `GETBLOB()` are EJS-only server-side functions — they cannot be called from client-side `<script>` blocks.
- `BUFFER2BASE64()` embeds the entire PDF binary as a Base64 string in the HTML. Large PDFs increase HTML payload size significantly. For attachments over ~5 MB, consider fetching them client-side instead using a signed URL.
- The `scale: 1.1` viewport setting produces PDF pages at slightly above standard resolution. Increase for sharper output at the cost of larger canvases.
- `pageBreakBefore: 'always'` on each canvas ensures each PDF page starts on a new page in the final output.
- This example appends **all PDF attachments** on the record. To filter by attachment field (rather than all record attachments), query the specific field's attachment IDs from the record's form values.

*Credit: Mike Meesseman, Kyle Pennell*
