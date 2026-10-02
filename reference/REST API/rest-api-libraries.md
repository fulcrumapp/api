---
title: Libraries
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
There are several open source libraries available for working with the Fulcrum API in your language of choice.

* [Fulcrum JavaScript](https://github.com/fulcrumapp/fulcrum-js)
* [Fulcrum Python](https://github.com/fulcrumapp/fulcrum-python)
* [Fulcrum Ruby](https://github.com/fulcrumapp/fulcrum-ruby)

## Installing the Fulcrum JavaScript package

The `@fulcrumapp/fulcrum-js` package is distributed through GitHub Packages' npm registry at `https://npm.pkg.github.com`. This is separate from the container registry at `ghcr.io`.

The SDK is implemented in TypeScript and includes native type declarations. Its examples use ECMAScript modules (ESM); run JavaScript examples as `.mjs` files or in a project configured with `"type": "module"`. TypeScript projects can import the same exports and types.

GitHub Packages requires authentication to install npm packages, even when they are public. Create a GitHub personal access token (classic) with `read:packages` access to the package, then configure npm to use the GitHub Packages registry for the `@fulcrumapp` scope. Keep the token in an environment variable or CI secret; do not commit it. See [GitHub's npm registry documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

Add the following to your project's `.npmrc`:

```ini
@fulcrumapp:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

With `GH_PACKAGES_TOKEN` set in your environment, install the package with:

```bash
npm install @fulcrumapp/fulcrum-js
```
