---
title: Font
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
# Change font color if the value includes "Fail"

Scroll all the way down to the last `<% } else { %>` block of code in the BODY section.  Add the following lines of code just before the last `else`.  You can replace "Fail" on line 309 with any other word, and you can also change the color of font on line 312.

```js
<% } else if (formatter(element, value, {defaultFormatter, container, index, feature, parent, allValues}).includes("Fail")) { %>
      <div class='field'>
        <h2 class='field-label'><%= element.label %></h2>
        <div class='field-value pre' style='color:red'><%= formatter(element, value, {defaultFormatter, container, index, feature, parent, allValues}) %></div>
      </div>
```
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/46491d7-dbb6aee-change_font_color.png",
        "dbb6aee-change_font_color.png",
        1918,
        962,
        "#000000"
      ],
      "caption": "change font color screenshot"
    }
  ]
}
[/block]
# Using Custom Font (BODY ONLY)
[block:callout]
{
  "type": "warning",
  "title": "Limitation",
  "body": "The header or Footer section's font is not customizable."
}
[/block]
Suppose you wish to use custom font for your PDF report.  We will use a sample font, [Comforter](https://fonts.google.com/specimen/Comforter#standard-styles), from [Google Fonts](https://fonts.google.com/) to demonstrate how to apply custom font in your advanced report template.

First, you need a font API url.  For the Comforter font, it is https://fonts.googleapis.com/css2?family=Comforter&display=swap.  Copy and paste the font API url in the following HTML on top of the BODY section:

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Comforter&display=swap" rel="stylesheet">
</head>
```

Then go to the next line of code, `<div class='root'>`, and add the `style` property with your font's family name:
```html
style='font-family: Comforter';
```
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b82c9e1-6e5d859-font_custom.png",
        "6e5d859-font_custom.png",
        2042,
        982,
        "#000000"
      ],
      "caption": "font custom screenshot"
    }
  ]
}
[/block]
Here is the preview of the PDF report with the new font:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c445867-01be30c-font_custom_2.png",
        "01be30c-font_custom_2.png",
        1316,
        1044,
        "#000000"
      ],
      "caption": "font custom example screenshot"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0784b06-99e1875-font_custom_3.png",
        "99e1875-font_custom_3.png",
        1312,
        222,
        "#000000"
      ],
      "caption": "font custom example screenshot 2"
    }
  ]
}
[/block]