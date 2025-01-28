---
title: Attachment File
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
# List Attachment File(s) Name

As you've noticed, the attachment field value displays the number of attachment files instead of the file name.  This example will show you how to display the file(s) name.  First, go to the BODY section and scroll all the way down to the last `<% } else { %>` line.  Just before this line of code, you are going to copy and paste the following block of code:

```js
<% } else if (element.label == 'Attachment File Field') { %>
      <div class='field'>
        <h2 class='field-label'><%= element.label %></h2>
        <% 
        let num_of_attachments = $attachment_file_field.length; 
        let attachment_names = [];
        for(let i=0; i<num_of_attachments; i++) {
          attachment_names.push($attachment_file_field[i].name);
        }
        %>
        <div class='field-value pre'><%= attachment_names.join("\n") %></div>
      </div>
```

Three things you will need to edit from this code is 
[1] 'Attachment File Field' on line 309 to your attachment file field's label 
[2 & 3] $attachment_field_field on line 313 and 316 to your attachment file field's data name
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/90bb56a-04b28c3-attach_file_names.png",
        "04b28c3-attach_file_names.png",
        1948,
        968,
        "#000000"
      ],
      "caption": "attachment file field data name"
    }
  ]
}
[/block]