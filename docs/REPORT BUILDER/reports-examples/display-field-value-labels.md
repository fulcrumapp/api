---
title: Display field value labels
excerpt: >-
  Helper functions for displaying human-readable display values (labels) instead
  of raw stored values in PDF reports. Includes support for top-level fields,
  repeatables, ChoiceFields, AddressFields, and SignatureFields.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Display field value labels in PDF reports

By default, Fulcrum stores and exposes the raw **stored value** of a field — for choice fields this is often a short code, and for complex fields like addresses and signatures it's a structured object. When building PDF reports, you typically want to display the human-readable **display value** (label) instead.

These two helper functions make it easy to render display values for any field type, including inside repeatable sections.

## Helper functions

Add these functions to the top of your report's JavaScript section (the `<script>` tag in the EJS template):

```js
/**
 * Gets the display value for a top-level (non-repeatable) field.
 *
 * Usage: <%= getValue('employee_name') %>
 *
 * @param {string} dataName - The data name of the field
 * @returns {string} The display value, or an empty string if not set
 */
function getValue(dataName) {
  return record.formValues.find(dataName)
    ? record.formValues.find(dataName).displayValue
    : '';
}

/**
 * Gets the display value for a field inside a repeatable section.
 * Handles ChoiceField, AddressField, SignatureField, and plain value fields.
 *
 * Usage: <%= getRepValue(rep, 'company') %>
 *
 * @param {object} rep   - The repeatable entry object (e.g. from a forEach loop)
 * @param {string} dataName - The data name of the field within the repeatable
 * @returns {string} The display value, or an empty string if not set
 */
function getRepValue(rep, dataName) {
  let field = FIELD(dataName);

  if (!ISBLANK(rep.form_values[field.key])) {
    if (field.type === 'ChoiceField') {
      // Returns the human-readable label(s) for choice field selections
      return CHOICEVALUE(rep.form_values[field.key]);

    } else if (field.type === 'AddressField') {
      // Returns a formatted address string
      return FORMATADDRESS(rep.form_values[field.key]);

    } else if (field.type === 'SignatureField') {
      // Returns a URL to the signature image
      return SIGNATUREURL(rep.form_values[field.key].signature_id);

    } else {
      // For text, numeric, date, and other simple field types
      return rep.form_values[field.key];
    }
  } else {
    return '';
  }
}
```

## Usage examples

### Top-level fields

```ejs
<!-- Display a text field's value -->
<p><strong>Employee:</strong> <%= getValue('employee_name') %></p>

<!-- Display a choice field's label (not the stored code) -->
<p><strong>Status:</strong> <%= getValue('inspection_status') %></p>
```

### Fields inside a repeatable

```ejs
<% record.formValues.find('site_visits').value.forEach(function(rep) { %>
  <tr>
    <td><%= getRepValue(rep, 'company') %></td>
    <td><%= getRepValue(rep, 'visit_type') %></td>
    <td><%= getRepValue(rep, 'site_address') %></td>
    <td>
      <% if (getRepValue(rep, 'signature')) { %>
        <img src="<%= getRepValue(rep, 'signature') %>" width="150" />
      <% } %>
    </td>
  </tr>
<% }) %>
```

## Notes

- `FIELD(dataName)` looks up the field definition by its data name. This is required to get the field's internal `key` and `type`.
- `CHOICEVALUE()`, `FORMATADDRESS()`, and `SIGNATUREURL()` are Fulcrum Report Builder helper functions available in the EJS template context.
- For `SignatureField`, `getRepValue()` returns a URL string that you can use directly in an `<img>` tag's `src` attribute.
- `ISBLANK()` is used to safely handle fields that have no value, returning an empty string instead of throwing an error.
