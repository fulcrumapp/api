---
title: Label
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
# How to make all label fields full width

You first need to go the SCRIPT section and add `isLabel()` function: 

```js
function isLabel(field) {
  return CONTAINS(DATANAMES('Label'), field);
}
```

Then, you will need to use this function in the BODY section just before the last `<% } else { %>`:

```js
<% } else if (isLabel(element.dataName)) { %>
      <div class='field'>
        <b><%= element.label %></b>
      </div>
```

![](https://files.readme.io/8263d2b-c87b96f-label_width.png "c87b96f-label_width.png")

# How to make the text of a specific label field appear bold

Within the `element.isLabelElement` if statement, you can add conditional logic to bold the text of the label:

```
    <% } else if (element.isLabelElement) { %>
      <% var fontWeight = "normal"; %>
      <% if(element.label==="your_label_dataname") fontWeight = "bold" %>
      <div class='field'>
        <h2 class='field-label-full' style="font-weight:<%=fontWeight%>;"><%= element.label %></h2>
      </div>
    <% } else { %>
```