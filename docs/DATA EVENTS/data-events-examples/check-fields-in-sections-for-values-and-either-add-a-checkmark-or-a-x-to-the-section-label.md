---
title: >-
  Check fields in sections for values and either add a checkmark or a X to the
  section label
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
When the 'Check Fields' hyperlink field is clicked the code will check the values in fields within a section three different ways. If the fields have values then a checkmark will be added to the section label, otherwise, a X will be added to the section label.

```js
ON('click', 'check_fields', function (event) {
    //Check if all fields within a section have values.
    var section1 = FIELDNAMES('section_1');
    var check1 = [];

    section1.forEach(function (element) {
        if (VALUE(element)) {
            check1.push('y');
        } else {
            check1.push('n');
        }
    });

    if (CONTAINS(check1, 'n')) {
        //if not all fields have values add a X to the section label
        SETLABEL('section_1', String.fromCharCode(10060) + ' Section 1');
    } else {
        //if all fields have values add a checkmark to the section label
        SETLABEL('section_1', String.fromCharCode(9989) + ' Section 1');
    }

    //Check specific fields in a section to see if they have values
    if ($yesno2 && $text2) {
        //if fields have values add a checkmark to the section label
        SETLABEL('section_2', String.fromCharCode(9989) + ' Section 2');
    } else {
        //if fields do not have values add a X to the section label
        SETLABEL('section_2', String.fromCharCode(10060) + ' Section 2');
    }

    //Check specific field types within a section for values
    var section3 = FIELDNAMES('section_3');
    var check1 = [];

    section3.forEach(function (element) {
        if (VALUE(element) && FIELDTYPE(element) == 'YesNoField') {
            //if a yes/no field has a value add a checkmark to the section label
            SETLABEL('section_3', String.fromCharCode(9989) + ' Section 3');
        } else {
            //if a yes/no field does not have a value add a X to the section label
            SETLABEL('section_3', String.fromCharCode(10060) + ' Section 3');
        }
    })
});
```

# How to show hyperlink field's default URL

When viewing record's hyperlink field on record dashboard, it does not show the URL that is set to default.  In order to show this on the table, copy and paste the following code in the data event.

```js
ON('save-record', function(event) {
  if(!$hyperlink_field) {
    SETVALUE('hyperlink_field', 'hyperlink_url');
  }
})
```

# Check if a photo's altitude is within 5m of CURRENTLOCATION altitude

```js
ON('add-photo', 'photos', function(event) {
  var location = CURRENTLOCATION();
  var photoAltitude = event.value.altitude;
  if(location==null || location===undefined || photoAltitude==null || photoAltitude===undefined) return;
  var currentAltitude = location.altitude;
  var range = 5;
  if (photoAltitude > currentAltitude + range|| photoAltitude < currentAltitude - range){
    INVALID(`photo with altitude of ${photoAltitude} is outside of ${range}m of current altitude:${currentAltitude}`);
  } else{
    ALERT(`photo with altitude of ${photoAltitude} is inside of ${range}m of current altitude:${currentAltitude}`);
  }
});
```