---
title: Export the Import Issues Tab to CSV
excerpt: Run this browser console script on a Fulcrum import job's Issues tab to extract all validation errors and warnings into a downloadable CSV file — useful for diagnosing import problems and sharing them with data submitters.
---

When a Fulcrum data import produces validation errors, the importer shows them in an "Issues" tab as an HTML table. This script reads that table, converts it to CSV, and triggers a browser download — letting you save, sort, and share the issues outside of Fulcrum.

## Script

Run this in the browser's developer console while the import Issues tab is visible:

```javascript
(function () {
  // 1. Find the issues table in the page
  const table = document.querySelector('table.mapping');

  if (!table) {
    console.error("Table not found. Make sure you're on the Issues tab of a Fulcrum import.");
    return;
  }

  // 2. Extract header row
  const headers = Array.from(table.querySelectorAll('thead th'))
    .map(th => `"${th.innerText.trim().replace(/"/g, '""')}"`)
    .join(',');

  // 3. Extract data rows
  const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
    const cells = Array.from(tr.querySelectorAll('td'));
    return cells.map(td => {
      let text = td.innerText.trim();
      // Collapse line breaks inside cells so they don't split CSV rows
      text = text.replace(/(\r\n|\n|\r)/gm, ' ');
      return `"${text.replace(/"/g, '""')}"`;
    }).join(',');
  });

  // 4. Combine into a CSV string
  const csvContent = [headers, ...rows].join('\n');

  // 5. Trigger a file download
  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'import_issues.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    console.log('%cCSV downloaded.', 'color: green; font-weight: bold;');
  } catch (e) {
    // Fallback: print to console for manual copy
    console.error('Download blocked by browser. Copy the CSV text below:');
    console.log(csvContent);
  }
})();
```

## How to Use

1. Navigate to a Fulcrum import job that has completed with errors.
2. Click the **Issues** tab to display the validation error table.
3. Open the browser developer console (F12 → Console tab).
4. Paste the script and press Enter.
5. A file named `import_issues.csv` downloads automatically.

If the download is blocked by your browser's popup/download restrictions, the CSV text is also printed to the console. Copy it and paste it into a text editor or spreadsheet application.

## How It Works

The script looks for `table.mapping` — the CSS class Fulcrum's importer uses for its issues table. It extracts the `<thead>` cells as column headers and iterates over `<tbody>` rows to collect cell text. Values are wrapped in double-quotes and any embedded double-quotes are escaped (`""`) to produce valid RFC 4180 CSV. The final string is packaged into a `Blob`, attached to a programmatically created `<a>` element, and `.click()`-ed to trigger the browser's file download mechanism.

## Notes

This script reads the DOM of the current page and has no access to Fulcrum's servers or APIs. It only captures issues that are currently rendered in the table — if the importer paginates results, scroll through all pages or increase the page size before running the script to ensure all rows are present in the DOM.
