---
title: Repeatable requirement validation alerts
excerpt: >-
  This example will populate the warning box that is typically displayed when
  attempting to save a record that has empty required fields with more
  information about which child record has no value in a field when saving the
  root level record.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
`$repetable_section` should be replaced with the repeatable section being used and `repeatable_field` should be replaced with the field that you wish to have the alert work for. The text ('Repeatable Section record' and ' is missing a repeatable field value.') in the `INVALID('Repeatable Section' + index + ' is missing a repeatable field value.')` should also be replaced with the section's name and the field with the requirement.

```js
ON('validate-record', function (event) {
 var conditions = REPEATABLEVALUES($repetable_section, 'repeatable_field');
  for (var i = 0; i < conditions.length; i++) {
    if (conditions[i] === undefined) {
      var index = i+1;
      INVALID('Repeatable Section record' + index + ' is missing a repeatable field value.');
    }
  }
})
```
[block:callout]
{
  "type": "info",
  "body": "If the fields are still set as required though the app designer, both the system and the data event alerts will be displayed when you save the root level record. Removing the system field requirements will result in a cleaner alert message when saving the root level record, but will also remove the alert presented when saving the child record in the repeatable section.",
  "title": "Note"
}
[/block]