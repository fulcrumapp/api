---
title: Upload Audio
excerpt: Upload audio with optional track file
api:
  file: rest-api.json
  operationId: audio-upload
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# jQuery Web Form Example

```html HTML
<form>
  <input type="file" name="audio" id="audio" /><br /><br />
  <input type="button" id="upload" value="upload" />
</form>
```
```javascript JavaScript
$(document).ready(function(){
  /**
  * Generates a GUID string.
  * @returns {String} The generated GUID.
  * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
  * @author Slavik Meltser (slavik@meltser.info).
  * @link http://slavik.meltser.info/?p=142
  **/
  function guid() {
    function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  $("#upload").click(function(){
    var formData = new FormData();
    formData.append("audio[access_key]", guid());
    formData.append("audio[file]", $("#audio")[0].files[0]);
    $.ajax({
      type: "POST",
      url: "https://api.fulcrumapp.com/api/v2/audio/upload",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      headers: {
        "X-ApiToken": "my-api-key"
      },
      success: function (data) {
        // do something!
        console.log(data);
      }
    });
  });
});
```