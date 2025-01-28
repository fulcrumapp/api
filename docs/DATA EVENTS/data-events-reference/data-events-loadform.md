---
title: LOADFORM
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
**Description**\
The `LOADFORM` function initializes and returns a form object from a specified form identifier, allowing access to its properties and methods. This is useful for programmatically interacting with other forms within your application.\
**Tip:** Use `LOADFORM` to programmatically interact with other forms within your application.\
**Parameters**

* `options` object (required) - An object containing the parameters for the function.
  * `name` string (optional) - The name of the form to load.
  * `id` string (optional) - The ID of the form to load. This can be used as an alternative to `name`.
* `callback` function (required) - A function that gets called once the form is loaded.
  * `error` object (optional) - An error object if the loading fails.
  * `result` object (required) - An object containing the loaded form.\
        \- `form` object - The form object representing the loaded form.

## Examples

```javascript
// Example of loading another form schema and displaying an alert with the form name
LOADFORM({ name: 'Some Reference Form' }, function (error, result) {
  if (error) {
    // Handle the error
    console.error('Failed to load form:', error);
  } else {
    // Access the loaded form object
    var form = result.form;
    // Display an alert with the form name
    ALERT(`Loaded ${form.name} schema`);
  }
});
```

## **Usage**

The `LOADFORM` function is typically used when you need to interact with or manipulate other forms programmatically. This can be useful for schema validation, or any other scenario where access to another form's properties and methods is required.\
For example, you might use this functionality to load a reference form's schema to validate data against its structure or to dynamically create forms based on existing templates.
