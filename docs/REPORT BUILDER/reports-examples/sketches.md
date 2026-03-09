---
title: Sketches
excerpt: "Learn how to include sketches in custom reports"
deprecated: false
hidden: false
metadata:
  title: "Include Sketches in Reports"
  description: "Complete guide to including sketches in Fulcrum custom reports with examples"
  robots: index
next:
  description: ""
---

## Display Sketches in Reports

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

## Understanding Sketch Data Structure

Sketch fields contain an array of items. Each item has the following properties:

- `mediaID` - The unique identifier for the sketch (also called `sketch_id`)
- `caption` - Optional text caption for the sketch
- `isEmpty` - Boolean indicating if the field has any sketches

### Accessing Sketch Data

```javascript
// Check if sketch field has values
<% if ($my_sketch_field && !$my_sketch_field.isEmpty) { %>
  <% $my_sketch_field.items.forEach((item, index) => { %>
    <!-- Display sketch -->
  <% }); %>
<% } %>

// Access specific sketch properties
<% var firstSketch = $my_sketch_field && $my_sketch_field[0]; %>
<% var sketchId = firstSketch && firstSketch.sketch_id; %>
<% var caption = firstSketch && firstSketch.caption; %>
```

## SKETCHURL Function

The `SKETCHURL()` function generates a public URL for a sketch. It accepts two parameters:

### Parameters

- `id` (String, required) - The sketch ID
- `options` (Object, optional) - Configuration options
  - `version` - Image version: `'large'` (default), `'original'`, `'thumbnail'`
  - `expires` - Expiration timestamp (default: `null`)

### Examples

```javascript
// Default large version
<img src="<%= SKETCHURL(item.mediaID) %>" />

// Original full resolution
<img src="<%= SKETCHURL(item.mediaID, { version: 'original' }) %>" />

// Thumbnail version
<img src="<%= SKETCHURL(item.mediaID, { version: 'thumbnail' }) %>" />
```

## Resize Sketches

You can control the size of sketches in the STYLES section by targeting the `.sketch` class.

```css
.sketch {
  max-width: 100%;
  height: auto;
}

/* Fixed width */
.sketch {
  width: 500px;
  height: auto;
}

/* Multiple sketches in a row */
.sketch {
  max-width: 48%;
  height: auto;
  display: inline-block;
  margin: 1%;
}
```

## Display Only First Sketch

If you have multiple sketches attached to a field and want to display only the first one:

```javascript
<% } else if (element.isSketchElement) { %>
<div class="field">
  <h2 class='field-label'><%= element.label %></h2>
  <div class="field-value">
    <% if (value && value.items.length > 0) { %>
      <% let sketchItem = value.items[0]; %>
      <img class="sketch" src="<%= SKETCHURL(sketchItem.mediaID) %>" />
      <% if (sketchItem.caption) { %>
        <p><%= sketchItem.caption %></p>
      <% } %>
    <% } %>
  </div>
</div>
<% } %>
```

## Accessing a Specific Sketch by Field Name

If you want to display sketches from a specific field outside the `RENDERVALUES` loop:

```javascript
<div>
  <%
    // Using the data name of your sketch field
    var sketchField = $my_sketch_field;
    var sketchId = sketchField && sketchField[0] && sketchField[0].sketch_id;
  %>
  <% if (sketchId) { %>
    <div class='sketch-column'>
        <img class="sketch" src='<%= SKETCHURL(sketchId) %>' />
    </div>
  <% } %>
</div>

<!-- Display all sketches from a specific field -->
<div class="sketches-section">
  <h2>Site Sketches</h2>
  <% if ($site_sketch && $site_sketch.items) { %>
    <% $site_sketch.items.forEach((item, index) => { %>
      <div class="sketch-item">
        <img src="<%= SKETCHURL(item.sketch_id) %>" alt="Sketch <%= index + 1 %>" />
        <% if (item.caption) { %>
          <p class="caption"><%= item.caption %></p>
        <% } %>
      </div>
    <% }); %>
  <% } %>
</div>
```

## Add Metadata to Sketches

You can query the database to add metadata like creation date to each sketch:

```javascript
<% } else if (element.isSketchElement) { %>
<div class="field">
  <h2 class='field-label'><%= element.label %></h2>
  <div class="field-value">
    <% value && value.items.forEach((item, index) => { %>
      <%
        // Query sketch metadata
        var sketchQuery = QUERY("SELECT created_at, updated_at FROM sketches WHERE sketch_id = '" + item.mediaID + "'");
        var sketchDate = sketchQuery.rows[0] && sketchQuery.rows[0].created_at.slice(0, 10);
      %>
      <div class="sketch-container">
        <img class="sketch" src="<%= SKETCHURL(item.mediaID) %>" />
        <% if (item.caption) { %>
          <p class="caption"><%= item.caption %></p>
        <% } %>
        <% if (sketchDate) { %>
          <p class="date">Created: <%= sketchDate %></p>
        <% } %>
      </div>
    <% }); %>
  </div>
</div>
<% } %>
```

## Hide Sketch Label When Empty

Only display the sketch field label when there are sketches attached:

```javascript
<% } else if (element.isSketchElement) { %>
  <% if (value && !value.isEmpty && value.items.length > 0) { %>
  <div class="field">
    <h2 class='field-label'><%= element.label %></h2>
    <div class="field-value">
      <% value.items.forEach((item, index) => { %>
        <img class="sketch" src="<%= SKETCHURL(item.mediaID) %>" />
        <% if (item.caption) { %>
          <p><%= item.caption %></p>
        <% } %>
      <% }); %>
    </div>
  </div>
  <% } %>
<% } %>
```

## Page Break Handling

To prevent sketches from breaking across pages:

```javascript
<% } else if (element.isSketchElement) { %>
<div class="field" style="page-break-inside: avoid;">
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

## Numbering Sketches

Add numbers to sketches automatically:

```javascript
<% } else if (element.isSketchElement) { %>
<div class="field">
  <h2 class='field-label'><%= element.label %></h2>
  <div class="field-value">
    <% value && value.items.forEach((item, index) => { %>
      <div class="sketch-item">
        <h3>Sketch <%= index + 1 %></h3>
        <img class="sketch" src="<%= SKETCHURL(item.mediaID) %>" />
        <% if (item.caption) { %>
          <p><%= item.caption %></p>
        <% } %>
      </div>
    <% }); %>
  </div>
</div>
<% } %>
```

## Grid Layout for Multiple Sketches

Display sketches in a responsive grid:

```css
/* Add to STYLES section */
.sketch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.sketch-grid-item {
  text-align: center;
}

.sketch-grid-item img {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
```

```javascript
/* Add to BODY section */
<% } else if (element.isSketchElement) { %>
<div class="field">
  <h2 class='field-label'><%= element.label %></h2>
  <div class="sketch-grid">
    <% value && value.items.forEach((item, index) => { %>
      <div class="sketch-grid-item">
        <img src="<%= SKETCHURL(item.mediaID) %>" />
        <% if (item.caption) { %>
          <p><%= item.caption %></p>
        <% } %>
      </div>
    <% }); %>
  </div>
</div>
<% } %>
```
