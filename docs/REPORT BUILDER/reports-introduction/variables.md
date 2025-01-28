---
title: Variables
excerpt: >-
  The variables below can be used in tags to output the values into the
  template.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Example outputting the form name into an H1 heading element:

```html
<h1><%= form.name %></h1>
```

# Organization

- `organization.id`
- `organization.image`
- `organization.name`
- `organization.description`
- `organization.address1`
- `organization.address2`
- `organization.city`
- `organization.state`
- `organization.postalCode`
- `organization.country`

# Form

- `form.id`
- `form.name`
- `form.description`
- `form.version`
- `form.createdAt`
- `form.updatedAt`
- `form.image`
- `form.imageLarge`
- `form.imageSmall`
- `form.imageThumbnail`
- `form.isProjectEnabled`
- `form.isAssignmentEnabled`
- `form.isAutoAssign`
- `form.isGeometryEnabled`
- `form.isGeometryRequired`
- `form.isHiddenOnDashboard`
- `form.boundingBox`
- `form.statusField.isHidden`
- `form.statusField.isReadOnly`
- `form.statusField.isEnabled`
- `form.statusField.choices`

# Record

- `record.id`
- `record.version`
- `record.latitude`
- `record.longitude`
- `record.createdAt` (server)
- `record.updatedAt` (server)
- `record.clientCreatedAt` (mobile)
- `record.clientUpdatedAt` (mobile)
- `record.createdByID`
- `record.createdByName`
- `record.updatedByID`
- `record.updatedByName`
- `record.projectID`
- `record.projectName`
- `record.assignedToID`
- `record.assignedToName`
- `record.status`
- `record.horizontalAccuracy`
- `record.verticalAccuracy`
- `record.altitude`
- `record.speed`
- `record.course`
- `record.changesetID`
- `record.createdDuration`
- `record.updatedDuration`
- `record.editedDuration`
- `record.createdLatitude`
- `record.createdLongitude`
- `record.createdAltitude`
- `record.createdAccuracy`
- `record.updatedLatitude`
- `record.updatedLongitude`
- `record.updatedAltitude`
- `record.updatedAccuracy`
- `record.displayValue` (title)
- `record.isStatusFieldEnabled`
- `record.formValues`
- `record.formValues.get('key').displayValue`
- `record.formValues.find('dataName').displayValue`

# Field

All field classes are provided in the [fulcrum-core library](https://github.com/fulcrumapp/fulcrum-core). Each field extends the [form-value class](https://github.com/fulcrumapp/fulcrum-core/blob/master/dist/values/form-value.d.ts). If you want to find out specific functions and properties of a given field type, search through `fulcrum-core/dist/values/` and find the related `.d.ts` file.

# User

Information on the user running the report.

- `USERFULLNAME()`
- `EMAIL()`
- `ROLE()`
- `TIMEZONE()`
- `LANGUAGE()`
- `LOCALE()`
- `CURRENCYCODE()`
- `CURRENCYSYMBOL()`
- `COUNTRY()`
- `DECIMALSEPARATOR()`
- `GROUPINGSEPARATOR()`