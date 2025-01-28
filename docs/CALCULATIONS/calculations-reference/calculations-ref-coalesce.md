---
title: COALESCE
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
Returns the first parameter whose value exists

# Parameters

`parameters` \* (**required**) - The value to return if it exists

# Returns

* * The first parameter that exists

# Examples

```js
COALESCE(null, null, 'Test', 1)

// returns "Test"
```

```js
COALESCE(1, null, null)

// returns 1
```

```js
COALESCE(null, null, null)

// returns undefined
```
