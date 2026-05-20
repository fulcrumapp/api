---
title: Introduction
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

## What are App Extensions?

App Extensions let you embed a custom web page inside Fulcrum. When a user taps a button or field in your form, Fulcrum opens your HTML page in a full-screen panel, your page runs whatever logic you've built, and when it closes it can write data back into the form. Everything happens inside the Fulcrum mobile or web app — no browser switching, no external sign-ins.
You write the HTML, CSS, and JavaScript. Fulcrum handles opening the page, passing in the current form data, and receiving results back.
App Extensions work the same way on iOS, Android, and web.

### Use Cases

- Custom UI for complex business logic (e.g., a QC dashboard that lets field crews flag issues on a schematic)
- Custom pickers not built into Fulcrum (image selection, advanced search, barcode workflows)
- Custom field types (SVG area selectors, range pickers, color ramps)
- Inspection summary interfaces (verifications, warning confirmations, sign-off screens)
- Charts and dashboards embedded inside a form
- Custom sub-forms (multi-step workflows that feel like a separate app)

## How It Works

An App Extension has two parts that work together: a **Data Event script** attached to your Fulcrum form, and a **custom HTML page** that contains your extension's UI and logic.

### The three steps

1. **Your Data Event** calls `OPENEXTENSION()` — This triggers the extension to open and passes in any data from the form (field values, record IDs, etc.)
1. **Your HTML page receives the data and runs** — The `Fulcrum.load()` handler fires when the page is ready. Use it to set up your UI with the data passed in from the form.
1. **Your page** calls `Fulcrum.finish(data)` — This closes the extension and sends results back to Fulcrum, where the `onMessage` handler in your Data Event receives them and can write values back to your form.

### Where the HTML file lives

Your HTML file can be hosted anywhere reachable by HTTPS, or stored as a Reference File directly on the form.

> 💡 **Tip**
> Storing your HTML as a Reference File using the attachment:// scheme lets the extension work offline. If you use an external HTTPS URL, the extension requires an internet connection.

> ⚠️  **Note**
> App Extensions run in a sandboxed browser environment. This means you cannot save files locally to the device, generate downloadable images or PDFs, or access local device storage. Offline use is supported only for the page itself (via Reference Files) — not for API calls or dynamic data.

## Quick Start

### What you need

- A Fulcrum form with Data Events enabled
- Access to Reference Files (to store your HTML file on the form)
- A text editor or AI coding tool to write HTML/JavaScript

### Step 1: Create your HTML file

Start with the template below. Copy it into a file named my-extension.html.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My Extension</title>


    <!-- Required: Fulcrum extension script — do not modify -->
    <script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>


    <script>
      // Called when the extension opens — data contains values passed from the form
      Fulcrum.load(({ data }) => {
        document.getElementById('greeting').textContent = 'Hello, ' + (data.name || 'World') + '!';
      });


      function done() {
        // Pass results back to the form and close the extension
        Fulcrum.finish({ result: 'Done!' });
      }
    </script>
  </head>
  <body>
    <h1 id="greeting">Loading...</h1>
    <button onclick="done()">Submit</button>
  </body>
</html>
```

### Step 2: Upload the file to your form

1. In the Fulcrum form builder, open Reference Files
1. Upload your `my-extension.html` file
1. Note the filename exactly — you'll reference it in your Data Event as `attachment://my-extension.html`

### Step 3: Add a Data Event to open the extension

In your form's Data Events editor, add a script that calls `OPENEXTENSION()`. This example triggers the extension when a button field named `launch_tool` is tapped:

``` javascript
ON('click', 'launch_tool', () => {
  OPENEXTENSION({
    url: 'attachment://my-extension.html',
    title: 'My Extension',
    data: {
      // Pass any form values into the extension
      name: $inspector_name,
      record_id: RECORDID(),
    },
    onMessage: ({ data }) => {
      // Write results back to form fields
      SETVALUE('result_field', data.result);
    }
  });
});
```

> 💡 **Tip**
> Any Fulcrum field value, record metadata, or calculation result can be passed in the data object. The extension receives it as a plain JavaScript object.

## Building with AI

App Extensions are well-suited to AI-assisted development (sometimes called "vibe coding"). You can describe what you want to a tool like Claude, ChatGPT, or Gemini, and have it generate the HTML, CSS, and JavaScript for your extension.

### What to give your AI tool

For best results, include the following in your prompt:

- **The starter template above** — paste it in so the AI understands the Fulcrum extension API structure
- **What data you're passing in** — list the field names and types from your `data` object
- **What the UI should do** — describe the interaction: what the user sees, what they do, what gets sent back
- **What gets sent back** — describe the structure of what `Fulcrum.finish()` should return

### Example prompt

Here's a starting-point prompt you can adapt:

> I'm building a Fulcrum App Extension. Here is the starter HTML template:
> [paste template]
> My extension should:
>
> - Show a list of the items passed in via data.items (each has a name and status)
> - Let the user mark each item as pass/fail with a button
> - When the user taps Done, call Fulcrum.finish() with an array of
>   { name, status } objects reflecting their selections
>
> Keep it simple — plain HTML, no build step, no external libraries.

## App Extension API Reference

Including the Fulcrum extension script in your HTML provides the following API. You can also use the npm package [fulcrum-extensions](https://www.npmjs.com/package/fulcrum-extensions) as an alternative.

### Fulcrum.load(callback)

Called when the extension page has loaded and is ready to receive data from Fulcrum.

``` javascript
Fulcrum.load(({ data }) => {
  // data equals the object passed from OPENEXTENSION({ data: {...} })
  // Use this to initialize your UI with existing form values
});
```

- Called once per extension session, after the page finishes loading
- The data argument is the plain object you passed into `OPENEXTENSION({ data: {...} })`
- Use this to pre-populate your UI with existing form values when the user is editing a record

### Fulcrum.finish(data)

Closes the extension and sends results back to the `onMessage` handler in your Data Event.

``` javascript
Fulcrum.finish({
  // Return any data you want to write back to the form
  field_value: 'some result',
  score: 42,
});
```

- Call this when the user is done — it closes the extension panel
- The object you pass is available as data inside the `onMessage` callback in your Data Event
- Calling `Fulcrum.finish()` with no argument closes the extension without sending any data back

### OPENEXTENSION() — Data Events

Called from your Data Event script to open an App Extension. See the `OPENEXTENSION` reference for full parameter documentation.

``` javascript
OPENEXTENSION({
  url: 'attachment://my-extension.html',  // or any HTTPS URL
  title: 'My Extension',                   // shown in the panel header
  data: { /* any data to pass in */ },
  onMessage: ({ data }) => {
    // called when Fulcrum.finish(data) is called in your HTML
  }
});
```

## Known Limitations

App Extensions run in a sandboxed browser environment. The following capabilities are not supported:

### File and photo access

- You cannot save files or images to the device from within an extension
- You cannot generate downloadable raster images (PNG, JPEG, PDF)
- Photos from Fulcrum photo fields must be fetched via the Fulcrum API (HTTPS) — there is no direct local access

### Offline limitations

- Using the Fulcrum API inside your extension (e.g., to fetch choice lists or photos) requires an internet connection, even if the HTML page itself is stored offline as a Reference File
- Choice lists managed in Fulcrum must be fetched via the API and cannot be accessed locally

### Hardware connectivity

- HTTP-based hardware protocols (e.g., 360-degree cameras that communicate over local Wi-Fi via HTTP) do not work in the sandboxed HTTPS environment
- Bluetooth device support is not currently available in App Extensions

### State persistence

- Extensions open to a fresh state each time — data from a previous session is not automatically restored
- To preserve state across sessions, write data back to a Fulcrum form field via `Fulcrum.finish()` and pass it back in on the next open via the data parameter

## Examples

The following examples are available in the Examples section of the docs:

- [Rich Text Editor](https://docs.fulcrumapp.com/docs/rich-text-editor)
- [High Energy Hazard Selector](https://docs.fulcrumapp.com/docs/high-energy-hazard-selector)
- [Illness Symptoms Selector](https://docs.fulcrumapp.com/docs/illness-symptoms-selector)
