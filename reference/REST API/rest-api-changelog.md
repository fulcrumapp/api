---
title: Changelog
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
While we are continually making improvements and updates to the Fulcrum platform, these changes rarely impact the API. Any changes that do have an impact on the API are noted below.

# June 2021

To support new product features, an [Attachments API](https://fulcrum.readme.io/reference#attachments-api) has been added for working with attachments and reference files.

# May 2021

To support new product features, `attachment_ids` has been added to the `/api/v2/forms` response. It represents the Reference Files associated with the form(s) for which the request was made. It contains 2 attributes:
- `attachment_id` - The id of the attached file

# April 2021

To support new product features, `current_organization` has been added to the `/api/v2/users` response. It represents the organization associated with the API Key with which the request was made. It contains 2 attributes:
- `id` - The organization id
- `name` - The organization name

# February 2020

The [Forms API](https://fulcrum.readme.io/reference#forms-intro) has been updated with a new [history endpoint](https://fulcrum.readme.io/reference#forms-get-history) for fetching a history of form versions. This can be used to restore a previous version of a form schema.

# March 2019

The [Authorizations API](https://fulcrum.readme.io/reference#authorizations-intro) has been updated to allow users with the `can_manage_roles` permission to explicitly set the `user_id` property to create an authorization token on behalf of another organization member, but only if that user is not a member of any other Fulcrum organizations.

# August 2016

To support disabling the project and assignment fields on apps, 2 new attributes have been added to the `forms` endpoint. You will now see `projects_enabled` and `assignment_enabled` boolean attributes when retrieving form definitions. As their name implies, these control whether the features are enabled on the form.

There are 5 new top-level attributes on `records` to support new product features for capturing audit information.

* `created_duration` - the number of seconds spent creating the record
* `updated_duration` - the number of seconds spent updating the record
* `edited_duration` - the total cumulative seconds spent editing the record (creating + all updates)
* `created_location` - an object containing the location of where the record was created from. It has 4 attributes:
  * `latitude`
  * `longitude`
  * `altitude`
  * `horizontal_accuracy`
* `updated_location` - an object containing the location of where the record was updated from. It has 4 attributes:
  * `latitude`
  * `longitude`
  * `altitude`
  * `horizontal_accuracy`

Note that all of these attributes are brand new and require iOS 2.12.0 and Android 2.19.0 for them to be populated.

# May 2016

To support new enhancements in the web record editor, `changeset_id` has been added to the `records/:id` endpoint.