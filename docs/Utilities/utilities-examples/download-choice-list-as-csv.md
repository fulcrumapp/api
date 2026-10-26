---
title: Download a Choice List as CSV
excerpt: Run this browser console script while viewing a Fulcrum choice list to extract all choice labels and values into a CSV and download it — useful for auditing choice lists, sharing them with stakeholders, or importing them into another tool.
---

When viewing a choice list in the Fulcrum web application, this console script reads the choice labels and values from the page DOM and downloads them as a CSV file — no API call required.

## Script

Open the choice list you want to export in the Fulcrum web application, then open the browser developer console (F12 → Console tab) and run:

```javascript
var labels = document.getElementsByClassName('pull-left choice-label');
var values = document.getElementsByClassName('pull-left choice-value');

var rows = [];
for (var i = 0; i < labels.length; i++) {
  rows.push('"' + labels[i].value + '","' + values[i].value + '"');
}

var csvContent = 'label,value\r\n' + rows.join('\r\n') + '\r\n';

// Download via a Blob URL (browsers block navigating to data: URLs)
var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
var link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'choice-list.csv';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
```

## How to Use

1. Navigate to **Settings → Choice Lists** in the Fulcrum web app and open the choice list you want to export.
2. Open the browser developer console (F12 → Console tab, or right-click → Inspect → Console).
3. Paste the script and press Enter.
4. Your browser downloads `choice-list.csv`. Open it in a spreadsheet or text editor.

If the download is blocked, allow downloads for `web.fulcrumapp.com` and run the script again.

## Output Format

The CSV has two columns — `label` (the display text users see) and `value` (the stored value written to records):

```
label,value
Approved,approved
Pending Review,pending_review
Rejected,rejected
```

## Notes

**`element.value`** reads the current input value from the choice label and choice value text fields rendered in the choice list editor. If a choice list is very long and the UI has virtualized (not rendered all rows), scroll to the bottom of the list before running the script to ensure all choices are present in the DOM.

**This only works on the choice list editor page** in `web.fulcrumapp.com`. It reads live DOM elements and does not call any API.
