---
title: Enforce a daily sync using LOADRECORDS
excerpt: >-
  This example shows how to enforce a daily sync requirement for mobile users.
  When a record is opened, it checks a "heartbeat" Task record to confirm the
  device has synced today. If not, it hides all fields and blocks saving until
  the user syncs Fulcrum.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Enforce a daily sync using LOADRECORDS

This Data Event uses a recurring Fulcrum **Task** as a daily "heartbeat." When a user opens a record, it queries the latest Task via `LOADRECORDS` and compares its due date to today's date. If they don't match — meaning the device hasn't synced today — all fields are hidden and the record cannot be saved until the user syncs.

This pattern is useful for organizations that need to ensure field workers are online and up to date with any form changes, permission updates, or removals before they can collect data.

## Setup

Before adding the Data Event, create a recurring daily Task in your Fulcrum org:

1. Navigate to **Tasks** in your Fulcrum org.
2. Create a new Task with today's date as the due date.
3. Set it to recur **daily**.
4. Note the **Form ID** of the Tasks form (found in the URL when viewing the form) — you will need it in the code below.
5. Note the **field key** for the `due_date` field in the Tasks form. You can find field keys in the form builder or via the API.

> **Note:** Any user with a custom role in Fulcrum may need **ITA Access** enabled for their role in order for `LOADRECORDS` to return Task records. Check with your Fulcrum admin.

## Data Event Code

```js
// Initialize persistent storage to cache the last known sync date
let storage = STORAGE();
const TASK_DATE_KEY = 'latest_task_date';

/**
 * Returns today's date as a YYYY-MM-DD string,
 * matching the format stored in Fulcrum Task due_date fields.
 */
function getTodayString() {
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Queries the most recent Task record and checks whether
 * its due date matches today. If not, locks down the form.
 */
function checkSyncStatus() {
  LOADRECORDS({
    // Replace this form_id with the Form ID of your Fulcrum Tasks form
    form_id: 'YOUR-TASKS-FORM-ID-HERE',
    order: [['due_date', 'desc']],
    limit: 1
  }, (err, records) => {

    // 1. Handle permission errors first (e.g. user lacks ITA access)
    if (err) {
      ALERT('Access Denied', 'Please contact your Admin for appropriate permissions to continue.');

      // Store an error flag so validate-record always blocks saving
      storage.setItem(TASK_DATE_KEY, 'permission_error');

      // Hide all fields to lock down the form visually
      DATANAMES().forEach(function(dataName) {
        SETHIDDEN(dataName, true);
      });

      return; // Stop further execution
    }

    // 2. No error — compare the latest Task due date to today
    let taskRecords = records.records;

    if (taskRecords && taskRecords.length > 0) {
      let latestTask = taskRecords[0];

      // Replace 'YOUR-DUE-DATE-FIELD-KEY' with the actual field key
      // for the due_date field in your Tasks form (e.g. '0ed3')
      let taskDate = latestTask?.form_values?.['YOUR-DUE-DATE-FIELD-KEY'];

      // Cache the task date for use in validate-record
      storage.setItem(TASK_DATE_KEY, taskDate);

      let todayStr = getTodayString();

      if (taskDate === todayStr) {
        // Device has synced today — allow the user to proceed
        ALERT('All clear', 'Your data is up to date. You may proceed.');
      } else {
        // Task date doesn't match today — device needs to sync
        ALERT(
          'Sync Required',
          `Please close Fulcrum and sync your device before continuing. ` +
          `Last sync date: ${taskDate}. Today: ${todayStr}.`
        );

        // Hide all fields to prevent data entry until synced
        DATANAMES().forEach(function(dataName) {
          SETHIDDEN(dataName, true);
        });
      }
    }
  });
}

// Run the sync check every time a record is opened
ON('load-record', checkSyncStatus);

// Block saving if the cached date doesn't match today
// (handles the case where the app is left open overnight)
ON('validate-record', function(event) {
  let storedDate = storage.getItem(TASK_DATE_KEY);
  let todayStr = getTodayString();

  if (storedDate !== todayStr) {
    INVALID('You must discard edits and sync Fulcrum (or request Admin permissions) prior to continuing.');
  }
});
```

## How it works

When a record is opened (`load-record`), `checkSyncStatus` queries the latest Task in your org, sorted by due date descending. The most recent Task's due date acts as a heartbeat — it represents the last date the Task was synced to the device.

- If the device has synced today, the due date will match today's date and the user is shown a green light.
- If the device hasn't synced, the due date will be an older date. All fields are hidden and the user is prompted to sync.
- If the LOADRECORDS call fails (e.g. due to a permissions error), the form is also locked down as a precaution.

The `validate-record` handler provides a second line of defense: even if the user had the form open before midnight, they cannot save a record after a new day begins without first syncing.
