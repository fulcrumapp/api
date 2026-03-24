# Slack #se_team_code_share Posts — Full Audit Review

This file is the result of a complete audit of the #se_team_code_share Slack channel (July 2024 – March 2026, ~102 code share posts). The posts below were not included in the current PR either because they need additional work, are internal-only tools, are too customer-specific without cleanup, or have code that couldn't be retrieved automatically.

Posts already documented and committed to the PR are listed at the end for reference.

---

## HIGH PRIORITY — Requires manual code extraction

*All high-priority items have been documented. See Already Documented below.*

---

## MEDIUM PRIORITY — Useful utilities, internal or SE-team focused

*All medium-priority items have been documented or moved to LOW PRIORITY. See below.*

---

## LOW PRIORITY / NOT SUITABLE for public docs

These posts are either for internal SE team use, customer-specific without generalizable value, or are about third-party tools that aren't central to the Fulcrum API developer experience.

| Date | Creator | Description | Reason |
|---|---|---|---|
| Jul 31, 2024 | Peter | Reorder repeatables by field value (Ocular) | Customer-specific field keys; needs full rewrite |
| Aug 1, 2024 | Mike | Power BI dynamic date table (Merjent) | Power BI M formula, not Fulcrum API |
| Aug 2, 2024 | Kyle | React Report Template (Omnicell) | Customer-specific template, too large without context |
| Aug 19, 2024 | Kyle | Satellite imagery with WMS in QGIS | QGIS tutorial, not Fulcrum API |
| Aug 28, 2024 | Kyle | Python script for Fulcrum DB backup | Internal utility |
| Aug 29, 2024 | Mike | API endpoint for exports | Too brief — thread not read |
| Aug 30, 2024 | Kyle | Managed vs. non-managed users from API | Internal admin utility |
| Sep 2, 2024 | Diego C. | Convert shapefiles to MBTiles (SCE) | QGIS tutorial, not Fulcrum API |
| Sep 13, 2024 | Diego C. | Bulk update multiple forms via script | Internal migration tool |
| Sep 18, 2024 | Israel Perez | Python extract assets from PDF | General Python, not Fulcrum-specific |
| Sep 20, 2024 | Mike | Pull data from ESRI feature service to CSV | Specific integration, narrow use |
| Sep 24, 2024 | Mike | "This is mikes code share" | Test post |
| Sep 25, 2024 | Kyle | Simple React App (report) | Not fully read; may be too minimal |
| Sep 25, 2024 | Kyle | Complex React App with Login | Complex, customer-specific |
| Oct 3, 2024 | Mike | Restore deleted form with Fulcrum CLI | Very short CLI tip |
| Oct 8, 2024 | Mike | Count users via changesets (Query API) | Short SQL query |
| Oct 9, 2024 | Kyle | Clear out all clearable fields | Short data event utility |
| Oct 14, 2024 | Kyle | Split large CSV for importing | Python utility, generic |
| Oct 16, 2024 | Mike | Parsing nested repeatables with calc field | CALCULATIONS — needs thread read |
| Oct 28, 2024 | Kyle | Double query in report for project filter | Very brief; needs thread |
| Nov 1, 2024 | Kyle | Spatial join query (PostGIS) | SQL example, short |
| Nov 4, 2024 | Mike | Get list of forms in CSV from Admin console | Internal admin console script |
| Nov 4, 2024 | Andy | Convert hyperlinks to URL in Excel/Access (VBA) | Excel VBA, not Fulcrum |
| Nov 4, 2024 | Kyle | Bulk upload fields / create large forms | Python, internal |
| Nov 4, 2024 | Kyle | Importer script for SCE (Puppeteer) | Internal SCE-specific tool |
| Nov 4, 2024 | Peter | Open 3rd party data migration (Python) | Generic API example, needs thread |
| Nov 4, 2024 | Diego C. | PDF parsed with Ghostscript and uploaded to Fulcrum | Complex setup, Node.js |
| Nov 5, 2024 | Diego C. | Script to build and export CSV from query | Generic JS |
| Nov 21, 2024 | Gus | API token bookmarklet | Developer tip, not a code example |
| Dec 16, 2024 | Kyle | App icon bulk uploader (Puppeteer) | Internal SE tool |
| Dec 18, 2024 | Israel Perez | Photo caption aggregator (Trileaf) | Customer-specific HTML tool |
| Dec 23, 2024 | Gus | Import geometries from CSV via API | Python utility, needs thread |
| Jan 3, 2025 | Kyle | Download CSV of members in a form | Python utility |
| Jan 8, 2025 | Kyle | Cyclical record link migration notebook | Internal migration tool |
| Jan 10, 2025 | Mike | NodeJS bulk delete users | Internal admin tool |
| Jan 23, 2025 | Gus | Clone record to sandbox (specific version) | Internal testing tool |
| Jan 24, 2025 | Mike | GDAL to convert TIF to MBTiles | GDAL/QGIS tutorial |
| Jan 24, 2025 | Kyle | Record History Fixer for specific field | Internal Python utility |
| Jan 28, 2025 | Diego C. | Failed photo log viewer (Osmose) | Customer-specific HTML tool |
| Jan 28, 2025 | Kyle | Extract JSON from photo EXIF data | Needs thread |
| Jan 31, 2025 | Mike | CSS double-border trick for report tables | Quick CSS tip |
| Feb 13, 2025 | Kyle | Regex to find uncommented console.log (VSCode) | Dev tip, not Fulcrum API |
| Feb 13, 2025 | Gus | Tampermonkey nav script for Fulcrum admin | Internal SE tool |
| Feb 18, 2025 | Mike | Sequential numbering via webhooks | Complex, requires external webhook setup |
| Mar 13, 2025 | Israel Perez | Rich Text Editor (NSK) | Customer-specific (contains admin link) |
| Mar 13, 2025 | Gus | Toggl bookmarklet for SE hours | Internal SE team tool |
| Mar 14, 2025 | Kyle | Python data downloader for Power BI | Integration, narrow use case |
| Mar 28, 2025 | Kyle | Simple Multi Poly Script | Python utility |
| Apr 2, 2025 | Kyle | Bridge multipolys to polys | Python, internal |
| Apr 3, 2025 | Mike | Save docs from report stage (desktop + mobile) | Needs thread — Report Builder tip |
| Apr 7, 2025 | Kyle | Python notebook for URL report shares | Internal debugging tool |
| Apr 25, 2025 | Kyle | Nested Record History Parser | Internal API utility |
| Jul 10, 2025 | Kyle | Backspace deletes a field (Tampermonkey) | Internal SE tool |
| Jul 11, 2025 | Kyle | Org Migration Script with Record Links | Internal migration tool |
| Jul 11, 2025 | Kyle | Record Link Dependencies printer | Internal tool |
| Jul 11, 2025 | Kyle | Network Diagram for record links | Python visualization, internal |
| Jul 15, 2025 | Mike | Download CSV of a Choice List | Short utility, needs thread |
| Aug 14, 2025 | Gus | Log on desktop only (not mobile) | Very short — 2-line function |
| Sep 23, 2025 | Kyle | Enable HTML view PDF reports (console) | Quick console tip |
| Oct 28, 2025 | Kyle | Detect records updated across all apps | Python, internal |
| Mar 6, 2025 | Kyle | Check parent-child repeatable relationships (SCE) | Thread unreadable; SCE-specific context makes generalization unclear |
| Nov 12, 2025 | Kyle | Auto redirect to saved filter (Tampermonkey) | Hardcoded customer dashboard UUID; too narrow for public docs |
| Nov 4, 2024 | Peter | Open 3rd party data migration (Python) | Code is in a .py file attachment; cannot be extracted without download |

---

## Already Documented (in PR #53)

| File | Creator | Category |
|---|---|---|
| `data-events-examples/enforce-daily-sync-with-loadrecords.md` | @Jared Carey | Data Events |
| `data-events-examples/prevent-creating-duplicate-repeatables.md` | @Mike | Data Events |
| `report-builder/display-field-value-labels.md` | @Mike | Report Builder |
| `app-extensions/visualize-data-with-chart-js.md` | @emmanuel.benjamin | App Extensions |
| `data-events-examples/detect-fake-gps-spoofing.md` | @Gus Ferrara | Data Events |
| `data-events-examples/proximity-check-with-loadrecords-and-turf.md` | @Kyle Pennell | Data Events |
| `data-events-examples/cross-app-push-notifications.md` | @Mike | Data Events |
| `data-events-examples/populate-choice-field-from-memberships-api.md` | @Andy Stewart | Data Events |
| `data-events-examples/geofencing-with-loadrecords-and-geometry.md` | @Andy Stewart | Data Events |
| `app-extensions/date-picker-with-blackout-dates.md` | @Kyle Pennell | App Extensions |
| `data-events-examples/import-npm-packages-into-data-events.md` | @Gus Ferrara | Data Events |
| `data-events-examples/classification-set-replacement-with-loadrecords.md` | @Mike | Data Events |
| `data-events-examples/auto-populate-repeatable-fields-from-linked-app.md` | @Mike | Data Events |
| `data-events-examples/suppress-console-log-on-mobile.md` | @Mike | Data Events |
| `data-events-examples/user-action-logger.md` | @Gus Ferrara | Data Events |
| `reports-examples/puppeteer-stall-for-async-rendering.md` | @Mike | Report Builder |
| `reports-examples/recursive-photo-renderer.md` | @Kyle Pennell | Report Builder |
| `reports-examples/query-repeatables-photos-and-google-street-view.md` | @Kyle Pennell | Report Builder |
| `reports-examples/photo-metadata-in-reports.md` | @Diego C. | Report Builder |
| `reports-examples/concat-pdf-attachments-to-report.md` | @Mike | Report Builder |
| `reports-examples/dynamic-reports-with-ejs-params.md` | @Diego C. | Report Builder |
| `integration-examples/salesforce-create-fulcrum-record-on-work-order.md` | @Mike | Integrations |
| `integration-examples/bamboohr-sync-worked-hours.md` | @Diego C. | Integrations |
| `reports-examples/merge-pdf-attachments-with-pdf-lib.md` | @Mike | Report Builder |
| `reports-examples/fullcalendar-attendance-report.md` | @Diego C. | Report Builder |
| `app-extension-examples/inventory-scanner-with-barcode.md` | @Jared Carey | App Extensions |
| `reports-examples/interactive-web-map-with-data-table.md` | @Kyle Pennell | Report Builder |
| `data-events-examples/pass-record-id-between-apps-with-storage.md` | @Kyle Pennell | Data Events |
| `data-events-examples/calculate-status-from-repeatable-values.md` | @Kyle Pennell | Data Events |
| `query-api-examples/extract-form-fields-recursively.md` | @Mike | Query API |
| `query-api-examples/forms-accessible-per-user.md` | @Mike | Query API |
| `query-api-examples/pivot-columns-to-rows.md` | @Mike | Query API |
| `utilities-examples/app-designer-field-mapping-csv.md` | @Gus Ferrara | Utilities |
| `utilities-examples/enable-feature-flags-via-console.md` | @Mike / @Diego C. | Utilities |
| `utilities-examples/export-import-issues-to-csv.md` | @Gus Ferrara | Utilities |
| `utilities-examples/api-token-copy-bookmarklet.md` | @Gus Ferrara | Utilities |
| `calculations-examples/access-nested-repeatable-values-in-calc-field.md` | @Kyle Pennell | Calculations |
| `reports-examples/filter-report-by-project-name.md` | @Kyle Pennell | Report Builder |
| `query-api-examples/query-photo-exif-data.md` | @Kyle Pennell | Query API |
| `reports-examples/simple-react-app-with-query-api.md` | @Kyle Pennell | Report Builder |
| `reports-examples/save-pdf-on-mobile-and-desktop.md` | @Mike | Report Builder |
| `utilities-examples/download-choice-list-as-csv.md` | @Mike | Utilities |
| `integration-examples/trigger-export-via-api.md` | @Mike | Integrations |
