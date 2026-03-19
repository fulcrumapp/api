# Slack #se_team_code_share Posts — Full Audit Review

This file is the result of a complete audit of the #se_team_code_share Slack channel (July 2024 – March 2026, ~102 code share posts). The posts below were not included in the current PR either because they need additional work, are internal-only tools, are too customer-specific without cleanup, or have code that couldn't be retrieved automatically.

Posts already documented and committed to the PR are listed at the end for reference.

---

## HIGH PRIORITY — Good candidates, need thread review / cleanup

These posts have strong documentation potential but require reading the thread to collect the actual code.

### 1. Classification Set replacement with LOADRECORDS (Oct 4, 2024)
**Creator:** @Mike
**Message TS:** 1728082307.220689
**Category:** Data Events
**Description:** Shows how to use LOADRECORDS to replace a Classification Set when multiple attributes need to be drilled down. The main app uses a record link + LOADRECORDS to pull records from a linked app, creates dynamic choice lists, and lets users drill down like a classification set before making a final selection.
**Why not included:** Thread not fully read during this audit pass. Strong documentation candidate — this is a powerful LOADRECORDS pattern.

---

### 2. Auto-populate repeatable fields from linked app (Oct 17, 2024)
**Creator:** @Mike
**Message TS:** 1729168804.902669
**Category:** Data Events
**Description:** Repeatable fields can't be auto-populated via a record link field natively. This code works around that by auto-populating fields within a repeatable section from a linked app's repeatable section.
**Why not included:** Thread not fully read. Useful workaround worth documenting.

---

### 3. Query repeatables + photo captions + Google Street View (Oct 28, 2024)
**Creator:** @Kyle Pennell
**Message TS:** 1730154040.517309
**Category:** Report Builder
**Description:** Advanced Report Builder example that queries repeatable data, photo information, captions, and integrates Google Street View.
**Why not included:** Thread not fully read. Very high value — the Google Street View integration in particular is a standout feature worth documenting.

---

### 4. PDF Merge — combine multiple reports into one (Nov 12, 2024)
**Creator:** @Mike
**Message TS:** 1731434972.437609
**Category:** Report Builder
**Description:** Shows how to merge multiple PDF reports into a single output. Includes options for pulling from other report templates, reference files, and attachment fields. 3 replies with implementation details.
**Why not included:** Thread was identified but not read. This is a high-value Report Builder pattern. 7 replies, multiple options documented.

---

### 5. FullCalendar.js calendar view for attendance tracker (Jan 27, 2025)
**Creator:** @Diego C.
**Message TS:** 1737982613.407389
**Category:** Report Builder
**Customer:** Asplundh
**Description:** HTML report using the [FullCalendar.js](https://fullcalendar.io/) library to display attendance data in a calendar view. 4 replies.
**Why not included:** Customer-specific (Asplundh) and thread not fully read. The FullCalendar.js integration is a compelling Report Builder pattern worth documenting with customer context removed.

---

### 6. Puppeteer stall technique for large PDF rendering (Aug 19, 2025)
**Creator:** @Mike
**Message TS:** 1755609304.908519
**Category:** Report Builder
**Description:** Code to stall the Puppeteer renderer in Report Builder from finishing the page before all async work completes. Makes a fetch call to an erroneous URL to ensure network activity, then aborts it when processing is done. Useful for rendering large maps or merging PDFs.
**Why not included:** Thread not fully read. This is a useful advanced Report Builder tip. Only 1 reply — likely a short, self-contained snippet.

---

### 7. Recursive/nesting-friendly photo-only renderer (Nov 4, 2024)
**Creator:** @Kyle Pennell
**Message TS:** 1762297567.785699
**Category:** Report Builder
**Description:** A Report Builder template that handles nested repeatables and renders photos cleanly. 6 replies, 1 taco reaction.
**Why not included:** Thread not fully read. Nested repeatable photo rendering is a common pain point — worth documenting.

---

### 8. Dynamic custom reports with EJS $params (Oct 8, 2024)
**Creator:** @Diego C.
**Message TS:** 1728410437.286789
**Category:** Report Builder
**Description:** Shows how to pass dynamic data via URL query parameters (`$params.query`) or POST requests (`$params.post`) into EJS report templates, enabling flexible filtering and sorting without hardcoding values.
**Why not included:** Thread not fully read. A very useful pattern for parameterized reports.

---

### 9. Concat PDF attachments to end of a report (Aug 12, 2025)
**Creator:** @Mike
**Message TS:** 1755021151.831909
**Category:** Report Builder
**Customer:** SESI
**Description:** Shows how to concatenate PDF files from attachment fields onto the end of a generated report. 7 replies.
**Why not included:** Customer-specific (SESI) but the core pattern is general. Thread not fully read.

---

### 10. Override console.log to avoid errors on mobile (Sep 25, 2025)
**Creator:** @Mike
**Message TS:** 1758824108.935309
**Category:** Data Events
**Description:** A pattern for overriding `console.log` in Data Events so it doesn't cause errors or unexpected behavior on mobile devices. 5 replies.
**Why not included:** Thread not fully read. Short and useful — likely suitable for an inline "tip" or quick example.

---

### 11. Widgets Inventory Scanner App Extension (Feb 13, 2026)
**Creator:** @Jared Carey
**Message TS:** 1771016554.597669
**Category:** App Extensions
**Description:** A self-contained HTML interface for mobile or web to barcode-scan items and perform rapid inventory quantity adjustments. The code is embedded in a `.fulcrumapp` app export file attached to the thread — it was not directly readable from Slack.
**Why not included:** The HTML code is in a `.fulcrumapp` attachment file. To document this, extract the HTML from the app export, scrub any API tokens or form-specific field keys, and create a standalone App Extension example.

---

### 12. Salesforce trigger/class to create Fulcrum record (Mar 14, 2025)
**Creator:** @Mike
**Message TS:** 1741953090.521519
**Category:** Integrations
**Description:** Apex trigger and class for Salesforce that creates a Fulcrum record via the API when a new work order is created. 2 replies.
**Why not included:** Thread not fully read. A useful integration example for Salesforce customers. Would fit best in an Integrations section of the docs.

---

### 13. Web Mapping in the Report Builder (Mar 12, 2025)
**Creator:** @Kyle Pennell
**Customer:** SCE
**Message TS:** 1741805961.410129
**Category:** Report Builder
**Description:** Shows how to embed a web map in a Report Builder PDF. 5 replies, 2 heart reactions, 1 esri reaction.
**Why not included:** Thread not fully read. Web mapping in reports is a top request — worth documenting without the SCE-specific context.

---

### 14. Add metadata to photos in default report (May 9, 2025)
**Creator:** @Diego C.
**Message TS:** 1746812946.323139
**Category:** Report Builder
**Description:** Shows how to add EXIF metadata (location, timestamp, etc.) to photos displayed in the default Fulcrum PDF report. 4 replies.
**Why not included:** Thread not fully read. Photo metadata in reports is a common request.

---

### 15. BambooHR integration — track worked hours (Jun 11, 2025)
**Creator:** @Diego C.
**Customer:** Q-Team
**Message TS:** 1749662185.392449
**Category:** Integrations / Node.js
**Description:** A Node.js script that sends data from Fulcrum to BambooHR to track worked hours per employee. 5 replies.
**Why not included:** Customer-specific (Q-Team) and thread not fully read. Once scrubbed of customer details, this is a good integration example.

---

### 16. Data event user action logger (Jan 29, 2026)
**Creator:** @Gus Ferrara
**Message TS:** 1769725697.891659
**Category:** Data Events
**Description:** A data event that logs user actions (edits, field changes, etc.) within a record session. 3 replies.
**Why not included:** Thread not fully read. A logging/auditing pattern useful for debugging and compliance use cases.

---

## MEDIUM PRIORITY — Useful utilities, internal or SE-team focused

These are useful tools but are primarily for internal SE team use, or are short snippets that could become quick reference examples.

### 17. Enable Report Builder advanced features (Jul 25, 2024)
**Creator:** @Mike
**Message TS:** 1721957817.936569
**Category:** Tip / Console
**Description:** One-liner console script to enable the HTML report builder feature flag: `window.localStorage.setItem('reportsEnabled', '1')`
**Notes:** Very short. Could be added as a callout/tip in Report Builder documentation rather than a standalone example.

---

### 18. Bookmarklet to auto-copy API token (Nov 21, 2024)
**Creator:** @Gus Ferrara
**Message TS:** 1732231724.524269
**Category:** Developer Utility / Bookmarklet
**Description:** A bookmarklet that reads the temporary API token from the Fulcrum `window` object and copies it to the clipboard.
**Notes:** Useful for developers but not a Fulcrum API example per se. Could fit in a "Developer Tips" or "Utilities" section.

---

### 19. Check parent-child repeatable relationships (Mar 6, 2025)
**Creator:** @Kyle Pennell
**Customer:** SCE
**Message TS:** 1741301660.356099
**Category:** Data Events / Report Builder
**Description:** Code to check and validate parent-child repeatable relationships. 4 replies.
**Notes:** Useful pattern but SCE-specific context needs to be stripped.

---

### 20. SQL: Extract all fields recursively using Query API (Mar 3, 2025)
**Creator:** @Mike
**Message TS:** 1741043285.859059
**Category:** SQL / Query API
**Description:** A SQL query to recursively extract all fields within a form using the Fulcrum Query API.
**Notes:** Good SQL example. Would fit in a Query API section.

---

### 21. Query all forms a user has access to (Mar 13, 2025)
**Creator:** @Mike
**Message TS:** 1741897363.951789
**Category:** SQL / Query API
**Description:** A SQL query to retrieve all form names and IDs that each user in an org has access to. 1 reply.
**Notes:** Useful admin query. Would fit in a Query API section.

---

### 22. SQL pivot — columns to rows (Mar 2, 2025)
**Creator:** @Mike
**Message TS:** 1740922111.106489
**Category:** SQL / Query API
**Description:** A SQL query that converts each column in an app result into a separate row (`record_id, data_name, value`). 1 reply.
**Notes:** Useful but very short. Best as an inline example or snippet.

---

### 23. Activate HTML advanced report feature via console (Mar 4, 2025)
**Creator:** @Diego C.
**Message TS:** 1741099687.075229
**Category:** Tip / Console
**Description:** Console snippet to enable the advanced HTML report feature flag: `window.localStorage.setItem('app-designer-debug-mode', true); location.reload()`
**Notes:** Very short. Could be a callout in App Designer documentation.

---

### 24. Script to output CSV of data_name/key mapping (Oct 24, 2025)
**Creator:** @Gus Ferrara
**Message TS:** 1761323102.635249
**Category:** Developer Utility / Console
**Description:** A browser console script to run in the App Designer that outputs a CSV with the `data_name` and `key` mapping for every field. Useful for Report Builder and API work.
**Notes:** Very practical SE tool. Could be documented as a developer utility tip.

---

### 25. Most Complex Calc Field Ever Made (Jan 30, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1738259002.250459
**Category:** CALCULATIONS
**Description:** A complex calculation field expression involving repeatables. 3 replies.
**Notes:** Thread not read. Interesting but the "most complex ever" framing may make it too bespoke for general docs. Read thread before deciding.

---

### 26. Local storage for parent-child record linking (Nov 25, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1764110137.319979
**Category:** Data Events
**Description:** Uses local storage to create a record linking relationship between a parent and child form. 1 reply.
**Notes:** Thread not read. Could be a useful alternative to built-in Record Links.

---

### 27. Auto redirect to saved filter (Nov 12, 2025)
**Creator:** @Kyle Pennell
**Message TS:** 1762993164.617539
**Category:** Utility / Tampermonkey or JS
**Description:** Code to automatically redirect to a saved filter in Fulcrum. 5 replies, 1 clapping reaction.
**Notes:** Thread not read. Could be a useful productivity tip.

---

### 28. Export issues tab on Fulcrum import to CSV (Dec 23, 2025)
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
