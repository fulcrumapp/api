---
title: Bundle npm packages for use in Data Events and Report Builder
excerpt: >-
  Any npm package can be bundled into a single minified JavaScript file using
  esbuild and then pasted directly into a Fulcrum Data Event or Report Builder
  EJS template — including on the server-side EJS rendering layer. This tip
  shows the full workflow.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---

# Bundle npm packages for use in Data Events and Report Builder

Fulcrum Data Events and Report Builder templates run in a sandboxed JavaScript environment that doesn't support `require()` or `import` statements. However, you can use [esbuild](https://esbuild.github.io/) to bundle any npm package into a single self-contained script and paste it directly into your Data Event or EJS template — including the server-side rendering context.

This is useful for adding libraries like Base64 encoding, date formatting (e.g. Luxon, Day.js), UUID generation, or any other utility that isn't available in the Fulcrum runtime by default.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [esbuild](https://esbuild.github.io/) installed globally or per-project (`npm install -D esbuild`)

## Steps

### 1. Install the npm package locally

```bash
npm install <package-name>
```

For example, to use the `js-base64` library:

```bash
npm install js-base64
```

### 2. Find the entry point file in `node_modules`

Look inside `node_modules/<package-name>/` for the main JavaScript file. Check the package's `package.json` for the `main` or `module` field, or look for a file like `index.js` or `<package-name>.js`.

### 3. Bundle with esbuild

Run the following command, replacing the placeholders with your package details:

```bash
npx esbuild node_modules/<package-name>/<entry-file>.js \
  --bundle --minify --format=iife --global-name=<VariableName> \
  --outfile=public/<package-name>.min.js
```

**Flags explained:**

| Flag | Purpose |
|---|---|
| `--bundle` | Resolves and inlines all dependencies |
| `--minify` | Produces a compact single-line output |
| `--format=iife` | Wraps the bundle in an immediately-invoked function expression, safe for script injection |
| `--global-name` | The variable name you'll use to access the library in Fulcrum |
| `--outfile` | Where to write the bundled output |

**Example for `js-base64`:**

```bash
npx esbuild node_modules/js-base64/base64.js \
  --bundle --minify --format=iife --global-name=Base64 \
  --outfile=public/base64.min.js
```

### 4. Copy the bundle into Fulcrum

Open `public/<package-name>.min.js` and copy the entire contents. Paste it at the top of your Data Event or EJS template, before any code that uses the library.

### 5. Use the library via the global variable name

After pasting the bundle, the library is available under the `--global-name` you specified.

**Example — Base64 encoding in a Data Event:**

```js
// (paste the base64.min.js bundle content here)

ON('load-record', () => {
  const encoded = Base64.encode('Hello from Fulcrum');
  SETVALUE('encoded_value', encoded);
});
```

**Example — Using the library in an EJS report template:**

```ejs
<%
// (paste the bundle content here, at the top of the <script> block or server-side)
const encoded = Base64.encode(record.values.some_field);
%>
<p>Encoded: <%= encoded %></p>
```

## Notes

- The bundled output is self-contained — it has no external dependencies and will work in any JavaScript environment.
- Keep the bundled output as small as possible. Very large bundles (hundreds of KB) may slow down Data Event initialization on mobile devices.
- Some packages assume a Node.js or browser environment with globals like `process`, `window`, or `fetch`. If the bundle fails to run in Fulcrum, check the package documentation for a browser-compatible build, or use esbuild's `--platform=browser` flag.
- For server-side EJS templates in Report Builder, this technique works on both the client-side `<script>` context and in the server-rendered `<% %>` EJS blocks, since both run standard JavaScript.
