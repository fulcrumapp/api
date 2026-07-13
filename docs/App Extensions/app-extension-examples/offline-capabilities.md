---
title: Offline Capabilities
author: ''
excerpt: >-
  Using repeatable and linked record data in offline scenarios.
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

When an extension is stored as a form reference file and opened with an `attachment://` URL, its HTML is available offline on mobile devices. Pass the data that the extension needs through `OPENEXTENSION` so it can render without making network requests.

This page provides complete examples for two common offline workflows:

- Viewing repeatable field values in an extension.
- Viewing linked-record data after it has been loaded.

## Offline Repeatables

Use this pattern to give field users a focused view of all items in a repeatable field. The Data Event passes the raw repeatable value to the extension, which renders the data locally.

### Add the Repeatables Data Event

Configure this Data Event on the button or other element whose `data_name` is `show_repeatables`. Replace `repeatable` with the `data_name` of your repeatable field.

```js
ON('click', 'show_repeatables', () => {
  const repeatables = VALUE('repeatable'); // repeatable is repeatable's data_name

  OPENEXTENSION({
    url: 'attachment://repeatables.html',
    title: 'App Extensions Repeatables Example',
    data: {
      title: VALUE('title'),
      repeatable_items: repeatables, // full raw
    },
    onMessage: (msg) => {}
  });
});
```

### Add the Repeatables Extension File

Upload the following file as a form reference file named `repeatables.html`. The filename must match the `attachment://repeatables.html` URL in the Data Event.

```html
<!-- Required: Fulcrum extension script — do not modify -->
<script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>
<!-- /Required: Fulcrum extension script — do not modify -->

<script>
Fulcrum.load(({data})=>{
  const recordTitle = document.getElementById('record-title');
  recordTitle.textContent = data.title;
  const items = data.repeatable_items || [];
  const list = document.getElementById('list');
  items.forEach((item, idx)=>{
    const fv = item.form_values;
    const repeatableHeader = document.createElement('h3');
    repeatableHeader.textContent = (idx+1)+': '+ (fv['25f0']||'');
    list.appendChild(repeatableHeader);
  });
});
</script>

<h1 id="record-title">Repeatables</h1>
<div id="list"></div>
```

The example displays the value of the repeatable child field with data name `25f0`. Change `fv['25f0']` to the child field data name that you want to display.

## Offline Linked Records

Use this pattern when field users need to inspect data from records linked to the current record. The Data Event loads the selected linked records and then provides their values to the extension.

### Add the Linked-Records Data Event

Configure this Data Event on the button or other element whose `data_name` is `show_linked_record`. Replace `$linked_record` with the record-link field value and update `form_name` or `form_id` for the linked form.

```js
ON('click', 'show_linked_record', () => {
  const linkedIds = $linked_record.map(r => r.record_id) || [];
  if (!linkedIds.length) {
    ALERT('No linked records');
    return;
  }
  LOADRECORDS({
    ids: linkedIds,
    form_id: '1111-2222-abcd-efgh', // replace with linked record app ID
  }, function(err, result){
    if (err) { ALERT('Failed: '+err.message); return; }
    OPENEXTENSION({
      url: 'attachment://linked-record.html',
      data: {
        linked_ids: linkedIds,
        linked_records: result.records, // each: {id, form_values:{name, ...}, latitude, longitude, status, ...}
      },
      onMessage: function(msg){}
    });
  });
});
```

### Add the Linked-Records Extension File

Upload the following file as a form reference file named `linked-record.html`. The filename must match the `attachment://linked-record.html` URL in the Data Event.

```html
<!-- Required: Fulcrum extension script — do not modify -->
<script>(()=>{var s=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var o=s((a,r)=>{var l=new URLSearchParams(location.search);function c(e){try{return JSON.parse(e)}catch(i){return null}}r.exports=window.Fulcrum={isExtension:l.get("extension")==="1",initialize:()=>{var i;let{params:e}=Fulcrum;Fulcrum.id=e==null?void 0:e.id,Fulcrum.url=e==null?void 0:e.url,Fulcrum.data=e==null?void 0:e.data,Fulcrum.origin=e==null?void 0:e.origin,(i=Fulcrum.onLoadOnce)==null||i.call(Fulcrum)},load:e=>{Fulcrum.onLoadOnce=()=>{Fulcrum.params&&!Fulcrum.isLoaded&&(Fulcrum.isLoaded=!0,e({data:Fulcrum.data}))},Fulcrum.onLoadOnce()},send:(e,{close:i=!1}={})=>{var u;e=e!=null?e:{};let n={id:Fulcrum.id,url:Fulcrum.url,data:e,close:i};(u=window.webkit)!=null&&u.messageHandlers?window.webkit.messageHandlers.extensionListener.postMessage(JSON.stringify(n)):window.parent&&window.parent.postMessage({extensionMessage:n},Fulcrum.origin)},receive:e=>{let i=c(e.data);i&&i.command==="initialize"&&!Fulcrum.params&&(Fulcrum.params=i.params,Fulcrum.initialize())},finish:e=>{Fulcrum.send(e,{close:!0})}};Fulcrum.isExtension?window.addEventListener("message",Fulcrum.receive,!1):window.addEventListener("DOMContentLoaded",Fulcrum.initialize)});o();})();</script>
<!-- /Required: Fulcrum extension script — do not modify -->

<script>
  Fulcrum.load(({data})=>{
    const recs = data.linked_records||[];
    const list = document.getElementById('list');

    recs.forEach(r=>{
      const header = document.createElement('h1');
      header.textContent = 'Status: ' + r.status;
      const p = document.createElement('p');
      p.textContent = 'Form Values:' + JSON.stringify(r.form_values);
      list.appendChild(header);
      list.appendChild(p);
    });
  });
</script>

<div id="list"></div>
```

### Offline Availability

The extension file is available offline because it is stored as a form reference file. `LOADRECORDS` must retrieve linked records before opening the extension, so the linked-record Data Event requires a connection when it runs. Once the extension receives `linked_records`, it can render the supplied data without further network requests.
