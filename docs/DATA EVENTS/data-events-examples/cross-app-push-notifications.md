---
title: Cross-app push notifications with LOADRECORDS
excerpt: >-
  This example shows how to deliver in-app "push notifications" to Fulcrum
  users by combining a dedicated notifications app with LOADRECORDS and
  STORAGE. When a record is opened, the data event checks for new messages
  from the notifications app and displays them via CONFIRM, with support for
  role targeting and expiration dates.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Cross-app push notifications with LOADRECORDS

Fulcrum doesn't have a native push notification system, but you can simulate one using a dedicated notifications app and `LOADRECORDS`. When a field worker opens a record in any app that includes this Data Event, it checks the notifications app for new messages. If a new, un-seen message exists that targets the user's role and hasn't expired, it is displayed as a `CONFIRM` dialog.

`STORAGE` is used to track the timestamp of the last message the user dismissed, so they only see each notification once.

## Setup

### 1. Create the notifications app

Build a Fulcrum app with the following fields:

| Field label | Data name / key | Type | Purpose |
|---|---|---|---|
| Title | *(note its field key)* | Text | Notification headline |
| Message | *(note its field key)* | Text | Notification body text |
| Allowed Roles | *(note its field key)* | Classification / Choice | Which roles should see the notification (leave blank for everyone) |
| Expiration Date | *(note its field key)* | Date | Optional date after which the notification stops showing |

Note the **Form ID** for the notifications app and the **field key** for each of the four fields above.

### 2. Add the Data Event to your collection apps

Paste the code below into any app where you want notifications to appear. Update the configuration section with your form ID and field keys.

### 3. Create a notification record

Add a record to the notifications app with a title, message, and optionally an expiration date. The next time a user opens a record in the configured app, the notification will appear.

## Data Event Code

```js
// ─── Configuration ───────────────────────────────────────────────────────────

// Form ID of the notifications app (find in the URL when viewing the form)
const NOTIFICATIONS_FORM_ID = 'YOUR-NOTIFICATIONS-FORM-ID-HERE';

// Field keys from the notifications app (found in the form builder or via API)
const FIELD_KEYS = {
  title:          'YOUR-TITLE-FIELD-KEY',         // Text field: notification headline
  message:        'YOUR-MESSAGE-FIELD-KEY',        // Text field: notification body
  allowedRoles:   'YOUR-ROLES-FIELD-KEY',          // Choice field: roles to target (blank = all)
  expirationDate: 'YOUR-EXPIRATION-DATE-FIELD-KEY' // Date field: when to stop showing (blank = never)
};

// Storage key used to track the last notification the user dismissed
const STORAGE_KEY = 'lastReceivedMessage';

// ─── Main Logic ──────────────────────────────────────────────────────────────

let storage = STORAGE();

// Initialize the "last seen" timestamp in storage if this is the first run
if (!storage.getItem(STORAGE_KEY)) {
  storage.setItem(STORAGE_KEY, 0);
}

ON('load-record', () => {
  // Fetch all records from the notifications app
  LOADRECORDS({ form_id: NOTIFICATIONS_FORM_ID }, (err, result) => {
    if (err) {
      console.log(INSPECT(err));
      return;
    }

    const notificationRecords = result.records;

    if (!notificationRecords || notificationRecords.length === 0) return;

    notificationRecords.forEach((rec) => {
      // Convert the notification's last-updated timestamp to milliseconds
      const messageTimestamp = new Date(rec.updated_at).getTime();

      // Get the roles this notification is targeted to (null = everyone)
      const allowedRoles = rec.form_values?.[FIELD_KEYS.allowedRoles]
        ? CHOICEVALUES(rec.form_values[FIELD_KEYS.allowedRoles])
        : null;

      // Get the expiration date, if set
      const expirationDate = rec.form_values?.[FIELD_KEYS.expirationDate]
        ? new Date(rec.form_values[FIELD_KEYS.expirationDate])
        : null;

      const lastSeen = storage.getItem(STORAGE_KEY);

      // Only show the notification if it is newer than the last one this user saw
      if (lastSeen >= messageTimestamp) return;

      // Check if this notification is targeted to the current user's role
      const isTargeted = allowedRoles === null || allowedRoles.includes(ROLE());
      if (!isTargeted) return;

      // Check if the notification has expired
      const now = new Date().getTime();
      const isExpired = expirationDate !== null && now > expirationDate;
      if (isExpired) return;

      // Display the notification and mark it as seen when the user dismisses it
      CONFIRM(
        rec.form_values[FIELD_KEYS.title],   // Dialog title
        rec.form_values[FIELD_KEYS.message], // Dialog body
        function () {
          // Save the timestamp of this notification so it won't show again
          storage.setItem(STORAGE_KEY, new Date(rec.updated_at).getTime());
        }
      );
    });
  });
});
```

## How it works

1. When a record is opened, `LOADRECORDS` fetches all records from the notifications app.
2. For each notification record, the event checks three conditions:
   - **Is it new?** The notification's `updated_at` timestamp is compared to the last timestamp stored in `STORAGE`. If it's older than or equal to what the user last dismissed, it is skipped.
   - **Is it targeted to this user?** If the Allowed Roles field has a value, the current user's `ROLE()` must appear in the list. A blank roles field means everyone sees it.
   - **Has it expired?** If an Expiration Date is set and today is past that date, the notification is skipped.
3. Notifications that pass all three checks are displayed using `CONFIRM`. When the user dismisses the dialog, the timestamp is written to `STORAGE` so the notification won't appear again.

## Notes

- Multiple notifications can be active at the same time. Each is evaluated independently.
- Because `STORAGE` is per-device, a user who switches devices will see the notification again on the new device.
- To "resend" a notification to users who have already dismissed it, simply update the notification record in the notifications app — its `updated_at` timestamp will advance past what's stored in `STORAGE`.
- This approach works offline: if the device has previously synced the notifications app, `LOADRECORDS` can return cached records even without a network connection.
