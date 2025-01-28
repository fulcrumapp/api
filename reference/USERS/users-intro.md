---
title: Users API
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
The Users API provides access to user metadata, including organizations the user is a member of. It can be accessed via HTTP Basic authentication using your Fulcrum username and password, by passing in a `token` URL parameter or the `X-ApiToken` HTTP header. You can use this endpoint in conjunction with the [Authorizations API](#authorizations-intro) to create API tokens.

# Notes

* The Users API supports HTTP Basic authentication while most other endpoints require the API token as either an HTTP request header or query string parameter.

* The Users API only allows GET requests. You must create new users or modify existing users via the web admin console.

# Sample Response

```json
{
  "user": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@gmail.com",
    "image_small": "https://s.gravatar.com/avatar/6d3a8?s=300&d=https://web.fulcrumapp.com/eks_assets/user-5c3d24.png",
    "image_large": "https://s.gravatar.com/avatar/6d3a8?s=600&d=https://web.fulcrumapp.com/eks_assets/user-5c3d24.png",
    "phone_number": "2022223333",
    "id": "2jbykjxds2t986zv2ktbch25",
    "current_organization": {
        "id": "5tbk714i-0aia-uwxk-n3i9-e67ivvmt8qyn",
        "name": "John Doe"
    },
    "contexts": [{
      "name": "John Doe",
      "id": "5tbk714i-0aia-uwxk-n3i9-e67ivvmt8qyn",
      "type": "organization",
      "role": {
        "name": "Owner",
        "is_system": true,
        "is_default": false,
        "can_manage_subscription": true,
        "can_update_organization": true,
        "can_manage_members": true,
        "can_manage_roles": true,
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
        "id": "qel78mds-4bxx-dmdq-v8p3-tww9w6qwng2p",
        "created_at": "2013-10-15T17:40:25Z",
        "updated_at": "2013-10-15T17:40:25Z"
      },
      "plan": {
        "name": "My Organization",
        "description": "",
        "export_formats": ["csv", "xlsx", "filegdb", "shp", "spatialite", "sqlite", "postgres", "kml", "geojson"],
        "export_photos": false,
        "maps_data_quota": null,
        "public_slug": null,
        "public_color": "",
        "base_price_in_cents": 0,
        "price_in_cents": 0,
        "included_users": 1,
        "slug": "myorganization",
        "versioning_enabled": true,
        "webhooks_enabled": true,
        "view_history_enabled": true,
        "repeatables_enabled": true,
        "export_reports_enabled": true,
        "export_full_history_enabled": true,
        "record_merging_enabled": true,
        "export_changesets_enabled": true,
        "activity_feed_enabled": true,
        "data_shares_enabled": true,
        "data_shares_limit": null,
        "media_data_quota": 3221225472,
        "media_data_usage_includes_photos": true,
        "media_data_usage_includes_signatures": true,
        "media_data_usage_includes_videos": true,
        "videos_enabled": true,
        "audio_enabled": true,
        "id": "4g5eik8j-h3ic-wmbv-936z-ru7gppdo648p",
        "created_at": "2014-01-23T16:22:01Z",
        "updated_at": "2015-04-01T12:56:04Z"
      }
    }],
    "access": {
      "allowed": true
    }
  }
}
```
