---
title: Unix Timestamp for Unique Record Value
excerpt: >-
  While Fulcrum generates a record id for every record in Fulcrum, this id is
  quite long and sometimes too long to use. What you can do is use the [Unix
  Timestamp](https://en.wikipedia.org/wiki/Unix_time) to generate a unique
  numeric record value that can be more manageable to use.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The [ONCE()](https://docs.fulcrumapp.com/docs/calculations-ref-once) expression is used to ensure that the expression will only be run one time.

The expression below will generate unique value with 13 characters.

```js
ONCE(Date.now());
```

The example below divides the unix timestamp by 1000 and drops the decimals places using the [FLOOR()](https://docs.fulcrumapp.com/docs/calculations-ref-floor) expression. This generates a unique value with 10 characters.

```js
ONCE(FLOOR(Date.now()/1000));
```

The example below reduces the unique value to 9 characters.

```js
ONCE(FLOOR((Date.now() - 1451606400000) / 1000));
```
