---
title: TIMEADD
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
Adds an amount of time to a given time

# Parameters

`startTimeField` String (**required**) - The time field containing the start time

`amount` Number (**required**) - The amount of time to add to the given time (number of minutes or hours)

`format` String (optional)  \[default = 'hours'] - The format of the amount. Either `hours` (default) or `minutes`.

# Returns

String - the new time value

# Examples

```js
TIMEADD('09:00', 8)

// returns "17:00"
```

```js
TIMEADD('17:00', -8)

// returns "09:00"
```

```js
TIMEADD('09:00', 48)

// returns "09:00"
```

```js
TIMEADD('16:00', 1.5)

// returns "17:30"
```

```js
TIMEADD('16:00', 90, 'minutes')

// returns "17:30"
```

```js
TIMEADD('16:00', -90, 'minutes')

// returns "14:30"
```
