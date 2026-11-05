---
title: Language Packages & Manual Installation
excerpt: Download Fulcrum Rosetta Stone language packages and manually configure offline translation for Android, desktop/web, and iOS.
deprecated: false
hidden: false
metadata:
  title: Fulcrum Rosetta Stone - Language Packages & Manual Installation
  description: Manual installation instructions, platform downloads, Data Events, and troubleshooting for offline translation in Fulcrum.
  robots: index
next:
  description: ''
---

# Language Packages & Manual Installation

**Version:** 1.0
**Updated:** November 5, 2026

**Recommended:** Use the automated Rosetta Stone installer for normal deployments. This guide is for advanced administrators who need manual deployment, large installations, or troubleshooting. See [Quick Start & User Guide](quick-start.md) for the standard workflow.

## Overview

This guide installs the offline translator into a Fulcrum app by hand: upload the Reference Files, add three fields, and paste one Data Event per platform. Use it for large installs, for troubleshooting, or when the installer web app is not an option.

The manual setup deploys the same translation components as the installer. Android, Desktop and web share one package (standalone HTML files, one per translation direction), and iOS has its own package (JSON models plus a shared engine). The two never share code, so you can install either or both.

You need:

- Editor access to the target Fulcrum app, and permission to add Reference Files
- The files for the platforms and languages you chose (download links are in the platform sections below)
- A **scratch copy** of the app for the first run, never a production app

## Plan first: languages and storage

Fulcrum documents a limit of **1 GB of Reference Files and 100 files per app**, and the API enforces it. The API enforces these limits; the source guide reports that manual uploads in the web app can exceed the API limit. Confirm the current limits for your account before relying on this behavior. Android grows fast with each language (every direction is its own file); iOS grows slowly. Pick the languages an app really needs, usually one region's worth.

| Languages | Android | iOS | Both platforms |
| --- | --- | --- | --- |
| English + Spanish | 0.10 GB, 3 files | 0.11 GB, 8 files | 0.20 GB, 11 files |
| English + Spanish + French | 0.41 GB, 7 files | 0.20 GB, 10 files | 0.61 GB, 17 files |
| English, Spanish, French, Polish | 0.93 GB, 13 files | 0.30 GB, 12 files | 1.24 GB, 25 files |
| All five | 1.60 GB, 21 files | 0.38 GB, 14 files | 1.98 GB, 35 files |

How to read the file counts:

- **Android and Desktop:** 1 runtime file plus one HTML file per direction, so n languages need n × (n − 1) files. English and Spanish need two (`en-es`, `es-en`).
- **iOS:** 1 runtime, 1 extension page, 4 shared engine files, and two models per non-English language (`en-xx` and `xx-en`). English is always needed as the pivot, even if the app does not offer it as a choice.

**Naming matters.** The Android and iOS runtimes share an original name, so upload them under the names in the tables below (`translation-runtime-android.js`, `translation-runtime-ios.js`, `index-ios.html`). The Data Events refer to exactly these names. Every other file keeps its name as downloaded.

**Do the work on a scratch copy first.** Clone the app, install there, test on web and on a device, then repeat on the real app. Before editing an existing app, save a copy of its current Data Events and record the original field configuration so you can roll back safely. Keep the runtime, models, and extension assets from the same package release.

**Back up your existing configuration.** Before editing, save a copy of the current Data Events and document existing field data names and Reference Files. Do not replace unrelated Data Events or overwrite files with the same names.

**Package compatibility.** Keep the runtime, extension, engine assets, and models from the same tested release. Avoid mixing files downloaded at different times if the distribution source has been updated; re-test each platform after replacing assets.

## Step 1: add the three fields

In the app builder, add a **Section** called *Translation* at the very top of the form, and put these three fields inside it. The data names must match exactly, because the Data Events find the fields by data name.

| Field | Type | Data name | Settings |
| --- | --- | --- | --- |
| Language | Choice field | `language` | Single choice. Default `en` if English is offered. |
| Translate | Hyperlink field | `open_translator` | Label it *Translate*. The label is free; the data name is what counts. |
| Translation Cache | Text field | `translated_labels_json` | **Hidden.** Not numeric. Holds the saved translations as JSON. |

The Section is optional (it only keeps the controls together at the top). Name it `translation_section`, or anything unused.

**Choice values must be the two-letter codes.** The label is what users see; the stored value is what the translator reads.

| Label | Value |
| --- | --- |
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| Polish | `pl` |
| Slovak | `sk` |

Only add the languages you uploaded files for. A language without its files will open a blank viewer.

To reuse a field the app already has, keep its data name and update every occurrence in both Data Event scripts: the `ON('click', ...)` field, `VALUE('language')`/`$language`, `language_field`, `cache_field`, and each `exclude_fields` array. Existing fields should be a single-choice field, a hyperlink field and a non-numeric text field.

## Step 2A: Android, Desktop and Web package

This package covers the Fulcrum mobile app on Android, the Fulcrum desktop app, and Fulcrum on the web. The web client runs the Android block too. Each language direction is its own standalone HTML file, so you only upload the directions you need.

**How the download links work.** Each package link points to the permanent Fulcrum-hosted lookup endpoint. It includes a distribution token, platform, and language route, and returns JSON with a short-lived signed `downloadUrl`. Open that returned `downloadUrl` to download the actual file. The token in the published lookup links is intentional; any illustrative tokens outside those links are placeholders.

```
https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=en-es
```

Example response (`downloadUrl` shortened):

```json
{
  "files": [
    {
      "platform": "android",
      "language": "en-es",
      "fileName": "translator-en-es-android-form.html",
      "sizeBytes": 37760712,
      "downloadUrl": "https://cdn.fulcrumapp.com/attachments/record/b927cf1a-...?Expires=...&Signature=..."
    }
  ],
  "unavailable": []
}
```

The query link is stable for this distribution configuration, but access can be changed or revoked. The embedded distribution token is part of the provided permanent download links; ensure it remains approved for distribution. Only the `downloadUrl` in the response is temporary. It is signed and expires, so request a fresh one each time rather than saving it (the `downloadUrl` in the sample above is a shortened placeholder). Files are stored in a Fulcrum app with one record per file, keyed by Platform and Language. The runtime uses the same link format, with `language=runtime-js`.

### Runtime (always required)

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translation-runtime-android.js` | 29.0 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=runtime-js) |

The runtime downloads under the name `translation-runtime-android.js`, which is the name the Data Event loads, so it needs no renaming.

### Translator HTML files

Upload every direction between the languages you chose. Two languages need 2 files, three need 6, four need 12, five need 20. Files are grouped by source language. All names are uploaded exactly as downloaded.

**Source English**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator-en-es-android-form.html` | 36.0 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=en-es) |
| `translator-en-fr-android-form.html` | 55.6 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=en-fr) |
| `translator-en-pl-android-form.html` | 54.6 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=en-pl) |
| `translator-en-sk-android-form.html` | 54.3 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=en-sk) |

**Source Spanish**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator-es-en-android-form.html` | 56.0 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=es-en) |
| `translator-es-fr-android-form.html` | 102.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=es-fr) |
| `translator-es-pl-android-form.html` | 101.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=es-pl) |
| `translator-es-sk-android-form.html` | 101.4 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=es-sk) |

**Source French**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator-fr-en-android-form.html` | 56.2 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=fr-en) |
| `translator-fr-es-android-form.html` | 83.3 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=fr-es) |
| `translator-fr-pl-android-form.html` | 101.9 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=fr-pl) |
| `translator-fr-sk-android-form.html` | 101.6 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=fr-sk) |

**Source Polish**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator-pl-en-android-form.html` | 56.4 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=pl-en) |
| `translator-pl-es-android-form.html` | 83.5 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=pl-es) |
| `translator-pl-fr-android-form.html` | 103.1 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=pl-fr) |
| `translator-pl-sk-android-form.html` | 101.8 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=pl-sk) |

**Source Slovak**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator-sk-en-android-form.html` | 38.0 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=sk-en) |
| `translator-sk-es-android-form.html` | 65.1 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=sk-es) |
| `translator-sk-fr-android-form.html` | 84.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=sk-fr) |
| `translator-sk-pl-android-form.html` | 83.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=android&language=sk-pl) |

### How to upload

1. In Fulcrum, open the app, go to **Reference Files**, and choose **Add file**.
2. Upload the runtime first, using the upload name from the runtime table.
3. Upload each translator HTML file you need. Large files can take several minutes; wait for each to show as complete before starting the next.
4. If you are using the API instead of the UI, send only `Content-Length` and `Content-Type` (`text/html` for the HTML files, `text/javascript` for the runtime) on the presigned upload. Other headers cause a 403, and a generic binary type makes the web viewer show a white screen.

### Data Event (Android, Desktop and Web)

Open **Data Events** for the app and paste the script below. If the app already has Data Events, add this script below them rather than replacing them. It expects the three fields from Step 1 to use the data names `language`, `open_translator` and `translated_labels_json`. If you used different data names, change them in the three places they appear (the `ON('click', …)` line, `language_field`/`cache_field`, and `exclude_fields`). Remove any route entries for languages you did not install, or leave them; unused routes are never opened.

```javascript
function __otAndroidPlatform() {

  if (!ISMOBILE()) {
    return 'android';
  }

  var info = String(VERSIONINFO() || '');

  if (/iOS|iPhone|iPad|iPod/i.test(info)) {
    return 'ios';
  }

  if (/Android/i.test(info)) {
    return 'android';
  }

  return 'unknown';
}

// Offline Language Installer (Android)
// Embedded Bergamot - standalone directional HTML extensions

function getAndroidExtension(route) {

  const files = {
    // English routes
    'en-es': 'translator-en-es-android-form.html',
    'es-en': 'translator-es-en-android-form.html',
    'en-pl': 'translator-en-pl-android-form.html',
    'pl-en': 'translator-pl-en-android-form.html',
    'en-sk': 'translator-en-sk-android-form.html',
    'sk-en': 'translator-sk-en-android-form.html',
    'en-fr': 'translator-en-fr-android-form.html',
    'fr-en': 'translator-fr-en-android-form.html',

    // Spanish routes
    'es-pl': 'translator-es-pl-android-form.html',
    'pl-es': 'translator-pl-es-android-form.html',
    'es-sk': 'translator-es-sk-android-form.html',
    'sk-es': 'translator-sk-es-android-form.html',
    'es-fr': 'translator-es-fr-android-form.html',
    'fr-es': 'translator-fr-es-android-form.html',

    // Polish routes
    'pl-sk': 'translator-pl-sk-android-form.html',
    'sk-pl': 'translator-sk-pl-android-form.html',
    'pl-fr': 'translator-pl-fr-android-form.html',
    'fr-pl': 'translator-fr-pl-android-form.html',

    // Slovak / French routes
    'sk-fr': 'translator-sk-fr-android-form.html',
    'fr-sk': 'translator-fr-sk-android-form.html'
  };

  if (!route || !route.length) {
    throw new Error('No translation route provided.');
  }

  // Direct translation: en → es
  // Pivot translation: pl → en → es
  const key = route.length === 1
    ? route[0]
    : route[0].split('-')[0] + '-' +
      route[route.length - 1].split('-')[1];

  if (!files[key]) {
    throw new Error(
      'No Android HTML available for route: ' +
      route.join(' → ')
    );
  }

  return 'attachment://' + files[key];
}

var androidTranslator = null;
var androidBusy = false;

function withAndroidTranslator(callback) {

  if (androidTranslator) {
    return callback();
  }

  LOADFILE({
    name: 'translation-runtime-android.js'
  }, function(error, code) {

    if (error || !code) {
      ALERT(
        'Could not load Android translation runtime: ' +
        (error && error.message || error)
      );
      return;
    }

    try {

      (0, eval)(code);

      androidTranslator = globalThis.INIT_OFFLINE_TRANSLATOR({
        original_language: 'en',
        language_field: 'language',
        cache_field: 'translated_labels_json',
        exclude_fields: ['language', 'open_translator', 'translated_labels_json']
      });

      callback();

    } catch (error) {

      ALERT(
        'Could not initialize Android translator: ' +
        (error.message || error)
      );

    }

  });
}

ON('click', 'open_translator', function() {

  if (__otAndroidPlatform() !== 'android') return;

  if (androidBusy) return;

  withAndroidTranslator(function() {

    try {

      const target = CHOICEVALUE(VALUE('language'));

      if (!target) {
        ALERT('Select a language first.');
        return;
      }

      const translation = androidTranslator.prepare(target);

      if (!translation) return;

      const extensionUrl = getAndroidExtension(
        translation.route
      );

      androidBusy = true;

      OPENEXTENSION({
        url: extensionUrl,
        title: 'Translate Form',
        data: translation,

        onMessage: function(message) {

          const result = message && message.data;

          if (!result) {
            androidBusy = false;
            return;
          }

          if (result.type === 'translation-error') {
            androidBusy = false;

            ALERT(
              'Offline translation failed: ' +
              result.error
            );

            return;
          }

          if (result.type !== 'form-translation-result') {
            return;
          }

          try {

            androidTranslator.apply(
              result,
              translation.to
            );

            const languages = {
              en: 'English',
              es: 'Spanish',
              pl: 'Polish',
              sk: 'Slovak',
              fr: 'French'
            };

            ALERT(
              'Form translated to ' +
              (languages[translation.to] || translation.to) +
              '.'
            );

          } catch (error) {

            ALERT(
              'Could not apply translation: ' +
              (error.message || error)
            );

          } finally {

            androidBusy = false;

          }
        }
      });

    } catch (error) {

      androidBusy = false;
      ALERT(error.message || String(error));

    }

  });
});

ON('load-record', function() {

  if (__otAndroidPlatform() !== 'android') return;

  withAndroidTranslator(function() {
    androidTranslator.restore();
  });

});
```

## Step 2B: iOS package

The iOS package is different from Android. Instead of one HTML file per direction, it uses a single extension page, four encoded engine files, and one JSON model per direction. English is the pivot language, so each non-English language needs exactly two models (to English and from English). Direct non-English pairs are routed through English.

**How the download links work.** The language models are served by the same Fulcrum API endpoint as the Android files, with `platform=ios` and the `language` route. The response is JSON containing a short-lived signed `downloadUrl`; open it in a browser to get the file.

```
https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=en-es
```

The query link is stable for this distribution configuration, but access can be changed or revoked. The embedded distribution token is part of the provided permanent download links; ensure it remains approved for distribution. Only the `downloadUrl` it returns is temporary. The core and engine files use the same link format, with their own `language` keys (such as `ios-index-html` or `bergamot-translator-worker-wasm`).

### Core files (always required)

| File name as downloaded | Upload to the app as | Size | Download link |
| --- | --- | --- | --- |
| `translation-runtime.js` | `translation-runtime-ios.js` | 32.3 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=ios-translation-runtime) |
| `index.html` | `index-ios.html` | 16.9 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=ios-index-html) |

Both files are renamed on upload. The runtime downloads as `translation-runtime.js` and the page as `index.html`; rename them to `translation-runtime-ios.js` and `index-ios.html`, because the Data Event loads them by those exact names.

### Engine files (always required)

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `translator.js.b64` | 39.9 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=ios-translator-js-b64) |
| `translator-worker.js.b64` | 22.4 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=ios-translator-worker-js-b64) |
| `bergamot-translator-worker.js.b64` | 104.8 KB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=bergamot-translator-worker-js) |
| `bergamot-translator-worker.wasm.b64` | 6.6 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=bergamot-translator-worker-wasm) |

These four files are the Bergamot engine in encoded form. Upload them unmodified; do not merge, decode or rewrite them.

### Language models (one pair per language)

**Spanish**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `en-es.json` | 46.5 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=en-es) |
| `es-en.json` | 47.1 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=es-en) |

**French**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `en-fr.json` | 46.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=en-fr) |
| `fr-en.json` | 47.3 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=fr-en) |

**Polish**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `en-pl.json` | 45.7 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=en-pl) |
| `pl-en.json` | 47.5 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=pl-en) |

**Slovak**

| File (uploaded under the same name) | Size | Download link |
| --- | --- | --- |
| `en-sk.json` | 45.4 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=en-sk) |
| `sk-en.json` | 29.1 MB | [Download](https://api.fulcrumapp.com/run/eb21e323-29f5-454b-84d9-137d5dbc57cf?token=dc707f0e9906917289ba&platform=ios&language=sk-en) |

### How to upload

1. Open the app in Fulcrum and go to **Reference Files**.
2. Upload the two core files, then the four engine files, using the upload names above.
3. Upload the model pair for each language you want.
4. Use `text/html` for `index-ios.html`, `text/javascript` for the runtime, `application/json` for models and `text/plain` for the `.b64` files if you upload through the API.

### Data Event (iOS)

Paste the script below into **Data Events** for the app. It only runs on iOS, so it can sit alongside the Android script in the same app. It expects the data names `language`, `open_translator` and `translated_labels_json`; change them in the script if you used different ones.

```javascript
function __otIosPlatform() {

  if (!ISMOBILE()) {
    return 'android';
  }

  var info = String(VERSIONINFO() || '');

  if (/iOS|iPhone|iPad|iPod/i.test(info)) {
    return 'ios';
  }

  if (/Android/i.test(info)) {
    return 'android';
  }

  return 'unknown';
}

var iosRuntimeLoaded = false;
var iosTranslator = null;
var iosTranslationInProgress = false;

// ------------------------------------------------------------
// LOAD + INITIALIZE SHARED TRANSLATION RUNTIME
// ------------------------------------------------------------

function withIosTranslationRuntime(callback) {

  // Runtime already initialized.
  if (
    iosRuntimeLoaded &&
    iosTranslator
  ) {
    callback();
    return;
  }

  LOADFILE(
    {
      name: 'translation-runtime-ios.js'
    },

    function(error, code) {

      if (error || !code) {

        console.log(
          'Could not load translation runtime:',
          error
        );

        return;
      }

      // Load the reusable runtime into the global scope.
      (0, eval)(code);

      if (
        typeof globalThis.INIT_OFFLINE_TRANSLATOR !==
        'function'
      ) {

        console.log(
          'Runtime loaded, but INIT_OFFLINE_TRANSLATOR was not exported'
        );

        return;
      }

      // IMPORTANT:
      // INIT_OFFLINE_TRANSLATOR returns our reusable API.
      iosTranslator =
        globalThis.INIT_OFFLINE_TRANSLATOR({

          original_language: 'en',

          language_field: 'language',

          cache_field: 'translated_labels_json',

          extension_file: 'index-ios.html',

          exclude_fields: ['language', 'open_translator', 'translated_labels_json']

        });

      if (
        !iosTranslator ||
        typeof iosTranslator.prepare !== 'function' ||
        typeof iosTranslator.apply !== 'function'
      ) {

        console.log(
          'Translation runtime initialized, but API is incomplete'
        );

        return;
      }

      iosRuntimeLoaded = true;

      console.log(
        'Offline translation runtime initialized'
      );

      callback();

    }
  );

}

// ------------------------------------------------------------
// TRANSLATE CURRENT FORM
// ------------------------------------------------------------

async function translateCurrentFormIos() {

  if (iosTranslationInProgress) {

    console.log(
      'Translation already in progress'
    );

    return;
  }

  try {

    const targetLanguage =
      CHOICEVALUE(
        $language
      );

    if (!targetLanguage) {
      return;
    }

    iosTranslationInProgress = true;

    console.log(
      'Preparing translation:',
      targetLanguage
    );

    // Runtime handles:
    // - current/source language
    // - cache
    // - form field discovery
    // - repeatables
    // - route
    // - condensed model loading
    // - Bergamot runtime loading
    const translation =
      await iosTranslator.prepare(
        targetLanguage
      );

    // prepare() returns null when there is
    // nothing that needs translating.
    if (!translation) {

      console.log(
        'No translation required'
      );

      iosTranslationInProgress = false;

      return;
    }

    console.log(
      'Opening translation extension:',
      translation.from,
      '→',
      translation.to,
      translation.route
    );

    // OPENEXTENSION stays in the MAIN DATA EVENT.
    OPENEXTENSION({

      url:
        'attachment://index-ios.html',

      title:
        'Translate Form',

      data:
        translation,

      onMessage:
        function(message) {

          try {

            if (
              !message ||
              !message.data
            ) {

              console.log(
                'Translation extension returned no data'
              );

              iosTranslationInProgress = false;
              return;
            }

            console.log(
              'Translation returned from extension'
            );

            iosTranslator.apply(
              message.data,
              translation.to
            );

            console.log(
              'Translation complete:',
              translation.to
            );

          } catch (error) {

            console.log(
              'Could not apply translation:',
              error
            );

            ALERT(
              error.message ||
              String(error)
            );

          } finally {

            iosTranslationInProgress =
              false;

          }

        }

    });

  } catch (error) {

    iosTranslationInProgress =
      false;

    console.log(
      'Offline translation error:',
      error
    );

    ALERT(
      error.message ||
      String(error)
    );

  }

}

// ------------------------------------------------------------
// TRANSLATE BUTTON
// ------------------------------------------------------------

ON(
  'click',
  'open_translator',

  function() {

    if (__otIosPlatform() !== 'ios') return;

    withIosTranslationRuntime(
      translateCurrentFormIos
    );

  }
);

// ------------------------------------------------------------
// RECORD LOAD
//
// Only restore cached labels / choices.
// Do NOT automatically run a new translation.
// ------------------------------------------------------------

ON(
  'load-record',

  function() {

    if (__otIosPlatform() !== 'ios') return;

    withIosTranslationRuntime(
      function() {

        if (
          iosTranslator &&
          typeof iosTranslator.restore ===
            'function'
        ) {

          iosTranslator.restore();

        }

      }
    );

  }
);
```

## Step 3: Using both platforms in one app

Most apps need both packages, since field crews use a mix of phones and tablets. Install Steps 2A and 2B into the same app and keep the three fields from Step 1 shared between them.

1. Upload all files from both packages. No file names collide, because the Android runtime and iOS runtime use different upload names (`translation-runtime-android.js` and `translation-runtime-ios.js`).
2. Paste both Data Event scripts into the app's Data Events, one after the other. The scripts use separate global names (`android*` and `ios*`), so they do not interfere.
3. Leave the platform guards in place. Each script checks the device and returns immediately when it is not its own platform. iOS devices run only the iOS block. Android devices, the desktop app and the web run only the Android block.
4. Combined storage is the sum of both packages, and the 1 GB and 100 file limits per app apply to the total. Check the planning table in Step 0 before uploading.

## Step 4: Verify the install

**Before testing offline:** Complete a full synchronization while connected to the internet. Test at least one translation on each installed platform, then disconnect and repeat. A successful online translation alone does not confirm that all models are available offline.

1. Open the app on a device and start a new record. The **Translation** section with the language picker and the **Translate** button should appear at the top of the form.
2. Pick a language and tap **Translate**. The first run can take several seconds while the engine loads. Labels, descriptions and choice lists change to the chosen language.
3. Save the record, close it and reopen it. The translated labels should come back without pressing Translate again; this is the saved cache restoring.
4. Switch back to English and translate again to confirm the round trip.
5. Repeat on each platform you installed: iOS, Android, and the web. After synchronizing the device online, enable airplane mode and translate to confirm it works offline.
6. Check that translated choice labels do not change their underlying stored values, and that existing calculations and Data Events still behave correctly.

If a step fails, go to the troubleshooting table below.

## Security and Data Integrity

- **Download access:** The package lookup URLs include a distribution token. Do not substitute a personal Fulcrum API token or expose one in public documentation. Verify the supplied token is explicitly intended for public downloads.
- **Choice values:** Translation changes visible choice labels, not their stored values. Keep calculations, Data Events, and integrations keyed to stable stored values.
- **Sensitive text:** Translation runs locally after synchronization, but normal Fulcrum record storage and synchronization behavior still applies. Review your organization's data handling requirements.
- **Exact-match fields:** Exclude identifiers, serial numbers, regulatory text, and other values that must not be machine-translated.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Translate does nothing | Data Event not saved, or the button data name is not `open_translator` | Re-save the Data Events and check the data name in the `ON('click', ...)` line. |
| "Could not load translation runtime" | Runtime file is missing or has the wrong Reference File name | Confirm the Android runtime is `translation-runtime-android.js`; rename the downloaded iOS runtime to `translation-runtime-ios.js` before uploading. |
| "No Android HTML available for route" | The direction file is missing or the language code is not one of en, es, fr, pl, sk | Upload the missing `translator-xx-yy-android-form.html` and confirm the choice values are two-letter codes. |
| Blank white screen on web or desktop, nothing in the console | HTML file was stored as a generic binary and is served as a download | Delete the file and re-upload it with Content-Type `text/html`. The console may show "Download is disallowed". |
| Web shows the iOS flow, or nothing runs | Platform check returns the wrong value | On web `ISMOBILE()` is false, so the Android block runs. Confirm both scripts keep their platform guards. |
| Upload fails with 403 "headers not signed" | Extra headers sent on the presigned upload | Send only `Content-Length` and `Content-Type`. Do not send `x-amz-meta-*` headers. |
| Upload fails with `ETIMEDOUT` or a reset | Large file on an unstable connection | Retry the file on its own. Upload very large files from a wired connection. |
| Storage or file count error on upload | 1 GB or 100 file limit reached for the app | Drop languages you do not need or split languages across apps by region. |
| Language picker is empty or translates the wrong way | Choice values are not two-letter codes | Edit the choice list so values are `en`, `es`, `fr`, `pl`, `sk`. |
| Translation works once but is gone after reopening | Cache field missing or renamed | Make sure the `translated_labels_json` field exists and matches `cache_field` in the script. |
| Yes/No fields stay in English | Yes/No labels are not translated | Use a choice list instead of a Yes/No field when the labels must translate. |

Tip: on iOS the script writes progress to the console. Connect the device to a Mac and open Safari Web Inspector to read it.

## Version compatibility and maintenance

Keep the translation runtime, extension, Bergamot engine files, and language models aligned to the same tested release. When upgrading, validate the replacement files in a scratch app before changing production Reference Files. If you update form labels or choices, rerun translation to refresh saved label caches.

**Choice values:** Rosetta Stone translates displayed choice labels, not stored choice values. Continue using stored choice values in calculations, Data Events, and integrations. Avoid translating identifiers or technical codes that must remain exact.

## Removing or repairing an install

**Repair a single file.** Fulcrum has no update endpoint for Reference Files. Delete the broken file from the app's Reference Files, then upload it again under the same name.

**Remove a language.** Delete its translator files (Android: every file whose name contains the code, such as `-pl-` or `pl-`; iOS: the two `.json` models for that language). Then remove the language from the choice list and from the route map in the Android script.

**Remove everything.** Delete the three fields, delete the Data Event scripts, then delete the runtime, translator, engine and model files from Reference Files.

**Keep your own Data Events.** If the app has other Data Events, add the scripts after them instead of overwriting the whole editor, and take them out the same way.

## Appendix: file reference

| Package | Required files | Count |
| --- | --- | --- |
| Android, Desktop, Web | 1 runtime plus one HTML per direction | 1 + n×(n−1) for n languages |
| iOS | 2 core files, 4 engine files, 2 models per non-English language | 6 + 2×(n−1) for n languages including English |

For example, English plus Spanish needs 1 + 2 = 3 files on Android and 6 + 2 = 8 files on iOS. All five languages need 21 files on Android and 14 files on iOS.

The download tables above use Fulcrum-hosted package lookup links. Each lookup returns JSON containing a temporary signed `downloadUrl`; follow that URL to download the file. Do not save the temporary signed URL as a permanent documentation link.

**Distribution note:** The token embedded in each permanent package lookup URL is intentionally retained as supplied. Other tokens or signed URLs shown in examples are illustrative. These lookup URLs have not been live-tested as part of this documentation revision.

For the standard installation path, see [Quick Start & User Guide](quick-start.md). For runtime design and platform routing, see [Technical Architecture](technical-architecture.md).
