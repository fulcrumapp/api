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
[block:code]
{
  "codes": [
    {
      "code": "new Date(\"2012-04-20T20:35:45Z\")\n=> Fri Apr 20 2012 16:35:45 GMT-0400 (EDT)",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "Time.parse(\"2012-04-20T20:35:45Z\")\n=> 2012-04-20 20:35:45 UTC",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]