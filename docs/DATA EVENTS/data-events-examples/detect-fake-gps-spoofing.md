---
title: Detect fake GPS spoofing
excerpt: >-
  This data event detects when a crew member is using a "Fake GPS" app to
  spoof their location. It samples multiple GPS readings over time, looks for
  suspicious patterns (e.g. a location that never moves), and prevents users
  from manually setting their geometry. Only validated GPS coordinates from the
  device are accepted.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Detect fake GPS spoofing

This Data Event blocks users from manually placing their record pin on the map and uses statistical analysis of multiple GPS samples to detect whether the device's reported location is real or spoofed by a third-party app.

On mobile devices, GPS coordinates are sampled every 500ms over 10 iterations. Because real GPS signals drift slightly, genuine locations will produce a set of unique coordinates. Fake GPS apps typically broadcast a perfectly static, repeating coordinate — and this pattern is used to identify spoofing. Once a real location is confirmed, it is locked in and any manual map edits are overridden.

## Configuration

Adjust the settings at the top of the script to match your requirements:

| Variable | Default | Description |
|---|---|---|
| `gpsLocationNecessaryToSave` | `true` | If `true`, the record cannot be saved without a valid GPS fix |
| `updateLocationOnEditRecord` | `true` | If `true`, the GPS check also runs when editing existing records |
| `continueToUpdateLocation` | `true` | If `false`, only one valid location is captured per session |
| `mobileOnlySaveRoles` | `['Standard User']` | Roles that can only save records from the mobile app, not desktop |

## Data Event Code

```js
let previousLocation = undefined;
let runCount = 0;
let locationsCollected = [];
let lastKnownRealLocation = null;

// ─── Configuration ───────────────────────────────────────────────────────────

// If true, the user cannot save the record without a validated GPS location
const gpsLocationNecessaryToSave = true;

// If true, also checks GPS location when editing an existing record
const updateLocationOnEditRecord = true;

// If false, stops updating once a valid location is found for this session
const continueToUpdateLocation = true;

// Roles that may only save records from the mobile app (not the web browser)
const mobileOnlySaveRoles = ['Standard User'];

// ─── Initialization ──────────────────────────────────────────────────────────

ON('new-record', () => {
  // Clear any pre-existing geometry on new records so the user can't inherit a location
  SETGEOMETRY(null);
});

ON('edit-record', () => {
  // When editing, preserve the existing geometry as the last known real location
  if (GEOMETRY()) lastKnownRealLocation = GEOMETRY();
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Compares two location objects by lat/lng.
 */
const locationsAreEqual = (loc1, loc2) =>
  loc1?.latitude === loc2?.latitude && loc1?.longitude === loc2?.longitude;

/**
 * Filters out coordinates that appear more than once in the collected samples.
 * Real GPS locations drift slightly, so duplicate coordinates indicate spoofing.
 */
function removeDuplicateCoords(arr) {
  const coordCount = {};

  // Count how many times each (lat, lng) pair appears
  arr.forEach(({ latitude, longitude }) => {
    const key = `${latitude},${longitude}`;
    coordCount[key] = (coordCount[key] || 0) + 1;
  });

  // Keep only unique coordinates (i.e., not duplicated — genuine GPS drift)
  return arr.filter(({ latitude, longitude }) => {
    const key = `${latitude},${longitude}`;
    return coordCount[key] === 1;
  });
}

// ─── GPS Sampling Loop ───────────────────────────────────────────────────────

/**
 * Called every 500ms to collect GPS samples.
 * After 10 samples, analyzes the set:
 *   - Requires at least 3 unique coordinates (rules out static/fake GPS)
 *   - Picks the most accurate reading and sets it as the record geometry
 */
const checkForLocationServices = () => {
  // Skip if no GPS signal, or if we already have a confirmed location and shouldn't update further
  if (!CURRENTLOCATION() || (lastKnownRealLocation && !continueToUpdateLocation)) return;

  runCount++;

  // Capture the baseline on the first run
  if (runCount === 1 && previousLocation === undefined) {
    previousLocation = CURRENTLOCATION();
    runCount = 0;
    return;
  }

  // Collect location if it differs from the previous sample
  if (!locationsAreEqual(CURRENTLOCATION(), previousLocation)) {
    const alreadyCollected = locationsCollected.find(obj =>
      locationsAreEqual(obj, CURRENTLOCATION())
    );
    if (!alreadyCollected) locationsCollected.push(CURRENTLOCATION());
  }

  // After 10 samples, evaluate whether the device location is genuine
  if (runCount === 10) {
    if (locationsCollected.length >= 3) {
      // Filter out any repeated/static coordinates
      locationsCollected = removeDuplicateCoords(locationsCollected);

      // Select the sample with the best accuracy (lowest accuracy value = more precise)
      let mostAccurateLocation = locationsCollected[0];
      locationsCollected.forEach((location, i) => {
        if (i !== 0 && location.accuracy < mostAccurateLocation.accuracy) {
          mostAccurateLocation = location;
        }
      });

      // Lock in the best confirmed GPS location as the record geometry
      lastKnownRealLocation = {
        type: 'Point',
        coordinates: [mostAccurateLocation.longitude, mostAccurateLocation.latitude]
      };

      SETGEOMETRY(lastKnownRealLocation);
    }

    // Reset counters for the next sampling round
    runCount = 0;
    locationsCollected = [];
  }

  previousLocation = CURRENTLOCATION();
};

// ─── Start GPS Sampling ──────────────────────────────────────────────────────

// Determine whether to run on new records only, or also on edits
const locationCheckEventType = updateLocationOnEditRecord ? 'load-record' : 'new-record';

ON(locationCheckEventType, () => {
  // Only run GPS sampling on mobile devices (desktop GPS is not reliable)
  if (!ISMOBILE()) return;

  SETINTERVAL(() => {
    checkForLocationServices();
  }, 500);
});

// ─── Block Manual Map Edits ──────────────────────────────────────────────────

ON('change-geometry', () => {
  // Override any manual pin drop with the validated GPS location
  if (lastKnownRealLocation) {
    SETGEOMETRY(lastKnownRealLocation);
  } else {
    SETGEOMETRY(null);
  }
});

// ─── Validation ──────────────────────────────────────────────────────────────

ON('validate-record', () => {
  // Require a confirmed GPS location before saving (mobile only)
  if (ISMOBILE() && gpsLocationNecessaryToSave) {
    if (lastKnownRealLocation) {
      SETGEOMETRY(lastKnownRealLocation);
    } else {
      INVALID('Please enable GPS on your device and wait a few seconds before saving the record.');
    }
  }

  // Block desktop saves for roles that should only use the mobile app
  if (!ISMOBILE() && mobileOnlySaveRoles.length && ISROLE(mobileOnlySaveRoles)) {
    INVALID('Records for this role can only be saved in the Fulcrum mobile app.');
  }
});
```

## How it works

1. **GPS Sampling** — Once the record loads on a mobile device, the event polls `CURRENTLOCATION()` every 500ms.
2. **Collecting unique readings** — After each sample, it checks whether the coordinate differs from the last reading. Real GPS signals naturally drift, producing a set of slightly different coordinates.
3. **Spoofing detection** — After 10 samples, the collected coordinates are inspected. Fake GPS apps broadcast a perfectly static location, so the duplicate-filtering function (`removeDuplicateCoords`) will leave fewer than 3 usable points — causing the validation to fail.
4. **Best location selection** — If at least 3 unique coordinates are found, the one with the best reported accuracy is selected as the confirmed location and written via `SETGEOMETRY`.
5. **Override map edits** — The `change-geometry` handler immediately overrides any manual pin drops with the validated GPS coordinate (or clears it if none is confirmed yet).
6. **Validation gate** — The `validate-record` handler enforces the GPS requirement and optionally blocks desktop saves for configured roles.
