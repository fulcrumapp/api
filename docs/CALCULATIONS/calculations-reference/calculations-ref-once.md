---
title: ONCE
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
Returns a value once, given the current value. This is useful to perform a calculation only once, the first time it's evaluated.

# Parameters

`value` Number (**required**) - argument

# Returns

Number

# Examples

```js
ONCE(VERSIONINFO())

// returns "Apple iPhone6,2, iOS 8.1, Fulcrum 2.7.0 2162"
```
