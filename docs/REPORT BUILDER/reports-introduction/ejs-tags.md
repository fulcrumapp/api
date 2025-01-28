---
title: EJS Tags
excerpt: >-
  Fulcrum's reporting engine uses the ([EJS](https://ejs.co/)) templating
  language.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
* `<%` 'Scriptlet' tag, for control-flow, no output
* `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
* `<%=` Outputs the value into the template (HTML escaped)
* `<%-` Outputs the unescaped value into the template
* `<%#` Comment tag, no execution, no output
* `<%%` Outputs a literal '\<%'
* `%>` Plain ending tag
* `-%>` Trim-mode ('newline slurp') tag, trims following newline
* `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it
