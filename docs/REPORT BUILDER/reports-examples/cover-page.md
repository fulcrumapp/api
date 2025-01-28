---
title: Cover Page
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
# Edit cover page \[photo / map / metadata]

There are many cover page features you can enable/disable under the SCRIPT section by setting the feature to `true` or `false`.  You can also change the cover page map type to `roadmap`, `terrain`, `satellite`, or `hybrid`.

<Image title="831f218-cov_page.png" alt={1948} align="center" src="https://files.readme.io/527e75b-831f218-cov_page.png">
  options to change base maps
</Image>

If you are utilizing the Esri Map Engine (by setting the `mapEngine` of the [STATICMAP](https://docs.fulcrumapp.com/docs/functions#staticmap) function call to `esri`), you are granted access to the entire suite of valid ArcGIS basemaps. For a comprehensive list of available basemap styles, please refer to the corresponding section in the official ArcGIS documentation: [ArcGIS Basemap Styles](https://developers.arcgis.com/rest/basemap-styles/#arcgis-styles). 

If you wish to use one of the supported ArcGIS Basemaps, change the `'cover_page.map.type'` value in the SCRIPT section.

<Image title="831f218-cov_page.png" alt={1948} align="center" src="https://files.readme.io/946c4d1-Esri_map.png">
  change basemaps to ArcGIS Basemaps
</Image>

If you wish to change the size of the cover page map, you can edit the `height` of `.meta-map img` class under STYLES section.  

<Image title="c128980-meta_map_img.png" alt={1952} align="center" src="https://files.readme.io/6eb9226-c128980-meta_map_img.png">
  map styles
</Image>

# Show repeatable records on map

***\*Note: these instructions will only work with the Google Map Engine. Repeatables will always be included in the map if the Map Engine is set to Esri, and the color of repeatables cannot currently be customized.***

Suppose you want to show repeatable records on the cover page map with different styling as the example below.  The red pin represents the parent record and the two black pins represent child records with location data.  Please note that the color of the pin (HEX Color: [https://www.color-hex.com/](https://www.color-hex.com/)) can be customized whereas numeric symbol cannot be (single alpha-numeric character allowed):

<Image title="916f4fa-example.png" alt={404} align="center" src="https://files.readme.io/206d607-916f4fa-example.png">
  map with repeatables
</Image>

In the BODY section, scroll down to the line where it shows `const markers`.  A couple lines below the markers definition, you will see `for (const item of items) {`.  This is where we are going to add customization.

Add `var count=1;` just before `for (const item of items) {` and change the color and label as shown below.  Also, before the closing `}`, add `count++;`.

<Image title="4229fc9-repeatable_marker.png" alt={1922} align="center" src="https://files.readme.io/90f9ca2-4229fc9-repeatable_marker.png">
  repeatable code snippet
</Image>

# Zoom map

***\*Note: this will only work with Google Map Engine. Esri Maps will always zoom to the extents of the record’s geometry, including any repeatables.***

To zoom in the cover page map, increase or decrease the zoom parameter used in the MAP\_OPTIONS function of the SCRIPT section:

![](https://files.readme.io/703f43b-image.png)
