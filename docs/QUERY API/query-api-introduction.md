---
title: Introduction
excerpt: Run read-only SQL against your Fulcrum data for reporting, analytics, and auditing.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---

## What is the Query API?

The Query API provides read-only access to your Fulcrum forms, records, and other tables (repeatables, choice lists, members, media, and more) by letting you run standard SQL statements against your organization's PostgreSQL database. Results can be returned as CSV, JSON, GeoJSON, and other formats, and most PostgreSQL and PostGIS functions are supported.

For the endpoint reference, supported functions, and request details, see the [Query API reference](https://docs.fulcrumapp.com/reference/query-intro).

### Use Cases

- Reporting and analytics across apps, including joins between parent and repeatable tables
- Auditing users, memberships, and changeset activity using the system tables
- Inspecting app schemas and photo metadata
- Feeding data into Report Builder templates and external tools

The examples in this section show complete, working queries for these and other tasks. You can also try queries in the [Fulcrum Query Utility](https://query.util.fulcrumapp.com/).
