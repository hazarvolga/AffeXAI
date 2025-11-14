# Homepage Migration Guide

**Status**: ✅ Migration Script Ready
**Date**: 2025-11-11
**Task**: Migrate hardcoded homepage from `(public-backup)` to CMS

## 📋 Overview

This guide documents the migration of the hardcoded homepage to the CMS system while preserving the original CSS/typography styling that the user emphasized as "stable and balanced" (kararlı ve dengeli).

## 🎯 Key Requirements

1. **Preserve CSS/Typography**: Maintain all original typography classes, especially:
   - `font-headline` - Used for all major headings
   - `text-3xl font-bold tracking-tight sm:text-4xl` - Consistent heading sizes
   - `py-16 md:py-24` - Consistent section spacing
   - `bg-fixed bg-cover bg-center` - Parallax effect classes

2. **Structure Preservation**: Keep the original layout flow:
   - Hero Section → Certificate → Solutions → Products (parallax) → Education (parallax) → Resources (parallax) → Why Aluplan → Workflow → Newsletter

## 📝 Migration Script

**Location**: [`apps/backend/src/database/seeds/migrate-public-pages.seed.ts`](../apps/backend/src/database/seeds/migrate-public-pages.seed.ts)

**Updated**: The homepage section (lines 34-269) has been completely rewritten to include:
- 12 CMS blocks (increased from 3)
- Preserved CSS classes via `cssClasses` property
- Typography properties (`titleVariant`, `titleAlign`, `titleColor`, `titleWeight`)
- Custom background styling

### Homepage Structure (12 Blocks)

| Order | Block Type | Block ID | Purpose |
|-------|-----------|----------|---------|
| 0 | Hero | `hero-with-image-and-text-overlay` | Main hero with CTA |
| 1 | CTA | `content-with-call-to-action` | Certificate verification |
| 2 | Content | `content-section-with-title` | Solutions intro |
| 3 | Parallax | `hero-with-background-image` | Products spacer |
| 4 | Content | `content-section-with-title` | Products intro |
| 5 | Parallax | `hero-with-background-image` | Education spacer |
| 6 | Content | `content-section-with-title` | Education intro |
| 7 | Parallax | `hero-with-background-image` | Resources spacer |
| 8 | Content | `content-section-with-title` | Resources intro |
| 9 | Two-Column | `content-with-image-two-column` | Why Aluplan |
| 10 | Content | `content-section-with-title` | Workflow overview |
| 11 | Newsletter | `newsletter-signup-form` | Email signup |

## ⚠️ Known Issues

### Seed Script Execution Error

The seed script (`npm run seed:migrate-pages`) encounters TypeORM/TypeScript decorator errors:

```bash
ColumnTypeUndefinedError: Column type for Role#name is not defined
```

**Root Cause**: `tsx` runner doesn't properly handle `reflect-metadata` for TypeORM decorators.

### Alternative Migration Approaches

#### Option 1: Manual CMS Import (Recommended)

Since the seed script has technical issues, the homepage can be created manually through the CMS admin interface:

1. Navigate to: `http://localhost:9003/admin/cms/pages`
2. Click "Create New Page"
3. Enter page details:
   - Title: "Ana Sayfa"
   - Slug: "home"
   - Status: "Draft"
4. Use Visual Editor to add blocks from the migration script
5. Copy properties from migration script for each block
6. Publish when ready

#### Option 2: Direct Database Insert

If manual entry is too time-consuming, create a simplified script that uses raw SQL or the CMS API:

```typescript
// Simplified approach using API
const createPage = async () => {
  const response = await fetch('http://localhost:9006/api/cms/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Ana Sayfa',
      slug: 'home',
      status: 'draft',
      // Components added separately via API
    })
  });
};
```

#### Option 3: Fix TypeORM Configuration

Update `tsconfig.json` to ensure `emitDecoratorMetadata` is enabled and entities are compiled correctly. This requires:

1. Check `apps/backend/tsconfig.json`
2. Ensure `"emitDecoratorMetadata": true`
3. Import `reflect-metadata` at the top of seed script
4. Use production-compiled entities instead of TS source

## 🎨 CSS Class Preservation Details

### Typography Classes Preserved

All blocks now include `cssClasses` property with original styling:

```typescript
{
  blockId: 'hero-with-background-image',
  title: 'Ürünlerimizi Keşfedin',
  // Original: "text-3xl font-bold tracking-tight sm:text-4xl font-headline"
  titleVariant: 'heading2',
  titleAlign: 'center',
  titleColor: 'primary',
  titleWeight: 'bold',
  // Original: "relative py-24 bg-fixed bg-cover bg-center"
  cssClasses: 'py-24 bg-fixed bg-cover bg-center font-headline',
}
```

### Typography Mapping

| Original Class | CMS Property | Value |
|---------------|--------------|-------|
| `text-3xl sm:text-4xl` | `titleVariant` | `'heading2'` |
| `font-bold` | `titleWeight` | `'bold'` |
| `font-headline` | `cssClasses` | `'font-headline'` |
| `tracking-tight` | Built-in to heading variants | N/A |
| `text-foreground` | `titleColor` | `'primary'` |
| `text-muted-foreground` | `subtitleColor` | `'muted'` |

### Background/Layout Classes

| Original Class | CMS Property |
|---------------|--------------|
| `bg-secondary py-16 md:py-24` | `cssClasses: 'bg-secondary py-16 md:py-24'` |
| `py-24 bg-fixed bg-cover bg-center` | `cssClasses: 'py-24 bg-fixed bg-cover bg-center'` |
| `bg-primary/5 py-16` | `cssClasses: 'bg-primary/5 py-16'` |

## ✅ Migration Checklist

- [x] Analyze original homepage structure
- [x] Map sections to CMS blocks
- [x] Extract CSS classes and typography
- [x] Update migration seed script
- [x] Document preserved styling
- [ ] **Execute migration** (manual or script)
- [ ] Test migrated page in Visual Editor
- [ ] Verify responsive design
- [ ] Compare with original homepage
- [ ] Publish homepage

## 📊 Comparison: Before vs After

### Before (Hardcoded)
- **Location**: `apps/frontend/src/app/(public-backup)/page.tsx`
- **Size**: 22,283 bytes
- **Components**: Custom React components (HeroCarousel, SolutionsCarousel, etc.)
- **Editability**: Requires code changes
- **Typography**: Hardcoded Tailwind classes

### After (CMS)
- **Location**: CMS Database (pages table)
- **Components**: 12 reusable CMS blocks
- **Editability**: Visual Editor (no code required)
- **Typography**: Preserved via properties + cssClasses
- **Flexibility**: Fully customizable through admin panel

## 🔗 Related Files

- Migration Script: [`apps/backend/src/database/seeds/migrate-public-pages.seed.ts`](../apps/backend/src/database/seeds/migrate-public-pages.seed.ts)
- Original Homepage: [`apps/frontend/src/app/(public-backup)/page.tsx`](../apps/frontend/src/app/(public-backup)/page.tsx)
- Block Registry: [`apps/frontend/src/components/cms/blocks/block-registry.ts`](../apps/frontend/src/components/cms/blocks/block-registry.ts)
- Page Renderer: [`apps/frontend/src/components/cms/page-renderer.tsx`](../apps/frontend/src/components/cms/page-renderer.tsx)

## 📌 Notes

- User specifically emphasized preserving typography ("kararlı ve dengeli")
- All `font-headline` classes must be maintained
- Parallax backgrounds use `bg-fixed` which may not work on mobile Safari
- Custom components (HeroCarousel, SolutionsCarousel, ProductsCarousel) were replaced with standard CMS blocks
- Workflow section's complex tabbed structure was simplified to content section

## 🚀 Next Steps

1. Choose migration approach (manual vs script)
2. Execute homepage creation
3. Test in Visual Editor
4. Compare visual output with original
5. Make adjustments to match original design
6. Publish and set as homepage in settings
