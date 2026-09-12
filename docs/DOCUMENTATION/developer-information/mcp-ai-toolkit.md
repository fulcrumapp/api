---
title: Fulcrum MCP & AI Toolkit (Labs)
excerpt: >-
  Connect an MCP-compatible client to Fulcrum, and install the AI Toolkit
  skills that teach it how to use the platform correctly.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
> 📘 Status: Labs
>
> Early release, still in progress. No API stability guarantees yet — expect breaking changes as this moves toward general availability. Feedback: product@fulcrumapp.com.

This page is the developer reference for Fulcrum MCP and the Fulcrum AI Toolkit. For a setup walkthrough aimed at non-technical users, see the [Fulcrum MCP & AI Toolkit (Labs)](https://help.fulcrumapp.com/en/articles/16926261-fulcrum-mcp-ai-toolkit-labs) help article.

# Overview

Fulcrum MCP is an MCP server that lets any MCP-compatible client (Claude, ChatGPT, Copilot, custom agents, etc.) build and manage Fulcrum apps and query live data.

The Fulcrum AI Toolkit is a library of skills — prompt-level guidance, not a server — that teaches a client Fulcrum's platform conventions (field types, safe automation patterns, what to flag) so it uses the MCP tools correctly. The Toolkit does not bundle or configure any MCP server itself; its `mcp.json` is intentionally empty.

The two install and operate independently, but are meant to be used together.

# Endpoints

One endpoint per region. Use the endpoint that matches your organization's Fulcrum instance, not your physical location — there is no automatic fallback between regions.

| Region | Endpoint |
|---|---|
| United States (default) | `https://mcp.fulcrumapp.com/mcp` |
| Australia | `https://mcp.fulcrumapp-au.com/mcp` |
| Europe | `https://mcp.fulcrumapp-eu.com/mcp` |
| Canada | `https://mcp.fulcrumapp-ca.com/mcp` |

Use the `/mcp` path specifically. It's the unified endpoint that exposes both App MCP and Query MCP tools (see [Tools](#tools) below).

# Transport & protocol

Streamable HTTP, JSON-RPC 2.0. Standard MCP lifecycle:

```
initialize → notifications/initialized → tools/list / tools/call
```

# Auth

Bearer token only — no OAuth yet. Generate a token from your Fulcrum account settings, then send it on every request:

```
Authorization: Bearer YOUR_FULCRUM_API_TOKEN
```

Minimal config example:

```json
{
  "mcpServers": {
    "fulcrum": {
      "url": "https://mcp.fulcrumapp.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_FULCRUM_API_TOKEN" }
    }
  }
}
```

Two failure modes worth calling out explicitly for implementers:

1. **An invalid or malformed token does not produce a transport-level 401/403.** The HTTP call returns `200 OK`; the failure surfaces inside the JSON-RPC result as `isError: true`, e.g. `{"content":[{"type":"text","text":"fulcrum request failed: HTTP 401"}],"isError":true}`. Check for this — don't assume `200` means success. (A request with *no* `Authorization` header at all does get a clean `401`.)
2. **Immediately after `initialize`, `/mcp` can return a one-time `400 invalid session ID header`.** Retrying the same request with the same session ID succeeds. This is a known backend session-affinity issue on the MCP gateway, not a client bug — implement one retry on this specific error rather than surfacing it to the user.

# Tools

`/mcp` exposes **56 tools across 17 categories**:

- **53 App MCP tools** — building/managing apps (forms, choice lists, webhooks, extensions, report templates, schema, etc.), prefixed `app-mcp_`.
- **3 Query MCP tools** — read-only data access, prefixed `query-mcp_`.

| Category | Tool count |
|---|---|
| forms | 8 |
| choice_lists | 5 |
| classification_sets | 5 |
| projects | 5 |
| report_templates | 5 |
| webhooks | 5 |
| reference_files | 4 |
| expressions | 3 |
| extensions | 3 |
| schema | 3 |
| query-mcp | 3 |
| layers | 2 |
| audit_logs | 1 |
| changesets | 1 |
| memberships | 1 |
| reports | 1 |
| roles | 1 |

> 📘 Generated from a live `tools/list` call
>
> The table below was generated from a live `tools/list` call against `https://mcp.fulcrumapp.com/mcp` on 2026-09-11. Tool names, descriptions, and counts can drift as the server evolves — re-run `tools/list` against your own connection if this page is more than a few weeks old.

## Tool reference

#### Forms

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_forms_create` | Create a new Fulcrum form (app). The elements field must be built using fulcrum_schema_build_form first — do not hand-craft element JSON, as the API requires exact boolean and type-specific attributes that only the builder provides correctly. A default report template is automatically created for the new form unless skip_default_report is true. |
| `app-mcp_fulcrum_forms_delete` | Delete a Fulcrum form by ID. This permanently removes the form and all its records. |
| `app-mcp_fulcrum_forms_get` | Get a single Fulcrum form by ID, including its complete field schema, status field, and metadata. |
| `app-mcp_fulcrum_forms_history` | Get the change history for a Fulcrum form, showing when it was created and modified. |
| `app-mcp_fulcrum_forms_list` | List all Fulcrum forms (apps) in the account. Returns form names, IDs, record counts, and metadata. Use the schema parameter to include field definitions. |
| `app-mcp_fulcrum_forms_schemas_list` | List full Fulcrum form schemas with embedded element references (choice lists and classification sets). Optionally sort by name, created_at, updated_at, or last_record; last_record uses form updated_at as the available activity proxy. Each result includes unmodified schema JSON, sort metadata, and the referenced choice/classification values so callers do not need separate fetches. |
| `app-mcp_fulcrum_forms_update` | Update an existing Fulcrum form. When changing elements, use fulcrum_schema_build_form to construct them — do not hand-craft element JSON. |
| `app-mcp_fulcrum_forms_validate` | Validate a Fulcrum form definition against the schema. Returns validation errors if the form is invalid. Use this before creating or updating forms to catch structural issues early. |

#### Choice Lists

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_choice_lists_create` | Create a new Fulcrum choice list with label/value pairs. |
| `app-mcp_fulcrum_choice_lists_delete` | Delete a Fulcrum choice list by ID. |
| `app-mcp_fulcrum_choice_lists_get` | Get a single Fulcrum choice list by ID, including all choices. |
| `app-mcp_fulcrum_choice_lists_list` | List Fulcrum choice lists. Choice lists are reusable sets of options used by choice fields across multiple forms. |
| `app-mcp_fulcrum_choice_lists_update` | Update an existing Fulcrum choice list. |

#### Classification Sets

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_classification_sets_create` | Create a new Fulcrum classification set with hierarchical items. |
| `app-mcp_fulcrum_classification_sets_delete` | Delete a Fulcrum classification set by ID. |
| `app-mcp_fulcrum_classification_sets_get` | Get a single Fulcrum classification set by ID, including the full hierarchy. |
| `app-mcp_fulcrum_classification_sets_list` | List Fulcrum classification sets. Classification sets are hierarchical taxonomies used by classification fields. |
| `app-mcp_fulcrum_classification_sets_update` | Update an existing Fulcrum classification set. |

#### Projects

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_projects_create` | Create a new Fulcrum project. |
| `app-mcp_fulcrum_projects_delete` | Delete a Fulcrum project by ID. |
| `app-mcp_fulcrum_projects_get` | Get a single Fulcrum project by ID. |
| `app-mcp_fulcrum_projects_list` | List Fulcrum projects. Projects group records across forms for organizational purposes. |
| `app-mcp_fulcrum_projects_update` | Update an existing Fulcrum project. |

#### Report Templates

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_report_templates_create` | Create a Fulcrum report template. Report Builder EJS uses form, record, organization, record.formValues.find('data_name'), RENDER/RENDERVALUES, and uppercase helpers such as FORMATDATE, PHOTOURL, SKETCHURL, SIGNATUREURL, AUDIOURL, VIDEOURL, STATICMAP, QUERY, QUERYVALUE, API, and TOJSON. |
| `app-mcp_fulcrum_report_templates_delete` | Delete a report template by ID. |
| `app-mcp_fulcrum_report_templates_get` | Get a single report template by ID, including its EJS body, header, footer, and CSS. |
| `app-mcp_fulcrum_report_templates_list` | List all report templates in the account. Optionally filter by form_id. |
| `app-mcp_fulcrum_report_templates_update` | Update an existing report template. Use the documented Report Builder runtime: form, record, record.formValues, RENDER/RENDERVALUES, and uppercase helpers. |

#### Webhooks

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_webhooks_create` | Create a new Fulcrum webhook. Webhook URL must be HTTPS. |
| `app-mcp_fulcrum_webhooks_delete` | Delete a Fulcrum webhook by ID. |
| `app-mcp_fulcrum_webhooks_get` | Get a single Fulcrum webhook by ID. |
| `app-mcp_fulcrum_webhooks_list` | List Fulcrum webhooks. |
| `app-mcp_fulcrum_webhooks_update` | Update an existing Fulcrum webhook. |

#### Reference Files

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_reference_files_delete` | Delete a reference file from a Fulcrum form. |
| `app-mcp_fulcrum_reference_files_get` | Get metadata for a single reference file attached to a Fulcrum form. |
| `app-mcp_fulcrum_reference_files_list` | List reference files attached to a Fulcrum form. Reference files are supplementary data files (HTML extensions, CSVs, JSONs, images, etc.) used by Data Events and app extensions. App extensions uploaded as reference files can be opened via OPENEXTENSION('filename.html') and work offline without external hosting. |
| `app-mcp_fulcrum_reference_files_upload` | Upload a reference file to a Fulcrum form. Use this to attach app extension HTML files, CSV lookup tables, JSON configs, or other data files. For PDFs, images, and other binary files, send content_base64 so bytes are preserved. For app extensions: upload the HTML file, then reference it in the Data Event script via OPENEXTENSION('filename.html'). The extension will work offline without external hosting. |

#### Expressions

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_expressions_data_events_reference` | Get the reference for Fulcrum Data Event hooks and JavaScript functions. Data Events are JavaScript scripts that run on record lifecycle events (load, new-record, edit-record, save-record, validate-record, change, etc). Shows available hooks, value manipulation functions (SETVALUE, SETHIDDEN, SETREQUIRED, etc), HTTP functions (REQUEST), and UI functions (ALERT, CONFIRM, OPENEXTENSION). |
| `app-mcp_fulcrum_expressions_explain` | Get detailed documentation for a specific Fulcrum expression function, including parameters, return type, and usage example. |
| `app-mcp_fulcrum_expressions_list_functions` | List Fulcrum calculation expression functions with descriptions, parameters, return types, and examples. These functions are used in CalculatedField expressions. Optionally filter by category. |

#### Extensions

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_extensions_explain` | Get detailed documentation for a specific app extension pattern including use cases, recommended fields, features, and required Data Event hooks. |
| `app-mcp_fulcrum_extensions_generate` | Generate a complete app extension from a pattern. Returns three artifacts: (1) Data Event JavaScript to wire up the extension, (2) HTML template for the extension UI, and (3) setup instructions. IMPORTANT for picker pattern: the extension REPLACES native pickers — store results in a TextField (not a ChoiceField). The extension IS the picker UI. Use a HyperlinkField as the trigger button and ON('click') to open the extension. By default, extensions are designed to be uploaded as reference files via fulcrum_reference_files_upload — this makes them self-contained and available offline with no external hosting. Optionally provide extension_url to host externally instead. |
| `app-mcp_fulcrum_extensions_list_patterns` | List available Fulcrum app extension patterns. Extensions are custom HTML views opened via OPENEXTENSION() in Data Events. Patterns include: picker (lookup/search), editor (rich editing), visualization (charts/maps), input (device/sensor), integration (backend sync). |

#### Schema

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_schema_build_field` | Build a valid Fulcrum field element from a high-level description. Generates a properly structured field with a unique key, required booleans, and type-specific defaults (e.g. display object for CalculatedField). Use this to construct individual fields before assembling them into fulcrum_schema_build_form. |
| `app-mcp_fulcrum_schema_build_form` | Build a complete, API-ready Fulcrum form payload. Generates unique keys and all required attributes (hidden, disabled, required, display) for every field. Always use this to produce elements for fulcrum_forms_create — never hand-craft the JSON directly, as the API will reject incomplete fields. |
| `app-mcp_fulcrum_schema_field_types` | List all Fulcrum field types with their properties and validation rules. Optionally filter by category (text, choice, media, datetime, layout, location, computed, relationship). Use this before creating or modifying forms to understand available field types. |

#### Query MCP (read-only, exclusive to `/mcp`)

| Tool | Description |
|---|---|
| `query-mcp_form_summaries` | List the Fulcrum forms available to the current user. |
| `query-mcp_get_form_query_tables` | Get the Query table definitions for a Fulcrum form. |
| `query-mcp_query_records` | Run a read-only, single-line SQL query against collected Fulcrum records. Newlines are not supported. |

#### Layers

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_layers_get` | Get a single Fulcrum map layer by ID. |
| `app-mcp_fulcrum_layers_list` | List Fulcrum map layers. |

#### Audit Logs

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_audit_logs_list` | List audit log entries showing who performed what actions in the organization. |

#### Changesets

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_changesets_list` | List changesets (batches of record creates/updates/deletes). Optionally filter by form_id. |

#### Memberships

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_memberships_list` | List organization members. Useful for finding member IDs for record assignment and understanding team structure. |

#### Reports

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_reports_create` | Generate/run a PDF report for a Fulcrum record. Pass record_id and optionally template_id; the response includes state and a download URL when available. |

#### Roles

| Tool | Description |
|---|---|
| `app-mcp_fulcrum_roles_list` | List organization roles and their permissions. Useful for understanding what actions members can perform. |

# AI Toolkit installation

| Client | Install |
|---|---|
| Claude Code | `/plugin marketplace add https://github.com/fulcrumapp/fulcrum-ai-toolkit.git`<br>`/plugin install fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| Codex | `codex plugin marketplace add fulcrumapp/fulcrum-ai-toolkit`<br>`codex plugin add fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| GitHub Copilot CLI | `copilot plugin marketplace add fulcrumapp/fulcrum-ai-toolkit`<br>`copilot plugin install fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| Other MCP-compatible / generic skills loader | `npx skills@latest add https://github.com/fulcrumapp/fulcrum-ai-toolkit/tree/main/plugins/fulcrum-ai-toolkit/skills --skill '*'` |
| Claude Desktop chat / Cowork | Not yet supported — needs account-level skill packaging support. |
| ChatGPT | No direct Toolkit install path yet. Connect MCP only, or use the pre-built Fulcrum Builder Custom GPT. |

The Toolkit ships 16 skills covering the build lifecycle: discovery, field/structure selection, safe automation, data-event patterns, safety-field flagging, and querying data correctly. Full skill list and source: [github.com/fulcrumapp/fulcrum-ai-toolkit](https://github.com/fulcrumapp/fulcrum-ai-toolkit).

# Known limitations (Labs)

| Issue | Behavior | Workaround |
|---|---|---|
| Invalid/malformed token | Returns transport-level `200 OK`; failure is `isError: true` inside the JSON-RPC result, not an HTTP 401/403. | Check `isError` on every `tools/call` response — don't infer success from the HTTP status alone. |
| Post-`initialize` session error | `/mcp` can return a one-time `400 invalid session ID header` on the request immediately after `initialize`. | Retry once with the same session ID. Known backend session-affinity issue on the MCP gateway, not a client bug. |
