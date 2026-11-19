
---
title: Release Notes & Compatibility
excerpt: Fulcrum Rosetta Stone v1.0 introduces offline multilingual translation for Android, iOS, and desktop/web, supporting five languages.
deprecated: false
hidden: false
metadata:
  title: Fulcrum Rosetta Stone - Release Notes & Compatibility
  description: Version 1.0 release notes, supported languages, platform compatibility, features, and known limitations.
  robots: index
next:
  description: ''
---

Fulcrum Rosetta Stone introduces offline multilingual translation for existing Fulcrum applications, allowing field teams to work in their preferred language without an active internet connection.

**Version:** 1.0
**Release:** November 2026
**Reading time:** ~1 minute

## What's New in v1.0

Rosetta Stone uses Bergamot neural machine translation and WebAssembly to translate supported form content locally.

**Key features:**

- **Offline translation:** Translate forms without an internet connection after initial synchronization.
- **Multilingual forms:** Support for English, Spanish, French, Polish, and Slovak.
- **Form translation:** Translate supported field labels, single-choice and multiple-choice labels, and text values.
- **Repeatable fields:** Translate supported text values within repeatable sections.
- **Translation caching:** Restore previously translated interface labels when reopening records.
- **Automated installation:** Deploy translation assets, form fields, and Data Events using the Rosetta Stone installer.
- **Cross-platform compatibility:** Independent translation packages for Android/desktop and iOS.
- **Choice value preservation:** Translate displayed choice labels without modifying underlying stored values used by calculations and Data Events.

## Supported Languages

| Language | Code |
|---|---|
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| Polish | `pl` |
| Slovak | `sk` |

All five languages are supported on Android, iOS, and desktop/web.

On iOS, translations between two non-English languages automatically route through English.

For example:

```text
Spanish → English → Polish
```

## Platform Compatibility

| Platform | Status |
|---|---|
| Android | Supported |
| iPhone / iPad (iOS) | Supported |
| Fulcrum Desktop/Web | Supported |

Initial installation and mobile synchronization require internet connectivity.

Once the required language packages are synchronized, translation runs locally without an active internet connection.

## Known Limitations

| Limitation | Details |
|---|---|
| Native Yes/No fields | Not currently supported for translation. Use a Single Choice field with Yes/No options instead. |
| Language availability | Limited to English, Spanish, French, Polish, and Slovak. |
| Translation accuracy | Machine-generated translations may require review for technical, regulatory, or safety-critical terminology. |
| Translation order | Repeatedly translating entered text through several languages can change its meaning. Prefer translating from the original English content. |
| Initial connectivity | Installation and initial synchronization require an internet connection. |
| Reference File transfer size | Automated Reference File transfers have a 1 GB total size limit. Larger language package deployments may require manual uploads. |

## Recommended Use

Rosetta Stone is designed for multilingual Fulcrum workflows, including:

- Field inspections and surveys.
- Asset inventories.
- Maintenance and work order forms.
- Environmental data collection.
- Utility and infrastructure inspections.
- Other structured field data collection workflows.

For the best experience, use clear field labels, stable stored choice values, and standardized terminology.

**Important:** Rosetta Stone translates choice labels but does not modify their stored values, preserving compatibility with existing calculations, Data Events, and integrations.

## Deployment

Administrators install Rosetta Stone through the dedicated installer.

1. Select the Fulcrum region and connect using an API token.
2. Choose the target Fulcrum application.
3. Select the required languages and platforms.
4. Review the installation changes.
5. Install and synchronize the application.

After synchronization, field users can select their preferred language and translate forms directly within Fulcrum.

For additional information:

- [Quick Start & User Guide](quick-start.md)
- [Technical Architecture](technical-architecture.md)

---

*Fulcrum Rosetta Stone — Release 1.0, November 2026.*
