---
title: Introduction
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The Query API provides read-only access to your Fulcrum forms, records, and other tables (repeatables, choice lists, members, media, etc.) by allowing you to execute standard SQL statements against the query endpoint. This endpoint queries your Fulcrum Organization's PostgreSQL database directly and can return results in a variety of standard formats, including CSV, JSON, GeoJSON, and Postgres.

The Query API supports most standard PostgreSQL database functions, including many advanced spatial types supported by the PostGIS extension. Additionally, there are several Fulcrum-specific helper functions for formatting data and handling media attachments.

Having the ability to execute SQL statements directly against the database provides a lot of additional functionality for interacting with your data. You can select which columns you want to return, alias the field names, customize record ordering, include aggregate functions or string concatenation, define specific where clauses, join tables, and much more. Using these basic building blocks, you can build up complex queries to return composite data to drive aggregation and analytics. This API enables real-time data analytics and integrating Fulcrum with a variety of Business Intelligence (BI) services and platforms, and enables the programmatic scripting of custom data exports.

# Tools

The Query API endpoint can be used on it's own for simple GET requests in the browser or via cURL, and is also supported by our [Python](https://github.com/fulcrumapp/fulcrum-python#query-api), [JavaScript](https://github.com/fulcrumapp/fulcrum-js#query), and [Ruby](https://github.com/fulcrumapp/fulcrum-ruby#query) libraries. Additionally, we have a standalone [Command Line Utility](https://github.com/fulcrumapp/fq) and [Simple Web Application](https://github.com/fulcrumapp/fulcrum-query-utility) specifically built for working with the Query API. All of these tools are open source and provide good examples for how to build applications that interact with our APIs.

# Notes

- The Query API is read-only and _cannot modify data_ in your account.

- All requests to the Query API require an authentication token and an SQL query.

- The Query API is subject to the same 5,000 calls an hour per user rate limits as the REST API. Additionally, queries cannot exceed 10 seconds of processing time to complete.

- You can use the Query API in conjunction with the [Records API](/dev/rest/endpoints/records/) to make updates to specific records by fetching the IDs of the records you want to PUT/DELETE.

- As of May 19th 2023 the Query API can be used to index all the same objects that the REST API can index except for authorizations, audit logs, layers, workflows and groups.

> ❗️ Don't expose your API tokens!
> 
> Be careful sharing queries that expose your API token. Even though the Query API is read-only, if a token with write privileges is used, your data could still be compromised. Consider creating a [custom role](http://help.fulcrumapp.com/user-management/how-can-i-create-custom-roles-with-specific-access-rights) with restricted permissions (uncheck all boxes for read-only).

# Sample Response

Unlike the REST API, which always returns JSON, the Query API can return data in a variety of standard formats, including CSV, JSON, GeoJSON, and even PostgreSQL.

> 📘 Don't forget your geometries!
> 
> Note that the GeoJSON and Postgres formats require the `_geometry` column in the query for spatial support.

```text CSV
_latitude,_longitude,road,cul_type,cul_matl
44.40567049,-72.87380621,BOLTON VALLEY ACCESS RD,Round,Concrete Sectional
44.12626128,-72.82824537,AIRPORT RD,Round,Steel Corrugated
44.13929576,-72.82954356,AIRPORT RD,Round,Steel Corrugated
44.13960429,-72.83042557,AIRPORT RD,Round,Steel Corrugated
44.14053353,-72.83479866,AIRPORT RD,Round,Plastic Corrugated
```
```json JSON
{
  "fields": [{
    "name": "_latitude",
    "type": "double"
  }, {
    "name": "_longitude",
    "type": "double"
  }, {
    "name": "road",
    "type": "string"
  }, {
    "name": "cul_type",
    "type": "string"
  }, {
    "name": "cul_matl",
    "type": "string"
  }],
  "rows": [{
      "_latitude": 44.40567049,
      "_longitude": -72.87380621,
      "road": "BOLTON VALLEY ACCESS RD",
      "cul_type": "Round",
      "cul_matl": "Concrete Sectional"
    },
    {
      "_latitude": 44.12626128,
      "_longitude": -72.82824537,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    {
      "_latitude": 44.13929576,
      "_longitude": -72.82954356,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    {
      "_latitude": 44.13960429,
      "_longitude": -72.83042557,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    {
      "_latitude": 44.14053353,
      "_longitude": -72.83479866,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Plastic Corrugated"
    }
  ],
  "time": 0.041,
  "date": 1553698926381
}
```
```json GeoJSON
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "_latitude": 44.40567049,
      "_longitude": -72.87380621,
      "road": "BOLTON VALLEY ACCESS RD",
      "cul_type": "Round",
      "cul_matl": "Concrete Sectional"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-72.87380621, 44.40567049]
    }
  }, {
    "type": "Feature",
    "properties": {
      "_latitude": 44.12626128,
      "_longitude": -72.82824537,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-72.82824537, 44.12626128]
    }
  }, {
    "type": "Feature",
    "properties": {
      "_latitude": 44.13929576,
      "_longitude": -72.82954356,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-72.82954356, 44.13929576]
    }
  }, {
    "type": "Feature",
    "properties": {
      "_latitude": 44.13960429,
      "_longitude": -72.83042557,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Steel Corrugated"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-72.83042557, 44.13960429]
    }
  }, {
    "type": "Feature",
    "properties": {
      "_latitude": 44.14053353,
      "_longitude": -72.83479866,
      "road": "AIRPORT RD",
      "cul_type": "Round",
      "cul_matl": "Plastic Corrugated"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-72.83479866, 44.14053353]
    }
  }]
}
```
```sql Postgres
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS query (
  _geometry geometry(Geometry,4326),
  _latitude double precision,
  _longitude double precision,
  road text,
  cul_type text,
  cul_matl text
);

INSERT INTO query (_geometry, _latitude, _longitude, road, cul_type, cul_matl)
SELECT 
'0101000020e610000078bfe170ec3752c04bc0b702ed334640', '44.40567049', '-72.87380621', 'BOLTON VALLEY ACCESS RD', 'Round', 'Concrete Sectional';

INSERT INTO query (_geometry, _latitude, _longitude, road, cul_type, cul_matl)
SELECT 
'0101000020e6100000a94ddef8013552c0f12c625429104640', '44.12626128', '-72.82824537', 'AIRPORT RD', 'Round', 'Steel Corrugated';

INSERT INTO query (_geometry, _latitude, _longitude, road, cul_type, cul_matl)
SELECT 
'0101000020e6100000ad33df3d173552c0f3d58671d4114640', '44.13929576', '-72.82954356', 'AIRPORT RD', 'Round', 'Steel Corrugated';

INSERT INTO query (_geometry, _latitude, _longitude, road, cul_type, cul_matl)
SELECT 
'0101000020e6100000613a4ab1253552c035f7a98dde114640', '44.13960429', '-72.83042557', 'AIRPORT RD', 'Round', 'Steel Corrugated';

INSERT INTO query (_geometry, _latitude, _longitude, road, cul_type, cul_matl)
SELECT 
'0101000020e610000075dc5b576d3552c0b4abb100fd114640', '44.14053353', '-72.83479866', 'AIRPORT RD', 'Round', 'Plastic Corrugated';
```

# Fulcrum Table Types

The basic `SELECT * FROM tables;` query will return all of the tables available for use and is a good place to start when exploring the capabilities of the Query API.

[block:parameters]
{
  "data": {
    "h-0": "Type",
    "h-1": "Description",
    "0-0": "form",
    "0-1": "These tables contain the records for each form. These are the primary tables used in the Query API and contain all the main record data.",
    "1-0": "repeatable",
    "1-1": "These tables contain child records. Child tables have some additional columns, `_child_record_id` and \\_parent_id that can be used to link child records to the parent records. Note that because Fulcrum supports nested child records, it's possible that child records have their own child records. Using `_child_record_id`, `_parent_id` and \\_record_id it's possible to construct queries that can link records together going down or up repeatable levels.",
    "2-0": "link",
    "2-1": "These tables help you join linked records. They are join tables for connecting linked apps. For each Record Link field, there will be a join table that contains a row for each link between records. You can think of this table as representing the \"arrows\" between related records when using Record Link fields. There will be a row for each \"arrow\" and `source_record_id` is the start of the arrow and `linked_record_id` is the arrowhead.",
    "3-0": "media",
    "3-1": "These tables help you join media with records. Each photo, video, and audio field will have its own associated table that can be used to connect the record data with the `photos`, `audio` and `videos` system tables. Each media field also has an array column on the record table containing the ID's, but these `media` tables let you use more conventional SQL joins to connect the data rather than more complex array operations to link multiple photos in a single photo to the `photos` table.",
    "4-0": "system",
    "4-1": "These tables contain metadata and configuration information that supports the overall functionality of the Fulcrum platform. They are not directly related to record-level data collected in forms but instead provide the supporting framework for managing the organization, users, and application settings. They are crucial for integrating Fulcrum with external systems, enabling advanced analytics, and maintaining operational consistency across the platform.  \n  \nBelow is a detailed description of each system table and its specific purpose:  \n  \n1. Audio: Stores metadata about audio files uploaded to records.\n2. Changesets: Tracks batches of changes made to records, including metadata and statistics about the changes.\n3. Choice Lists: Defines lists of choices for dropdown or multi-select fields in forms.\n4. Classification Sets: Contains grouped classification options used in forms.\n5. Forms: Stores metadata about forms, including configurations and status.\n6. Memberships: Details user memberships within the organization, including roles and statuses.\n7. Photos: Tracks photos uploaded to records, including metadata and geolocation.\n8. Projects: Represents projects to organize records.\n9. Roles: Defines roles and permissions for users in the organization.\n10. Signatures: Stores signature images uploaded to records.\n11. Videos: Manages video files uploaded to records, including their metadata.\n12. Record Links: Tracks links between related records in different forms.\n13. Record Series: Configures recurring record creation with assigned users and projects.\n14. Devices: Tracks information about devices used to collect data.\n15. Memberships Devices: Maps users to devices they have used.\n16. Memberships Forms: Maps users to forms they have access to.\n17. Memberships Projects: Maps users to projects they are assigned to.\n18. Memberships Layers: Maps users to layers they have access to."
  },
  "cols": 2,
  "rows": 5,
  "align": [
    null,
    null
  ]
}
[/block]


_Note_: If a query returns `{"error":"relation \"organization_1234.form_123456_undefined_view\" does not exist"}` this is an error that can happen with longer form names. Postgres has a table name limitation of [63 characters](https://www.postgresql.org/docs/current/static/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS), so with queries containing form/repeatable names > 63 characters, you might see this and will either need to shorten the names or use the form ID _(see below)_.

# Form Tables

Fulcrum form tables hold the records for each form in your account.

- You can query a form by its name (`SELECT * FROM "Park Inventory";`) or its ID (`SELECT * FROM "19da1bbc-43e4-49b3-b70f-a63ec680268e";`).

- Repeatable records can be accessed with the following table name pattern: `"Table Name/repeatable_column"`.

- Record links can be accessed with the following table name pattern: `"Table Name/record_link_column"`.

- Media records (photos, video, audio, signatures) can be accessed with the following table name pattern: `"Table Name/media_column"`.

## System Columns

Every Fulcrum form contains standard system columns, in addition to your custom fields. System columns are prepended with an underscore (`_`) to help distinguish them easier.

| Column                 | Type      | Description                                                                                                                                                           |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_record_id`           | string    | The ID of the [record](/dev/rest/endpoints/records/).                                                                                                                 |
| `_project_id`          | string    | The ID of the [project](/dev/rest/endpoints/projects/). Can be joined to the `project_id` column in the `projects` table.                                             |
| `_assigned_to_id`      | string    | The ID of the [member](/dev/rest/endpoints/users/) the record is assigned to.  Can be joined to the `user_id` column in the `memberships` table.                      |
| `_status`              | string    | The record [status](http://help.fulcrumapp.com/en/articles/75196-what-is-a-status-field).                                                                             |
| `_version`             | number    | The record [version](http://help.fulcrumapp.com/web-app/how-does-version-history-work).                                                                               |
| `_title`               | string    | The record [title](http://help.fulcrumapp.com/en/articles/75252-what-is-a-title-field).                                                                               |
| `_created_at`          | timestamp | The timestamp when the record was created on the device.                                                                                                              |
| `_updated_at`          | timestamp | The timestamp when the record was updated on the device.                                                                                                              |
| `_server_created_at`   | timestamp | The timestamp when the record was created on the server.                                                                                                              |
| `_server_updated_at`   | timestamp | The timestamp when the record was updated on the server.                                                                                                              |
| `_created_by_id`       | string    | The ID of the [member](/dev/rest/endpoints/users/) the record was created by.  Can be joined to the `user_id` column in the `memberships` table.                      |
| `_updated_by_id`       | string    | The ID of the [member](/dev/rest/endpoints/users/) the record was updated by.  Can be joined to the `user_id` column in the `memberships` table.                      |
| `_changeset_id`        | string    | The ID of the last [changeset](/dev/rest/endpoints/changesets/). Can be joined to the `changeset_id` column of the changesets table.                                  |
| `_latitude`            | number    | The record latitude.                                                                                                                                                  |
| `_longitude`           | number    | The record longitude.                                                                                                                                                 |
| `_geometry`            | geometry  | The record geometry as a native PostGIS geometry. When output to CSV, it's in Extended Well-Known Text ([EWKT](http://postgis.net/docs/ST_GeomFromEWKT.html)) format. |
| `_altitude`            | number    | The GPS altitude in meters above/below (+/-) sea level.                                                                                                               |
| `_speed`               | number    | The GPS speed in meters per second.                                                                                                                                   |
| `_course`              | number    | The GPS course in degrees (0.0-360), only recorded if the device is moving.                                                                                           |
| `_horizontal_accuracy` | number    | The GPS latitude and longitude accuracy in meters.                                                                                                                    |
| `_vertical_accuracy`   | number    | The GPS altitude accuracy in meters. (Only reported on iOS devices)                                                                                                   |

# SQL Reference Material

- [SQL Tutorial](http://sqlzoo.net/)
- [A Primer on SQL](https://leanpub.com/aprimeronsql/read)
- [Learn SQL the Hard Way](https://learncodethehardway.org/sql/)
- [A beginners guide to thinking in SQL](http://www.sohamkamani.com/blog/2016/07/07/a-beginners-guide-to-sql/)
- [PostgreSQL JSON Functions and Operators](https://www.postgresql.org/docs/current/static/functions-json.html)