---
title: Authorizations API
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
The Authorizations API provides access to your authorizations (API Tokens). Authorizations can be created via HTTP Basic authentication (POST) using your Fulcrum username and password. Other methods require [authentication](#rest-api-auth) via an API token as either an HTTP request header or query string parameter.

The Authorizations API can be used to create client-side applications that do not expose your token in the source code. A username and password can be exchanged for a temporary, or non-expiring token for use with other API endpoints.

# Properties

| Property          | Type      | Required | Readonly | Description                                                                                      |
| ----------------- | --------- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| organization\_id  | string    | yes      | no       | The organization ID.                                                                             |
| note              | string    | yes      | no       | Token use description.                                                                           |
| user\_id          | string    | no       | no       | The user to authorize. If blank, the user associated with the authentication email will be used. |
| expires\_at       | timestamp | no       | no       | Token expiration timestamp.                                                                      |
| timeout           | number    | no       | no       | The number of seconds before the token expires.                                                  |
| token\_last\_8    | string    | no       | no       | The last 8 characters of the token.                                                              |
| last\_ip\_address | string    | no       | no       | The IP Address of the last token user.                                                           |
| last\_user\_agent | string    | no       | no       | The User Agent of the last token user.                                                           |
| last\_used\_at    | timestamp | no       | no       | Timestamp when the token was last used.                                                          |
| created\_at       | timestamp | no       | no       | Timestamp when the token was created.                                                            |
| updated\_at       | timestamp | no       | no       | Timestamp when the token was updated.                                                            |
| id                | timestamp | no       | no       | Authorization ID.                                                                                |

# Validations

The following properties must be included in order to create/update an authorization object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property         | Type   | Description            | Example                                  |
| ---------------- | ------ | ---------------------- | ---------------------------------------- |
| organization\_id | string | The organization ID.   | `"7a0c3378-b63a-4707-b459-df499698f23c"` |
| note             | string | Token use description. | `"Fulcrum Query Utility"`                |

# Notes

* The POST method on the Authorizations API supports only HTTP Basic authentication while other methods require an API token as either an HTTP request header or query string parameter.

* Adding a `timeout` to an authorization will set it to expire in that number of seconds from when is created.

* Using an authorization with a set timeout will push back its expiration that number of seconds from when it is used, effectively allowing you to create an authorization with a short timeout that keeps working as long as you use it.

* Omitting a `timeout` when creating an authorization (or setting it to `null`) will create an authorization that never expires.

* Users with the `can_manage_roles` permission can explicity set the `user_id` property to create an authorization token on behalf of another organization member, but only if that user is not a member of any other Fulcrum organizations.

# Sample Response

```json
{
  "authorization": {
    "note": "Query API",
    "expires_at": null,
    "timeout": null,
    "token_last_8": "6711296a",
    "last_ip_address": null,
    "last_user_agent": "Fulcrum/3776 (iPhone; iOS 12.1.4; Scale/3.00)",
    "created_at": "2019-03-21T19:35:15Z",
    "updated_at": "2019-03-21T19:35:17Z",
    "id": "e35e6149-d544-4701-a5b6-378763d00978",
    "last_used_at": "2019-03-21T19:35:51Z",
    "user_id": "b4704135-ae67-43d9-9092-a1fdcd3fff97"
  }
}
```
