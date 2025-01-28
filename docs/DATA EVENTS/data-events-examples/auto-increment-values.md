---
title: Auto-increment values
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
**IMPORTANT NOTE:** It is important to note that this will **only work if a single device is being used to collect data**. The `STORAGE()` function only stores data locally on the device/browser being used at the time the function is being used. So if multiple devices/browser are being used this example **will NOT work** for your use case.

This example will store a value in the local storage on the device when a record is saved. The value stored comes from the `field` in the record. The next time a record is created on **that device/browser** the value in storage will be referenced and have 1 added to in and then placed in the `field`.

```js
var storage = STORAGE();

ON('new-record', function(event) {

  if(storage.getItem('key')){
    var count = storage.getItem('key');
    SETVALUE('field', NUM(count) + 1);
  }
  else {
    SETVALUE('field', 1);
  }

});

ON('save-record', function(event) {
   storage.setItem('key', $field);
});
```