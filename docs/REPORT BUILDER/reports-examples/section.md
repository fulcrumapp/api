---
title: Section
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
# Add a page break for all sections

Scroll down in the BODY section to locate `element.isSectionElement` block of code.  In the first `<div class='field-section'>`, add `page-break-before` to the class. 

![1912](https://files.readme.io/793472f-70e289e-section_page_break.png "70e289e-section_page_break.png")

# Add a page break for specific section

Scroll down in the BODY section to locate `element.isSectionElement` block of code.  Replace the `<div class='field-section'>` line with this:

```js
<% 
  const pageBreak = element.label==="Your Section's Label" 
    ? 'field-section page-break-before' 
    : 'field-section' 
%>
<div class='<%=pageBreak%>'>
```

# Remove an entire section field

Scroll down in the BODY section to locate the `if (element.isSectionElement)` block of code.  Now we are going to wrap the given 6 lines of code with the following code:

```js
<% if(element.label == 'Section Label') { 
  return;
} else { %>

// 6 LINES OF CODE GOES HERE

<% } %>
```

> 🚧 MAKE SURE YOU USE THE SECTION LABEL NAME INSTEAD OF Section Label!

<Image title="89091d8-remove_section.png" alt={1938} src="https://files.readme.io/530c2a9-89091d8-remove_section.png">
  section label screenshot
</Image>

# Remove a section field when its all nested fields values are null

Under `if (element.isSectionElement)` in the BODY section, you are going to replace the entire block of code with the following:

```js
<% 
  var fields = FIELDNAMES(element.dataName)
  var values = fields.map(x => VALUE(x) || REPEATABLEVALUES(VALUE(element.parent.dataName), x))
  var nonNullValues = values.filter(x => x != null)
%>

<% if (nonNullValues.length > 0) { %>
  <div class='field-section'>
    <h1 class='field-section-title'><%= element.label %></h1>
    <div class='field-section-content'>
      <% renderSection() %>
    </div>
  </div>
<% } %>
```

<Image title="301868f-remove_section_null_2.jpeg" alt={1941} src="https://files.readme.io/8a35454-301868f-remove_section_null_2.jpeg">
  remove section
</Image>
