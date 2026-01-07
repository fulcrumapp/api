---
title: Create PDF Report
excerpt: ''
api:
  file: rest-api.json
  operationId: create-report
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
You must send a request to this endpoint with the body below. If you leave out the template\_id attribute, the endpoint will use the most recently saved template or the generic template if no custom templates exist.

```json
{
  "report": {
    "record_id": "{record_id}",
    "template_id": "{template_id}"
  }
}
```

This request will return the following response. You will need to send an authenticated request to the URL returned to retrieve the report.

```json
{
    "report": {
        "state": "completed",
        "id": "abc15cb7-6b93-4d0d-97a0-777681699123",
        "created_at": "2018-12-07T17:30:27Z",
        "updated_at": "2018-12-07T17:30:28Z",
        "record_id": "abc123...",
        "template_id": "abc123...",
        "started_at": "2018-12-07T17:30:27Z",
        "completed_at": "2018-12-07T17:30:28Z",
        "failed_at": null,
        "url": "https://api.fulcrumapp.com/api/v2/reports/....pdf"
    }
}
```
