---
title: PLUCK
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
Extract property values from an object

# Parameters

`array` Array (**required**) - An array of objects to extract properties from

`property` String (**required**) - The property name to extract

# Returns

Object

# Examples

```js
var objects = [{name: 'one',   value: 1},
{name: 'two',   value: 2},
{name: 'three', value: 3}];
PLUCK(objects, 'value')

// returns [1,2,3]
```
