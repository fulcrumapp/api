# Agent Instructions for API Documentation

## Critical Rules for Working with OpenAPI and JSON Schema Files

### ALWAYS Validate After Changes

**MANDATORY**: After making ANY changes to the following file, you MUST validate it:

- `reference/rest-api.json` (OpenAPI specification with all schemas inline)

### Validation Steps

**CRITICAL**: You MUST validate after EVERY change. No exceptions.

#### 1. Validate OpenAPI Document

After editing `reference/rest-api.json`, run ALL of these validations:

```bash
# 1. VS Code built-in validation (catches OpenAPI spec errors)
get_errors(filePaths=["/Users/trey/code/api/reference/rest-api.json"])

# 2. OpenAPI specification validation (rdme - REQUIRED)
cd reference && npx --yes rdme openapi validate rest-api.json

# 3. JSON syntax validation (Node.js parser)
node -e "const fs = require('fs'); try { JSON.parse(fs.readFileSync('reference/rest-api.json', 'utf-8')); console.log('✅ Valid JSON'); } catch(e) { console.log('❌ Invalid JSON:', e.message); }"

# 4. Check for RAW_BODY anti-patterns
grep -c "RAW_BODY" reference/rest-api.json || echo "0 (None - Good!)"

# 5. Verify file size reduction (if applicable)
wc -l reference/rest-api.json
```

#### 2. Schema References

**CRITICAL**: All schemas are defined inline within `rest-api.json` under `components.schemas`.

- Use **internal component references**: `"$ref": "#/components/schemas/SchemaName"`
- **NEVER use external file references**: `"$ref": "./components/schemas/SchemaName.json"`
- ReadMe's sync service does NOT support external file references
- External references will render as placeholder objects (e.g., "SCHEMA_NAME_OBJECT")

### Common Issues to Avoid

1. **External File References**: ReadMe does NOT support external schema files
   - ❌ BAD: `"$ref": "./components/schemas/SchemaName.json"`
   - ✅ GOOD: `"$ref": "#/components/schemas/SchemaName"`
   - External refs render as placeholder objects like "SCHEMA_NAME_OBJECT" in ReadMe UI

2. **RAW_BODY Anti-Pattern**: Never use `RAW_BODY` properties with inline JSON strings
   - ❌ BAD: `"RAW_BODY": { "type": "string", "default": "{...huge json...}" }`
   - ✅ GOOD: Define schema in `components.schemas` and reference with `#/components/schemas/SchemaName`

3. **Duplicate Keys**: Ensure no duplicate property names in JSON objects

4. **Missing Commas**: Check for proper comma placement in JSON arrays and objects

5. **Unclosed Brackets**: Verify all `{`, `[`, `(` have matching closing characters

6. **Invalid Internal References**: All `$ref` paths must point to schemas defined in `components.schemas`

### Workflow for Editing

1. **Before editing**: Read the current file content
2. **Make changes**: Use `replace_string_in_file` or `multi_replace_string_in_file`
3. **Validate IMMEDIATELY**: Run ALL validation commands (see Validation Steps above)
4. **Fix any errors**: If validation fails, fix issues before proceeding - DO NOT continue with other changes
5. **Run comprehensive validation**: Use the validation prompt (see below) before considering work complete
6. **Document changes**: Note what was changed and why

### Comprehensive Validation Command

Use this multi-tool validation approach after completing any changes:

```bash
# Combined validation report
printf "=== VALIDATION REPORT ===\n\n" && \
printf "1. File Size:\n" && wc -l reference/rest-api.json && \
printf "\n2. JSON Syntax:\n" && node -e "const fs = require('fs'); try { JSON.parse(fs.readFileSync('reference/rest-api.json', 'utf-8')); console.log('✅ Valid JSON'); } catch(e) { console.log('❌ Invalid:', e.message); }" && \
printf "\n3. Internal Component References:\n" && grep -c '"#/components/schemas/' reference/rest-api.json && \
printf "\n4. External References (should be 0):\n" && (grep -c '"\./components/schemas' reference/rest-api.json 2>/dev/null || echo "0 - None found ✅") && \
printf "\n5. RAW_BODY Check:\n" && (grep -c "RAW_BODY" reference/rest-api.json 2>/dev/null || echo "0 - None found ✅") && \
printf "\n6. VS Code Errors:\n" && echo "Run get_errors() to check"
```

### Schema Organization

**CRITICAL - ReadMe Limitation**: All schemas MUST be defined inline within `rest-api.json`.

- **All schemas inline**: Define ALL reusable schemas under `components.schemas` in `rest-api.json`
- **Schema naming**: Use PascalCase for schema names (e.g., `ReportTemplateRequest`, `RecordRequest`)
- **Schema references**: Use internal JSON pointers: `"$ref": "#/components/schemas/SchemaName"`
- **No external files**: ReadMe sync does NOT support external `.json` schema files
- **Why inline?**: ReadMe's documentation renderer cannot resolve external file references
  - External refs like `./components/schemas/SchemaName.json` will render as "SCHEMA_NAME_OBJECT"
  - This breaks API documentation display for users
- **File size trade-off**: We accept a larger `rest-api.json` (~10,000+ lines) for proper ReadMe rendering

### Testing Changes

Before committing:

1. Validate the OpenAPI document passes without errors
2. Verify all `$ref` paths use internal component references (`#/components/schemas/...`)
3. Confirm no external file references remain (`./components/schemas/...`)
4. Verify request/response examples are consistent with schemas
5. Test any changed endpoints have proper documentation
6. If possible, sync to ReadMe and verify schemas render correctly (not as placeholder objects)

### Example: Proper Schema Definition and Reference

```javascript
// Step 1: Define schema in components.schemas section (top of rest-api.json)
{
  "openapi": "3.1.0",
  "components": {
    "schemas": {
      "RequestSchemaName": {
        "type": "object",
        "required": ["field1"],
        "properties": {
          "field1": {
            "type": "string",
            "description": "Description of field1"
          },
          "field2": {
            "type": "number"
          }
        }
      }
    }
  }
}

// Step 2: Reference using internal component pointer in endpoint
"requestBody": {
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/RequestSchemaName"  // ✅ Internal reference
      }
    }
  }
}

// ❌ WRONG - External file reference (ReadMe won't render)
"schema": {
  "$ref": "./components/schemas/RequestSchemaName.json"
}
```

### Error Resolution

If validation fails:

1. Read the error message carefully
2. Identify the line number and issue
3. Read surrounding context (5-10 lines before/after)
4. Fix the specific issue
5. Re-validate
6. Repeat until all errors are resolved

### Quality Checklist

Before considering work complete:

- [ ] `rest-api.json` is valid JSON (no syntax errors)
- [ ] OpenAPI spec validates without errors (`npx rdme openapi validate`)
- [ ] No RAW_BODY anti-patterns remain
- [ ] All `$ref` references use internal component format (`#/components/schemas/...`)
- [ ] No external file references remain (`./components/schemas/...`)
- [ ] All schemas are defined in `components.schemas` section
- [ ] Changes are documented clearly
- [ ] ReadMe rendering verified (if possible)

## Notes for AI Agents

- **Never skip validation**: Even small changes can break JSON structure
- **Use multi_replace_string_in_file**: When making multiple changes to reduce tool calls
- **Include sufficient context**: When using replace_string_in_file, include 3-5 lines before/after
- **Fix errors immediately**: Don't proceed with other work if validation fails
- **Read before writing**: Always read file content before making changes to understand structure

---

## Copilot Prompt File

### Comprehensive Validation: `/validate-openapi`

**File:** `.github/validate-openapi.prompt.md`

Run comprehensive validation on reference/rest-api.json using multiple validation tools:

- VS Code error detection
- OpenAPI specification validation (rdme)
- JSON syntax validation
- RAW_BODY anti-pattern search
- External schema reference count
- Schema file verification
- File size metrics and reduction tracking

**Usage in Copilot Chat:**

```text
@workspace /validate-openapi
```

This will run all validation checks and provide a detailed ✅/❌ report.
