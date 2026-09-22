---
title: Sync worked hours from Fulcrum to BambooHR
excerpt: >-
  A Node.js script that queries Fulcrum for approved timesheet records, extracts
  worked hours per employee from a repeatable section, and posts the data to the
  BambooHR time tracking API. Runs daily to sync the previous day's hours.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Sync worked hours from Fulcrum to BambooHR

## Overview

This Node.js integration bridges **Fulcrum** (field time tracking) and **BambooHR** (HR time management). It:

1. Queries Fulcrum for timesheet records with an `"Approved Timesheet"` status updated in the last day.
2. For each approved timesheet, queries the repeatable section containing employee names and hours worked.
3. Posts each employee's hours to the BambooHR time tracking API as a clock entry.

**Typical deployment:** Run as a daily scheduled job (cron, Lambda, or similar) to sync the previous day's approved hours.

## Prerequisites

- Node.js 16+
- A Fulcrum app set up as a timesheet, with a repeatable section containing employee name and hours worked fields
- BambooHR account with Time Tracking enabled and an API key
- The following npm packages: `axios`, `fulcrum-app`, `moment`, `dotenv`

## Environment variables

Create a `.env` file with the following variables:

```bash
FULCRUM_API_KEY=your_fulcrum_api_token
FULCRUM_FORM_ID=your_timesheet_app_name   # used in the QUERY string, e.g. "Timesheet App"
BAMBOOHR_SUBDOMAIN=your-company           # subdomain at bamboohr.com
BAMBOO_TOKEN_BASE64=base64_encoded_api_key_and_password
```

> **BambooHR token:** BambooHR uses HTTP Basic Auth. Encode `apikey:password` as Base64 and use it as the `BAMBOO_TOKEN_BASE64` value. You can generate this with: `echo -n "your_api_key:x" | base64`

## Configuration

Update the following values in the script before running:

| Placeholder | Description |
|---|---|
| `YOUR_TIMESHEET_FORM_NAME/employee_repeatable` | The Query API table path for your repeatable (`"App Name/repeatable_data_name"`) |
| `employee_id_field` | The `data_name` of the field containing the BambooHR employee ID |
| `hours_worked_field` | The `data_name` of the field containing hours worked |

## Code

```javascript
require('dotenv').config();
const axios   = require('axios');
const { Client } = require('fulcrum-app');
const moment  = require('moment');

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const TIMESHEET_FORM_ID         = process.env.FULCRUM_FORM_ID;
const LABOR_REPEATABLE_TABLE    = 'YOUR_TIMESHEET_FORM_NAME/employee_repeatable';
const EMPLOYEE_ID_FIELD         = 'employee_id_field';   // data_name → BambooHR employee ID
const HOURS_FIELD               = 'hours_worked_field';  // data_name → decimal hours worked
const BAMBOOHR_SUBDOMAIN        = process.env.BAMBOOHR_SUBDOMAIN;
const BAMBOO_TOKEN_BASE64       = process.env.BAMBOO_TOKEN_BASE64;
const WORK_DAY_START_HOUR       = 9; // assumed start time (9:00 AM) for BambooHR clock entries
// ─────────────────────────────────────────────────────────────────────────────

const client = new Client(process.env.FULCRUM_API_KEY);

function log(message, data = null) {
  console.log(`[${new Date().toISOString()}] ${message}`);
  if (data) console.dir(data, { depth: null });
}

/**
 * Converts decimal hours to an HH:mm end time, assuming a fixed start hour.
 * e.g. 7.5 hours from 09:00 → "16:30"
 */
function hoursToEndTime(hoursDecimal) {
  const totalMinutes = Math.round(hoursDecimal * 60);
  const end = new Date(0, 0, 0, WORK_DAY_START_HOUR, 0);
  end.setMinutes(end.getMinutes() + totalMinutes);
  return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
}

/**
 * Fetch all approved timesheet records updated in the last 1–3 days.
 */
async function fetchApprovedTimesheets() {
  log('Querying Fulcrum for approved timesheets...');

  const startDate = moment().subtract(3, 'days').startOf('day').toISOString();
  const endDate   = moment().subtract(1, 'days').endOf('day').toISOString();

  const geojson = await client.query(
    `SELECT * FROM "${TIMESHEET_FORM_ID}"
     WHERE _status = 'Approved Timesheet'
       AND _updated_at BETWEEN '${startDate}' AND '${endDate}'`,
    'geojson'
  );

  log(`Found ${geojson.features.length} approved timesheet(s).`);
  return geojson.features;
}

/**
 * For each approved timesheet, query the labor repeatable to get
 * per-employee hours entries.
 */
async function extractLaborEntries(timesheets) {
  log('Extracting labor entries from repeatables...');

  const entries = [];
  const workDate = moment().subtract(2, 'days').format('YYYY-MM-DD');

  for (const record of timesheets) {
    const recordId = record.properties['_record_id'];

    const response = await client.query(
      `SELECT ${EMPLOYEE_ID_FIELD}, ${HOURS_FIELD}
       FROM "${LABOR_REPEATABLE_TABLE}"
       WHERE _parent_id = '${recordId}'`,
      'geojson'
    );

    response.features.forEach(row => {
      entries.push({
        employeeId:  row.properties[EMPLOYEE_ID_FIELD],
        hoursWorked: row.properties[HOURS_FIELD] || 0,
        date:        workDate
      });
    });
  }

  log(`Extracted ${entries.length} labor entries.`);
  return entries;
}

/**
 * POST each labor entry to BambooHR as a clock entry.
 */
async function postToBambooHR(entries) {
  log('Posting entries to BambooHR...');

  for (const entry of entries) {
    const payload = {
      entries: [{
        employeeId: parseInt(entry.employeeId, 10),
        date:       entry.date,
        start:      `${String(WORK_DAY_START_HOUR).padStart(2, '0')}:00`,
        end:        hoursToEndTime(entry.hoursWorked)
      }]
    };

    const response = await axios.post(
      `https://api.bamboohr.com/api/gateway.php/${BAMBOOHR_SUBDOMAIN}/v1/time_tracking/clock_entries/store`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json',
          'Authorization': `Basic ${BAMBOO_TOKEN_BASE64}`
        }
      }
    );

    log(`Posted hours for employee ${entry.employeeId}:`, response.data);
  }
}

async function run() {
  try {
    const timesheets = await fetchApprovedTimesheets();
    if (timesheets.length === 0) { log('No records to process.'); return; }

    const entries = await extractLaborEntries(timesheets);
    if (entries.length === 0) { log('No labor entries found.'); return; }

    await postToBambooHR(entries);
    log('Integration complete.');
  } catch (err) {
    log('Integration failed.', err);
    process.exit(1);
  }
}

run();
```

## Notes

- The `hoursToEndTime()` function assumes all employees start at `WORK_DAY_START_HOUR` (9:00 AM). Update this if your org uses variable start times or stores start/end times directly in Fulcrum.
- The BambooHR `/time_tracking/clock_entries/store` endpoint requires Time Tracking to be enabled in BambooHR. Check with your BambooHR administrator.
- The `_status = 'Approved Timesheet'` filter assumes your Fulcrum app uses a status field with this exact value. Update the query to match your app's status values.
- For production use, add error handling for individual entries so a single failed BambooHR POST doesn't abort the entire batch.
- Consider adding idempotency tracking (e.g. storing processed `_record_id` values) to avoid double-posting if the script is run multiple times in a day.

*Credit: Diego Caplan*
