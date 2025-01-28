---
title: Hide fields
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
# Hide certain fields or repeatables

Add data names to the `‘hidden_fields’` under the SCRIPT section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bd24a8e-fb20b5d-hide_fields.png",
        "fb20b5d-hide_fields.png",
        1936,
        980,
        "#000000"
      ],
      "caption": "hidden fields screenshot"
    }
  ]
}
[/block]
# Hide fields without a value

You may have noticed that when parent-level fields have no input value, the report skips those fields.  However, this does not apply to child-level fields (nested in a section or a repeatable field).  To apply this to those child-level fields, change the `else` to `else if (value != null)` at the end of the BODY section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/137e82b-55dfc62-null_value.png",
        "55dfc62-null_value.png",
        1938,
        970,
        "#000000"
      ],
      "caption": "null value screenshot"
    }
  ]
}
[/block]
# Hide Header / Footer
You can remove header and footer from the report by setting those attributes to false in the SCRIPT section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3b808a2-bef86b0-hide_header_footer.png",
        "bef86b0-hide_header_footer.png",
        1912,
        960,
        "#000000"
      ],
      "caption": "set them to false screenshot"
    }
  ]
}
[/block]