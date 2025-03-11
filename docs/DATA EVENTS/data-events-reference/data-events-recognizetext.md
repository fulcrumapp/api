---
title: RECOGNIZETEXT
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
**Description**\
The `RECOGNIZETEXT` function is used to retrieve text recognized from a photo. This function is particularly useful for extracting textual content from images, which can then be used in further data processing or stored in database fields.

**Parameters**

* `options` object (required) - An object containing the parameters for the function.
  * `photo_id` string (required) - The ID of the photo from which to recognize text.
* `callback` function (required) - A function that gets called once the text recognition is complete.
  * `error` object (optional) - An error object if the recognition fails.
  * `result` object (required) - An object containing the recognized text.\
    \- `text` string - The recognized text from the photo.

## Examples

```javascript
// Example callback function to handle the text recognition result
var callback = function (event) {
  // Use the RECOGNIZETEXT function to get the text from the added photo
  RECOGNIZETEXT({ photo_id: event.value.id }, function (error, result) {
    if (error) {
      // Handle the error
      console.error('Text recognition failed:', error);
    } else {
      // Set the recognized text into the 'image_text' field
      SETVALUE('image_text', result.text);
    }
  });
};
// Listens for 'add-photo' events on the 'photos' field and processes the photo to extract text
ON('add-photo', 'photos', callback);
```

## **Usage**

This function is typically used in scenarios where text needs to be extracted from images and used in subsequent processing steps or stored in the database. The combination of the `ON` and `RECOGNIZETEXT` functions allows for automated handling of photos added to records.

To use the example above you will need to change the following fields:

* Line 10 - Change the field name `image_text` to the field name you want the text to extract into.
* Line 15 - Change the field name `photos` to the name of the photo field from which you are extracting text.

For example, you might use this functionality to automatically recognize and store text from photos of receipts, documents, or labels added to a record in your application.

Note: Audio FastFill is only available with Elite and Enterprise plans. Check out [our plans page](https://www.fulcrumapp.com/pricing/) for more information.