---
title: FIELDTYPE
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
Returns the field type of a field by its data name

# Parameters

`dataName` String (**required**) - The data name of the field

# Returns

String

```Text Field Types
"TextField"
"YesNoField"
"Label"
"Section"
"ChoiceField"
"ClassificationField"
"PhotoField"
"VideoField"
"AudioField"
"AttachmentField"
"BarcodeField"
"DateTimeField"
"TimeField"
"Repeatable"
"AddressField"
"SignatureField"
"HyperlinkField"
"CalculatedField"
"RecordLinkField"
```

# Examples

```js JavaScript
FIELDTYPE('items')

// returns "Repeatable"
```

```js JavasScript
FIELDTYPE('name')

// returns "TextField"
```

```coffeescript JavaScript
FIELDTYPE('count')

// numeric fields return "TextField"
// Check for numeric fields using FIELD('count').numeric
// See https://docs.fulcrumapp.com/docs/calculations-ref-field
```
