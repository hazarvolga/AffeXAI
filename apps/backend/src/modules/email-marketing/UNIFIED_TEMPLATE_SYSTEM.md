# Unified Email Template System

## Overview

The Affexai platform uses a **Unified Template System** that supports both modern database-based templates (JSON/MJML) and legacy file-based templates (HTML) through a single, consistent interface.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│           UnifiedTemplateService (Entry Point)           │
└──────────────┬───────────────────────┬───────────────────┘
               │                       │
       ┌───────▼────────┐     ┌───────▼─────────┐
       │  TemplateService│     │ TemplateFile    │
       │  (Database)     │     │ Service (Files) │
       └───────┬─────────┘     └────────┬────────┘
               │                        │
       ┌───────▼────────┐      ┌────────▼─────────┐
       │  EmailTemplate │      │  HTML Templates  │
       │  (JSONB)       │      │  (*.html files)  │
       └────────────────┘      └──────────────────┘
```

## Strategy Pattern

The `UnifiedTemplateService` uses a **Strategy Pattern** to automatically detect and route template requests:

### Auto-Detection Logic

1. **UUID Pattern** → Database lookup
   ```typescript
   // UUIDs are always database templates
   await unifiedService.getTemplate('550e8400-e29b-41d4-a716-446655440000');
   // → Database (JSON/MJML template)
   ```

2. **Name Lookup** → Database first, then file fallback
   ```typescript
   // Try database by name
   await unifiedService.getTemplate('my-custom-template');
   // → Database (if exists)

   // Fallback to file-based
   await unifiedService.getTemplate('welcome');
   // → File system (if not in database)
   ```

## Template Sources

### 1. Database Templates (Modern)

**Location**: `email_templates` table

**Format**: JSON structure + MJML rendering

**Created By**:
- Email Builder UI (`/admin/email-marketing/templates/builder`)
- Clone API endpoint
- Manual creation via API

**Features**:
- ✅ Visual editing via drag & drop builder
- ✅ 35+ pre-built email blocks
- ✅ MJML rendering (email client compatibility)
- ✅ Version control
- ✅ A/B testing support
- ✅ Full CRUD operations

**Example Structure**:
```json
{
  "id": "uuid",
  "name": "Welcome Email",
  "structure": {
    "rows": [...],
    "settings": {
      "backgroundColor": "#f5f5f5",
      "contentWidth": "600px"
    }
  },
  "compiledHtml": "<html>...</html>",
  "compiledMjml": "<mjml>...</mjml>",
  "isEditable": true
}
```

### 2. File-Based Templates (Legacy)

**Location**: `apps/backend/emails/templates/*.html`

**Format**: Plain HTML with `{{variable}}` placeholders

**Used By**:
- Authentication module (welcome, password-reset)
- Tickets module (ticket-created, ticket-assigned)
- Events module (event-reminder)
- Certificates module (certificate-email)

**Features**:
- ✅ Simple HTML templates
- ✅ Backward compatible
- ✅ Variable interpolation
- ❌ Not editable via UI
- ❌ No version control

## Usage Examples

### Basic Usage

```typescript
import { UnifiedTemplateService } from './services/unified-template.service';

// Inject service
constructor(
  private readonly unifiedTemplateService: UnifiedTemplateService,
) {}

// Get template (auto-detection)
const template = await this.unifiedTemplateService.getTemplate('welcome');

// Render template with data
const result = await this.unifiedTemplateService.renderTemplate('welcome', {
  data: {
    name: 'John Doe',
    email: 'john@example.com',
  },
});

console.log(result.html); // Rendered HTML
console.log(result.source); // 'database' | 'file'
```

### Advanced Usage

```typescript
// Check if template exists
const exists = await this.unifiedTemplateService.exists('my-template');

// Get template source without loading
const source = await this.unifiedTemplateService.getTemplateSource('welcome');
// → TemplateSource.FILE or TemplateSource.DATABASE

// List all templates
const { database, files } = await this.unifiedTemplateService.listAllTemplates();
console.log(`Database templates: ${database.length}`);
console.log(`File templates: ${files.length}`);

// Render with options
const result = await this.unifiedTemplateService.renderTemplate('welcome', {
  data: { name: 'John' },
  interpolate: true, // Enable {{variable}} replacement
});
```

## Migration Guide

### From File-Based to Database Templates

If you want to migrate a file-based template to the database:

```typescript
// 1. Clone from file to database
const newTemplate = await this.templateService.createFromExistingFile(
  'welcome', // File name (without .html)
  'Welcome Email (Custom)', // Optional custom name
);

// 2. Template is now in database and can be edited via UI
// 3. Update your code to use the new template ID or name
await this.unifiedTemplateService.renderTemplate(newTemplate.id, { data });
```

### Maintaining Backward Compatibility

**No changes needed!** The unified system automatically handles both types:

```typescript
// Old code (file-based) - STILL WORKS
await this.unifiedTemplateService.renderTemplate('welcome', { data });

// New code (database) - ALSO WORKS
await this.unifiedTemplateService.renderTemplate(uuid, { data });
```

## Benefits

### ✅ Zero Breaking Changes
All existing file-based templates continue to work without modification.

### ✅ Single Interface
One service for all template operations - no need to choose between `TemplateService` and `TemplateFileService`.

### ✅ Automatic Routing
The system automatically determines template source and renders appropriately.

### ✅ Future-Proof
Easy to migrate templates gradually from files to database.

### ✅ Clean Architecture
Strategy Pattern provides clear separation of concerns.

## Best Practices

### 1. Use Database Templates for New Features
```typescript
// ✅ Good: Create new templates in database
const template = await this.templateService.create({
  name: 'Newsletter',
  structure: { ... },
});
```

### 2. Keep File Templates for System Emails
```typescript
// ✅ Good: Use file templates for critical system emails
await this.unifiedTemplateService.renderTemplate('password-reset', { data });
```

### 3. Use UnifiedTemplateService Everywhere
```typescript
// ✅ Good: Single entry point
await this.unifiedTemplateService.renderTemplate(identifier, options);

// ❌ Bad: Direct service usage
await this.templateFileService.loadTemplate(name);
await this.templateService.findOne(id);
```

### 4. Gradual Migration
```typescript
// 1. Start with high-priority templates
// 2. Test thoroughly
// 3. Update references
// 4. Monitor for issues
// 5. Repeat for next template
```

## API Reference

### UnifiedTemplateService

#### `getTemplate(identifier: string): Promise<UnifiedTemplate>`
Get template with auto-detection (UUID → DB by name → File).

#### `renderTemplate(identifier: string, options?: TemplateRenderOptions): Promise<TemplateRenderResult>`
Render template to HTML with optional variable interpolation.

#### `exists(identifier: string): Promise<boolean>`
Check if template exists in database or files.

#### `getTemplateSource(identifier: string): Promise<TemplateSource>`
Get template source type without loading full template.

#### `listAllTemplates(): Promise<{ database: UnifiedTemplate[]; files: UnifiedTemplate[] }>`
List all available templates from both sources.

## Troubleshooting

### Template Not Found

**Error**: `Template not found in database or files: xxx`

**Solutions**:
1. Check template name/ID is correct
2. Verify template exists in database: `SELECT * FROM email_templates WHERE name = 'xxx'`
3. Check file exists: `ls apps/backend/emails/templates/xxx.html`
4. Review application logs for more details

### Rendering Errors

**Error**: `Failed to render template`

**Solutions**:
1. Check template structure is valid JSON (for database templates)
2. Verify all required variables are provided in `data` parameter
3. Test MJML rendering separately
4. Review stack trace for specific error

### Performance Issues

**Symptoms**: Slow template rendering

**Solutions**:
1. Enable caching for frequently used templates
2. Pre-compile MJML templates
3. Use template preview caching
4. Consider template minification

## Contributing

When adding new templates:

1. **Database Templates**: Use Email Builder UI for best results
2. **File Templates**: Place in `apps/backend/emails/templates/`
3. **Documentation**: Update this file with template purpose
4. **Testing**: Test rendering with sample data
5. **Migration**: Plan migration path to database if needed

## Related Documentation

- [Email Builder UI](../../frontend/src/app/admin/email-marketing/templates/builder/)
- [MJML Renderer](./services/mjml-renderer.service.ts)
- [Template File Service](./services/template-file.service.ts)
- [Block Library](./entities/email-block-library.entity.ts)

---

**Last Updated**: 2025-10-28
**Version**: 1.0.0
**Maintainer**: Affexai Development Team
