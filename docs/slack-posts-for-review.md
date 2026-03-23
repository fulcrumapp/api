# Slack #se_team_code_share Posts — Full Audit Review

This file is the result of a complete audit of the #se_team_code_share Slack channel (July 2024 – March 2026, ~102 code share posts). The posts below were not included in the current PR either because they need additional work, are internal-only tools, are too customer-specific without cleanup, or have code that couldn't be retrieved automatically.

Posts already documented and committed to the PR are listed at the end for reference.

---

## HIGH PRIORITY — Requires manual code extraction

These posts have strong documentation potential but the code is embedded in attachment files (`.fulcrumapp` exports, JSON files, or private Gists) that cannot be automatically extracted. They must be manually opened and scrubbed before documenting.

### 1. PDF Merge — combine multiple reports into one (Nov 12, 2024)
**Creator:** @Mike
**Message TS:** 1731434972.437609
**Category:** Report Builder
**Description:** Shows how to merge multiple PDF reports into a single output. Includes options for pulling from other report templates, reference files, and attachment fields. 7 replies.
**Action required:** Code is in a JSON attachment file in the Slack thread. Extract the script, scrub any customer-specific form IDs or API tokens, and create a standalone Report Builder example.

---

### 2. FullCalendar.js calendar view for attendance tracker (Jan 27, 2025)
**Creator:** @Diego C.
**Message TS:** 1737982613.407389
**Category:** Report Builder
**Customer:** Asplundh
**Description:** HTML report using the [FullCalendar.js](https://fullcalendar.io/) library to display attendance data in a calendar view. 4 replies.
**Action required:** Code is embedded in a `.fulcrumapp` app export file attached to the thread. Extract the HTML App Extension code from the export, remove the Asplundh-specific field names and form references, and generalize as a Report Builder calendar example.

---

### 3. Widgets Inventory Scanner App Extension (Feb 13, 2026)
**Creator:** @Jared Carey
**Message TS:** 1771016554.597669
**Category:** App Extensions
**Description:** A self-contained HTML interface for mobile or web to barcode-scan items and perform rapid inventory quantity adjustments.
**Action required:** Code is embedded in a `.fulcrumapp` app export file attached to the thread. Extract the HTML from the App Extension inside the export, scrub any API tokens or form-specific field keys, and create a standalone App Extension example.

---

### 4. Web Mapping in the Report Builder (Mar 12, 2025)
**Creator:** @Kyle Pennell
**Customer:** SCE
**Message TS:** 1741805961.410129
**Category:** Report Builder
**Description:** Shows how to embed a web map in a Report Builder PDF. 5 replies, 2 heart reactions, 1 esri reaction.
**Action required:** Code is in a private Gist linked in the thread that is not publicly accessible. Kyle or the SE team needs to share the Gist contents or re-host the example. Once available, strip the SCE-specific context and document as a general web mapping pattern.

---

## MEDIUM PRIORITY — Useful utilities, internal or SE-team focused

These are useful tools but are primarily for internal SE team use, or are short snippets that could become quick reference examples.

### 5. Enable Report Builder advanced features (Jul 25, 2024)
**Creator:** @Mike
**Message TS:** 1721957817.936569
**Category:** Tip / Console
**Description:** One-liner console script to enable the HTML report builder feature flag: `window.localStorage.setItem('reportsEnabled', '1')`
**Notes:** Very short. Could be added as a callout/tip in Report Builder documentation rather than a standalone example.

---

### 6. Bookmarklet to auto-copy API token (Nov 21, 2024)
**Creator:** @Gus Ferrara
**Message TS:** 1732231724.524269
**Category:** Developer Utility / Bookmarklet
**Description:** A bookmarklet that reads the temporary API token from the Fulcrum `window` object and copies it to the clipboard.
**Notes:** Useful for developers but not a Fulcrum API example per se. Could fit in a "Developer Tips" or "Utilities" section.

---

### 7. Check parent-child repeatable relationships (Mar 6, 2025)
**Creator:** @Kyle Pennell
**Customer:** SCE
**Message TS:** 1741301660.356099
**Category:** Data Events / Report Builder
**Description:** Code to check and validate parent-child repeatable relationships. 4 replies.
**Notes:** Useful pattern but SCE-specific context needs to be stripped.

---

### 8. SQL: Extract all fields recursively using Query API (Mar 3, 2025)
**Creator:** @Mike
**Message TS:** 1741043285.859059
**Category:** SQL / Query API
**Description:** A SQL query to recursively extract all fields within a form using the Fulcrum Query API.
**Notes:** Good SQL example. Would fit in a Query API section.

---

### 9. Query all forms a user has access to (Mar 13, 2025)
**Creator:** @Mike
**Message TS:** 1741897363.951789
**Category:** SQL / Query API
**Description:** A SQL query to retrieve all form names and IDs that each user in an org has access to. 1 reply.
**Notes:** Useful admin query. Would fit in a Query API section.

---

### 10. SQL pivot — columns to rows (Mar 2, 2025)
**Creator:** @Mike
**Message TS:** 1740922111.106489
**Category:** SQL / Query API
**Description:** A SQL query that converts each column in an app result into a separate row (`record_id, data_name, value`). 1 reply.
**Notes:** Useful but very short. Best as an inline example or snippet.

---

### 11. Activate HTML advanced report feature via console (Mar 4, 2025)
**Creator:** @Diego C.
**Message TS:** 1741099687.075229
**Category:** Tip / Console
**Description:** Console snippet to enable the advanced HTML report feature flag: `window.localStorage.setItem('app-designer-debug-mode', true); location.reload()`
**Notes:** Very short. Could be a callout in App Designer documentation.

---

### 12. Script to output CSV of data_name/key mapping (Oct 24, 2025)
**Creator:** @Gus Ferrara
**Message TS:** 1761323102.635249
**Category:** Developer Utility / Console
**Description:** A browser console script to run in the App Designer that outputs a CSV with the `data_name` and `key` mapping for every field. Useful for Report Builder and API work.
**Notes:** Very practical SE tool. Could be documented as a developer utility tip.

---

### 13. Most Complex Calc Field Ever Made (Jan 30, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1738259002.250459
**Category:** CALCULATIONS
**Description:** A complex calculation field expression involving repeatables. 3 replies.
**Notes:** Thread not read. Interesting but the "most complex ever" framing may make it too bespoke for general docs. Read thread before deciding.

---

### 14. Local storage for parent-child record linking (Nov 25, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1764110137.319979
**Category:** Data Events
**Description:** Uses local storage to create a record linking relationship between a parent and child form. 1 reply.
**Notes:** Thread not read. Could be a useful alternative to built-in Record Links.

---

### 15. Auto redirect to saved filter (Nov 12, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1762993164.617539
**Category:** Utility / Tampermonkey or JS
**Description:** Code to automatically redirect to a saved filter in Fulcrum. 5 replies, 1 clapping reaction.
**Notes:** Thread not read. Could be a useful productivity tip.

---

### 16. Export issues tab on Fulcrum import to CSV (Dec 23, 2025)
**Creator:** @Gus Ferrara
**Message TS:** 1766508774.303799
**Category:** Developer Utility / Console
**Description:** A browser console script to export the "issues" tab from a Fulcrum import job to a CSV file. 1 reply.
**Notes:** Useful but narrow use case. Good for an SE tools reference.

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
