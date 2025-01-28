---
title: Phone number validation
excerpt: >-
  If you're using Fulcrum to collect contact information, the Data Events
  `REQUEST` function can be used to validate phone numbers against various
  API's. This can help ensure you collect good data _instantly_ at the point of
  collection, instead of discovering later that the information is incorrect.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[Twilio](https://www.twilio.com/) offers a REST API that allows you to [lookup](https://www.twilio.com/lookup) meta-data about phone numbers and much more. The example below shows how to return the [`CallerName`](https://www.twilio.com/docs/api/lookups#lookups-caller-name) property from phone numbers within the United States which are registered in the CNAM database. Twilio also offers support for International numbers.

This example also shows an implementation of HTTP transaction basic access authentication (a method for an HTTP user agent to provide a user name and password when making a request).

```js
var accountSid = 'your_account_sid',
    authToken = 'your_auth_token';

//b2a is an alternative of the btoa function and creates a base-64 encoded ASCII string from a "string" of binary data. Source: https://gist.github.com/JavaScript-Packer/6a00b61b270f387e2453
function b2a(a) {
    var c, d, e, f, g, h, i, j, o, b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        k = 0,
        l = 0,
        m = "",
        n = [];
    if (!a) return a;
    do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
        f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
    return m = n.join(''), o = a.length % 3, (o ? m.slice(0, o - 3) : m) + '==='.slice(o || 3);
}

//verify_with_twilio is a hyperlink field. You may want to consider using regex validation for phone_number in a text field but a numeric field works too.
ON('click', 'verify_with_twilio', function(event) {
    var options = {
        url: 'https://lookups.twilio.com/v1/PhoneNumbers/' + $phone_number,
        qs: {
            'Type': 'carrier',
            'Type': 'caller-name'
        },
        headers: {
            'Authorization': 'Basic ' + b2a(accountSid + ':' + authToken)
        }
    };
    REQUEST(options, function(error, response, body) {
        if (error) {
            ALERT('Error with request: ' + error);
        } else {
            var data = JSON.parse(body);
            //twilio_verification is a read-only text field which begins as hidden. We unhide it with SETHIDDEN if there is data returned.
            if (data && data.caller_name && data.caller_name.caller_name) {
                SETVALUE('twilio_verification', data.caller_name.caller_name);
                SETHIDDEN('twilio_verification', false);
            } else if (data.caller_name.caller_name === null) {
                //There may not be a CallerName registered for that number, but let's try returning Carrier name and type.
                ALERT('Sorry, Twilio does not have a name associated with this number. It appears to be a ' + data.carrier.type + ' number with the ' + data.carrier.name + ' carrier however.');
            } else if (data.status == 404) {
                //Alert the user if the requested resource was not found.
                ALERT(data.message);
            } {

            }
        }
    });
});
```
