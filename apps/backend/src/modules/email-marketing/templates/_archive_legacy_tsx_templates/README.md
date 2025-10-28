# Legacy TSX Email Templates Archive

## ⚠️ DEPRECATED - For Reference Only

This folder contains the **legacy file-based TSX React Email templates** that were used before migrating to the **Database-Only + MJML** architecture.

## Migration Details

**Migration Date**: October 28-29, 2025
**Migrated By**: Claude Code
**Migration Status**: ✅ Complete

### What Happened?

All 20 TSX templates in this folder have been successfully migrated to the database with MJML-compatible Email Builder structures.

**Before**: Dual system (Database + File-based TSX templates)
**After**: Database-only with Email Builder structures

### Migration Results

- ✅ **20/20 templates** successfully migrated to database
- ✅ All templates converted to Email Builder structure format
- ✅ Templates now editable via visual Email Builder
- ✅ MJML rendering for better email client compatibility
- ✅ File-based template system completely removed from codebase

### Archived Templates

1. abandoned-cart.tsx
2. back-in-stock.tsx
3. birthday-special.tsx
4. cross-sell.tsx
5. flash-sale.tsx
6. loyalty-program.tsx
7. monthly-newsletter.tsx
8. new-feature-announcement.tsx
9. price-drop-alert.tsx
10. product-launch.tsx
11. product-recommendation.tsx
12. product-update.tsx
13. re-engagement.tsx
14. referral-program.tsx
15. seasonal-campaign.tsx
16. survey-feedback.tsx
17. upsell.tsx
18. weekly-digest.tsx
19. welcome-email.tsx
20. win-back.tsx

### Why Keep These Files?

These files are kept for **reference purposes only**:
- Design inspiration for new templates
- Variable mapping reference
- Content structure examples
- Historical reference

### How to Use Database Templates

All templates are now managed through:

**Backend API**:
```
GET    /api/email-templates          - List all templates
GET    /api/email-templates/:id      - Get template details
POST   /api/email-templates          - Create new template
PATCH  /api/email-templates/:id      - Update template
DELETE /api/email-templates/:id      - Delete template
GET    /api/email-templates/:id/preview - Preview with settings
```

**Frontend Email Builder**:
- Visual drag-and-drop editor
- MJML-powered responsive design
- Real-time preview
- Block-based composition
- Template variables support

### Database Schema

Templates are stored in `email_templates` table with:
- `structure` (JSONB): Email Builder block structure
- `compiledHtml` (TEXT): Pre-compiled HTML
- `content` (TEXT, nullable): Legacy HTML content
- `variables` (JSONB): Template variables
- `thumbnailUrl` (VARCHAR): Preview image
- `isActive` (BOOLEAN): Active status

### Removed Code

As part of the migration, the following were removed:
- ❌ `TemplateFileService` (deleted)
- ❌ `template-file.service.ts` (deleted)
- ❌ File-based fallback logic in `UnifiedTemplateService`
- ❌ `getTemplatesWithFiles()` method
- ❌ `createFromExistingFile()` method
- ❌ `from-file/:fileTemplateName` endpoint

### Benefits of New Architecture

✅ **Industry Standard**: Matches Mailchimp, SendGrid, Brevo architecture
✅ **Better UX**: Visual editor instead of code editing
✅ **MJML Support**: Better Outlook compatibility
✅ **Responsive**: Mobile-first responsive design
✅ **Version Control**: Database-backed versioning
✅ **Performance**: Pre-compiled HTML
✅ **Maintainability**: Single source of truth (database)

---

**⚠️ DO NOT USE THESE FILES IN PRODUCTION**

These templates are for reference only and are not used by the application.
All email templates are now loaded from the database.

---

*Generated with [Claude Code](https://claude.com/claude-code)*
