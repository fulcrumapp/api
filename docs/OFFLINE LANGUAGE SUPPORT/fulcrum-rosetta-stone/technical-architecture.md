
---
title: Technical Architecture
excerpt: Understand how Fulcrum Rosetta Stone uses Bergamot, WebAssembly, Data Events, and App Extensions to deliver offline multilingual translation across Android, iOS, and desktop/web.
deprecated: false
hidden: false
metadata:
  title: Fulcrum Rosetta Stone - Technical Architecture
  description: Technical overview of offline translation, platform-specific runtimes, language models, caching, deployment, and Fulcrum integration.
  robots: index
next:
  description: ''
---

Fulcrum Rosetta Stone is an offline translation system built on **Bergamot neural machine translation and WebAssembly**.

A GitHub-backed Node.js/Express installer deploys translation assets, form fields, and Data Events into existing Fulcrum applications.

After installation and synchronization, translation runs locally on the user's device or in the desktop/web application. No external translation API is required.

**Audience:** Engineers, developers, and technical evaluators
**Reading time:** ~3 minutes

## System Architecture

```text
GitHub Repository / Asset Distribution
              |
              | Versioned installation assets
              v
     Node.js / Express Installer
              |
              | Fulcrum REST API
              v
     Target Fulcrum Application
              |
              +-- Reference Files
              |     +-- Translation runtimes
              |     +-- Bergamot engine
              |     +-- Language models
              |     +-- HTML extensions
              |
              +-- Form Fields
              +-- Data Events
              |
              | Initial synchronization
              v
     Fulcrum Mobile / Desktop
              |
              v
      Local Translation Engine
              |
              v
       Translated Form Content
```

GitHub and the configured asset distribution source are used for installation and asset delivery, **not translation execution**.

The installer is not required during normal field operations.

## Android & Desktop/Web

Android and desktop/web use standalone HTML App Extensions containing embedded Bergamot translation assets.

Each translation direction has a dedicated HTML package.

With five supported languages, this produces **20 directional translation packages**.

**Execution flow:**

1. A Data Event loads the Android/desktop translation runtime.
2. The runtime collects form labels, choice labels, and supported text values into a translation payload.
3. The appropriate directional HTML extension opens using `OPENEXTENSION()`.
4. The embedded Bergamot engine performs translation locally.
5. The extension returns translated content to the Data Event.
6. The runtime applies the translated content to the form.

Example:

```text
English → Spanish
translator-en-es-android-form.html

Spanish → French
translator-es-fr-android-form.html
```

The Android/desktop implementation uses its own runtime and packaged translation assets.

## iOS

iOS uses a separate implementation designed around external translation assets and on-demand model loading.

Instead of embedding every translation direction into a standalone HTML package, iOS loads the required Bergamot components and language models from Fulcrum Reference Files.

**Execution flow:**

1. A Data Event loads the iOS translation runtime.
2. The runtime determines the required translation route.
3. The necessary JSON language models and Base64-encoded Bergamot assets load using `LOADFILE()`.
4. The iOS HTML extension opens using `OPENEXTENSION()`.
5. The extension initializes Bergamot and performs translation locally.
6. Translated results return to the Data Event and are applied to the form.

### Language Routing

The iOS implementation includes direct English-to-language and language-to-English models.

Translations between two non-English languages automatically route through English.

Example:

```text
Spanish → English → Polish
```

This routing is handled automatically by the translation runtime.

The iOS implementation uses its own runtime, HTML extension, and model-loading process. These components should not be interchanged with the Android/desktop implementation.

## Fulcrum Integration

Rosetta Stone uses native Fulcrum capabilities without requiring changes to Fulcrum's underlying platform.

| Capability | Purpose |
|---|---|
| `LOADFILE()` | Load translation runtimes, language models, and supporting assets |
| `OPENEXTENSION()` | Launch the local translation interface |
| `ON('click')` | Trigger translation when the user selects the translation button |
| `ON('load-record')` | Restore cached translated interface content |
| `SETLABEL()` | Apply translated form labels |
| `SETCHOICES()` | Apply translated choice labels |
| `SETVALUE()` | Update supported field values and translation cache |
| `ISMOBILE()` / `VERSIONINFO()` | Determine the active platform and select the appropriate runtime |

### Required Form Fields

The default implementation uses three form fields:

| Field data name | Field type | Purpose |
|---|---|---|
| `language` | Single Choice | Stores the selected language |
| `open_translator` | Button | Triggers translation |
| `translated_labels_json` | Text | Stores cached translated labels and choice labels |

### Translation Cache

Rosetta Stone maintains a form-level cache of translated interface content.

The `translated_labels_json` field stores the selected language and translated labels, allowing the Data Event to restore previously translated interface elements when a record is reopened.

The cache contains information such as:

```json
{
  "_lang": "es",
  "labels": {},
  "choice_labels": {}
}
```

This reduces unnecessary translation work when reopening records.

Changes to the original form may require translation to be run again to refresh cached labels.

## Translation Scope

Supported content includes:

- Form field labels.
- Single-choice and multiple-choice display labels.
- Supported text and paragraph field values.
- Supported text values within repeatable sections.

Native Fulcrum Yes/No field types are not currently supported. Use Single Choice fields with Yes/No options as an alternative.

### Stored Choice Values

Rosetta Stone translates **display labels only**, not the underlying stored choice values.

For example:

| Original label | Spanish label | Stored value |
|---|---|---|
| Apple | Manzana | `apple` |
| Pole | Poste | `pole` |

This separation preserves compatibility with existing calculations, Data Events, and integrations that reference stored choice values.

**Important:** Business logic should use stored choice values rather than translated display labels.

## Offline Behavior & Security

Once the required Reference Files are installed and synchronized, translation runs locally without an active internet connection.

**Installation and synchronization require connectivity. Translation execution does not.**

The architecture provides the following characteristics:

- **Local processing:** Form content is processed by the local Bergamot translation engine.
- **No external translation API:** Translation does not require submitting form text to a cloud translation provider.
- **Offline availability:** Synchronized translation assets remain available for field use without connectivity.
- **Installer separation:** The installer and its API credentials are not required for normal translation operations.
- **Fulcrum-native storage:** Translation assets and cached form content use Fulcrum's existing Reference File and record mechanisms.

The installer requires a Fulcrum API token with sufficient permissions to modify the target application.

API tokens should be handled securely and must not be embedded in deployed translation assets.

Local translation does not eliminate Fulcrum's normal record synchronization or data storage behavior.

## Installation & Deployment Considerations

The installer automates the deployment of required Reference Files, form fields, and Data Events.

Engineering teams should consider the following:

- **Platform isolation:** Android/desktop and iOS use independent translation runtimes and asset-loading mechanisms.
- **Unique filenames:** When installing both platforms, use distinct runtime filenames to avoid Reference File conflicts.
- **Platform detection:** Data Events must load the appropriate runtime for the active platform.
- **Existing Data Events:** Preserve unrelated scripts and application logic when installing or updating Rosetta Stone.
- **Asset versioning:** Use consistent, versioned translation assets to support reproducible deployments.
- **Reference File limits:** Automated Reference File transfers have a 1 GB total size limit. Larger deployments may require manual uploads.
- **Device synchronization:** All required translation assets must be synchronized before offline fieldwork.
- **Form changes:** Updated field labels and choice lists may require cached translations to be regenerated.
- **Translation accuracy:** Avoid translating identifiers, serial numbers, technical codes, or fields that require exact original wording.

### Multi-Platform Installation

When both Android/desktop and iOS are installed in the same Fulcrum application, their runtime files should remain separate.

For example:

```text
translation-runtime-android.js
translation-runtime-ios.js
```

The Data Event selects the appropriate runtime based on the active platform.

This prevents platform-specific translation implementations from interfering with one another.

## Summary

Fulcrum Rosetta Stone extends existing Fulcrum applications using **Data Events, Reference Files, and App Extensions**.

The Node.js installer automates deployment, while Bergamot and WebAssembly perform translation locally.

The result is a multilingual field data collection experience that continues functioning without an internet connection after synchronization.

---

*Fulcrum Rosetta Stone — Technical Architecture, v1.0.*
