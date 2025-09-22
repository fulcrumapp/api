---
title: Create Repeatables
excerpt: Create a new repeatable using a hyperlink field
deprecated: false
hidden: false
metadata:
  robots: index
---
This example has a hyperlink field `create_a_repeatable` and a repeatable field `repeatable_field` that just contains a single number field `repeatable_number` in it.

Clicking the hyperlink field will add a repeatable to the existing ones.

<br />

```javascript
ON('click', 'create_a_repeatable', () => {

  // build a repeatable
  let form_values = {};
  form_values[FIELD('repeatable_number').key] = $repeatable_field ? $repeatable_field.length : 0;

  // append to existing repeatables
  let reps = $repeatable_field ? [ ...$repeatable_field, {form_values}] : [ {form_values} ];
  CONFIG().results.push({
    type: 'set-value',
    key: FIELD('repeatable_field').key,
    value: JSON.stringify(reps)
  });

});

```
