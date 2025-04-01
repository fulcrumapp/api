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
**Description**\
The `LOADRECORDS` function fetches records from a specified form, returning an array of data entries that can be iterated over or manipulated. This is useful for accessing and working with data from different forms within the current form context.

**Tip:** Use `LOADRECORDS` to retrieve data from other forms for use in the current form context.

**Parameters**

* `options` object (required) - An object containing the parameters for the function. One of the below options is required.
  * `ids` array (optional) - An array of record IDs to fetch from the specified form.
  * `form_id` string (optional) - The ID of the form from which to load the records.
  * `form_name` string (optional) - The name of the form from which to load the records. If both `form_id` and `form_name` are provided, `form_id` takes precedence.
  * \* `limit` number (optional) - The maximum number of records to retrieve
  * \* `offset` number (optional) - The number of results to skip prior to returning results
  * \* `order` array (optional) - Array of fields to sort records. Each Array contains a field name and sort direction (`asc` or `desc`)
  * \* `where` object (optional) - Search clause to filter records
    * `operator` string (optional) - Can be `and` or `or`; defaults to `and`
    * `predicates` object (required)
      * `field` string (required) - can be either the data\_name or the field\_key
      * `operator` string (required) -
        * Must be one of the following:
          ```
          equal_to,
          not_equal_to,
          contains,
          starts_with,
          greater_than,
          less_than,
          is_empty,
          is_not_empty
          ```
        * `starts_with` and `contains` will not work with number fields.
        * If using `is_empty` or `is_not_empty`, `value` is ignored.
      * `value` string (required, when not using `is_empty` or `is_not_empty`)
* `callback` function (required) - A function that gets called once the records are loaded.
  * `error` object (optional) - An error object if the loading fails.
  * `result` object (required) - An object containing the loaded records.
    * `records` array - An array of the fetched records.

<br />

***\*\*`limit`,`offset`, `order`, `where` options are only available in Fulcrum mobile app versions 2502.2.0+\****

<br />

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


ON('click', 'hyperlink_field', function(event){
  const options = {
    form_id: FORM().id,
    where: {
      operator: 'and',
      predicates: [
        { field: 'number', operator: 'equal_to', value: 123 },
        { field: 'text', operator: 'equal_to', value: 'hello' }
      ]
    },
    order: [['number', 'asc']],
    limit: 10,
    offset: 2
  };

  
  LOADRECORDS(options, function(error, result){
    console.log(result);
  })
})
```

## Usage

The `LOADRECORDS` function is typically used when you need to access and work with data from other forms within the context of the current form. This can be useful for displaying related data, performing cross-form calculations, or aggregating information from multiple sources. For example, you might use this functionality to load related customer records, order details, or any other linked data that needs to be processed or displayed in the current form.