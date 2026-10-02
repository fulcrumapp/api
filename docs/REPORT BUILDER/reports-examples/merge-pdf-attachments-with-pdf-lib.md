---
title: Merge PDF Report Templates and Attachments with pdf-lib
excerpt: Use APIREQUEST() to generate multiple report PDFs server-side, fetch PDF attachments with GETBLOB(), then merge everything into a single downloadable PDF using pdf-lib on the client.
---

This example shows how to build a Report Builder template that programmatically merges multiple Fulcrum report templates and PDF file attachments into a single combined PDF. The merged PDF is triggered as a browser download when the report opens.

## Overview

The pattern works in two phases inside one advanced report template:

**Server-side (EJS):** Call `APIREQUEST()` to generate each desired sub-report for the current record and capture the resulting PDF URLs. Fetch any PDF attachments on the record using `API()` + `GETBLOB()` + `BUFFER2BASE64()`.

**Client-side (JavaScript):** Load `pdf-lib`, await all the PDF byte arrays, copy every page into a new combined document, and trigger a browser download.

## Dependencies

```html
<script src="https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js"></script>
```

## EJS Report Template

```html
<%
/**
 * PDF Merge Report Template
 *
 * Fetches one or more report PDFs by template ID, plus any PDF attachments
 * on the current record, and merges them client-side with pdf-lib.
 *
 * Replace the template IDs below with the UUIDs of the Report Builder
 * templates you want to include. Remove or add fetchReport() calls as needed.
 * The allAttachments block fetches every PDF file attached to the record —
 * remove it if you only want report templates.
 */

// Helper: generate a report PDF for the current record from a template ID.
// APIREQUEST is executed server-side and returns the signed report URL.
function fetchReport(templateId) {
  const requestOptions = {
    url: 'https://api.fulcrumapp.com/api/v2/reports.json',
    method: 'POST',
    body: JSON.stringify({
      record_id: RECORDID(),
      template_id: templateId,
    }),
    api: true,
    headers: { 'Content-Type': 'application/json' },
  };
  const response = APIREQUEST(requestOptions);
  const reportUrl = JSON.parse(response.body).report_url;
  // Append the report viewer token so the client-side fetch is authenticated
  return `${reportUrl}?token=${$params.token}`;
}

// Generate each sub-report server-side and capture the authenticated URLs
const page1Url = fetchReport('YOUR-FIRST-TEMPLATE-ID');
const page2Url = fetchReport('YOUR-SECOND-TEMPLATE-ID');
// Add more fetchReport() calls here for additional templates

// Fetch PDF attachments on this record (remove block if not needed)
const allAttachments = API(`/attachments?record_id=${RECORDID()}&owner_type=record`);
%>

<!-- Loading / finished UI -->
<div id="processing" style="width:100%;height:600px;display:flex;justify-content:center;align-items:center;">
  <h1>
    <div class="loader">Processing
      <span class="loader__dot">.</span>
      <span class="loader__dot">.</span>
      <span class="loader__dot">.</span>
    </div>
  </h1>
</div>
<div id="finish" style="width:100%;height:600px;display:none;justify-content:center;align-items:center;flex-direction:column;">
  <h1><div class="loader">Finished</div></h1>
  <br>
  <h4>You may close this window now.</h4>
</div>

<script>
async function main() {
  const pdfBytesArray = [];

  // 1. Fetch each sub-report as an ArrayBuffer
  pdfBytesArray.push(await fetch('<%= page1Url %>').then(res => res.arrayBuffer()));
  pdfBytesArray.push(await fetch('<%= page2Url %>').then(res => res.arrayBuffer()));
  // Add more lines here if you added more fetchReport() calls above

  // 2. Fetch PDF attachments server-side with GETBLOB()/BUFFER2BASE64(),
  //    injected as Base64 strings that pdf-lib can decode directly.
  <% for (let i = 0; i < allAttachments.attachments.length; i++) {
     const attachment = allAttachments.attachments[i];
     if (!attachment.content_type || attachment.content_type.includes('pdf')) { %>
  pdfBytesArray.push(
    Uint8Array.from(atob('<%= BUFFER2BASE64(GETBLOB(attachment.download_url)) %>'), c => c.charCodeAt(0)).buffer
  );
  <%   }
  } %>

  // 3. Merge all PDFs with pdf-lib
  const mergedDoc = await PDFLib.PDFDocument.create();

  for (const pdfBytes of pdfBytesArray) {
    const srcDoc = await PDFLib.PDFDocument.load(pdfBytes);
    const pageCount = srcDoc.getPageCount();
    for (let k = 0; k < pageCount; k++) {
      const [page] = await mergedDoc.copyPages(srcDoc, [k]);
      mergedDoc.addPage(page);
    }
  }

  // 4. Save and trigger a browser download named after the record
  const pdfDataUri = await mergedDoc.saveAsBase64({ dataUri: true });
  const link = document.createElement('a');
  link.href = pdfDataUri;
  link.download = '<%= record.displayValue %>' + '.pdf';
  link.click();

  // Show the finished state and close the window
  document.getElementById('processing').style.display = 'none';
  document.getElementById('finish').style.display = 'flex';
  window.close();
}

main();
</script>

<style>
@keyframes blink {
  50% { color: transparent; }
}
.loader__dot {
  animation: 1s blink infinite;
}
.loader__dot:nth-child(2) { animation-delay: 250ms; }
.loader__dot:nth-child(3) { animation-delay: 500ms; }
</style>
```

## How It Works

`fetchReport(templateId)` is an EJS server-side function that calls `APIREQUEST()` to POST to the Fulcrum Reports API. Fulcrum generates the sub-report PDF and returns a signed `report_url`. The `$params.token` is appended so the client-side `fetch()` call can download the PDF without a separate auth header.

PDF attachment bytes are fetched entirely server-side using `GETBLOB()` (which follows authenticated Fulcrum download URLs) wrapped in `BUFFER2BASE64()` to embed the binary data as a Base64 string directly into the HTML. This avoids CORS issues on the client.

On the client, `pdf-lib` loads each PDF, copies all of its pages into a new merged document, and saves the result as a data URI. A programmatic anchor click triggers the download.

## Usage Notes

- Replace `YOUR-FIRST-TEMPLATE-ID` and `YOUR-SECOND-TEMPLATE-ID` with the UUIDs of the Report Builder templates you want to include. Find template IDs in the Report Builder URL or via the Fulcrum API at `GET /api/v2/report_templates.json`.
- The `allAttachments` block merges every PDF attached to the record. Filter by `attachment.content_type` or attachment filename if you only want specific files.
- This report template is best run as a standalone "merge" report, not embedded in a normal record view. Set `"output": "html"` in the report config and keep `"status": "inactive"` until ready to deploy.
- Because of the async download pattern, use this template alongside the [Puppeteer stall technique](./puppeteer-stall-for-async-rendering.md) if Puppeteer is involved in your report workflow.
