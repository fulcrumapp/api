---
title: LOADFILE
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
The `LOADFILE` function loads a specific file from reference files and initializes a variable with its content, making it suitable for further processing. This is useful for reusing scripts, configurations, or other resources across different forms or components within your application.

**Parameters**

* `options` object (required) - An object containing the parameters for the function.
  * `name` string (required) - The name of the file to be loaded.
  * `form_name` string (optional) - The name of the form from which to load the file. If not provided, the current form is used.
  * `form_id` string (optional) - The ID of the form from which to load the file. This can be used as an alternative to `form_name`.
  * `variable` string (optional) - The name of the global variable to initialize with the content of the loaded file.

**Usage**

The `LOADFILE` function is typically used when you need to share scripts, validation logic, or other resources between different forms or components. By loading these resources into a global variable, you can ensure consistency and reuse without duplicating code. For example, you might use this functionality to load a common set of validation rules or utility functions from a central form into various other forms within your application.

<br />

**Examples**

```javascript
// Example of loading a file named validations.js from another form and assigning it to a global variable 'validations'
LOADFILE({
  name: 'validations.js',
  form_name: 'Some Other Form Name',
  variable: 'validations'
});

// Example of loading a file named config.js
ON('load-record', () => {
  LOADFILE({
    name: 'config.js',
  }, (error, data) => {
    console.log(data); // will be an object with your variable inside
  });
});
```

### Additional Example

If you want to load a set of labels from a file and split them into an array, you can use the following example:

```javascript
ON('load-record', () => {
  LOADFILE({ 
    name: 'labels.js', 
    form_name: 'Your Form Name' 
  }, (err, data) => {
    LABELS = data.trim().split('\n');
  });
});
```

### Important Consideration

When working with variables exported from a JavaScript file, it’s important to use the appropriate module syntax. For ES5 compatibility, make sure to use `module.exports` instead of `export default` in your JS file to ensure that the variable can be properly loaded.

```javascript
// Example in your labels.js file
module.exports = `Label1
Label2
Label3`;
```

This ensures that when you load the file using `LOADFILE`, the contents are correctly interpreted and usable within your application.

<br />

<br />

**Note:** This feature is available only for enterprise subscriptions.
