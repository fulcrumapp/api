---
title: Create a Fulcrum record from a Salesforce work order
excerpt: >-
  An Apex trigger and class that automatically creates a Fulcrum record via the
  REST API whenever a new Work Order is created in Salesforce. Field values from
  the work order are mapped to Fulcrum form fields using the Fulcrum field key.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Create a Fulcrum record from a Salesforce work order

## Overview

This integration uses a Salesforce **Apex trigger** and **Apex class** to automatically create a corresponding Fulcrum record via the [Fulcrum Records API](https://developer.fulcrumapp.com/reference/records-create) whenever a new Work Order is created in Salesforce.

**Use case:** Field teams use Fulcrum for field data collection. When dispatchers create a work order in Salesforce, this trigger automatically creates the matching Fulcrum inspection or work record so field crews can see it immediately in the mobile app.

The integration uses `@future(callout=true)` to make the HTTP callout asynchronously, which is required for all external callouts from Salesforce triggers.

## Prerequisites

1. A Fulcrum app configured for the type of work order you want to track.
2. A Fulcrum API token with write access to that app (store in Salesforce Named Credentials or a Custom Setting — do not hardcode in production).
3. The Fulcrum app's **Form ID** (found in the app's URL or API response).
4. The **field keys** for each Fulcrum field you want to populate (visible in the Data Events editor or via the Forms API).
5. The Fulcrum API endpoint added to your Salesforce org's **Remote Site Settings**: `https://api.fulcrumapp.com`

## Configuration

Update the following values in `FulcrumIntegration.cls` before deploying:

| Placeholder | Description |
|---|---|
| `YOUR-FULCRUM-FORM-ID` | The UUID of your Fulcrum app |
| `FIELD_KEY_WORK_ORDER_ID` | Fulcrum field key for the work order ID field |
| `FIELD_KEY_SUBJECT` | Fulcrum field key for the work order subject/title field |
| `FIELD_KEY_DESCRIPTION` | Fulcrum field key for the description field |
| `YOUR_API_TOKEN` | Your Fulcrum API token (use Named Credentials in production) |

> **Finding field keys:** In the Fulcrum web app, open the Data Events editor for your app and run `ALERT(INSPECT(DATANAMES()))` to list all field data names and their keys.

## Code

### Trigger — `WorkOrderTrigger.trigger`

```apex
trigger WorkOrderTrigger on WorkOrder (after insert) {
    for (WorkOrder wo : Trigger.new) {
        FulcrumIntegration.createFulcrumRecord(wo.Id);
    }
}
```

### Apex Class — `FulcrumIntegration.cls`

```apex
public class FulcrumIntegration {

    // Future method runs asynchronously so the trigger doesn't block
    @future(callout=true)
    public static void createFulcrumRecord(Id workOrderId) {
        try {
            // Fetch work order details
            WorkOrder wo = [
                SELECT Id, Subject, Description
                FROM WorkOrder
                WHERE Id = :workOrderId
                LIMIT 1
            ];

            // Build the Fulcrum record payload
            Map<String, Object> formValues = new Map<String, Object>{
                'FIELD_KEY_WORK_ORDER_ID' => wo.Id,
                'FIELD_KEY_SUBJECT'       => wo.Subject,
                'FIELD_KEY_DESCRIPTION'   => wo.Description
            };

            Map<String, Object> recordData = new Map<String, Object>{
                'form_id'     => 'YOUR-FULCRUM-FORM-ID',
                'form_values' => formValues
            };

            String jsonBody = JSON.serialize(recordData);

            // Send to Fulcrum Records API
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.fulcrumapp.com/api/v2/records.json');
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('X-ApiToken', 'YOUR_API_TOKEN'); // use Named Credentials in production
            req.setHeader('x-skipworkflows', 'true');      // skip Fulcrum webhooks on import
            req.setHeader('x-skipwebhooks', 'true');
            req.setBody(jsonBody);

            Http http = new Http();
            HttpResponse res = http.send(req);

            if (res.getStatusCode() != 201) {
                System.debug('Fulcrum API error: ' + res.getStatusCode() + ' ' + res.getBody());
            } else {
                System.debug('Fulcrum record created: ' + res.getBody());
            }

        } catch (Exception e) {
            System.debug('Error creating Fulcrum record: ' + e.getMessage());
        }
    }
}
```

## Fulcrum API record payload

The body sent to `POST /api/v2/records.json` should look like:

```json
{
  "form_id": "YOUR-FULCRUM-FORM-ID",
  "form_values": {
    "FIELD_KEY_WORK_ORDER_ID": "500Dn000003AbcdEAF",
    "FIELD_KEY_SUBJECT": "Annual fire suppression inspection",
    "FIELD_KEY_DESCRIPTION": "Inspect all sprinkler heads in Building C"
  }
}
```

Form values use the Fulcrum **field key** (a short alphanumeric string like `4686`), not the field label or `data_name`.

## Notes

- **Use Named Credentials** in production instead of hardcoding the API token. Replace `req.setHeader('X-ApiToken', ...)` with `req.setEndpoint('callout:FulcrumAPI/api/v2/records.json')` and configure the Named Credential with the token as an HTTP header.
- `x-skipworkflows: true` prevents Fulcrum workflows from firing on the newly created record. Remove this header if you want Fulcrum webhooks or automations to trigger.
- The `@future` method limitation means you cannot pass `SObject` records directly — only primitive types or collections. That's why we pass the `Id` and re-query inside the method.
- To set a GPS location on the created record, add `latitude` and `longitude` top-level keys to `recordData` alongside `form_id`.
- For bulk creation (e.g. migrating existing Salesforce work orders), use the [Fulcrum Records bulk create endpoint](https://developer.fulcrumapp.com/reference/records-bulk) to avoid per-record API limits.

*Credit: Mike Meesseman*
