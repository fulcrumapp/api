---
title: Timer
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
This example can be utilized in situations where survey details need to be timed and documented, such as wildlife observations or recording various occurrence durations.

Please consider the [Record Auditing Duration](https://www.fulcrumapp.com/blog/august-2016-updates/) metrics which are now captured in your Fulcrum records - if those features may meet your needs for time capture.

The `SETTIMEOUT` function can also be used for similar situations, such as [alerting a user with a message](https://docs.fulcrumapp.com/docs/data-events-settimeout) after a specified amount of time.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f0e5500-44ab8cb-CleanShot202022-09-1620at2014.57.16.gif",
        "44ab8cb-CleanShot202022-09-1620at2014.57.16.gif",
        796,
        308,
        "#000000"
      ],
      "caption": "Timer GIF"
    }
  ]
}
[/block]
```js
// this Data Event utilizes a Yes/No field (timer) with the N/A choice enabled,
// respectively representing Start/Pause and Reset actions,
// and a read-only Text field (elapsed_time).

var startTime = null, endTime = null, seconds = 0, interval;
function timer(event){
  if($timer == 'start'){
    startTime = new Date().getTime();
    interval = SETINTERVAL(function() {
      var currentTime = new Date().getTime();
      SETVALUE('elapsed_time', new Date((currentTime - (startTime - (seconds * 1000)))).toISOString().substring(11, 19));;
    }, 1000);
  } else if ($timer == 'pause') {
    CLEARINTERVAL(interval)
    endTime = new Date().getTime();
    seconds += (endTime - startTime) / 1000;
    SETVALUE('elapsed_time', new Date(seconds * 1000).toISOString().substring(11, 19));
  } else if ($timer == 'reset') {
    CLEARINTERVAL(interval)
    startTime = null;
    endTime = null;
    seconds = 0;
    SETVALUE('elapsed_time', '0');
  }
}
ON('change', 'timer', timer);

// IF YOU ARE USING THIS IN A REPEATABLE SECTION, ADD THE FOLLOWING
// ON('new-repeatable', 'repeatable_section', function(event) {
//   startTime = null, endTime = null, seconds = 0;
// })

```