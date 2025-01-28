---
title: Highlight fields
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
# Highlight all Section labels

In the BODY section, add `style="background-color: #FFFF00"` under `if (element.isSectionElement)` block of code shown below.  If you are familiar with CSS & HTML, you may create a .highlight class in the STYLES section with the background color of #FFFF00 and add it to the corresponding class.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9d6dd7b-9484d3a-highlight_section.png",
        "9484d3a-highlight_section.png",
        1942,
        968,
        "#000000"
      ],
      "caption": "Highlight section"
    }
  ]
}
[/block]
# Highlight a certain field

Replace the last `else` function in the BODY section with the following code except you use your report’s field label instead of 'FIELD_LABEL':

```html
<div class='field'>
<% if (element.label == 'FIELD_LABEL') { %>
    <h2 class='field-label' style="background-color: #FFFF00"><%= element.label %></h2>
    <div class='field-value pre' style="background-color: #FFFF00"><%= formatter(element, value, {defaultFormatter, container, index, feature, parent, allValues}) %></div>
<% } else { %>
    <h2 class='field-label'><%= element.label %></h2>
    <div class='field-value pre'><%= formatter(element, value, {defaultFormatter, container, index, feature, parent, allValues}) %></div>
<% } %>
</div>
```
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e5fbfc6-c0805d8-highlight_field1.png",
        "c0805d8-highlight_field1.png",
        1976,
        962,
        "#000000"
      ],
      "caption": "field label screenshot"
    }
  ]
}
[/block]
# Highlight with a condition

Here is an example with a field label `Size`.  Suppose you want to highlight the field only when `Size` equals `Small`.  In this case, your `if (element.label == 'Size')` statement needs an additional condition:

```js
if (element.label == 'Size' && record.formValues.find('size').displayValue == 'Small')
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/54e5f2b-55df5c4-yogurt.png",
        "55df5c4-yogurt.png",
        976,
        212,
        "#000000"
      ],
      "caption": "section test screenshot"
    }
  ]
}
[/block]