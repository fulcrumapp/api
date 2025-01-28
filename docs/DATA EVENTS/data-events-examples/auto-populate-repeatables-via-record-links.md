---
title: Auto-populate repeatables via Record links
excerpt: >-
  Repeatable fields are not supported to be auto-populated via a record link
  field. However, by setting up the app a specific way and using the below data
  event code you can auto populate fields from within a repeatable to another
  repeatable section in a different app. The code below will match on the field
  data names. The repeatable section's fields must match the same data names of
  the fields in the record link app's repeatable fields.


  Setup: 

  1) In your linked app you will need to add a calculation field to house the
  JSON structure of your repeatable data. This field can be hidden to users. If
  you are adding this feature to an app that already has data, you will need to
  open each record for an edit to fill in the calculation field. Be sure to
  replace repeatable_field with the name of your repeatable field.


  2) In the app where your record link field lives, add a text field and set the
  record link field up to auto populate the calculation field from your linked
  app to the new text field. The record link field and the auto populate text
  field should be outside the repeatable section. This new text field can also
  be hidden.


  3) Add the below data event code to your app and replace the names of the
  fields to match the fields in your app. The field names that need to be
  replaced are populated_json_field, record_link_field, and repeatable_field.
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Calculation Field

`SETRESULT(JSON.stringify($repeatable_field));`

<br />

### Data Event

```javascript
function rawSetValue(dataname, value) {
  const field_key = FIELD(dataname).key;
  var result = {
    type: "set-value",
    key: field_key,
    value: JSON.stringify(value)
  };
  CONFIG().results.push(result);
}

function findElementByDataName(obj, dataName) {
  // If the current object has the specified data_name, return the object
  if (obj.data_name === dataName) {
    return obj;
  }

  // Check if the current object has an "elements" key and if it's an array
  if (Array.isArray(obj.elements)) {
    // Loop through each element in the array
    for (const element of obj.elements) {
      // Recursively search in each element
      const found = findElementByDataName(element, dataName);
      if (found) {
        return found;
      }
    }
  }

  // Return null if no element is found
  return null;
}


let populatedJsonField = 'populated_json_field';
let recordLinkField = 'record_link_field';
let repeatableField = 'repeatable_field';

ON('change', populatedJsonField, () => {
  if (!VALUE(populatedJsonField)) {
    return;
  }

  LOADFORM({id: FIELD(recordLinkField).form_id}, (err, result) => {
    if (err) {
      ALERT(INSPECT(err));
      return;
    }

    let sourceRepJson = JSON.parse(VALUE(populatedJsonField))

    let reps = sourceRepJson.map((rep) => {
      let form_values = {};

      FIELDNAMES(repeatableField).forEach((field) => {
        let formField = findElementByDataName(result.form, field)
        if (formField) {
          form_values[FIELD(field).key] = rep.form_values[formField.key]
        }
      })
      
      return {
        form_values
      }
    });

    rawSetValue(repeatableField, reps)

  })
})
```