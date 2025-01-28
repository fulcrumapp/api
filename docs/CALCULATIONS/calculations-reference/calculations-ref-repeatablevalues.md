---
title: REPEATABLEVALUES
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
Return a specific field from multiple repeatable items

# Parameters

`repeatableVariable` Object (__required__) - The repeatable field variable

`dataName` String (__required__) - The data name of the field to extract from each repeatable item

# Returns

Array - An array of values of the `dataName` field from each item

# Examples

```js
REPEATABLEVALUES($repeatable_field, 'cost')

// returns [1,2,3]
```

```js
REPEATABLEVALUES($repeatable_field, 'choice_value').map(CHOICEVALUE)

// used for returning values from a single choice field within a repeatable section
// returns ["widget","spinner","gizmo"]
```

```js
FLATTEN(REPEATABLEVALUES($repeatable_field, 'choice_value').map(CHOICEVALUES))

// used for returning values from a multiple choice field within a repeatable section
// returns ["widget","spinner","gizmo"]
```

```js
REPEATABLEVALUES($repeatable_field, ['child_repeatable', 'grandchild_repeatable', 'field_inside_nested_rep'])

//used for returning values from fields that are within nested repeatable sections.
// repeatable_field - Top level repeatable section
// child_repeatable - 1st nested repeatable section
// grandchild_repeatable - 2nd nested repeatable section
// field_inside_nested_rep - field within the 2nd nested repeatable section

// returns ["widget","spinner","gizmo"]
```