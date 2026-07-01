---
title: User action logger
excerpt: >-
  Log every field change, repeatable interaction, and save event during a record
  session to a hidden text field. When a customer reports a bug you can't
  reproduce, the log shows the exact sequence of steps the user took — which
  fields they changed, which repeatables they entered, and in what order.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# User action logger

## Overview

When a customer reports a data entry issue that's difficult to reproduce, it helps to know the exact sequence of actions they took in the record. This data event automatically tracks all field changes, repeatable interactions, and save events during a session, and writes the log to a hidden text field on save.

The logger uses `DATANAMES()` to register event listeners dynamically — it works on any app without needing to hardcode individual field names.

**What gets logged:**

- Every field value change (including the new value)
- Opening a new or existing repeatable child record
- Saving or discarding a repeatable child record
- The final record save

## Setup

1. Add a **Text** field to your app with a `data_name` matching `LOGGER_FIELD` below (default: `logger`). This field can be hidden from users.
2. Add the data event code below to the app's Data Events editor.
3. When a user reports an issue, open the affected record and review the `logger` field to see their session log.

> Clear the logger field at the start of each edit session (`ON('edit-record', ...)`) so each log only reflects the most recent session.

## Configuration

| Variable | Description |
|---|---|
| `LOGGER_FIELD` | The `data_name` of the hidden text field where the log is written |

## Code

```javascript
// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const LOGGER_FIELD = 'logger'; // data_name of the hidden text field for the log
// ─────────────────────────────────────────────────────────────────────────────

let sessionLog = '';

function addToLog(action) {
  sessionLog += `\n\nevent: ${action}`;
}

// Clear the log at the start of each edit session
ON('edit-record', () => {
  SETVALUE(LOGGER_FIELD, null);
  sessionLog = '';
});

// Dynamically register listeners for all fields in the app
DATANAMES().forEach((dataname) => {
  const field     = FIELD(dataname);
  const fieldType = field.type;

  // Skip non-interactive field types
  const skipTypes = ['Section', 'Label', 'CalculatedField'];
  if (skipTypes.includes(fieldType)) return;

  if (fieldType === 'Repeatable') {
    ON('new-repeatable', dataname, () => {
      addToLog(`started new child record on repeatable "${dataname}" — entry #${REPEATABLENUMBER()}`);
    });

    ON('edit-repeatable', dataname, () => {
      addToLog(`opened existing child record on "${dataname}" — entry #${REPEATABLENUMBER()}`);
    });

    ON('save-repeatable', dataname, () => {
      addToLog(`saved child record on "${dataname}"`);
    });

    ON('unload-repeatable', dataname, () => {
      addToLog(`exited child record on "${dataname}" (if the line above shows a save, this exit was normal)`);
    });

    return;
  }

  // For all other field types, log every value change
  ON('change', dataname, () => {
    addToLog(`changed field "${dataname}" to value "${JSON.stringify(VALUE(dataname))}"`);
  });
});

// Write the session log to the logger field on save
ON('save-record', () => {
  addToLog('saved record');
  SETVALUE(LOGGER_FIELD, sessionLog.trim());
});
```

## Example log output

```
event: changed field "work_type" to value "Inspection"

event: changed field "location_name" to value "Building A"

event: started new child record on repeatable "observations" — entry #1

event: changed field "defect_type" to value "Crack"

event: changed field "severity" to value "High"

event: saved child record on "observations"

event: saved record
```

## Notes

- The log is written to the text field only on **save**. If the user discards the record, the log is lost.
- For long sessions with many field changes, the log string can get large. Consider using a **multi-line text** field to ensure the full log is displayed correctly.
- `DATANAMES()` returns all fields in the app at the top level. Fields inside repeatables are also registered because `DATANAMES()` is called from within the repeatable context automatically when the repeatable is open.
- This is a debugging tool — once the issue is resolved, the logger field and data event can be removed or the field hidden.

*Credit: Gus Ferrara*
