---
title: Bookmarklet to Copy Your API Token
excerpt: A browser bookmarklet that reads the temporary Fulcrum API token from the page's window object and copies it to your clipboard with one click — handy when testing API calls or writing Data Events scripts.
---

When you're logged into the Fulcrum web application, a short-lived API token is available on the page's `window` object as `token`. This bookmarklet copies it to your clipboard without requiring you to open the developer console.

## Bookmarklet Code

Create a new browser bookmark and set its URL to the following JavaScript URI:

```
javascript:(function(){const tokenStr=token;const input=document.createElement('textarea');input.value=tokenStr;document.body.appendChild(input);input.select();document.execCommand('copy');document.body.removeChild(input)})()
```

## How to Install

1. Right-click your browser's bookmarks bar and select **Add page** (Chrome) or **New Bookmark** (Firefox).
2. Give the bookmark a name like "Copy Fulcrum Token".
3. Paste the JavaScript URI above as the URL.
4. Save.

## How to Use

1. Open any page on `web.fulcrumapp.com` while logged in.
2. Click the bookmarklet.
3. Your API token is now in your clipboard — paste it into Postman, curl, a script, or wherever you need it.

## Notes

**The token is temporary.** It is a session-scoped token tied to your browser session, not your permanent API key. Use it for quick testing and manual API calls. For long-running scripts or automation, use a dedicated API key generated in the Fulcrum Account Settings.

**`document.execCommand('copy')` is deprecated** in modern browsers but remains widely supported for bookmarklet use cases where the Clipboard API (`navigator.clipboard.writeText()`) may not be available without an explicit user gesture in all contexts.

**This only works on `web.fulcrumapp.com`.** The `window.token` variable is set by the Fulcrum web application. Running the bookmarklet on any other domain will produce an error because `token` is undefined.
