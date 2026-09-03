---
title: Save a Generated PDF on Mobile and Desktop
excerpt: Use a mobile user-agent check to branch between two PDF delivery strategies — opening the PDF in a new tab on mobile (where programmatic downloads are blocked) and triggering a file download on desktop — ensuring a consistent save experience across all devices.
---

When generating a PDF client-side in a Fulcrum Report Builder template (using pdf-lib or a similar library), the standard `<a download>` click trick works on desktop browsers but silently fails on most mobile browsers, which block programmatic downloads. The fix is to detect the device type and open the PDF in a new browser tab on mobile instead.

## Code

This snippet assumes `pdfDoc` is a [pdf-lib](https://pdf-lib.js.org/) `PDFDocument` instance that has already been built. Replace `pdfDoc.save()` / `pdfDoc.saveAsBase64()` with the equivalent method from your PDF library if you're using something else.

```javascript
async function savePdf(pdfDoc, filename) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile browsers block programmatic <a download> clicks.
    // Instead, open the PDF as a blob URL in a new tab so the user
    // can use the browser's native "Save" / "Share" options.
    const pdfBytes = await pdfDoc.save();           // Returns Uint8Array
    const blob     = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl  = URL.createObjectURL(blob);

    const newTab = window.open(blobUrl, '_blank');
    if (!newTab) {
      alert('Pop-up blocked. Please allow pop-ups for this site to save the PDF.');
    }
  } else {
    // Desktop: trigger a standard file download via a temporary <a> element.
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    const link = document.createElement('a');
    link.href     = pdfDataUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
```

## Usage in a Report Template

Call `savePdf()` after the PDF has been fully assembled, typically in a button's click handler or at the end of an async generation function. The `filename` argument can include EJS expressions resolved before the template is served:

```javascript
// EJS resolves record.displayValue before the browser receives the page.
// The resulting filename might be: "Inspection 2025-03-24.pdf"
const filename = '<%= record.displayValue.replaceAll("\r\n", " ") %>' + '.pdf';

document.getElementById('save-btn').addEventListener('click', async () => {
  document.getElementById('processing').style.display = 'block';
  document.getElementById('save-btn').disabled = true;

  // ... build pdfDoc here ...

  await savePdf(pdfDoc, filename);

  document.getElementById('processing').style.display = 'none';
  document.getElementById('finish').style.display = 'block';
});
```

## Why This Is Needed

iOS Safari and most Android browsers treat `<a download>` as a navigation event rather than a download trigger. Calling `link.click()` programmatically has no effect, or navigates away from the report page. Opening a `blob:` URL in a new tab works because the browser's built-in PDF viewer provides its own save/share UI.

## Notes

**Revoke the blob URL** after the tab opens to avoid memory leaks in long-lived sessions: `setTimeout(() => URL.revokeObjectURL(blobUrl), 10000)`.

**Pop-up blockers** may prevent `window.open()` on mobile if the call isn't triggered directly by a user gesture (e.g., it's inside a `setTimeout` or a long async chain). Keep the `window.open()` call as close to the user event handler as possible.

**`saveAsBase64({ dataUri: true })`** returns a string like `data:application/pdf;base64,...`. The base64 data URI approach is convenient on desktop but creates a very large string for big PDFs. For large PDFs, prefer `save()` + `Blob` + `URL.createObjectURL()` on desktop as well.
