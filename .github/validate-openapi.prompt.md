---
description: Run comprehensive validation on reference/rest-api.json using multiple validation tools
---

Run comprehensive validation on `reference/rest-api.json` using multiple validation tools.

Execute these validation checks in order:

1. **VS Code Errors**: Run `get_errors()` to check for VS Code detected errors
2. **OpenAPI Spec Validation**: Run terminal command `cd reference && npx --yes rdme openapi validate rest-api.json`
3. **JSON Syntax**: Validate with Node.js parser
4. **RAW_BODY Anti-patterns**: Search for any remaining RAW_BODY patterns
5. **External References**: Count `$ref` references to components/schemas
6. **Schema Files**: Verify all external schema files exist
7. **File Metrics**: Report current line count and reduction from baseline (12,154 lines)

Provide a summary report in this format:

```
=== VALIDATION REPORT ===

1. VS Code Errors:        ✅/❌
2. OpenAPI Spec Valid:    ✅/❌
3. JSON Syntax:           ✅/❌
4. RAW_BODY Count:        0 (✅) / X found (❌)
5. External References:   X refs
6. Schema Files:          X files
7. File Size:             X lines (Y% reduction)

Status: PASS ✅ / FAIL ❌
```

**CRITICAL**: If ANY validation fails, stop immediately and report the error details. Do not proceed with other validations until the issue is fixed.
