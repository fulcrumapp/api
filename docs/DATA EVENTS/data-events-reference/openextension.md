---
title: OPENEXTENSION
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
Open an App Extension. An app extension consists of a combination of an HTML page and a Data Events script to open it.

# Description

`OPENEXTENSION` is for opening custom-build app extensions. App Extensions provide a mechanism to extend Fulcrum with custom HTML/CSS/JS and Data Events. Users can build a web page that will be opened within Fulcrum and provide a seamless transition from the form to the custom web page.

Use Cases

* Open an application that provides custom UI for complex business logic and processing
* Add a custom picker that provides logic or features not built in Fulcrum (image selection, custom search)
* Custom field type (SVG area selection, custom range pickers, color ramps)
* Summary report interface for complex inspections with verifications and warning confirmations
* Embedding mini charts and graphs to visualize inspection results
* Custom "sub-forms"

# Parameters

`options` Object (**required**) - The options for the extension

# Example Data Event

```js
ON('click', 'some_button', () => {
  OPENEXTENSION({
    url: 'https://fulcrumapp.github.io/app-extensions/build/examples/simple/index.html',
    title: 'Simple Extension',
    data: { test_value: $test_value },
    onMessage: ({ data }) => {
      SETVALUE('test_value', data.simple_result);
      ALERT(data.simple_result);
    }
  });
});
```

# Example HTML

This is the HTML page hosted at [https://fulcrumapp.github.io/app-extensions/build/examples/simple/index.html](https://fulcrumapp.github.io/app-extensions/build/examples/simple/index.html)

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>App Extension Example</title>

    <!-- Fulcrum extension script -->
    <script type="text/javascript">
    (()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();
    </script>
 
    <!-- The app extension code -->
    <script type="text/javascript">
      // the load() handler is called when the extension loads and is ready to process the data value
      Fulcrum.load(({ data }) => {
        // get a reference to the button
        const button = document.querySelector('button');

        // assign the button text to the value from Data Events
        button.textContent = `Hello ${data.test_value + 1}!`;

        // setup a click handler to finish the extension and send a result back to Fulcrum
        button.addEventListener('click', () => {
          Fulcrum.finish({ simple_result: data.test_value + 1 });
        });
      });
    </script>
  </head>
  <body>
    <button>Hello</button>
  </body>
</html>
```
