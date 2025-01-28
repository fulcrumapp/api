---
title: SETVALUE
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
Set the value of a field.

# Parameters

`field` String (__required__) - The data name for the field to set

`value` String (__required__) - The value to set for the field, or `null` to clear the value

# Examples

```js
// Sets the value of a weather summary field
SETVALUE('text_field', 'A Text Value');
```

```js
// Sets the value of a time field
SETVALUE('time_field', '16:00');
```

```js
// Sets the value of a date field
SETVALUE('date_field', '2016-04-28');
```

```js
// Sets the value of a single choice field
SETVALUE('choice_field', 'red');
```

```js
// Sets the value of a multiple choice field
SETVALUE('multiple_choice_field', ['red', 'green', 'blue']);
```

```js
// Sets the value of a classification field to level1 > level2 > level3
SETVALUE('classification_field', ['level1', 'level2', 'level3']);
```

```js
// Sets the value of a yes/no field
SETVALUE('yes_no_field', 'yes');
```

```js
// Sets the value of an address field
var address = {
  sub_thoroughfare: '360',
  thoroughfare: 'Central Avenue',
  suite: '200',
  locality: 'St. Petersburg',
  sub_admin_area: 'Pinellas',
  admin_area: 'FL',
  postal_code: '33701',
  country: 'US'
};

SETVALUE('address_field', address);
```

```js
// Sets the value of a record link field
SETVALUE('record_link_field', ['fulcrum_id_1', 'fulcrum_id_2']);
```