---
title: Footer
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
# Using a Rectangular Organization Logo

***You will need a public URL for your Organization Logo to do this***

If your Organization's Logo is a rectangular shape, this example will help you show the entire image on the bottom-left of the report.  First, change the Bottom MARGINS to 0.75 from 0.5.  Then, go to the FOOTER section, remove line 35.  You will add a new image source using the public URL of the image

```html
<img src="<%= IMAGEURL("photo_url") %>" />
```
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/847fb7a-2b9f17c-footer_org_image_rect.png",
        "2b9f17c-footer_org_image_rect.png",
        1920,
        974,
        "#000000"
      ],
      "caption": "footer org image"
    }
  ]
}
[/block]