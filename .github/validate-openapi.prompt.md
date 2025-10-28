---
description: Run comprehensive validation on reference/rest-api.json using multiple validation tools
---

Run comprehensive validation on `reference/rest-api.json` using multiple validation tools.

Execute these validation checks in order:

1. **VS Code Errors**: Run `get_errors()` to check for VS Code detected errors
2. **OpenAPI Spec Validation**: Run terminal command `cd reference && npx --yes rdme openapi validate rest-api.json`
3. **JSON Syntax**: Validate with Node.js parser
4. **RAW_BODY Anti-patterns**: Search for any remaining RAW_BODY patterns
5. **Internal Component References**: Count `$ref` references using `#/components/schemas/` format
6. **External File References**: Verify no `./components/schemas/*.json` references remain (ReadMe incompatible)
7. **File Metrics**: Report current line count and schema count in components.schemas

Provide a summary report in this format:

```
=== VALIDATION REPORT ===

1. VS Code Errors:              ✅/❌
2. OpenAPI Spec Valid:          ✅/❌
3. JSON Syntax:                 ✅/❌
4. RAW_BODY Count:              0 (✅) / X found (❌)
5. Internal Refs (#/...):       X refs
6. External Refs (./...):       0 (✅) / X found (❌)
7. File Size:                   X lines
8. Schemas in components:       X schemas

Status: PASS ✅ / FAIL ❌
```

**CRITICAL**: If ANY validation fails, stop immediately and report the error details. Do not proceed with other validations until the issue is fixed.

**NOTE**: All schemas MUST be inline in rest-api.json using internal component references (`#/components/schemas/SchemaName`). External file references (`./components/schemas/*.json`) are NOT supported by ReadMe and will render as placeholder objects like "SCHEMA_NAME_OBJECT".
