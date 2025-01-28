---
title: Upload Audio
excerpt: Upload audio with optional track file
api:
  file: rest-api.json
  operationId: post_v-version-audio-upload-json
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
[block:code]
{
  "codes": [
    {
      "code": "<form>\n  <input type=\"file\" name=\"audio\" id=\"audio\" /><br /><br />\n  <input type=\"button\" id=\"upload\" value=\"upload\" />\n</form>",
      "language": "html",
      "name": "HTML"
    },
    {
      "code": "$(document).ready(function(){\n  /**\n  * Generates a GUID string.\n  * @returns {String} The generated GUID.\n  * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa\n  * @author Slavik Meltser (slavik@meltser.info).\n  * @link http://slavik.meltser.info/?p=142\n  **/\n  function guid() {\n    function _p8(s) {\n      var p = (Math.random().toString(16)+\"000000000\").substr(2,8);\n      return s ? \"-\" + p.substr(0,4) + \"-\" + p.substr(4,4) : p ;\n    }\n    return _p8() + _p8(true) + _p8(true) + _p8();\n  }\n\n  $(\"#upload\").click(function(){\n    var formData = new FormData();\n    formData.append(\"audio[access_key]\", guid());\n    formData.append(\"audio[file]\", $(\"#audio\")[0].files[0]);\n    $.ajax({\n      type: \"POST\",\n      url: \"https://api.fulcrumapp.com/api/v2/audio/upload\",\n      data: formData,\n      cache: false,\n      contentType: false,\n      processData: false,\n      dataType: \"json\",\n      headers: {\n        \"X-ApiToken\": \"my-api-key\"\n      },\n      success: function (data) {\n        // do something!\n        console.log(data);\n      }\n    });\n  });\n});",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]