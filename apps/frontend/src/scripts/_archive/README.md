# Migration Scripts Archive

## migrate-tsx-to-db.ts

**Purpose**: One-time migration script to convert 20 file-based TSX React Email templates to database records with MJML Email Builder structures.

**Execution Date**: October 28-29, 2025

**Status**: ✅ Completed Successfully

### Migration Results

- **Templates Migrated**: 20/20 (100% success rate)
- **Database Records Created**: 20 new templates
- **Total Templates in DB**: 28 (8 existing + 20 new)

### What This Script Did

1. **Inventory**: Listed all 20 TSX template files with metadata
2. **Structure Generation**: Created Email Builder structures using `generateSmartStructure()`
3. **API Calls**: Created database records via `POST /api/email-templates`
4. **Verification**: Confirmed all templates were successfully migrated

### Templates Migrated

1. Abandoned Cart
2. Back in Stock
3. Birthday Special
4. Cross-Sell
5. Flash Sale
6. Loyalty Program
7. Monthly Newsletter
8. New Feature Announcement
9. Price Drop Alert
10. Product Launch
11. Product Recommendation
12. Product Update
13. Re-engagement
14. Referral Program
15. Seasonal Campaign
16. Survey Feedback
17. Upsell
18. Weekly Digest
19. Welcome Email
20. Win-Back

### Migration Architecture

**Before**:
- Dual system (Database + File-based TSX templates)
- Templates loaded from files with TemplateFileService
- Limited editing capabilities

**After**:
- Database-only architecture
- Email Builder structures with MJML rendering
- Visual drag-and-drop editing
- Better email client compatibility

### Script Usage (Historical Reference Only)

```bash
# This script was run once and should NOT be run again
cd apps/frontend
npx tsx src/scripts/migrate-tsx-to-db.ts
```

### Why Archived?

This script was a **one-time migration tool** and is no longer needed because:
- ✅ Migration completed successfully
- ✅ All templates now in database
- ✅ File-based system removed
- ✅ No future migrations planned

The script is kept for:
- Historical reference
- Understanding the migration process
- Future similar migration needs

---

*Generated with [Claude Code](https://claude.com/claude-code)*
