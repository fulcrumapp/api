---
title: LOADRECORDS
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
**Description**  
The `LOADRECORDS` function fetches records from a specified form, returning an array of data entries that can be iterated over or manipulated. This is useful for accessing and working with data from different forms within the current form context.

**Tip:** Use `LOADRECORDS` to retrieve data from other forms for use in the current form context.

**Parameters**

- `options` object (required) - An object containing the parameters for the function.
  - `ids` array (required) - An array of record IDs to fetch from the specified form.
  - `form_id` string (optional) - The ID of the form from which to load the records.
  - `form_name` string (optional) - The name of the form from which to load the records. If both `form_id` and `form_name` are provided, `form_id` takes precedence.
- `callback` function (required) - A function that gets called once the records are loaded.
  - `error` object (optional) - An error object if the loading fails.
  - `result` object (required) - An object containing the loaded records.  
    - `records` array - An array of the fetched records.

## Examples

```javascript
// Example of loading records from another form using record IDs from a field and displaying an alert with the number of records loaded
LOADRECORDS({
  ids: $record_link_field,
  form_id: 'your_form_id' // or form_name: 'Your Form Name'
}, function (error, result) {
  if (error) {
    // Handle the error
    console.error('Failed to load records:', error);
  } else {
    // Access the loaded records
    var records = result.records;
    // Display an alert with the number of records loaded
    ALERT(`Loaded ${records.length} records`);
  }
});
```

## Usage

The `LOADRECORDS` function is typically used when you need to access and work with data from other forms within the context of the current form. This can be useful for displaying related data, performing cross-form calculations, or aggregating information from multiple sources. For example, you might use this functionality to load related customer records, order details, or any other linked data that needs to be processed or displayed in the current form.