
---
title: Quick Start & User Guide
excerpt: Learn how to install Fulcrum Rosetta Stone and translate Fulcrum forms into multiple languages while working offline.
deprecated: false
hidden: false
metadata:
  title: Fulcrum Rosetta Stone - Quick Start & User Guide
  description: Step-by-step instructions for installing and using offline multilingual translation in Fulcrum.
  robots: index
next:
  description: ''
---

Fulcrum Rosetta Stone adds offline multilingual translation to existing Fulcrum applications. Translate form labels, choice lists, and supported text fields without an internet connection.

**Audience:** Administrators and field users
**Reading time:** ~2 minutes

## Before You Begin

You'll need:

- A Fulcrum account with access to the application.
- A Fulcrum API token with appropriate permissions.
- Access to the Fulcrum Rosetta Stone installer.
- An internet connection for installation and initial synchronization.

**Get your API token:** Sign in to Fulcrum, open your account settings, and locate the API token section. Create or copy your token according to your organization's permissions and security policies.

Keep your API token private.

## Install Rosetta Stone

1. Open the Rosetta Stone installer.
2. Select your Fulcrum region: **US, EU, or AU**.
3. Enter your Fulcrum API token and connect.
4. Select the Fulcrum application you want to translate.
5. Choose your languages: English, Spanish, French, Polish, or Slovak.
6. Select **Android/Desktop**, **iOS**, or both.
7. Review the required form fields and installation changes.
8. Click **Install**.

After installation, synchronize the Fulcrum mobile application while online.

That's it! Your selected language packages are available for offline use once synchronization is complete.

## For Field Users: Translate a Form

1. Open a record in Fulcrum.
2. Select your preferred language from the **Language** dropdown.
3. Tap **Translate Form**.
4. Wait for translation to complete.
5. Continue your inspection in the selected language.

Translation runs locally on your device.

**Tip:** Select your preferred language before beginning data entry.

## Best Practices

- **Start with English.** Rosetta Stone currently assumes English is the original form language. Build and maintain your form in English, then translate into the selected languages.
- **Avoid repeated translations.** Switching entered text through several languages can gradually change its meaning.
- **Use choice lists.** Single-choice and multiple-choice fields work well for standardized multilingual responses.
- **Preserve important notes.** Exclude fields containing text that must remain exactly as entered.
- **Keep labels clear.** Descriptive field labels produce better translations than ambiguous abbreviations.
- **Sync before fieldwork.** Test your required languages before going offline.

For example, translating English → Spanish directly is generally preferable to repeatedly translating English → French → Spanish.

## Known Limitations

| Limitation | What to know |
|---|---|
| Native Yes/No fields | Not supported. Use single-choice fields with Yes/No options instead. |
| Languages | Supports English, Spanish, French, Polish, and Slovak. |
| Machine translation | Technical and safety-critical terminology should be reviewed. |
| Initial setup | Requires internet access to install and synchronize translation assets. |
| Text translation | Repeatedly translating entered text may alter its original meaning. |
| File transfer size | Automated Fulcrum Reference File transfers have a 1 GB total size limit. Language packages exceeding this limit may require manual uploads. |

## Administrator Tips

Install only the languages your team needs. Use stable field data names and stored choice values, and test translations on your team's actual devices.

### Understanding Stored Choice Values

Rosetta Stone translates the choice labels displayed to users, **not the underlying stored choice values**. This ensures existing calculations, Data Events, and integrations continue using the same values regardless of the selected language.

**Example:**

| Display label (translated) | Stored value (unchanged) |
|---|---|
| Apple | `apple` |
| Pole | `pole` |

If "Apple" is translated into Spanish as "Manzana," the stored value remains `apple`.

**Best practice:** Always reference stored choice values in calculations and Data Events rather than displayed labels.

After changing a form, rerun translation if previously cached labels are outdated.

**Need help?** If translation fails, verify that the device has synchronized and that the correct platform and language packages were installed.

---

*Fulcrum Rosetta Stone — Offline translation for multilingual field teams.*
