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

Use this pattern when you want field users to generate a shareable, printable, or savable PDF snapshot of the information shown in an extension — for example a completed inspection ticket or a chain-of-custody record.

### Add the Share PDF Data Event

Configure this Data Event on the button or other element whose `data_name` is `open_app_extension`.

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

> **Important:** The `actions: ['sharePDF']` value inside `data` is required. Without it, the Share button will not appear on the extension screen.

### Add the Share PDF Extension File

Upload the following file as a form reference file. This example names it `sharePDF.html`, but the filename itself isn't fixed — you can call it anything (for example `extension.html`), as long as the name matches the `attachment://` URL you use in the Data Event's `url` parameter.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Share PDF Example</title>
  <!-- Required Fulcrum App Extension bootstrap: https://docs.fulcrumapp.com/docs/app-extensions-introduction -->
  <script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>
  <style>
    :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; padding: 24px; color: #18212b; background: #f4f6f8; }
    main { max-width: 720px; margin: 0 auto; padding: 24px; background: #fff; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 2px solid #18212b; padding-bottom: 16px; }
    h1 { margin: 0; font-size: 24px; }
    h2 { margin-top: 28px; font-size: 18px; }
    p { line-height: 1.5; }
    .details { display: grid; grid-template-columns: 160px 1fr; gap: 8px 16px; }
    .label { color: #5b6670; font-weight: 600; }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Chain of Custody Ticket</h1>
    </header>

    <h2>Record Details</h2>
    <div class="details">
      <div class="label">Record ID</div><div id="record-id">Loading...</div>
      <div class="label">Location</div><div>Demo inspection site</div>
      <div class="label">Collected by</div><div>Fulcrum Field Team</div>
      <div class="label">Collected at</div><div>2026-08-14 10:30 UTC</div>
      <div class="label">Status</div><div>Verified for handoff</div>
    </div>

    <h2>Notes</h2>
    <p>Any HTML, layout, and assets rendered inside this extension become part of the generated PDF, so the file can safely contain the full record content, not only what fits on screen.</p>
  </main>

  <script>
    Fulcrum.load(({ data }) => {
      document.getElementById("record-id").textContent = data.record_id || "Unsaved record";
    });
  </script>
</body>
</html>
```

The `record_id` shown in the header comes from `RECORDID()` in the Data Event. Replace the static fields in `.details` with your own record data, and change the page title, headings, and filename to match your use case.

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
4. When the user taps Share, the app converts the extension's rendered HTML into a PDF.
5. The user is presented with the platform-native Save, Share, or Print options for that PDF.
