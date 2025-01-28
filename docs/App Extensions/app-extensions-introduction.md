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
App Extensions provide a mechanism to extend and integrate Fulcrum with custom UI using HTML, CSS, JavaScript and Data Events. You can build a web page that will be opened within Fulcrum and provide a smooth transition between your Fulcrum app and your custom web app. Using Reference Files to store your extension also enables it to work offline. You can build a single extension and it will work on iOS, Android and web with the same capability and behavior.

## Use Cases

- Open an application that provides custom UI for complex business logic and processing
- Add a custom picker that provides logic or features not built in Fulcrum (image selection, custom search)
- Custom field types (SVG area selection, custom range pickers, color ramps)
- Summary report interface for inspections with verifications and warning confirmations
- Embedding mini charts and graphs to visualize inspection results
- Custom "sub-forms"

## App Extensions consist of 3 basic parts

1. A Data Event script that calls `OPENEXTENSION()` to open the app extension
2. A `Fulcrum.load()` handler inside your custom web app to load the parameters passed from the Data Event `OPENEXTENSION()` call (e.g. setup UI and load the current field values, if any)
3. A call to `Fulcrum.finish(data)` to pass back data to the Data Event handler

## Data Event Example

Below is a complete example of a simple app extension to display a web page with a button and pass data back and forth between Fulcrum and the extension.

Assumptions:

- A hyperlink field on your form named `open_extension`
- Access to Data Events and Reference Files

Here is an example of a Data Event script to open the extension. This consists of mainly of the `url` parameter, which is used to specify the app extension location. You can use any online web address, or use the `attachments://` scheme to use a Reference File attached to the form. Using Reference Files for extensions allows them to work offline. In this case, we've uploaded our HTML file and named it `simple.html`. We also pass in a `data` parameter to pass data into the extension. In this example, we are passing a parameter named `test_value`. You can pass any data into your extension. The last parameter is an `onMessage` handler. This function will called when the extension closes to process the result. In the example, the extension is passing back a value named `simple_result`.

```js
ON('click', 'open_extension', () => {
  OPENEXTENSION({
    url: 'attachment://simple.html',
    title: 'Simple Extension',
    data: { test_value: 'World' },
    onMessage: ({ data }) => {
      ALERT(data.simple_result);
    }
  });
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>

    <!-- Fulcrum extension script snippet, do not modify -->
    <script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>
    
    <script type="text/javascript">
      // the ready() handler is called when the extension loads and is ready to process the data value
      Fulcrum.load(({ data }) => {
        // get a reference to the button
        const button = document.querySelector('button');

        // assign the button text to the value from Data Events
        button.textContent = `Hello ${data.test_value}!`;

        // setup a click handler to finish the extension and send a result back to Fulcrum
        button.addEventListener('click', () => {
          Fulcrum.finish({ simple_result: `Hello ${data.test_value}!` });
        });
      });
    </script>
  </head>
  <body>
    <button>Hello</button>
  </body>
</html>
```

## App Extension web page API

Including the App Extension snippet provides the basic API to interact with App Extensions. You can also utilize the npm package [fulcrum-extensions](https://www.npmjs.com/package/fulcrum-extensions) to interact with App Extensions.

```html
<!-- Fulcrum extension script snippet, do not modify -->
<script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>

```

**`Fulcrum.load(callback: (data: any) => void)`**

- `callback`: `function` called when the page loads, use this to initialize the state in extension. It's passed a `data` argument that equals the `data` parameter passed from `OPENEXTERNAL({ data })` from Data Events.

Use this function to initialize the extension and perform any assignming of existing UI from the data passed in from `OPENEXTERNAL()`. Example: setting the current value of a custom field when editing existing data.

**`Fulcrum.finish(data: any)`**

- `data`: `any` the data to be sent back to the Data Events `onMessage` handler.

Use this function to end the extension session and pass data back to the Data Events `onMessage` handler.