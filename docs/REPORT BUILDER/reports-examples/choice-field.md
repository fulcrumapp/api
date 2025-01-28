---
title: Choice Field
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
# List multiple choice field values with a line break

Scroll all the way down to the last `<% } else { %>` block of code in the BODY section.  Add the following lines of code just before the last `else`.  Make sure to replace the 'Multiple Choice field' on line 309 with your field label.

```js
<% } else if (element.label == 'Multiple Choice field') { %>
      <div class='field'>
        <h2 class='field-label'><%= element.label %></h2>
        <div class='field-value pre'><%= CHOICEVALUES($multiple_choice_field).join("\n") %></div>
      </div>
```

<Image title="f1e43b7-mc_value_list.png" alt={2054} src="https://files.readme.io/8b87e02-f1e43b7-mc_value_list.png">
  multiple choice field label
</Image>
