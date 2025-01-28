---
title: Webhooks API
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
The Webhooks API gives you access to manage your organization's webhooks programmatically.

For more general information about webhooks, or details of responsibilities your webhook endpoint must meet, see the [Webhooks Overview](https://fulcrum.readme.io/docs/webhooks).

# Properties

| Property             | Type    | Required | Readonly | Description                                                                                                                                                                              |
| -------------------- | ------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                 | string  | yes      | no       | The name of the webhook.                                                                                                                                                                 |
| url                  | string  | yes      | no       | The HTTP URL that will receive event requests as they occur.                                                                                                                             |
| active               | boolean | no       | no       | Default: true. If true, this webhook will receive event requests. If false, this webhook will not receive event requests.                                                                |
| run_for_bulk_actions | boolean | no       | no       | Default: true. If true, this webhook will execute once per each action made during a bulk action. If false, this webhook will not be triggered by any bulk actions made to your records. |
| id                   | string  | no       | yes      | The id of the webhook.                                                                                                                                                                   |
| created_at           | string  | no       | yes      | Timestamp when the webhook was created.                                                                                                                                                  |
| updated_at           | string  | no       | yes      | Timestamp when the webhook was last updated.                                                                                                                                             |

# Validations

The following properties must be included in order to create/update a webhook object in our system. Any validation errors will return a `422` and an object with a list of validation errors.

## Required Properties

| Property | Type   | Description                                                 | Example                                      |
| -------- | ------ | ----------------------------------------------------------- | -------------------------------------------- |
| name     | string | The name of the choice webhook.                             | `"Fire Hydrant Inventory Emails"`            |
| url      | string | The HTTP URL that will receive event requets as they occur. | `"https://my-webhook-processing-script.php"` |

Example validation response if `url` is not included:

```json
{
  "webhook": {
    "errors": {
      "url": ["can't be blank"]
    }
  }
}
```

# Notes

- Your plan must include the [Developer Pack](https://www.fulcrumapp.com/plans/#fulcrum-developer-pack) and the member must have a role with permissions to `Change Organization Profile` to manage webhooks.

# Sample Response

```json
{
  "webhook": {
    "name": "Fire Hydrant Inventory Emails",
    "url": "https://script.google.com/macros/s/AKfycbyrR_bJr0XEW30DbDEXT3yjle5akRa9Dci7q6H0VTA_Oov86Vj/exec",
    "active": true,
    "run_for_bulk_actions": true,
    "id": "1617ae52-0f8a-463f-bfc0-89787c6474ea",
    "created_at": "2014-08-19T20:24:31Z",
    "updated_at": "2014-12-17T04:28:05Z"
  }
}
```