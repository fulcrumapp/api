---
title: Convert Raster and Vector Data to MBTiles for Fulcrum Map Layers
excerpt: Use GDAL command-line tools to convert GeoTIFF raster files to MBTiles, or use QGIS to convert shapefiles and other vector formats — producing offline-capable tile packages ready for upload to a Fulcrum Map Layer Group.
---

Fulcrum Map Layer Groups support MBTiles as a tile source for offline basemaps and reference layers. If you have GeoTIFF rasters or Esri Shapefiles, you can convert them to MBTiles before uploading to Fulcrum.

## Option 1 — Convert GeoTIFF to MBTiles with GDAL (CLI)

[GDAL](https://gdal.org/) is the standard open-source geospatial data abstraction library. The `gdal_translate` command converts a GeoTIFF directly to MBTiles, and `gdaladdo` builds the overview pyramid needed for smooth zooming.

### Install GDAL

```bash
# macOS (Homebrew)
brew install gdal

# Ubuntu / Debian
sudo apt-get install gdal-bin

# Windows — use the OSGeo4W installer from https://trac.osgeo.org/osgeo4w/
```

### Convert a Single GeoTIFF

```bash
# Convert the GeoTIFF to MBTiles with maximum compression
gdal_translate -co "ZLEVEL=9" -of MBTiles input.tif output.mbtiles

# Build zoom-level overviews (required for tile rendering at multiple zoom levels)
gdaladdo -r nearest output.mbtiles
```

The `-co "ZLEVEL=9"` option sets maximum zlib compression, keeping file size small. `gdaladdo -r nearest` uses nearest-neighbor resampling, which is fast and appropriate for rasters with discrete classification values (e.g., land cover maps). Use `-r average` for continuous data like elevation or imagery.

### Batch Convert Multiple GeoTIFFs

```bash
for f in *.tif; do
  out="${f%.tif}.mbtiles"
  gdal_translate -co "ZLEVEL=9" -of MBTiles "$f" "$out"
  gdaladdo -r nearest "$out"
  echo "Converted $f → $out"
done
```

### Merge Multiple MBTiles into One

If you have tiles covering different areas that should appear as a single layer, use `gdal_merge` or the `mbutil` utility. Alternatively, `gdalbuildvrt` can stitch multiple GeoTIFFs into a virtual mosaic before conversion:

```bash
# Merge multiple TIFs into a virtual mosaic, then convert
gdalbuildvrt mosaic.vrt tile_1.tif tile_2.tif tile_3.tif
gdal_translate -co "ZLEVEL=9" -of MBTiles mosaic.vrt mosaic.mbtiles
gdaladdo -r nearest mosaic.mbtiles
```

---

## Option 2 — Convert Shapefiles to MBTiles with QGIS (GUI)

[QGIS](https://qgis.org/) provides a graphical workflow for converting vector data (shapefiles, GeoJSON, etc.) to a rasterized MBTiles file.

### Steps

1. Open QGIS and load your shapefile via **Layer → Add Layer → Add Vector Layer**.
2. Style the layer as desired (colors, labels, line weights). The styling will be baked into the tiles.
3. Go to **Processing → Toolbox** and search for **"Generate XYZ tiles (MBTiles)"**.
4. In the dialog:
   - **Extent:** Use the layer extent or draw a custom extent.
   - **Minimum zoom / Maximum zoom:** Set the range of zoom levels to generate. For Fulcrum field use, zoom 10–18 covers most detail needs. Higher max zoom = larger file size.
   - **Output file:** Set the output `.mbtiles` path.
5. Click **Run**. QGIS renders and packages the tiles.

### Recommended Zoom Level Guidelines

| Use case | Min zoom | Max zoom | Approximate file size |
|---|---|---|---|
| Regional overview | 8 | 14 | Small (< 50 MB) |
| City / project area | 10 | 17 | Medium (50–500 MB) |
| Site-level detail | 12 | 19 | Large (500 MB+) |

---

## Uploading to Fulcrum

Once you have an `.mbtiles` file, upload it to a Fulcrum Map Layer Group via **Settings → Map Layers** in the Fulcrum web app. The layer will be available for offline use on the Fulcrum mobile app once the device syncs.

For automated uploads, use the Fulcrum Map Layers API:

```bash
curl -X POST https://api.fulcrumapp.com/api/v2/layers \
  -H "X-ApiToken: YOUR-API-TOKEN" \
  -F "layer[name]=My Map Layer" \
  -F "layer[file]=@output.mbtiles"
```

## Notes

**File size limits:** Fulcrum has upload size limits for map layers. If your MBTiles file is very large, reduce the maximum zoom level or clip the extent to the area of interest before converting.

**Coordinate system:** Both GDAL and QGIS expect input data in a standard projection. WGS 84 (EPSG:4326) or Web Mercator (EPSG:3857) are the most compatible. Reproject your source data with `gdalwarp -t_srs EPSG:3857 input.tif reprojected.tif` if needed.

**Raster vs. vector tiles:** MBTiles can store either raster (PNG/JPEG) or vector (Mapbox Vector Tiles) content. The GDAL workflow above produces raster tiles. QGIS also produces raster tiles. Fulcrum Map Layers support raster MBTiles.
