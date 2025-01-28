---
title: Unique IDs
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
Fulcrum uses unique string identifiers to refer to all system objects. The IDs are opaque strings guaranteed to be unique across your account. They’re opaque in the sense that you should not need to parse them. If you need to persist Fulcrum IDs, it’s best to use a string data type and not a GUID/UUID data type. In addition to being case-sensitive for compatibility reasons, not all Fulcrum IDs are UUIDs. Some older Fulcrum records might have IDs in a different format.
