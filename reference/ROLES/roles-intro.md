---
title: Roles API
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
The roles API provides access to a list of which roles are available to a given organization. It does not support any other action.

# Sample Response

```json
{
  "roles": [{
      "name": "Manager",
      "is_system": true,
      "is_default": false,
      "can_manage_subscription": false,
      "can_update_organization": false,
      "can_manage_members": true,
      "can_manage_roles": false,
      "can_manage_layers": true,
      "can_manage_apps": true,
      "can_create_records": true,
      "can_update_records": true,
      "can_delete_records": true,
      "can_manage_projects": true,
      "can_manage_choice_lists": true,
      "can_manage_classification_sets": true,
      "can_change_status": true,
      "can_change_project": true,
      "can_assign_records": true,
      "can_import_records": true,
      "can_export_records": true,
      "can_run_reports": true,
      "can_manage_authorizations": false,
      "id": "b8cf1294-36c1-497a-a17e-f7bd3fc6e059",
      "created_at": "2018-01-19T19:59:20Z",
      "updated_at": "2018-01-19T19:59:20Z"
    },
    {
      "name": "Standard User",
      "is_system": true,
      "is_default": true,
      "can_manage_subscription": false,
      "can_update_organization": false,
      "can_manage_members": false,
      "can_manage_roles": false,
      "can_manage_layers": false,
      "can_manage_apps": false,
      "can_create_records": true,
      "can_update_records": true,
      "can_delete_records": false,
      "can_manage_projects": false,
      "can_manage_choice_lists": false,
      "can_manage_classification_sets": false,
      "can_change_status": true,
      "can_change_project": true,
      "can_assign_records": false,
      "can_import_records": false,
      "can_export_records": false,
      "can_run_reports": true,
      "can_manage_authorizations": false,
      "id": "5a326552-865c-4c91-a45b-4262d4b6aedf",
      "created_at": "2018-01-19T19:59:20Z",
      "updated_at": "2018-01-19T19:59:20Z"
    }
  ]
}
```
