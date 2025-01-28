---
title: Data Events Reference
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
Data Events allow users to perform ​_actions_​ on the mobile device when certain ​_events_​ are triggered. Actions include custom alerts and validation messages, setting field values, choices, labels, descriptions, requirement & visibility settings, HTTP requests and more. Event triggers include record loading, editing, validating, saving, value changing, and more. This enables listening for record changes, programmatically changing values (including status, project, and geometry), as well as building dynamic hyperlinks, writing custom quality assurance logic and much more! Data Events are written in standard JavaScript with some custom functions for accessing form data and record values.

# Record Events

| Event             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Listener Function Signature          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| load-record       | Fires when the record editor is displayed. This event can be used to perform one-time initialization when the record editor opens. This event is fired when creating new records and editing existing records. This event is triggered when the record is loaded into the editor in edit mode or in view only mode. It should not rely on default values since defaults will not be applied when records are in view only mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `ON('load-record', callback);`       |
| unload-record     | Acts as the opposite of `load-record` and fires when the record editor is closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `ON('unload-record', callback);`     |
| new-record        | Fires when a new record is created, after `load-record`. This event is only fired for new records. It can be used to populate custom default logic or any other custom actions that only need to be performed for new records.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `ON('new-record', callback);`        |
| edit-record       | Fires when a record is edited, after `load-record`. This event is only fired when opening existing records. It can be used to perform custom logic when an existing record is opened.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `ON('edit-record', callback);`       |
| save-record       | Fires immediately before a record is saved and after it's been validated. Inside this event it's possible to make last-second updates to records right before the record is saved. You cannot perform asynchronous tasks in this event. Once the callback is finished the record will be saved and the editor will close. If you want to prevent the record from saving, you must use the `validate-record` or `validate-repeatable` events. The callback is passed an `event` parameter that contains `isValid` and `isDraft` properties. The `isValid` property indicates if the record is valid according to the built-in validation rules. The `isDraft` property indicates whether the record is being saved as a draft.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `ON('save-record', callback);`       |
| cancel-record     | Fires when a record editing session is cancelled, before `unload-record`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `ON('cancel-record', callback);`     |
| validate-record   | Fires right before the record is saved to check any validations. Custom validations done in this callback will be displayed in the app alongside normal built-in validations. The callback function should contain custom validation logic and usage of `INVALID()` to notify the user with a message of why the record is invalid. This event is similar to `save-record` and `save-repeatable` except it gives you the option to prevent the record from being saved by using the `INVALID()` function. Asynchronous functions like `REQUEST()` are not supported in this event. The callback must perform all validations in a synchronous fashion with `INVALID()`. The callback is passed an `event` parameter that contains `isValid` and `isDraft` properties. The `isValid` property indicates if the record is valid according to the built-in validation rules. The `isDraft` property of this event indicates if the record was previously saved as a draft. The current draft state is determined during the `save-record` event which fires after `validate-record`. If you are looking to use the most current `isDraft` value, then make sure you use the event value in `save-record`, not the one in `validate-record`. | `ON('validate-record', callback);`   |
| change-geometry   | Fires when a record's geometry changes. For a new record, this event fires when the device gets a location from the GPS and adds it to the record. Once the record has a location, this event is only fired when the location is manually changed using the 'Set Location' screen. Calling `SETLOCATION` or  `SETGEOMETRY` does not fire a `change-geometry` event. If you need to handle programmatic changes to the location you must explicitly handle it in your code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `ON('change-geometry', callback);`   |
| change-project    | Fires when a record's project changes. This event does not fire on default values. If you need to handle the project being set when the record is created you can use `new-record`. Setting the project programmatically with `SETPROJECT()` does not fire a `change-project` event. If you need to respond to programmatic changes in the project you must handle it explicitly after `SETPROJECT()` is called.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `ON('change-project', callback);`    |
| change-status     | Fires when a record's status changes. This event does not fire on default values. If you need to handle the status being set when the record is created you can use `new-record`. Setting the status programmatically with `SETSTATUS()` does not fire a `change-status` event. If you need to respond to programmatic changes in the status you must handle it explicitly after `SETSTATUS()` is called.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `ON('change-status', callback);`     |
| change-assignment | Fires when a record's assignment changes. The callback is passed an `email` parameter, which is either `null` or the email address of the user assigned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `ON('change-assignment', callback);` |

## Example

To set up a listener for a record event, use the [ON](https://docs.fulcrumapp.com/docs/data-events-on) function.

```js
ON('validate-record', function (event) {
  // Do something to validate the record and call INVALID('message'); if there is an error.
});
```

## The `event` Object

The callback for record events is passed an event parameter with a `name` attribute, so you can use the same callback for multiple events. If the event has an associated value, it's passed in the `value` property of the event. If the event is associated with a form field, it also contains a `field` property that contains the data name of the field.

```json
{
  "name": "change-status",
  "value": "complete"
}
```

Below we're using the same callback to handle events from both `edit-record` and `new-record`.

```js
function callback(event) {
  if (event.name === 'edit-record') {
    // Do something.
  } else if (event.name === 'new-record') {
    // Do something else.
  }
}

ON('edit-record', callback);
ON('new-record', callback);
```

# Field Events

| Event  | Description                                                                                                                           | Listener Function Signature                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| change | Fires when a field's value changes, including calculated fields, and when child records are added/edited/removed inside a repeatable. | `ON('change', 'field', callback);`             |
| focus  | Fires when a text or numeric input field has received focus.                                                                          | `ON('focus', 'field', callback);`              |
| blur   | Fires when a text or numeric input field has lost focus.                                                                              | `ON('blur', 'field', callback);`               |
| click  | Fires when a hyperlink field is tapped.                                                                                               | `ON('click', 'my_hyperlink_field', callback);` |

There are some cases where the `change` event is not fired. Default values do not trigger a `change` event when  
creating a new record. Also, `change` events are not triggered after manually setting a value with `SETVALUE`.  However, they are triggered on changes to calculated fields which may result from changes triggered by `SETVALUE` or `SETLOCATION,` for example.

Calculation field value changes **DO** trigger field events. 

## Example

When setting up listeners for field events, be sure to add the field as the second parameter.

```js
ON('change', 'cover_type', function (event) {
  // Do something interesting when the cover_type field changes.
});
```

## The `event` Object

The callback for field events is passed an event parameter with `name`, `field`, and `value` attributes.

```json
{
  "name": "change",
  "field": "weather_summary",
  "value": "Partly Cloudy"
}
```

# Repeatable Events

| Event               | Description                                                                                                                                                                                                                                                                                                                                                   | Listener Function Signature                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| load-repeatable     | Fires when a repeatable editor is displayed.                                                                                                                                                                                                                                                                                                                  | `ON('load-repeatable', 'repeatable_field', callback);`     |
| unload-repeatable   | Acts as the opposite of `load-repeatable` and fires when the repeatable editor is closed. Does not fire when the record is saved.                                                                                                                                                                                                                             | `ON('unload-repeatable', 'repeatable_field', callback);`   |
| new-repeatable      | Fires when a new repeatable is created, after `load-repeatable`.                                                                                                                                                                                                                                                                                              | `ON('new-repeatable', 'repeatable_field', callback);`      |
| edit-repeatable     | Fires when an existing repeatable is edited, after `load-repeatable`.  This event is only fired when opening existing repeatables.                                                                                                                                                                                                                           | `ON('edit-repeatable', 'repeatable_field', callback);`     |
| save-repeatable     | Fires immediately before repeatable is saved, and after it's been validated. The callback is passed an `event` parameter that contains `isValid` and `isDraft` properties. The `isValid` property indicates if the record is valid according to the built-in validation rules. The `isDraft` property indicates whether the record is being saved as a draft. | `ON('save-repeatable', 'repeatable_field', callback);`     |
| cancel-repeatable   | Fires when a repeatable editing session is cancelled, before `unload-repeatable`.                                                                                                                                                                                                                                                                             | `ON('cancel-repeatable', 'repeatable_field', callback);`   |
| validate-repeatable | Fires right before the repeatable is saved to check any validations. The callback is passed an `event` parameter that contains `isValid` and `isDraft` properties. The `isValid` property indicates if the record is valid according to the built-in validation rules. The `isDraft` property indicates whether the record is being saved as a draft.         | `ON('validate-repeatable', 'repeatable_field', callback);` |
| change-geometry     | Fires when a repeatable's geometry changes.                                                                                                                                                                                                                                                                                                                   | `ON('change-geometry', 'repeatable_field', callback);`     |

## Example

Setting up listeners for repeatable events looks just like those for record events, except that you'll need to pass an additional parameter, the repeatable field.

```js
ON('validate-repeatable', 'repeatable_field', function (event) {
  // Do something to validate the repeatable and call INVALID('message'); if there is an error.
});
```

## The `event` Object

The callback for repeatable events is passed an event parameter with a `name` and `field` attributes.

```json
{
  "name": "save-repeatable",
  "field": "the_repeatable_field"
}
```

# Media Events

| Event         | Description                                        | Listener Function Signature                     |
| ------------- | -------------------------------------------------- | ----------------------------------------------- |
| add-photo     | Fires when a photo is added.                       | `ON('add-photo', 'photo_field', callback);`     |
| remove-photo  | Fires when a photo is removed.                     | `ON('remove-photo', 'photo_field', callback);`  |
| replace-photo | Fires when a photo is replaced (annotation saved). | `ON('replace-photo', 'photo_field', callback);` |
| add-video     | Fires when a video is added.                       | `ON('add-video', 'video_field', callback);`     |
| remove-video  | Fires when a video is removed.                     | `ON('remove-video', 'video_field', callback);`  |
| add-audio     | Fires when an audio clip is added.                 | `ON('add-audio', 'audio_field', callback);`     |
| remove-audio  | Fires when an audio clip is removed.               | `ON('remove-audio', 'audio_field', callback);`  |

## Example

```js
ON('add-photo', 'photo_field', function (event) {
  // Do something with the photo metadata
  ALERT(INSPECT(event));
});
```

**Note:** media-add events can be combined with the [`INVALID`](https://docs.fulcrumapp.com/docs/data-events-invalid) function to prevent attaching media objects. This can be useful if you want to reject media that does not meet your criteria. The example below loops through all the fields in the app and adds an `add-photo` event to look for location metadata. If `latitude` or `longitude` are missing, it will alert the user to enable geotagging on their device and prevent the photo from being attached to the record.

```js
function validateGeotags(event) {
  if (!event.value.latitude || !event.value.longitude) {
    INVALID('This photo is NOT geotagged. Enable photo geotagging on your device and try again.');
  }
}

ON('load-record', function (event) {
  DATANAMES('PhotoField').forEach(function(dataName) {
    ON('add-photo', dataName, validateGeotags);
  });
});
```

## The add-photo `event` Object

The callback for `add-photo` events is passed an event parameter with `name`, `field`, and `value` attributes. The value attribute is an object containing photo metadata.

```json
{
  "name": "add-photo",
  "field": "hydrant_photos",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071",
    "size": 834597,
    "latitude": 27.23235235,
    "longitude": -82.09875135,
    "altitude": 10.3,
    "accuracy": 5.0,
    "direction": 347.232355,
    "orientation": 1,
    "width": 4160,
    "height": 3120,
    "timestamp": "2016-01-27 11:13:45"
  }
}
```

## The remove-photo `event` Object

The callback for `remove-photo` events is passed an event parameter with `name`, `field`, and `value` attributes. When removing a photo, the value attribute object only contains the photo id.

```json
{
  "name": "remove-photo",
  "field": "hydrant_photos",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071"
  }
}
```

## The replace-photo `event` Object

The callback for `replace-photo` events is passed an event parameter with `name`, `field`, and `value` attributes. The value attribute is an object containing photo metadata with the following additional keys:

- `annotated`: boolean describing if the replacement is the result of annotation saving
- `replaced`: the ID of the photo being replaced

```json
{
  "name": "replace-photo",
  "field": "hydrant_photos",
  "value": {
    "id": "3f0ea712-a1f7-462a-9b13-2bddac145548",
    "size": 834597,
    "latitude": 27.23235235,
    "longitude": -82.09875135,
    "annotated": true,
    "replaced": "f1b053f6-6ed0-4803-9cf0-43f42caea071",
    "altitude": 10.3,
    "accuracy": 5.0,
    "direction": 347.232355,
    "orientation": 1,
    "width": 4160,
    "height": 3120,
    "timestamp": "2018-11-03 11:46:16"
  }
}
```

## The add-video `event` Object

The callback for `add-video` events is passed an event parameter with `name`, `field`, and `value` attributes. The value attribute is an object containing video metadata.

```json
{
  "name": "add-video",
  "field": "hydrant_videos",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071",
    "size": 9034597,
    "width": 1920,
    "height": 1080,
    "duration": 20.111,
    "orientation": 0,
    "track": {}
  }
}
```

## The remove-video `event` Object

The callback for `remove-video` events is passed an event parameter with `name`, `field`, and `value` attributes. When removing a video, the value attribute object only contains the video id.

```json
{
  "name": "remove-video",
  "field": "hydrant_videos",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071"
  }
}
```

## The add-audio `event` Object

The callback for `add-audio` events is passed an event parameter with `name`, `field`, and `value` attributes. The value attribute is an object containing audio clip metadata.

```json
{
  "name": "add-audio",
  "field": "hydrant_audio_notes",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071",
    "size": 203246,
    "duration": 20.111
  }
}
```

## The remove-audio `event` Object

The callback for `remove-audio` events is passed an event parameter with `name`, `field`, and `value` attributes. When removing an audio attachment, the value attribute object only contains the audio id.

```json
{
  "name": "remove-audio",
  "field": "hydrant_audio_notes",
  "value": {
    "id": "f1b053f6-6ed0-4803-9cf0-43f42caea071"
  }
}
```

# Request Calls

If you require pulling in data from an outside source, you can use the [REQUEST](https://docs.fulcrumapp.com/docs/data-events-request) function. This function has a simple signature and allows you to perform arbitrary HTTP requests.

`REQUEST` requires two parameters-- an options object containing the url and other request parameters, and a callback function that is called after the request finishes. HTTP requests are performed asynchronously, so code that processes the response needs to be contained within the callback function body.

Tips: You should use the _data name_ of the field that you want to populate. You also will want to make sure that you are returning one value (in the code below we are only grabbing the first row, `row[0]`).

```js
function doThis() {
  var options = {
    url: "https://theURLyouneed.com"
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body);
      SETVALUE('field_you_want_to_populate', data.rows[0].value);
    }
  });
}
```

With `REQUEST`, you can `PUT`, `POST` and `GET` data. You can `GET` elevation coordinates from the USGS or you can `PUT` updated features in a Carto table.

You can view the [Carto](https://docs.fulcrumapp.com/docs/data-events-examples#update-carto-table-from-fulcrum) example for more insight into using APIs.

# Reference

Check out the full documentation on available events and functions by browsing the complete list below.

# Examples

We have a [library of examples](https://docs.fulcrumapp.com/docs/data-events-examples) available for demonstrating what you can do with data events.

# Setting the app (form) attributes

You may want to further customize the default behavior of your app by using the [SETFORMATTRIBUTES](https://docs.fulcrumapp.com/docs/data-events-setformattributes) function. You can use this function to enable or disable many features like location setting, draft creation, auto-syncing and more!