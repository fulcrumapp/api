---
title: Sequential Record Numbering with Google Apps Script and Webhooks
excerpt: Deploy a Google Apps Script web app as a Fulcrum webhook endpoint to automatically assign incrementing sequential numbers to new records as they are created — useful for inspection numbers, work order IDs, and any field that requires a guaranteed unique sequential identifier.
---

Fulcrum doesn't natively auto-increment a number field, but you can implement sequential numbering using Fulcrum Webhooks and a Google Apps Script web app. When a new record is created, Fulcrum POSTs the payload to your script, which queries the current maximum value, increments it, and PATCHes the record with the next number.

## How It Works

1. A new Fulcrum record is created (mobile or web).
2. Fulcrum fires a `record.create` webhook to your Google Apps Script URL.
3. The script checks whether the sequential number field is already set. If not, it queries the Fulcrum Query API for the current maximum value, adds 1, and PATCHes the record via the Records API.

## Google Apps Script

Create a new [Google Apps Script](https://script.google.com/) project, paste the code below, and deploy it as a web app (**Deploy → New Deployment → Web app → Execute as: Me → Who has access: Anyone**).

```javascript
// ── Configuration ─────────────────────────────────────────────────────────────
var FULCRUM_API_TOKEN    = 'YOUR-API-TOKEN';
var FORM_ID             = 'YOUR-FORM-ID';
var SEQUENTIAL_FIELD_KEY = 'YOUR_FIELD_KEY';   // Short key of the number field (e.g., 'ab12')
var SEQUENTIAL_FIELD_DATA_NAME = 'inspection_number'; // data_name of the same field

// ── Webhook entry point ───────────────────────────────────────────────────────
function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  var payload = JSON.parse(e.postData.getDataAsString());

  // Only act on record.create events for this form, and only if the field is empty
  if (
    payload.data.form_id === FORM_ID &&
    !payload.data.form_values[SEQUENTIAL_FIELD_KEY]
  ) {
    updateRecord(payload.data);
  }

  return ContentService.createTextOutput('OK');
}

// ── Get the next sequential number ───────────────────────────────────────────
function getNextNumber() {
  var query = 'SELECT ' + SEQUENTIAL_FIELD_DATA_NAME +
              ' FROM "' + FORM_ID + '"' +
              ' WHERE ' + SEQUENTIAL_FIELD_DATA_NAME + ' IS NOT NULL' +
              ' ORDER BY ' + SEQUENTIAL_FIELD_DATA_NAME + ' DESC LIMIT 1';

  var options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-ApiToken': FULCRUM_API_TOKEN
    },
    payload: JSON.stringify({ q: query, format: 'json' })
  };

  var response = UrlFetchApp.fetch('https://api.fulcrumapp.com/api/v2/query', options);
  var rows = JSON.parse(response.getContentText()).rows;

  if (rows.length > 0) {
    return parseInt(rows[0][SEQUENTIAL_FIELD_DATA_NAME], 10) + 1;
  }
  return 1;  // First record
}

// ── PATCH the record with the next number ─────────────────────────────────────
function updateRecord(recordData) {
  var nextNumber = getNextNumber();
  var url        = 'https://api.fulcrumapp.com/api/v2/records/' + recordData.id + '.json';

  // Fetch the current record to get the full form_values payload
  var getOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-ApiToken': FULCRUM_API_TOKEN
    }
  };

  var recordJson = JSON.parse(UrlFetchApp.fetch(url, getOptions).getContentText());

  // Set the sequential number field
  recordJson.record.form_values[SEQUENTIAL_FIELD_KEY] = nextNumber.toString();

  var putOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-ApiToken': FULCRUM_API_TOKEN
    },
    payload: JSON.stringify(recordJson.record)
  };

  UrlFetchApp.fetch(url, putOptions);
  Logger.log('Assigned number ' + nextNumber + ' to record ' + recordData.id);
}
```

## Setup Steps

1. Deploy the script as a web app (see above). Copy the deployment URL.
2. In Fulcrum, go to **Settings → Webhooks** and add a new webhook:
   - **URL:** Your Google Apps Script deployment URL
   - **Events:** Select **Record Created** only
3. Create a test record in your app. After a few seconds, the sequential number field should populate automatically.

## Finding Your Field Key

The field key is a short alphanumeric string visible in the App Designer when debug mode is enabled. You can also retrieve it from the form schema:

```bash
curl -H "X-ApiToken: YOUR-API-TOKEN" \
  https://api.fulcrumapp.com/api/v2/forms/YOUR-FORM-ID.json \
  | python3 -c "import sys,json; [print(e['key'], e['data_name']) for e in json.load(sys.stdin)['form']['elements'] if 'key' in e]"
```

## Notes

**Race conditions:** If two records are created within milliseconds of each other, there is a small risk of both receiving the same number. For most field use cases this is negligible, but if strict uniqueness is critical, add a small random delay or use a Google Sheets row as a distributed counter instead.

**The webhook fires on every create, not just mobile.** Records created via the API or the web app also trigger the webhook. The `!payload.data.form_values[key]` guard prevents overwriting a field that was already set.

**`SEQUENTIAL_FIELD_KEY` vs. `SEQUENTIAL_FIELD_DATA_NAME`:** The key (e.g., `ab12`) is used to read/write `form_values` directly in the record payload. The data_name (e.g., `inspection_number`) is used in SQL queries. Both refer to the same field.
