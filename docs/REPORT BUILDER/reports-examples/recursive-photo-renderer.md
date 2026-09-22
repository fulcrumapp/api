---
title: Recursive photo renderer for nested sections
excerpt: >-
  The RENDER function only traverses one level of nesting at a time. If your
  photos live inside sections that are themselves inside other sections or
  repeatables, they'll be silently skipped. This template uses recursive
  renderSection() and renderRepeatableItems() calls to traverse any depth of
  nesting and render every photo, sketch, and signature in the form.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Recursive photo renderer for nested sections

## Overview

Fulcrum's `RENDER` function iterates over every field element in a form, but it only goes **one level deep** by default. If your form has photos nested inside sections that are themselves inside other sections (or inside repeatables), those photos will be silently skipped unless you explicitly tell `RENDER` to recurse into each container.

**The problem:** A form structure like this:

```
- Defect (Section)
    - Before Photos (Section)
        - Photo 1 (PhotoField)
        - Photo 2 (PhotoField)
    - After Photos (Section)
        - Photo 3 (PhotoField)
```

Without recursion, `RENDER` finds the `Defect` section, doesn't match `isPhotoElement` or `isRepeatableElement`, and skips it — never looking inside for photos.

**The fix:** Add an `isSectionElement` handler that calls `renderSection()`, which tells `RENDER` to recurse one level deeper with the same rule set. Combined with `renderRepeatableItems()` for repeatables, the template becomes fully recursive.

## Template

```ejs
<div class='root'>
  <% RENDER(record, null, ({element, value, renderSection, renderRepeatableItems, renderItem}) => { %>

    <%# ── Photos ──────────────────────────────────────────────────────────── %>
    <% if (element.isPhotoElement) { %>
      <% if (value && !value.isEmpty) { %>
        <div class='photo-group'>
          <% value.items.forEach(item => { %>
            <img class="<%= IMAGE_SIZE() %>" src="<%= PHOTOURL(item.mediaID) %>" />
          <% }); %>
        </div>
      <% } %>

    <%# ── Sketches ─────────────────────────────────────────────────────────── %>
    <% } else if (element.isSketchElement) { %>
      <% if (value && !value.isEmpty) { %>
        <div class='sketch-group'>
          <% value.items.forEach(item => { %>
            <img class="<%= IMAGE_SIZE() %>" src="<%= SKETCHURL(item.mediaID) %>" />
          <% }); %>
        </div>
      <% } %>

    <%# ── Signatures ────────────────────────────────────────────────────────── %>
    <% } else if (element.isSignatureElement) { %>
      <% if (value && !value.isEmpty) { %>
        <div class='signature-group'>
          <img class='signature' src='<%= SIGNATUREURL(value.id) %>' />
        </div>
      <% } %>

    <%# ── Sections: recurse one level deeper ──────────────────────────────── %>
    <% } else if (element.isSectionElement) { %>
      <% renderSection() %>

    <%# ── Repeatables: recurse into each child item ────────────────────────── %>
    <% } else if (element.isRepeatableElement) { %>
      <div class='repeatable-group'>
        <% renderRepeatableItems(({renderItem}) => { %>
          <div class='repeatable-item'>
            <% renderItem() %>
          </div>
        <% }); %>
      </div>
    <% } %>

  <% }) %>
</div>
```

## How the recursion works

| Handler | What it does |
|---|---|
| `isPhotoElement` | Renders all photos in a photo field |
| `isSketchElement` | Renders all sketches in a sketch field |
| `isSignatureElement` | Renders the signature image |
| `isSectionElement` → `renderSection()` | Tells RENDER to apply the same rule set to all elements *inside* this section |
| `isRepeatableElement` → `renderRepeatableItems()` | Iterates each child record in the repeatable, applying the same rule set to each |

The key insight is `renderSection()` — calling it is the command that makes `RENDER` go one level deeper with the **same callback**. Without it, sections are a dead end.

## Suggested CSS

```css
.root {
  font-family: sans-serif;
  padding: 1em;
}

.photo-group,
.sketch-group,
.signature-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 1em;
}

.photo-group img,
.sketch-group img {
  width: 45%;
  height: auto;
  page-break-inside: avoid;
}

.signature-group img.signature {
  max-width: 300px;
}

.repeatable-group {
  margin-left: 1em;
  border-left: 3px solid #ddd;
  padding-left: 1em;
  margin-bottom: 1em;
}

.repeatable-item {
  margin-bottom: 1em;
  page-break-inside: avoid;
}
```

## Notes

- This template renders **only media fields** (photos, sketches, signatures). To include other field values alongside photos, add additional `else if` branches for `element.isTextField`, `element.isChoiceElement`, etc.
- `IMAGE_SIZE()` returns the CSS class (`'small'`, `'medium'`, or `'large'`) configured in the report's settings. You can also pass a fixed class name to `img` directly if you prefer.
- Sections that are hidden in the record (via `SETHIDDEN`) will still appear in the report since visibility rules are not applied by `RENDER` by default. Add a `ISVISIBLE(element, record, allValues)` check if you need to respect visibility.

*Credit: Kyle Pennell*
