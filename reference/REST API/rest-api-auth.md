---
title: Authentication
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
API calls are authenticated with a simple API Token that is provided with the request. The API Token can be passed as an HTTP request header or as a parameter in the query string.

# Managing your API Tokens

API Tokens are unique for each organization you have a membership with.

You can find your tokens by browsing to the [Settings/API page](https://web.fulcrumapp.com/settings/api). You can generate separate tokens for different purposes. Keep in mind that when generating tokens, you’ll only get one shot at storing it somewhere, so copy and keep them in a safe place.

> ❗️ Secure your API Tokens!
>
> Your API Token can be used to access and modify all data which you have permission to access within that organization, so be sure to keep the token private. Only share it with others if you want them to have that access. It is bad practice to put tokens in source code, especially if it’s publicly available. If you think your API Token has been compromised, you can generate a new one from your Fulcrum account API settings page or the [Authorizations API](#authorizations-intro).

# HTTP Request Header

You can send the API Token using the `X-ApiToken` HTTP request header.

Test your API Token from a command prompt using cURL:

```sh
curl --request GET 'https://api.fulcrumapp.com/api/v2/forms.json' \
--header 'Accept: application/json' \
--header 'X-ApiToken: my-secret-token'
```

# Query String Parameter

We strongly recommend against using your token in a query string and are currently working to deprecate this functionality for security reasons.
