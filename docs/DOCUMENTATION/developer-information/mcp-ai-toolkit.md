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

## Overview

Fulcrum MCP is an MCP server that lets any MCP-compatible client (Claude, ChatGPT, Copilot, custom agents, etc.) build and manage Fulcrum apps and query live data.

The Fulcrum AI Toolkit is a library of skills — prompt-level guidance, not a server — that teaches a client Fulcrum's platform conventions (field types, safe automation patterns, what to flag) so it uses the MCP tools correctly. The Toolkit currently does not bundle or configure any MCP server itself; its `mcp.json` is intentionally empty.

The two install and can operate independently, but are meant to be used together.

## Endpoints

One endpoint per region. Use the endpoint that matches your organization's Fulcrum instance, not your physical location — there is no automatic fallback between regions.

| Region | Endpoint |
| --- | --- |
| United States (default) | `https://mcp.fulcrumapp.com` |
| Australia | `https://mcp.fulcrumapp-au.com` |
| Europe | `https://mcp.fulcrumapp-eu.com` |
| Canada | `https://mcp.fulcrumapp-ca.com` |

This is the unified endpoint that exposes both App MCP and Query MCP tools (see [Tools](#tools) below).

## Transport & protocol

Streamable HTTP, JSON-RPC 2.0. Standard MCP lifecycle:

```text
initialize → notifications/initialized → tools/list / tools/call
```

## Auth

Bearer token only — no OAuth yet. Generate an API token from your Fulcrum account.

```http
Authorization: Bearer YOUR_FULCRUM_API_TOKEN
```

Minimal config example:

```json
{
  "mcpServers": {
    "fulcrum": {
      "url": "https://mcp.fulcrumapp.com",
      "headers": { "Authorization": "Bearer YOUR_FULCRUM_API_TOKEN" }
    }
  }
}
```

Two failure modes worth calling out explicitly for implementers:

1. **An invalid or malformed token does not produce a transport-level 401/403.** The HTTP call returns `200 OK`; the failure surfaces inside the JSON-RPC result as `isError: true`, e.g. `{"content":[{"type":"text","text":"fulcrum request failed: HTTP 401"}],"isError":true}`. Check for this — don't assume `200` means success. (A request with *no* `Authorization` header at all does get a clean `401`.)
2. **Immediately after `initialize`, MCP can return a one-time `400 invalid session ID header`.** Retrying the same request with the same session ID succeeds. This is a known backend session-affinity issue on the MCP gateway, not a client bug — implement one retry on this specific error rather than surfacing it to the user.

## Tools

App MCP tools help with building/managing apps (forms, choice lists, webhooks, extensions, report templates, schema, etc.) and are prefixed with `app-mcp_`.
Query MCP tools provide read-only data access, and are prefixed with `query-mcp_`.

Generate a `tools/list` call to view the current complete list.

## AI Toolkit installation

| Client | Install |
| --- | --- |
| Claude Code | `/plugin marketplace add https://github.com/fulcrumapp/fulcrum-ai-toolkit.git`<br>`/plugin install fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| Codex | `codex plugin marketplace add fulcrumapp/fulcrum-ai-toolkit`<br>`codex plugin add fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| GitHub Copilot CLI | `copilot plugin marketplace add fulcrumapp/fulcrum-ai-toolkit`<br>`copilot plugin install fulcrum-ai-toolkit@fulcrum-ai-toolkit` |
| Other MCP-compatible / generic skills loader | `npx skills@latest add https://github.com/fulcrumapp/fulcrum-ai-toolkit/tree/main/plugins/fulcrum-ai-toolkit/skills --skill '*'` |
| Claude Desktop chat / Cowork | Not yet supported — needs account-level skill packaging support. |
| ChatGPT | No direct Toolkit install path yet. Connect MCP only, or use the pre-built Fulcrum Builder Custom GPT. |

The Toolkit contains skills covering the build lifecycle: discovery, field/structure selection, safe automation, data-event patterns, safety-field flagging, and querying data. Full skill list and source: [github.com/fulcrumapp/fulcrum-ai-toolkit](https://github.com/fulcrumapp/fulcrum-ai-toolkit).

## Known limitations (Labs)

| Issue | Behavior | Workaround |
| --- | --- | --- |
| Invalid/malformed token | Returns transport-level `200 OK`; failure is `isError: true` inside the JSON-RPC result, not an HTTP 401/403. | Check `isError` on every `tools/call` response — don't infer success from the HTTP status alone. |
| Post-`initialize` session error | Fulcrum MCP can return a one-time `400 invalid session ID header` on the request immediately after `initialize`. | Retry once with the same session ID. This is a known backend session-affinity issue on the MCP gateway. |
