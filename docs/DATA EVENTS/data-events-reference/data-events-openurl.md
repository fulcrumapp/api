---
title: OPENURL
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
Open a URL for a website or mobile app.

# Description

`OPENURL` is for opening links from within a form. It can be used to open other mobile apps or websites within an event handler. You can use form fields to build the URL to open so the links can be derived from data already entered on the record.

# Parameters

`url` String (__required__) - The URL to open

# Examples

```js
OPENURL('https://www.google.com/search?q=Fulcrum+Mobile+Solutions');

// Opens a web browser to the specified address
```

```js
OPENURL('comgooglemaps://?q=Pizza&center=37.759748,-122.427135');

// Opens google maps and searches for Pizza near a location
```

```js
OPENURL('mailto:clark.griswold@gmail.com?subject=turn+those+lights+off!&body=jk,+i+love+them.');

// Opens an email client with a predefined subject and body
```

```js
if (PLATFORM() === 'iOS') {
  OPENURL('mailto:' + $field_1 + '?subject=' + encodeURIComponent($field_2) + '&body=' + encodeURIComponent($field_3));
} else {
  OPENURL('mailto:' + $field_1 + '?subject=' + $field_2 + '&body=' + $field_3);
}

// Opens an email client with dynamic to address, subject, and body.
```

```js
ON('click', 'driving_directions', function(event) {
  OPENURL(encodeURI('https://maps.google.com/maps?daddr=' + $address.sub_thoroughfare + '+' + $address.thoroughfare + '+' + $address.locality + '+' + $address.admin_area + '+' + $address.postal_code));
});

// Opens the Google Maps app and provides driving directions to address when the 'driving_directions' hyperlink field is clicked.
```