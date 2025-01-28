---
title: Check if a photo's altitude is within 5m of CURRENTLOCATION altitude
excerpt: ''
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
ON('add-photo', 'photos', function(event) {
  var location = CURRENTLOCATION();
  var photoAltitude = event.value.altitude;
  if(location==null || location===undefined || photoAltitude==null || photoAltitude===undefined) return;
  var currentAltitude = location.altitude;
  var range = 5;
  if (photoAltitude > currentAltitude + range|| photoAltitude < currentAltitude - range){
    INVALID(`photo with altitude of ${photoAltitude} is outside of ${range}m of current altitude:${currentAltitude}`);
  } else{
    ALERT(`photo with altitude of ${photoAltitude} is inside of ${range}m of current altitude:${currentAltitude}`);
  }
});
```
