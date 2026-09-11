---
title: Calculate a Status from Repeatable Section Values
excerpt: Use REPEATABLEVALUES() to extract arrays of field values from a repeatable section and pass them to a helper function that derives a display status for each visit — useful for multi-visit workflows where each visit record can independently progress through states.
---

When a form has a repeatable section that represents discrete visits or events, you often need to derive a summary status at the parent record level that reflects the state of each visit. This example shows how to use `REPEATABLEVALUES()` to extract parallel arrays of field values from a repeatable section and evaluate them in a helper function to produce a per-visit status string.

## How It Works

`REPEATABLEVALUES($repeatable_field, 'field_data_name')` returns an array of values — one entry per row of the repeatable — for the specified field. When called for multiple fields, each array is index-aligned: `array[0]` always corresponds to the first repeatable row, `array[1]` to the second, and so on.

This makes it straightforward to evaluate multi-field conditions for a given visit by passing the index into a helper function along with the parallel arrays.

## Calculation Field Code

```javascript
/**
 * Determines a display status for a single repeatable visit.
 *
 * visitIndex    — 0 for the first visit, 1 for the second, etc.
 * visitData     — Object containing parallel arrays extracted from the repeatable
 */
function getVisitStatus(visitIndex, {
  workPerformedDates,   // Array of work-performed dates across all visits
  accessStatuses,       // Array of yes/no access values across all visits
  clearanceExceptions,  // Array of yes/no exception values across all visits
  intendedVegs,         // Array of yes/no intended-veg values across all visits
  intendedVegRemoved    // Array of yes/no veg-removed values across all visits
}) {
  // If no meaningful data exists for this visit index, it hasn't occurred yet.
  if (
    !workPerformedDates[visitIndex] &&
    !accessStatuses[visitIndex] &&
    !clearanceExceptions[visitIndex] &&
    !intendedVegs[visitIndex]
  ) {
    return '[no status]';
  }

  const hasWorkPerformedDate  = workPerformedDates[visitIndex] != null;
  const isNoAccess             = accessStatuses[visitIndex]?.toLowerCase() === 'no';
  const hasClearanceException  = clearanceExceptions[visitIndex]?.toLowerCase() === 'yes';
  const hasIntendedVeg         = intendedVegs[visitIndex]?.toLowerCase() === 'yes';
  const isIntendedVegRemoved   = intendedVegRemoved[visitIndex]?.toLowerCase() === 'yes';

  if (hasWorkPerformedDate && (!hasIntendedVeg || (hasIntendedVeg && isIntendedVegRemoved))) {
    return 'Complete';
  } else if (hasWorkPerformedDate && hasIntendedVeg && !isIntendedVegRemoved) {
    return 'Intended Veg';
  } else if (isNoAccess) {
    return 'No Access';
  } else if (hasClearanceException) {
    return 'No Clearance Required';
  } else {
    return 'Partial Clearance';
  }
}

// ── Extract parallel arrays from the repeatable ─────────────────────────────
// Replace '$visit' with your repeatable field variable.
// Replace each 'field_data_name' string with your actual field data_names.
const accessStatuses      = REPEATABLEVALUES($visit, 'access_to_structure') || [];
const workPerformedDates  = REPEATABLEVALUES($visit, 'date_work_performed') || [];
const clearanceExceptions = REPEATABLEVALUES($visit, 'exception_to_clearance') || [];
const intendedVegs        = REPEATABLEVALUES($visit, 'intended_vegetation') || [];
const intendedVegRemoved  = REPEATABLEVALUES($visit, 'intended_vegetation_removed') || [];

// ── Package and evaluate ─────────────────────────────────────────────────────
const visitData = {
  workPerformedDates,
  accessStatuses,
  clearanceExceptions,
  intendedVegs,
  intendedVegRemoved
};

const v1Status = getVisitStatus(0, visitData);
const v2Status = getVisitStatus(1, visitData);

// ── Output ───────────────────────────────────────────────────────────────────
// This renders in the title calc field or any text calc field.
SETRESULT(`V1: ${v1Status} / V2: ${v2Status}`);

/* Example outputs:
 * "V1: Complete / V2: [no status]"         — Only the first visit is done
 * "V1: Complete / V2: No Access"            — Both visits exist; V2 had no access
 * "V1: Intended Veg / V2: Complete"         — Different statuses across visits
 * "V1: No Access / V2: [no status]"         — V1 blocked; V2 not yet started
 */
```

## Key Notes

**`REPEATABLEVALUES()` returns index-aligned arrays.** Each call with the same repeatable field returns an array of the same length, so `arrays[0]` always refers to the first repeatable row across all arrays. This alignment is what makes the per-index helper function pattern reliable.

**Optional chaining handles missing values.** Using `?.toLowerCase()` prevents errors when a repeatable row exists but a specific field hasn't been filled in yet.

**`SETRESULT()` is used in Calculation fields.** If this expression runs in a Calculation field configured as the record's title, the status string appears in the record list and on the map.

**Scale to more than two visits.** Replace the hardcoded `v1Status`/`v2Status` calls with a loop over `Array.from({ length: accessStatuses.length }, (_, i) => getVisitStatus(i, visitData))` to handle any number of repeatable rows dynamically.

## Customization

**Different status logic:** Swap the `if/else` chain inside `getVisitStatus()` to match your workflow's business rules.

**Single-visit forms:** Call `getVisitStatus(0, visitData)` only and pass the result directly to `SETRESULT()`.

**Include field values in output:** Append specific values to the result string, e.g., `\`V1: ${v1Status} (${workPerformedDates[0] || 'no date'})\``.
