---
title: Photos
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
# Add a date stamp on each photo as photo caption
[block:callout]
{
  "type": "danger",
  "title": "REMEMBER: This will overwrite any photo caption entered!!!"
}
[/block]
In the BODY section, search for `element.isPhotoElement`.  In this block of code, you will add the following two lines after `<% value.items.forEach((item, index) => { %>` 

```js
<% var dateQuery = QUERY("SELECT created_at FROM photos WHERE photo_id = '"+item.mediaID+"'") %>
<% var photoDate = dateQuery.rows[0].created_at.slice(0, 10) %>
```

Remove the following two lines after `<figure>`:
`<% if (item.caption) { %>`
`<% } %>`

then replace `item.caption` with `photoDate`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4fd5d17-cbc4a80-photo_date_stamp.png",
        "cbc4a80-photo_date_stamp.png",
        1798,
        954,
        "#000000"
      ],
      "caption": "change this to photoDate screenshot"
    }
  ]
}
[/block]
# Add latitude & longitude on each photo

**REMEMBER: This will overwrite any photo caption entered!!! Also, if the photo does not have location matadata, it will show `null`.**

In the BODY section, search for `element.isPhotoElement`.  In this block of code, you will add the following two lines after `<% value.items.forEach((item, index) => { %>` 

```js
<% var locQuery = QUERY("SELECT latitude, longitude FROM photos WHERE photo_id = '"+item.mediaID+"'") %>
<% var latlong = JSON.parse(locQuery.rows[0].latitude)+","+JSON.parse(locQuery.rows[0].longitude) %>
```

Remove the following two lines after `<figure>`:
`<% if (item.caption) { %>`
`<% } %>`

then replace `item.caption` with `latlong`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/de9a680-0543b5e-photo_loc_stamp.png",
        "0543b5e-photo_loc_stamp.png",
        1894,
        950,
        "#000000"
      ],
      "caption": "change this to latlong screenshot"
    }
  ]
}
[/block]
# Align and center each photo

In the STYLES section, search for `.photo-column figure` class.  Then remove `display: inline` and replace it with `display: flex; justify-content: center;` as shown below:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/088b721-45dd945-center_photos.png",
        "45dd945-center_photos.png",
        1916,
        968,
        "#000000"
      ],
      "caption": "center photo screenshot"
    }
  ]
}
[/block]
# Display only the first photo attached to each photo field

Suppose you have multiple photos attached to each photo field and you want to display only the first photo on PDF report.  In the BODY section, scroll down to `element.isPhotoElement` and remove line 264 and 274 (it loops through all photos attached).  Then add `<% let photoItem = value.items[0] %>` to get the first photo and replace `item` to `photoItem` on line 268-270.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e2436a4-eefc8c2-photo_firstOnly.jpeg",
        "eefc8c2-photo_firstOnly.jpeg",
        1664,
        837,
        "#000000"
      ],
      "caption": "display first photo screenshot"
    }
  ]
}
[/block]
# Modify Photo Sizes

Photo size can be modified in STYLES section under `.photo-column figure img`.  By default, Fulcrum generates 2 portrait photos in each row.  If you would like to modify the size so it can fit 3 portrait photos, you can change `max-width: 49%;` property to `max-width: 33%`.  You can fit 4 portrait photos by changing max-width to 25%.  If you would like to modify the size of landscape photos, you can also do so under `.photo-column figure img.photo-landscape`.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1409031-7c2094f-photo_size.png",
        "7c2094f-photo_size.png",
        2030,
        1128,
        "#000000"
      ],
      "caption": "photo size screenshot"
    }
  ]
}
[/block]
# Remove a margin space before and/or after the photo field

Sometimes the report will generate empty spaces after attaching photos or the photos will cover other section of the report.  In order to prevent this, go to the BODY section and add `page-break-inside: auto;` to the `style="flex-direction: column;"` and add `style="height: 100%;"` to the `<div class='field-label-full'>` in `element.isPhotoElement` block:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5779619-4a3acd3-photo_margin.png",
        "4a3acd3-photo_margin.png",
        1904,
        966,
        "#000000"
      ],
      "caption": "Photo margins screenshots"
    }
  ]
}
[/block]
# Remove Photo Label when there is no photo attached

In the BODY section, search for `element.isPhotoElement` block of code.  Remove the entire block of code under `element.isPhotoElement` and paste the following code:

```js
<% if (value && !value.isEmpty) { %>
  <div class='field' style="flex-direction: column;">
    <h2 class='field-label'><%= element.label %></h2>
    <div class='field-label-full'>
        <div class='photo-row'>
          <% value.items.forEach((item, index) => { %>
            <div class='photo-column'>
              <figure>
                <img class="<%= IMAGE_SIZE() %>" src='<%= PHOTOURL(item.mediaID) %>' />
                <% if (item.caption) { %>
                  <figcaption><%= item.caption %></figcaption>
                <% } %>
              </figure>
            </div>
          <% }); %>
        </div>
    </div>
  </div>
<% } %>
```
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/08eb786-7848cee-remove_photo_label.png",
        "7848cee-remove_photo_label.png",
        1912,
        964,
        "#000000"
      ],
      "caption": "photo labels screenshots"
    }
  ]
}
[/block]
# Add the first photo of a photo field by data name

```
  <div>
    <% 
      var pic = record.formValues.find('photos');
      var rid = pic.items[0].mediaID
    %>
    <div class='photo-column'>
        <img class="<%= IMAGE_SIZE() %>" src='<%= PHOTOURL(rid) %>' />
    </div>
  </div>
```