---
title: Format Date
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
# Format date to dd/mm/yyyy for the cover page metadata

Add the following code to the end of SCRIPT section:

```js
function euroDate(date){
  let d = new Date(date);
  return d.toGMTString();
} 
```

Then replace all `FORMATDATE` (there are four of them) in the BODY section with this new function, `euroDate`:

<Image title="8dd698c-euroDate.png" alt={1956} src="https://files.readme.io/ad72711-8dd698c-euroDate.png">
  EU Date format
</Image>

# Format date to dd/mm/yyyy for the date field

Add the following code to the end of SCRIPT section:

```js
function formatDate(date) {
  let newDate = new Date(JSON.stringify(date));
  let newFormat = LPAD(newDate.getDate(), 2, '0') + '-' + LPAD(newDate.getMonth()+1, 2, '0') + '-' + newDate.getFullYear();
  return newFormat;
}
```

Then add the following code just before the very last `<% } else { %>` in the BODY section:

```html
<% } else if (element.type == "DateTimeField") { %>
      <div class='field'>
          <h2 class='field-label'><%= element.label %></h2>
          <div class='field-value pre'><%= formatDate(value) %></div>
      </div>
```

<Image title="2d11f58-datetimefield.png" alt={1948} src="https://files.readme.io/48bc08e-2d11f58-datetimefield.png">
  date time field
</Image>
