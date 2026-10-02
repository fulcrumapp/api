---
title: Populate a choice field with org members via the Memberships API
excerpt: >-
  This data event uses the Fulcrum Memberships API to dynamically populate a
  Single Choice field with the full names of all active members in the org.
  STORAGE is used to cache the member list for offline support, so users see
  names even when offline.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Populate a choice field with org members via the Memberships API

Single Choice fields in Fulcrum use static lists. But sometimes you want the list of choices to reflect the current members of your org — for example, to let users pick a colleague to reassign a task to, or to track who performed a review.

This Data Event solves that by calling the [Fulcrum Memberships API](https://developer.fulcrumapp.com/reference/memberships) on load and dynamically setting the choices in a Single Choice field. `STORAGE` is used to cache the member list so the field continues to work when the device is offline.

## Setup

1. Add a **Single Choice** field to your app. Note its **data name** (e.g. `request_reassignment`).
2. Optionally add `?` as the only choice in the field as a placeholder — it will be cleared when the list loads.
3. Obtain your **Fulcrum API Token** from your account settings. Store it securely; consider using a read-only token with minimal permissions.
4. Replace the placeholder values in the configuration section below.

> **Security note:** Embedding an API token in a Data Event makes it visible to anyone who can view the app's data event code. Use a dedicated read-only token with access limited to the memberships endpoint only.

## Data Event Code

```js
// ─── Configuration ───────────────────────────────────────────────────────────

// Your Fulcrum API token — replace with your actual token
// Use a read-only token with minimal permissions
var API_TOKEN = 'YOUR-API-TOKEN-HERE';

// Data name of the Single Choice field to populate with member names
var CHOICE_FIELD_NAME = 'request_reassignment';

// Storage cache key — change this if you deploy to multiple apps to avoid conflicts
var CACHE_KEY = 'memberships_choice_cache_v1';

// ─── Main Logic ──────────────────────────────────────────────────────────────

var storage = STORAGE();

ON('load-record', function () {
  // ── Step 1: Load cached choices if available ─────────────────────────────
  // Show cached member list immediately while the API request is in flight
  var cachedChoices = null;

  if (storage) {
    var cachedJson = storage.getItem(CACHE_KEY);
    if (cachedJson) {
      try {
        cachedChoices = JSON.parse(cachedJson);
      } catch (e) {
        cachedChoices = null;
      }
    }
  }

  if (cachedChoices && Array.isArray(cachedChoices) && cachedChoices.length > 0) {
    // Populate from cache right away (works offline)
    SETCHOICES(CHOICE_FIELD_NAME, cachedChoices);
  } else {
    // Show a placeholder while loading
    SETCHOICES(CHOICE_FIELD_NAME, [
      { label: 'Loading members...', value: '' }
    ]);
  }

  // ── Step 2: Fetch the live member list from the API ──────────────────────
  var options = {
    url: 'https://api.fulcrumapp.com/api/v2/memberships.json?per_page=20000',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-ApiToken': API_TOKEN
    }
  };

  REQUEST(options, function (error, response, body) {
    if (error) {
      // If the request fails but we have a cached list, silently fall back to it
      if (cachedChoices && Array.isArray(cachedChoices) && cachedChoices.length > 0) {
        SETCHOICES(CHOICE_FIELD_NAME, cachedChoices);
      } else {
        ALERT('Error loading members: ' + INSPECT(error));
      }
      return;
    }

    // ── Step 3: Parse the response and build choice objects ────────────────
    var data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      // Fall back to cached data if parsing fails
      if (cachedChoices && Array.isArray(cachedChoices) && cachedChoices.length > 0) {
        SETCHOICES(CHOICE_FIELD_NAME, cachedChoices);
      } else {
        ALERT('Error parsing Memberships API response.');
      }
      return;
    }

    var memberships = data.memberships || [];
    var seenUserIds = {};
    var choices = [];

    memberships.forEach(function (m) {
      if (!m.user_id) return;

      // Deduplicate by user_id in case the API returns duplicates
      if (seenUserIds[m.user_id]) return;
      seenUserIds[m.user_id] = true;

      // Use the display name, falling back to first+last name, then email
      var label =
        m.user ||
        (m.first_name && m.last_name
          ? m.first_name + ' ' + m.last_name
          : (m.email || 'Unknown'));

      choices.push({
        label: label,
        value: m.user_id
      });
    });

    // Sort alphabetically by display name
    choices.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });

    // ── Step 4: Update the choice field and save to cache ─────────────────
    SETCHOICES(CHOICE_FIELD_NAME, choices);

    if (storage) {
      try {
        storage.setItem(CACHE_KEY, JSON.stringify(choices));
      } catch (e) {
        // Ignore storage write errors (e.g. storage quota exceeded)
      }
    }

    // Clear the placeholder value if it was never filled in
    var current = VALUE(CHOICE_FIELD_NAME);
    if (current === '?' || current === '' || current == null) {
      SETVALUE(CHOICE_FIELD_NAME, null);
    }
  });
});
```

## How it works

1. **Cache first** — On `load-record`, the event immediately checks `STORAGE` for a previously cached member list. If found, the choice field is populated right away, giving instant offline support.
2. **API fetch** — The event then fires an asynchronous `REQUEST` to the Memberships API. The `per_page=20000` parameter ensures all members are returned in a single call.
3. **Deduplication and sorting** — The response is parsed, deduplicated by `user_id`, and sorted alphabetically. Each member becomes a `{ label, value }` choice object.
4. **Update and cache** — The choice field is updated with the fresh list, and the result is saved back to `STORAGE` so future sessions can use it offline.

## Notes

- `STORAGE` is scoped per device. If a user logs in on a different device, the first load will show "Loading members..." until the API responds.
- To force a cache refresh, you can change `CACHE_KEY` to a new value (e.g. bump the version suffix from `_v1` to `_v2`).
- The Memberships API returns up to 20,000 members per page. Very large orgs may need pagination.
- The `value` stored in the choice field is the member's `user_id`, not their display name. This makes it easier to look up users programmatically via the API later.
