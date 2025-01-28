---
title: Timestamps
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
All timestamp values in Fulcrum are stored in UTC and served in the [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) standard: `2012-04-20T20:35:45Z`.

```javascript JavaScript
new Date("2012-04-20T20:35:45Z")
=> Fri Apr 20 2012 16:35:45 GMT-0400 (EDT)
```
```ruby Ruby
Time.parse("2012-04-20T20:35:45Z")
=> 2012-04-20 20:35:45 UTC
```
