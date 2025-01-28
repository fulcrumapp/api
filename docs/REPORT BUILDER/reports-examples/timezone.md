---
title: Timezone
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
To update the timezone for all times in your report, navigate to the `SCRIPT` section of your report and add  `DATA.timeZone = "your time zone"`  to the top of the script. Full list of timezones can be found in the TZ identifier column of [this table](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). 

```javascript
DATA.timeZone = "Australia/Sydney"; // Update all times to Sydney, Australia's timezone
DATA.timeZone = "America/Phoenix"; // Update all times to Phoenix, USA's timezone
```