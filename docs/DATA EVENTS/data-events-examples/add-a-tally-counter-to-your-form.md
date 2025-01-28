---
title: Add a tally counter
excerpt: >-
  This example shows how to add a tally counter to your form. It displays a
  button on the form that increments a numeric field when tapped.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
For this to work, you will need a numeric field with the data name `tally_count` and a hyperlink field with the data name of `increment`.

```js
ON('click', 'increment', function(event) {
  // increment the numeric field by 1
  SETVALUE('tally_count', ($tally_count || 0) + 1);
});
```

Another approach to a tally counter uses a numeric field with the data name `tally_count` and a Default Value of `0`. Also used is a Yes/No field with the data name of `tally` with these substitutions below:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fdf404f-4ca4bdb-tally-settings_1.png",
        "4ca4bdb-tally-settings (1).png",
        664,
        206,
        "#000000"
      ],
      "caption": "Tally example Yes/No field settings"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ddfcfa2-4e6ec32-tally.gif",
        "4e6ec32-tally.gif",
        796,
        281,
        "#000000"
      ],
      "caption": "Tally GIF"
    }
  ]
}
[/block]
```js
ON('change', 'tally', function (event) {
  if ($tally == 'add') {
    SETVALUE('tally_count', $tally_count + 1);
    SETVALUE('tally', null);
  }
  if ($tally == 'subtract') {
    SETVALUE('tally_count', $tally_count - 1);
    SETVALUE('tally', null);
  }
});
```