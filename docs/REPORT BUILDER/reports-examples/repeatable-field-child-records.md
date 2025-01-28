---
title: Repeatable Field (Child Records)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# Add a page break before every repeatable record

In BODY section, you can scroll down to line 246 or search (ctrl+f or command+f) for `repeatable_break`.  Two lines below `repeatable_break`, you will find `<div class='field-repeatable-item'>`.  Since you want to add a page break before every repeatable record, you will add `page-break-before` to the same class.

<Image title="5671cb7-repeat_page_break.png" alt={1944} align="center" src="https://files.readme.io/0ac90f9-5671cb7-repeat_page_break.png">
  page break before screenshot
</Image>

# Add additional info for all repeatable record

Suppose you need to add an additional info to all repeatable records.  To do this, you need to go to the BODY section and search for `index+1`.  Add the following line of code (you may modify your message) below the line you found.

```html
<b style='font-size:20px'>Your message goes here!</b>
```

![](https://files.readme.io/c9c3cef-9e17d88-repeatable_add_info.png "9e17d88-repeatable_add_info.png")

# Include only the most recent repeatable record

This may be a little less obvious to find the right part in the BODY section, but we are going to change how repeatable items get rendered on the report.  You want to scroll down to the line 245 to find `<% renderRepeatableItems(({element, value, renderItem, container, index, feature, parent, allValues}) => { %>`.  If you found it, you will also see the following codes a few lines below:

```html
<h2><%= `${element.label} - ${index+1}. ${value.displayValue}` %></h2>
<% renderItem() %>
```

Once you located those two lines of code, you are going to wrap them with the following code:

```html
<% if (record.formValues.find('inspection').length == index+1) { %>

// 2 LINES OF CODE GOES HERE

<% } %>
```

> 🚧 MAKE SURE YOU USE THE REPEATABLE SECTION'S DATA NAME INSTEAD OF inspection!

![](https://files.readme.io/063b134-ce534f0-last_child.png "ce534f0-last_child.png")

# Display repeatable section as a table

To display repeatable sections as tables, add the following object to the `REPORT_CONFIG` object declared in the SCRIPT page, and replace them with your field's datanames

```
const REPORT_CONFIG = {
  //other fields above,
  'tables': {
    'my_repeatable': {
      'fields': ['my_repeatable_calc', 'my_repeatable_text']
    }
  }
};
```
