---
title: Filter a Report by Project Name Using a Chained Query
excerpt: Use two chained QUERY() calls in a Report Builder template — the first resolves a project name to its internal ID from the projects system table, the second uses that ID to filter records — letting report consumers reference projects by human-readable name instead of UUID.
---

Fulcrum records can be assigned to a project, but the `_project_id` column stored on each record is a UUID, not a name. When you want to filter a report to a specific project, you either hard-code the UUID (fragile) or perform a lookup first. This pattern uses two `QUERY()` calls to resolve a project name to its ID, then applies it as a filter in the main data query.

## Report Template Code

```javascript
// 1. Set the project name to filter on.
//    This could also be driven by a $params value for a dynamic report.
const projectName = 'Project Alpha';  // Replace with your project name

// 2. Look up the project_id from the Fulcrum system projects table.
const projectInfo = QUERY(`
  SELECT project_id
  FROM projects
  WHERE name = '${projectName}'
`);

const projectId = projectInfo?.rows?.[0]?.project_id;

// 3. Use the resolved project_id to filter the main data query.
//    Replace "Your App Name" with your app's exact name.
const records = QUERY(`
  SELECT *
  FROM "Your App Name"
  WHERE _project_id = '${projectId}'
  ORDER BY _updated_at DESC
`);
```

## How It Works

The `projects` system table contains one row per project in your organization with `project_id` (UUID) and `name` (display name). The first `QUERY()` fetches the matching `project_id` for the project name. The second `QUERY()` then filters `"Your App Name"` using that ID via the `_project_id` column that exists on every Fulcrum record.

## Making It Dynamic with $params

Rather than hard-coding the project name, you can pass it as a URL parameter and reference it with `$params`:

```javascript
// Caller passes ?project_name=Project+Alpha in the report URL
const projectName = $params.query?.project_name || $params.post?.project_name;

const projectInfo = QUERY(`
  SELECT project_id FROM projects WHERE name = '${projectName}'
`);

const projectId = projectInfo?.rows?.[0]?.project_id;

const records = QUERY(`
  SELECT * FROM "Your App Name"
  WHERE _project_id = '${projectId}'
  ORDER BY _updated_at DESC
`);
```

## Combining with a Date Range Filter

Add a date range condition to the second query to narrow results further:

```javascript
const records = QUERY(`
  SELECT *
  FROM "Your App Name"
  WHERE _project_id = '${projectId}'
    AND _updated_at >= NOW() - INTERVAL '7 days'
  ORDER BY _updated_at DESC
`);
```

## Notes

**Project names are case-sensitive** in the `projects` table. If the lookup returns `undefined`, double-check the exact name in your Fulcrum project settings.

**`_project_id` is null for records not assigned to a project.** Those records won't appear in filtered results, which is the intended behavior for project-scoped reports.

**The `projects` system table** also contains `description`, `color`, and `created_at` columns if you want to include project metadata in the report header.
