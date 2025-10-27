# API Documentation

## Validate OpenAPI Specification

### Using Copilot (Recommended)

The easiest way to run comprehensive validation is using GitHub Copilot:

```text
@workspace /validate-openapi
```

This runs 7 validation checks including:

- VS Code error detection
- OpenAPI spec validation (rdme)
- JSON syntax validation
- RAW_BODY anti-pattern detection
- External schema reference verification
- File metrics and reduction tracking

### Manual Validation

#### OpenAPI Spec Validation (rdme)

```bash
cd reference
npx --yes rdme openapi validate rest-api.json
```

#### Legacy swagger-cli

```bash
cd reference
swagger-cli validate rest-api.json
```

#### Complete Validation Script

```bash
# Combined validation report
printf "=== VALIDATION REPORT ===\n\n" && \
printf "1. File Size:\n" && wc -l reference/rest-api.json && \
printf "\n2. OpenAPI Spec:\n" && cd reference && npx --yes rdme openapi validate rest-api.json && cd .. && \
printf "\n3. JSON Syntax:\n" && node -e "const fs = require('fs'); try { JSON.parse(fs.readFileSync('reference/rest-api.json', 'utf-8')); console.log('✅ Valid JSON'); } catch(e) { console.log('❌ Invalid:', e.message); }" && \
printf "\n4. External References:\n" && grep -c "\$ref.*components/schemas" reference/rest-api.json && \
printf "\n5. RAW_BODY Check:\n" && (grep -c "RAW_BODY" reference/rest-api.json 2>/dev/null || echo "0 - None found ✅") && \
printf "\n6. Schema Files:\n" && ls reference/components/schemas/*.json | wc -l
```

## Documentation Guidelines

See [AGENTS.md](./AGENTS.md) for detailed instructions on:

- Working with OpenAPI and JSON Schema files
- Validation requirements
- Schema organization best practices
- Common issues to avoid
