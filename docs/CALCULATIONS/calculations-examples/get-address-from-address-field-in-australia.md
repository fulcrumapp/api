---
title: Get Address from Address Field (in Australia)
excerpt: >-
  Addresses in Australia, and other parts of the world, match up differently
  than in the USA. Here is an example of how to pull out city and state in
  Australia.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Grabbing the city:

```js
var city = '';
if ($address.locality && $address.locality !== '') {
  city += $address.locality;
}
SETRESULT(city);
```

Grabbing the state:

```js
var state;
if ($address.admin_area && $address.admin_area !== '') {
  state = $address.admin_area;
}
SETRESULT(state);
```