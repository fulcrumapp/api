---
title: List All Forms Each User Can Access
excerpt: Use the Fulcrum Query API's system tables — memberships, memberships_forms, and forms — to produce a report of every active user in your organization along with a comma-separated list of the apps they have access to.
---

Fulcrum's Query API exposes three system tables that together model which users can see which apps: `memberships` (org members), `memberships_forms` (the user-to-form mapping), and `forms` (app metadata). Joining them produces a user-by-user access report useful for auditing permissions across your organization.

## Query

```sql
SELECT
  m.name,
  m.email,
  STRING_AGG(f.name, ', ' ORDER BY f.name) AS forms
FROM memberships m
LEFT JOIN memberships_forms mf
  ON m.user_id = mf.user_id
LEFT JOIN forms f
  ON mf.form_id = f.form_id
WHERE m.status = 'active'
GROUP BY m.name, m.email
ORDER BY m.name;
```

## Result Shape

| name | email | forms |
|---|---|---|
| Alice Smith | alice@example.com | Asset Inspections, Work Orders |
| Bob Jones | bob@example.com | Work Orders |
| Carol Lee | carol@example.com | (null — no app access) |

Users who exist in the organization but have not been added to any specific app appear with a `NULL` `forms` value because of the `LEFT JOIN`. Remove the `LEFT JOIN` and use `INNER JOIN` if you only want users who have at least one app assigned.

## How It Works

`memberships` contains one row per organization member with their `user_id`, `name`, `email`, and `status`. `memberships_forms` is the join table that links `user_id` to `form_id`. `forms` provides the human-readable `name` for each app. `STRING_AGG()` collapses multiple form rows per user into a single comma-separated string.

## Common Variations

**Filter to a specific app:** Add `WHERE mf.form_id = 'YOUR-FORM-ID'` before the `GROUP BY` to see all users who have access to one particular app.

**Include role information:** `memberships` also has a `role_id` column. Join the `roles` system table on `role_id` to include each user's role name in the output.

**Count apps per user:** Replace `STRING_AGG(f.name, ', ')` with `COUNT(f.form_id) AS app_count` to see how many apps each user can access rather than listing them by name.

**Inactive users:** Remove `WHERE m.status = 'active'` (or change it to `'inactive'`) to audit deactivated accounts.

## System Tables Reference

| Table | Key Columns | Description |
|---|---|---|
| `memberships` | `user_id`, `name`, `email`, `status`, `role_id` | All org members |
| `memberships_forms` | `user_id`, `form_id` | User ↔ app access mapping |
| `forms` | `form_id`, `name` | App metadata |
