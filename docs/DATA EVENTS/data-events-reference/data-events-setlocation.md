---
title: SETLOCATION
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
Set the `latitude` and `longitude` of a record. When you call this function, it will set the geometry of the record to a `Point` type. If you are looking to set the geometry of a record to a `LineString` or a `Polygon` , use the [SETGEOMETRY](https://docs.fulcrumapp.com/docs/setgeometry) function instead.

# Parameters

`latitude` number (**required**) - The new latitude of the record

`longitude` number (**required**) - The new longitude of the record

# Examples

```js
// Sets the location of a record
SETLOCATION(35.5946167, -80.8638915);
```
