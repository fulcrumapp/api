---
title: Show description inline with label
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
```javascript
ON("load-record",()=>{
  if(!ISMOBILE()){
    DATANAMES().forEach(field=>{
      var fullField = FIELD(field);
      if(fullField.description){
        SETLABEL(field, `${fullField.label} - Description: ${fullField.description}`);
      }
    });
  }
});
```