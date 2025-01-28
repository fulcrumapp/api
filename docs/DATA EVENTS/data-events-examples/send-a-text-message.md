---
title: Send a text message
excerpt: >-
  This example creates a button on your form that sends an SMS when it's tapped.
  The phone number to send it to is pulled from another field on the form. It
  assumes you have a text field to enter the phone number with a data name of
  `phone_number` and a hyperlink field with a data name of `send_sms`. It also
  uses a text field with the data name `sms` to use as the body text of the SMS
  message. This is just an example, so you can also build the text dynamically
  using any other form fields or functions. It also includes a check for the
  platform since the web browser does not support sending text messages.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
ON('click', 'send_sms', function(event) {
  if (!EXISTS($phone_number)) {
    ALERT('You must enter a phone number.');
    return;
  }

  if (!ISMOBILE()) {
    ALERT('Only mobile devices support making phone calls.');
    return;
  }

  // iOS uses the '&' character to separate the number from the sms text
  // Note that not all SMS apps on Android support passing the body text.
  if (PLATFORM() === 'iOS') {
    OPENURL(FORMAT('sms:%s&body=%s',
      $phone_number, encodeURIComponent($sms)));
  } else {
    OPENURL(FORMAT('sms:%s?body=%s',
      $phone_number, encodeURIComponent($sms)));
  }
});
```