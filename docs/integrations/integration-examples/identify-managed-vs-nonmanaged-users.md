---
title: Identify Managed vs. Non-Managed Users via the API
excerpt: Use the Fulcrum Memberships API with the managed_info=1 parameter to retrieve extended SSO and user management metadata for every member of your organization — useful for auditing which users are managed through your identity provider versus self-managed.
---

When an organization uses SSO (Single Sign-On) with Fulcrum, some members are "managed" users whose accounts are controlled by the identity provider, while others are "non-managed" users who log in with a Fulcrum-native password. The Memberships API exposes this distinction via the undocumented `managed_info=1` query parameter.

## Request

```
GET https://api.fulcrumapp.com/api/v2/memberships.json?page=1&per_page=20000&managed_info=1
```

**Headers:**
```
X-ApiToken: YOUR-API-TOKEN
```

## Python Example

```python
import requests
import json

API_TOKEN = 'YOUR-API-TOKEN'

url = 'https://api.fulcrumapp.com/api/v2/memberships.json'
params = {
    'page': 1,
    'per_page': 20000,
    'managed_info': 1
}
headers = {
    'Accept': 'application/json',
    'X-ApiToken': API_TOKEN
}

response = requests.get(url, headers=headers, params=params)
response.raise_for_status()

memberships = response.json().get('memberships', [])

# Separate managed vs. non-managed
managed     = [m for m in memberships if m.get('managed')]
nonmanaged  = [m for m in memberships if not m.get('managed')]

print(f"Total members:   {len(memberships)}")
print(f"Managed users:   {len(managed)}")
print(f"Non-managed:     {len(nonmanaged)}")
print()

print("--- Non-Managed Users ---")
for m in nonmanaged:
    print(f"  {m['name']} <{m['email']}>  status={m['status']}")
```

## Export to CSV

```python
import csv

with open('memberships.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'email', 'status', 'role', 'managed'])
    writer.writeheader()
    for m in memberships:
        writer.writerow({
            'name':    m.get('name', ''),
            'email':   m.get('email', ''),
            'status':  m.get('status', ''),
            'role':    m.get('role_name', ''),
            'managed': m.get('managed', False)
        })

print("Exported to memberships.csv")
```

## Response Fields

The `managed_info=1` parameter adds a `managed` boolean field to each membership object in the response. A value of `true` indicates the user's account is provisioned and controlled via SAML/SSO. Other relevant fields include:

| Field | Description |
|---|---|
| `id` | Membership UUID |
| `name` | User's display name |
| `email` | User's email address |
| `status` | `active`, `inactive`, or `pending` |
| `role_name` | The user's assigned role |
| `managed` | `true` if SSO-managed, `false` otherwise |

## Notes

**`managed_info=1` is not documented in the public API reference.** It was discovered through testing. The behavior may change across Fulcrum API versions — test in a staging environment before relying on it in production automations.

**Pagination:** The `per_page=20000` value retrieves up to 20,000 members in a single request, which covers most organizations. For very large orgs, implement pagination by incrementing `page` while the response contains `memberships`.

**Requires org-level credentials.** The API token must belong to an Owner or Administrator to view all memberships.
