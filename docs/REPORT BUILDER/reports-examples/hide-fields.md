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

<Image title="fb20b5d-hide_fields.png" alt={1936} src="https://files.readme.io/bd24a8e-fb20b5d-hide_fields.png">
  hidden fields screenshot
</Image>

# Hide fields without a value

You may have noticed that when parent-level fields have no input value, the report skips those fields.  However, this does not apply to child-level fields (nested in a section or a repeatable field).  To apply this to those child-level fields, change the `else` to `else if (value != null)` at the end of the BODY section.

<Image title="55dfc62-null_value.png" alt={1938} src="https://files.readme.io/137e82b-55dfc62-null_value.png">
  null value screenshot
</Image>

# Hide Header / Footer

You can remove header and footer from the report by setting those attributes to false in the SCRIPT section.

<Image title="bef86b0-hide_header_footer.png" alt={1912} src="https://files.readme.io/3b808a2-bef86b0-hide_header_footer.png">
  set them to false screenshot
</Image>
