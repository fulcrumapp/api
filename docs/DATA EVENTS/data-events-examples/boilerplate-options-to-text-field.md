---
title: Boilerplate Options to Text Field
excerpt: >-
  Create boilerplate options for a text field. Add one or multiple text options
  to populate the field.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Add a multichoice field called, Templates, with options of boilerplate text field you want to use. 
Add a text field called, Narrative. 

```js
ON('change', 'templates', () => {
  SETVALUE('narrative', CHOICEVALUES($templates).join('\n\n'))
})
```

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3cdb522-CleanShot_2023-01-05_at_10.48.59.gif",
        "CleanShot 2023-01-05 at 10.48.59.gif",
        484,
        756,
        "#000000"
      ]
    }
  ]
}
[/block]