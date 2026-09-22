---
title: Build a React Report Using CDN Libraries
excerpt: Use React, React DOM, and Babel loaded from CDNs to build a fully interactive Report Builder template with React components and hooks — no build tooling required. This pattern is ideal for data tables, dashboards, and any report that benefits from React's component model.
---

The Fulcrum Report Builder renders HTML templates that can include any JavaScript loaded from CDNs. React v17 with Babel's standalone JSX transformer runs entirely client-side — no `npm install` or build step required — making it a practical way to write component-based report templates.

## Report Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Record Viewer</title>

    <!-- Bootstrap for styling -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />

    <!-- React 17 via CDN (no build step needed) -->
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <!-- Babel standalone for JSX transformation in the browser -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
      body { font-family: Arial, sans-serif; background-color: #f0f0f0; }
      .container { background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      h2 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
      .table th { background-color: #0066cc; color: white; }
    </style>
  </head>
  <body>
    <div id="root" class="container mt-4"></div>

    <!-- type="text/babel" tells Babel to transpile JSX in this script block -->
    <script type="text/babel">
      const { useState, useEffect } = React;

      // ── App Component ───────────────────────────────────────────────────────
      function App() {
        const [records, setRecords] = useState([]);
        const [loading, setLoading]  = useState(true);
        const [error, setError]      = useState(null);

        useEffect(() => {
          fetchRecords();
        }, []);

        function fetchRecords() {
          // Replace YOUR-FORM-ID and YOUR-API-TOKEN with your values.
          // In a Report Builder template, use QUERY() instead of fetch()
          // and inject the results via EJS: var data = <%- JSON.stringify(QUERY(...).rows) %>
          const formId   = 'YOUR-FORM-ID';
          const apiToken = 'YOUR-API-TOKEN';
          const query    = `SELECT _record_id, _title, _status, _updated_at FROM "${formId}" LIMIT 100`;

          fetch('https://api.fulcrumapp.com/api/v2/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-ApiToken': apiToken
            },
            body: JSON.stringify({ format: 'json', q: query })
          })
            .then(res => res.json())
            .then(data => {
              setRecords(data.rows || []);
              setLoading(false);
            })
            .catch(err => {
              setError(err.message);
              setLoading(false);
            });
        }

        if (loading) return <div className="text-center mt-4">Loading...</div>;
        if (error)   return <div className="alert alert-danger mt-4">Error: {error}</div>;

        return (
          <div>
            <h2>Records ({records.length})</h2>
            <RecordTable records={records} />
          </div>
        );
      }

      // ── RecordTable Component ───────────────────────────────────────────────
      function RecordTable({ records }) {
        if (records.length === 0) return <div>No records found.</div>;

        return (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record._record_id}>
                    <td>{record._title}</td>
                    <td>{record._status}</td>
                    <td>{new Date(record._updated_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // ── Mount ───────────────────────────────────────────────────────────────
      ReactDOM.render(<App />, document.getElementById('root'));
    </script>
  </body>
</html>
```

## Using QUERY() Instead of fetch()

In a Fulcrum Report Builder template, you have access to the `QUERY()` function which runs server-side before the HTML is rendered. This is more secure than exposing an API token in the browser, and it's faster because the data is embedded directly in the HTML:

```html
<script type="text/babel">
  // Data is injected by EJS before the browser sees the page —
  // no client-side API call needed.
  const initialRecords = <%- JSON.stringify(QUERY(`
    SELECT _record_id, _title, _status, _updated_at
    FROM "Your App Name"
    ORDER BY _updated_at DESC
    LIMIT 100
  `).rows || []) %>;

  function App() {
    const [records] = React.useState(initialRecords);

    return (
      <div>
        <h2>Records ({records.length})</h2>
        <RecordTable records={records} />
      </div>
    );
  }

  // ... RecordTable component and ReactDOM.render() as above
</script>
```

## Key Notes

**`type="text/babel"`** tells the Babel standalone library to transpile the JSX in that script block before execution. Standard `<script>` blocks without this attribute are not processed by Babel.

**React 17 is used here** because it supports `ReactDOM.render()` without the `createRoot()` API introduced in React 18. For React 18+, update the mount call to `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`.

**Avoid React in PDF reports.** React's async rendering and virtual DOM updates can interfere with Puppeteer's PDF capture if the page is rendered before React finishes mounting. For PDF-outputting reports, prefer synchronous EJS templates. Use React for HTML-output reports viewed in a browser.
