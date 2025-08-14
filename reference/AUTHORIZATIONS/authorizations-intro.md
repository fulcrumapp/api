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

Only owners may use the Authorizations API with an API token. All other users must use basic authentication.

The Authorizations API can be used to create client-side applications that do not expose your token in the source code. A username and password can be exchanged for a temporary, or non-expiring token for use with other API endpoints.

# Properties

<Table>
  <thead>
    <tr>
      <th>
        Property
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Readonly
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        organization\_id
      </td>

      <td>
        string
      </td>

      <td>
        yes
      </td>

      <td>
        no
      </td>

      <td>
        The organization ID.
      </td>
    </tr>

    <tr>
      <td>
        note
      </td>

      <td>
        string
      </td>

      <td>
        yes
      </td>

      <td>
        no
      </td>

      <td>
        Token use description.
      </td>
    </tr>

    <tr>
      <td>
        user\_id
      </td>

      <td>
        string
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        The user to authorize. If blank, the user associated with the authentication email will be used. Only owners may specify a user\_id other than their own.
      </td>
    </tr>

    <tr>
      <td>
        expires\_at
      </td>

      <td>
        timestamp
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        Token expiration timestamp.
      </td>
    </tr>

    <tr>
      <td>
        *timeout*
      </td>

      <td>
        *number*
      </td>

      <td>
        *no*
      </td>

      <td>
        *no*
      </td>

      <td>
        **Deprecated**
        *The number of seconds before the token expires. The timeout is limited to 86400 seconds (24 hours).*
      </td>
    </tr>

    <tr>
      <td>
        token\_last\_8
      </td>

      <td>
        string
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        The last 8 characters of the token.
      </td>
    </tr>

    <tr>
      <td>
        last\_ip\_address
      </td>

      <td>
        string
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        The IP Address of the last token user.
      </td>
    </tr>

    <tr>
      <td>
        last\_user\_agent
      </td>

      <td>
        string
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        The User Agent of the last token user.
      </td>
    </tr>

    <tr>
      <td>
        last\_used\_at
      </td>

      <td>
        timestamp
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        Timestamp when the token was last used.
      </td>
    </tr>

    <tr>
      <td>
        created\_at
      </td>

      <td>
        timestamp
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        Timestamp when the token was created.
      </td>
    </tr>

    <tr>
      <td>
        updated\_at
      </td>

      <td>
        timestamp
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        Timestamp when the token was updated.
      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        timestamp
      </td>

      <td>
        no
      </td>

      <td>
        no
      </td>

      <td>
        Authorization ID.
      </td>
    </tr>
  </tbody>
</Table>

# Validations

The following properties must be included in order to create/update an authorization object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property         | Type   | Description            | Example                                  |
| ---------------- | ------ | ---------------------- | ---------------------------------------- |
| organization\_id | string | The organization ID.   | `"7a0c3378-b63a-4707-b459-df499698f23c"` |
| note             | string | Token use description. | `"Fulcrum Query Utility"`                |

# Notes

* The POST method on the Authorizations API supports only HTTP Basic authentication while other methods require an API token as either an HTTP request header or query string parameter.

* Adding a `timeout` to an authorization will set it to expire in that number of seconds from when is created. The timeout is limited to 86400 seconds (24 hours).

* If you create an API token with an API token, the new API token timeout cannot exceed the timeout of the current token.

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