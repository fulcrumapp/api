---
title: Sharing Data
excerpt: >-
  Fulcrum provides many ways of using and sharing the data that has been
  collected by your organization.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# Shared Views 

A Shared View is a publicly available URL that provides read-only access to any filtered subset of data within an app in many formats. [More about Shared Views](https://help.fulcrumapp.com/en/articles/4227703-what-are-shared-views) 

<br />
 
# Data Shares

Data shares are publicly available URLs that provide read-only access to the records in your Fulcrum app. Enabling data shares allows you to easily publish a live data feed, which can be shared with clients, stakeholders, or the public.

When a data share is enabled, the provided URL contains a unique access token. You can use this token to retrieve data in one of the following formats: CSV, KML, GeoJSON, or JSON. Be cautious when sharing this URL as it provides access to all current and future records for that app. You can revoke URL access by disabling the data share, but once your data has been downloaded, there's no putting the genie back in the bottle! Re-enabling data shares for the app will generate a new token.

![](https://files.readme.io/3abc0cc-data-shares.png "data-shares.png")

## Plans & Permissions

Data Shares are currently available on Professional and Enterprise [plans](https://www.fulcrumapp.com/pricing). In order to see, configure, and use data shares, members of your organization must have a Role with the _Change Organization Profile_ permission enabled. By default, the only role to have the above permission is the **Owner** system role.

## Anonymization

By default Data Shares include information about who created the record, who last updated it, and who the record is assigned to. If you'd like to remove these user identifiable attributes check the **Anonymize Data** option.

## Data Formats & Map Embeds

Data shares provide direct data access in a variety of standard formats as well as a simple map embed, which can be iframed into a website, shared via social media, etc.

### CSV

A simple flat file format that can be used directly with common spreadsheet software like Excel or as an import into other database and analysis systems. CSV feeds are also great for scripting custom integrations.

### GeoJSON

[GeoJSON](https://geojson.org/) is an open standard JSON-based format designed for representing simple geographical features, along with their non-spatial attributes. It's popular with desktop GIS and web mapping applications.

### KML

[KML](http://www.opengeospatial.org/standards/kml/) is a popular format supported by many desktop, mobile, and web applications. KML data shares can be opened in Google Earth for quickly visualizing your data. Fulcrum's standard KML format uses [structured data types](https://developers.google.com/kml/documentation/extendeddata) for compatibility with GIS applications.

We also provide a "KML Feed" endpoint, which utilizes [NetworkLinks](https://developers.google.com/kml/documentation/kmlreference?csw=1#networklink) to fetch only the records within the current view of supported applications. If you are working with a large datasets in Google Earth and have internet connectivity, the KML Feed may be more efficient.

### JSON

The JSON option returns Fulcrum's standard record format, which is used by the [Records API](<https://fulcrum.readme.io/reference#records-intro>). This is the format used for creating and updating records via the API.

### Map Embed

Fulcrum Map Embeds link to an interactive map displaying your records. This provides a simple way to share a clickable map of your data that does not require a login or any custom coding.

## Query Parameters

Available parameters to query the records associated with your app. All of the parameters may be used together to filter your data for more accurate results.

| Parameter           | Type    | Description                                                                                                                                                                                                                                        | Notes                                                                                                              |
| ------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| assigned_to         | string  | Email address of a user who belongs to the organization owning the app.                                                                                                                                                                            | The `@` sign must be URL encoded as `%40`.                                                                         |
| bounding_box        | string  | Bounding box of the records requested.                                                                                                                                                                                                             | Format should be: lat,long,lat,long (bottom, left, top, right).                                                    |
| child               | string  | The `data_name` of a Repeatable section.                                                                                                                                                                                                           | Returns child records. Not applicable to the JSON format.                                                          |
| fulcrum_id          | string  | The ID of the single record to return.                                                                                                                                                                                                             |                                                                                                                    |
| human_friendly      | boolean | When `false`, return the `data_name` values for the columns. When `true`, return the label values for the columns, or a more readable version of the system columns.                                                                               | Useful for displaying the data in a way that’s more natural for humans to read. Not applicable to the JSON format. |
| newest_first        | n/a     | Including this parameter with any non-blank value will return records ordered by last updated time in descending order. Leaving this parameter blank or omitting it completely will return records ordered by last update time in ascending order. | Using this for child records will sort by the root record’s last updated time.                                     |
| page                | integer | The page number requested. For use with `per_page`.                                                                                                                                                                                                | Defaults to 1.                                                                                                     |
| per_page            | integer | Number of items per page.                                                                                                                                                                                                                          | By default, all requests are paginated to the maximum value of 20,000 items per request.                           |
| project_id          | string  | The ID of the project with which the record is associated.                                                                                                                                                                                         |                                                                                                                    |
| skip_system_columns | boolean | When `false`, include user fields and system fields added by Fulcrum. When `true`, skip Fulcrum’s system fields and only include user-defined fields.                                                                                              | Not applicable to the JSON format.                                                                                 |
| updated_since       | integer | Return only records which were updated after the given time.                                                                                                                                                                                       | Date since epoch in seconds: 2012-04-24 15:05:22 -0400 = `1335294322`.                                             |

## Repeatable Sections

Records within Repeatable sections can be accessed via the `child` parameter, which expects the `data_name` of the repeatable field.

## Accessing Media Files

Photos, videos, audio, and signature files are also accessible via data shares. Links to the media files are automatically included by additional columns that append `_url` to the `data_name` of any media field. This URL links to a landing page where you can access all the record's media files associated with that field. The KML format embeds photos, videos, and signatures and includes media links as well.

The common URL pattern for accessing media files is:

`https://web.fulcrumapp.com/shares/{ACCESS_TOKEN}/{TYPE}/{ID}`

Where TYPE is one of `photos`, `videos`, `signatures`, `audio`.

### Thumbnail Images

You can access thumbnail images by appending `thumbnail` to the end of the URL:

`https://web.fulcrumapp.com/shares/{ACCESS_TOKEN}/{TYPE}/{ID}/thumbnail`

### Spatial Audio & Video

You can access the spatial media viewer (media & map) by appending `play` to the end of the video or audio URL:

`https://web.fulcrumapp.com/shares/{ACCESS_TOKEN}/{TYPE}/{ID}/play`

You can access the GPS tracks by appending `track.{FORMAT}` to the end of the video or audio URL where FORMAT is one of   `gpx`, `kml`, `geojson`, or `geojson?type=points`:

`https://web.fulcrumapp.com/shares/{ACCESS_TOKEN}/{TYPE}/{ID}/track.{FORMAT}`

You can also access all the combined record tracks by appending `tracks.{FORMAT}` to the end of the video or audio URL without passing the record ID, where FORMAT is one of   `gpx`, `kml`, `geojson`, or `geojson?type=points`:

`https://web.fulcrumapp.com/shares/{ACCESS_TOKEN}/{TYPE}/track.{FORMAT}`