---
title: Generate a Full Timestamp
excerpt: 'Resulting format looks like: `2015-11-23 16:36:14`.'
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
TIMESTAMP();
```

Note that since calculation fields are constantly evaluated, this timestamp will always be overwritten with the current time. If you want to add the initial timestamp and prevent it from changing, you can wrap this in a [`ONCE`](https://docs.fulcrumapp.com/docs/calculations-ref-once) function like so:

```js
ONCE(TIMESTAMP());
```
