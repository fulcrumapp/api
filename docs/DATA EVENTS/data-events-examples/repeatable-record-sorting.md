---
title: Repeatable record sorting
excerpt: >-
  This example will force the sorting of child records in a repeatable section
  based on the field with the data name `field_data_name`. To make this work in
  your app you will need to update the word repeatable with the data name of
  your repeatable section and update the word `field_data_name` with the data
  name of the field you want to sort by.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
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

ON('change', 'repeatable', () => {
  let reps = $repeatable;
  let sorted = reps.sort((a, b) => parseInt(a.form_values[FIELD('field_data_name').key]) > parseInt(b.form_values[FIELD('field_data_name').key]) ? 1 : -1 );
  rawSetValue('repeatable', sorted);
})
```