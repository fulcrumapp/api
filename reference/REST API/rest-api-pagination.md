---
title: Pagination
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
All of the index views use pagination. The following information will be returned in the root object to help you determine where you are in the query:

```js
{
  "current_page": 1,
  "total_pages": 1,
  "total_count": 10,
  "per_page": 50
}
```

> 📘 Default Pagination
>
> By default, all requests are paginated to the maximum value of 20,000 items per request.
