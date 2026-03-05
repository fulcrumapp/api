---
title: Sketches
excerpt: ""
deprecated: false
hidden: false
metadata:
  title: ""
  description: ""
  robots: noindex
next:
  description: ""
---

# Display Sketches in Reports

In the BODY section, search for `element.isSketchElement`. If it doesn't exist, you can add it to your `RENDERVALUES` loop.

```javascript
<% } else if (element.isSketchElement) { %>
<div class="field">
  <h2 class='field-label'><%= element.label %></h2>
  <div class="field-value">
    <% value && value.items.forEach((item, index) => { %>
    <img class="sketch" src="<%= SKETCHURL(item.mediaID) %>" />
    <% if (item.caption) { %>
    <p><%= item.caption %></p>
    <% } %> <% }); %>
  </div>
</div>
<% } %>
```

# Resize Sketches

You can control the size of sketches in the STYLES section by targeting the `.sketch` class.

```css
.sketch {
  max-width: 100%;
  height: auto;
}
```

# Accessing a specific sketch by its field name

If you want to display the first sketch from a specific field:

```javascript
<div>
  <%
    var sketchField = record.formValues.find('my_sketch_field');
    var sketchId = sketchField && sketchField.items[0] && sketchField.items[0].mediaID;
  %>
  <% if (sketchId) { %>
    <div class='sketch-column'>
        <img class="sketch" src='<%= SKETCHURL(sketchId) %>' />
    </div>
  <% } %>
</div>
```
