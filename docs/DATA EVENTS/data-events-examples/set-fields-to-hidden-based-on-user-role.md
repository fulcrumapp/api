---
title: Set fields to hidden based on user role
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
```
ON("load-record", function(e){
  if(ROLE()==="Specific Role" || ROLE()==="Other Specific Role"){
    SETHIDDEN('section_data_name', true)
  }
});
```
