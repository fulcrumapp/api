---
title: Audit Logs API
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
Audit Logs provide a single source of all user activity within a Fulcrum organization. The Audit Logs API provides read-only access to logged account activity.

**NOTE:** When requesting the Get All Audit Logs endpoint, use `activity` instead of `action` if you'd like to find logs by a specific `action`

# Properties

| Property | Type | Description |
|----------|------|-------------|
| source_type | string | Type of log entry (export, data_export, membership, layer, project, audit_log, role, form, data_share, classification_set, authorization, choice_list, import, organization, webhook) |
| source_id | string | ID of the source entity |
| action | string | Action logged (update, create, permission_update, download, delete, reset, share_enabled, share_disabled, update_credit_card, plan_change, billing_emails_change, update_storage, add_credit, change_default) |
| description | string | Brief description of the logged activity |
| data | object | Additional data for certain activities |
| ip | string | Internet Protocol address of the device that triggered the activity |
| user_agent | string | User Agent of the web browser from the device that triggered the activity |
| location | string | Approximate IP location from the device that triggered the activity |
| latitude | number | Approximate IP latitude from the device that triggered the activity |
| longitude | number | Approximate IP longitude from the device that triggered the activity |
| admin_area | string | State, parsed from the approximate IP location of the device that triggered the activity |
| country | string | Country, parsed from the approximate IP location of the device that triggered the activity |
| locality | string | City, parsed from the approximate IP location of the device that triggered the activity |
| postal_code | string | Postal Code, parsed from the approximate IP location of the device that triggered the activity |
| id | string | ID of the audit log record |
| actor | string | Name of the Fulcrum member that triggered the activity | 
| actor_id | string | ID of the Fulcrum member that triggered the activity |
| time | string | Timestamp when the log was recorded |

# Sample Response

```json
{
  "audit_logs": [
    {
      "id": "9324a39a-24a3-4c01-b082-bc33d791e315",
      "source_type": "layer",
      "source_id": "493553f3-d341-4041-89c0-0284e4b8d713",
      "action": "update",
      "description": "Maryam Larson updated Layer New MB Tiles Layer Again - No changes",
      "data": null,
      "ip": "172.19.0.1",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
      "location": null,
      "latitude": null,
      "longitude": null,
      "actor": "Maryam Larson",
      "actor_id": "a427fd47-dda7-4806-9683-cf279eecd204",
      "time": "2018-10-25T22:08:10Z"
    }, {
      "id": "60fd7a39-6e91-47d6-8634-9a6fa7da2349",
      "source_type": "membership",
      "source_id": "4ba99b9f-5578-49f6-96b6-53304ff1d41b",
      "action": "permission_update",
      "description": "Maryam Larson updated member Jamie Lannister - Permission [layers] was updated from 'New MB Tiles Layer Again, Fulcrum App Layer, Audit Log Test Layer' to 'Fulcrum App Layer, Audit Log Test Layer'",
      "data": null,
      "ip": "172.19.0.1",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
      "location": null,
      "latitude": null,
      "longitude": null,
      "actor": "Maryam Larson",
      "actor_id": "a427fd47-dda7-4806-9683-cf279eecd204",
      "time": "2018-10-25T22:04:08Z"
    }, {
      "id": "a1e29026-bba4-49e2-922d-cc8bf49695ed",
      "source_type": "layer",
      "source_id": "493553f3-d341-4041-89c0-0284e4b8d713",
      "action": "update",
      "description": "Maryam Larson updated Layer New MB Tiles Layer Again - Setting [description] was changed from '{empty}' to 'Added A New Description';",
      "data": null,
      "ip": "172.19.0.1",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
      "location": null,
      "latitude": null,
      "longitude": null,
      "actor": "Maryam Larson",
      "actor_id": "a427fd47-dda7-4806-9683-cf279eecd204",
      "time": "2018-10-25T22:04:08Z"
    }, {
      "id": "dc603bf9-3373-4870-b1c9-e90168ebd4c1",
      "source_type": "membership",
      "source_id": "4ba99b9f-5578-49f6-96b6-53304ff1d41b",
      "action": "permission_update",
      "description": "Maryam Larson updated member Jamie Lannister - Permission [layers] was updated from 'Fulcrum App Layer, Audit Log Test Layer' to 'New MB Tiles Layer Again, Fulcrum App Layer, Audit Log Test Layer'",
      "data": null,
      "ip": "172.19.0.1",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
      "location": null,
      "latitude": null,
      "longitude": null,
      "actor": "Maryam Larson",
      "actor_id": "a427fd47-dda7-4806-9683-cf279eecd204",
      "time": "2018-10-25T22:02:53Z"
    }
  ],
  "current_page": 1,
  "total_pages": 6,
  "total_count": 142,
  "per_page": 25
}
```