# Agent Instructions for API Documentation

## Critical Rules for Working with OpenAPI and JSON Schema Files

### ALWAYS Validate After Changes

**MANDATORY**: After making ANY changes to the following files, you MUST validate them:

- `reference/rest-api.json` (OpenAPI specification)
- `reference/components/schemas/*.json` (JSON schema files)

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

#### 2. Validate JSON Schema Files

After editing any schema file in `reference/components/schemas/`, ALWAYS:

- Use `get_errors` to check for JSON syntax errors
- Verify the schema is valid JSON with Node.js parser
- Ensure all `$ref` references point to existing files
- Confirm schema follows OpenAPI 3.1.0 specification

### Common Issues to Avoid

1. **RAW_BODY Anti-Pattern**: Never use `RAW_BODY` properties with inline JSON strings
   - ❌ BAD: `"RAW_BODY": { "type": "string", "default": "{...huge json...}" }`
   - ✅ GOOD: `"$ref": "./components/schemas/SchemaName.json"`

2. **Duplicate Keys**: Ensure no duplicate property names in JSON objects

3. **Missing Commas**: Check for proper comma placement in JSON arrays and objects

4. **Unclosed Brackets**: Verify all `{`, `[`, `(` have matching closing characters

5. **Invalid References**: All `$ref` paths must point to existing schema files

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
printf "\n3. External References:\n" && grep -c "\$ref.*components/schemas" reference/rest-api.json && \
printf "\n4. RAW_BODY Check:\n" && (grep -c "RAW_BODY" reference/rest-api.json 2>/dev/null || echo "0 - None found ✅") && \
printf "\n5. Schema Files:\n" && ls reference/components/schemas/*.json | wc -l && \
printf "\n6. VS Code Errors:\n" && echo "Run get_errors() to check"
```

### Schema Organization

- **Prefer external schemas**: Always externalize schemas to `reference/components/schemas/` to reduce file size
- **External schemas**: Keep ALL reusable schemas in `reference/components/schemas/`
- **Schema naming**: Use PascalCase for schema file names (e.g., `ReportTemplateRequest.json`)
- **Schema references**: Use relative paths in `$ref` (e.g., `./components/schemas/SchemaName.json`)
- **Inline schemas**: Avoid inline schemas in rest-api.json - externalize them to keep the main file manageable

### Testing Changes

Before committing:

1. Validate the OpenAPI document passes without errors
2. Check that all `$ref` links resolve correctly
3. Verify request/response examples are consistent with schemas
4. Test any changed endpoints have proper documentation

### Example: Replacing RAW_BODY with Proper Schema

```javascript
// BEFORE (❌ Anti-pattern)
"requestBody": {
  "content": {
    "application/json": {
      "schema": {
        "type": "object",
        "properties": {
          "RAW_BODY": {
            "type": "string",
            "default": "{...}"
          }
        }
      }
    }
  }
}

// AFTER (✅ Correct)
"requestBody": {
  "content": {
    "application/json": {
      "schema": {
        "$ref": "./components/schemas/RequestSchemaName.json"
      }
    }
  }
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

- [ ] All JSON files are valid (no syntax errors)
- [ ] OpenAPI spec validates without errors
- [ ] No RAW_BODY anti-patterns remain
- [ ] All `$ref` references are valid
- [ ] Request/response schemas are properly externalized
- [ ] Changes are documented clearly

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
