---
title: Introduction
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> 📘 
> 
> The REST API is part of the [Developer Pack](https://www.fulcrumapp.com/plans/#detailed_feature_list) which can be added on to any plan and is included with certain Fulcrum plans. Please see our [pricing page](https://www.fulcrumapp.com/pricing/) for details.

The Fulcrum JSON API uses REST endpoints for querying, creating, updating, and deleting data. The API provides users the ability to: query the URL for information using a GET request, update the object by sending a PUT, or delete the object by sending a DELETE request. Each operation is a URL endpoint that represents either a single object or a collection of objects.

# Base URL

The base URL for the Fulcrum API is `https://api.fulcrumapp.com`. Each individual API resource has its own set of methods and endpoints for creating, reading, updating, and deleting that resource. The endpoint should be appended to the base URL to create the API call. See the examples at the end of each documentation section for additional guidance.

# JSON Headers

For all requests, be sure to set the `Accept` HTTP header to `application/json`.  
For `POST` and `PUT` requests, be sure to set the `Content-Type` HTTP header to `application/json`.