---
title: Count Active Users by Changeset Activity
excerpt: Use the Fulcrum Query API's changesets system table to count how many distinct users have created, updated, or deleted records within a given time window — useful for license audits, usage reporting, and identifying inactive accounts.
---

A changeset is created every time a Fulcrum mobile or web user syncs record changes. The `changesets` system table records who opened each changeset and when it closed, making it a reliable proxy for "how many people are actively using Fulcrum" within any time period.

## Query — Count Distinct Active Users

```sql
SELECT COUNT(DISTINCT created_by_id) AS active_user_count
FROM changesets
WHERE closed_at > CURRENT_DATE - INTERVAL '90 days';
```

Change `'90 days'` to any interval that fits your reporting window (e.g., `'30 days'`, `'1 year'`).

## Query — Active Users with Names and Emails

Join to the `memberships` table to get user details alongside activity counts:

```sql
SELECT
  m.name,
  m.email,
  COUNT(c.id)   AS changeset_count,
  MAX(c.closed_at) AS last_active
FROM changesets c
JOIN memberships m ON m.user_id = c.created_by_id
WHERE c.closed_at > CURRENT_DATE - INTERVAL '90 days'
GROUP BY m.name, m.email
ORDER BY changeset_count DESC;
```

## Query — Inactive Users (No Activity in N Days)

Find members who have never synced, or who haven't synced recently:

```sql
SELECT
  m.name,
  m.email,
  m.status,
  MAX(c.closed_at) AS last_active
FROM memberships m
LEFT JOIN changesets c ON c.created_by_id = m.user_id
WHERE m.status = 'active'
GROUP BY m.name, m.email, m.status
HAVING MAX(c.closed_at) IS NULL
    OR MAX(c.closed_at) < CURRENT_DATE - INTERVAL '90 days'
ORDER BY last_active ASC NULLS FIRST;
```

Users with `last_active = NULL` have never created a changeset (no sync activity on record).

## Query — Activity Breakdown by App

Count changesets per app to see which forms are most actively used:

```sql
SELECT
  f.name         AS app_name,
  COUNT(c.id)    AS changeset_count,
  COUNT(DISTINCT c.created_by_id) AS unique_users
FROM changesets c
JOIN forms f ON f.form_id = c.form_id
WHERE c.closed_at > CURRENT_DATE - INTERVAL '30 days'
GROUP BY f.name
ORDER BY changeset_count DESC;
```

## `changesets` Table Reference

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Changeset identifier |
| `created_by_id` | uuid | User who created the changeset |
| `form_id` | uuid | App the changeset applies to (null for bulk operations) |
| `closed_at` | timestamp | When the sync completed |
| `created_at` | timestamp | When the changeset was opened |
| `number_of_changes` | integer | Record operations included in the changeset |

## Notes

**Changesets reflect sync events, not individual record saves.** A single changeset may contain many record creates, updates, and deletes batched together in one sync. `number_of_changes` gives the count of operations in each batch.

**Web users also generate changesets.** Every save in the Fulcrum web app creates a changeset, so the counts include both mobile and web activity.

**Deleted user accounts** may leave `created_by_id` values that no longer appear in `memberships`. The `LEFT JOIN` approach in the inactive-users query handles this gracefully.
