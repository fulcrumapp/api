---
title: DATANAMES
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Returns the data names of the form fields

# Parameters

`type` String (optional)  [default = any] - Optional field type.

If you include a [field type](https://docs.fulcrumapp.com/reference/forms-intro#form-element-properties-all-field-types) then you will only get back the data names of fields matching this type.

# Returns

Array

# Examples

```js
DATANAMES()

// returns ["name","items","cost","choice_value","child_items","child_item_cost","choice_field"]
```

```js
DATANAMES('Repeatable')

// returns ["items","child_items"]
```

## Hint

To get all the data names from only within a repeatable or section field use the `FIELDNAMES()` function.