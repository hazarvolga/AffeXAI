# Public Pages CMS Migration Guide

## Overview

This document explains the migration of the backed-up public pages from [apps/frontend/src/app/(public-backup)](apps/frontend/src/app/(public-backup)) into the CMS as normal pages (not templates).

## Completed Work

### 1. Visual Editor Fix ✅

**Problem**: When creating a new page from a template and clicking "Save Draft", the error "No page ID provided" occurred.

**Solution**: Modified [apps/frontend/src/components/cms/editor/visual-editor.tsx](apps/frontend/src/components/cms/editor/visual-editor.tsx) to:
- Create a page record first if `pageId` is missing
- Update the browser URL with the new `pageId`
- Use the new `pageId` for all subsequent component save operations

**Key Changes** (lines 681-876):
- Introduced local variable `currentPageId` instead of relying on the `pageId` prop
- Added logic to call `cmsService.createPage()` when `pageId` is undefined
- Updated all references from `pageId` to `currentPageId` throughout the save function
- Proper URL state management with `window.history.pushState()`

### 2. Migration Seed Script ✅

**Created Files**:
1. [apps/backend/src/database/seeds/migrate-public-pages.seed.ts](apps/backend/src/database/seeds/migrate-public-pages.seed.ts)
   - Main migration logic
   - Creates 13 CMS pages with components
   - Handles page metadata (title, slug, description, status)
   - Creates page components with block-based structure

2. [apps/backend/src/database/seeds/run-migrate-public-pages.ts](apps/backend/src/database/seeds/run-migrate-public-pages.ts)
   - Standalone runner script
   - Handles database connection
   - Error handling and reporting

3. **npm Script**: Added to [apps/backend/package.json](apps/backend/package.json)
   ```json
   "seed:migrate-pages": "ts-node src/database/seeds/run-migrate-public-pages.ts"
   ```

## Migrated Pages

The seed script creates the following 13 pages:

| Page Title | Slug | Description | Components |
|------------|------|-------------|------------|
| Ana Sayfa | `home` | Main homepage | Hero carousel, Solutions carousel, Resources tabs |
| İletişim | `contact` | Contact page | Hero, Contact form |
| Ürünler | `products` | Products overview | Hero, Product grid (4 products) |
| Allplan | `products/allplan` | Allplan product line | Hero, Product variants grid (6 variants) |
| Allplan Architecture | `products/allplan/professional` | Professional BIM | Hero, Feature list (4 features) |
| Çözümler | `solutions` | Solutions overview | Hero, Solution categories (5 categories) |
| Eğitim | `education` | Education overview | Hero, Education multi-layout |
| Eğitimler | `education/training` | Training programs | Hero, Training courses |
| Sertifikasyon | `education/certification` | Certification program | Hero, Certification levels (3 levels) |
| İndirmeler | `downloads` | Downloads page | Hero, Download categories (4 categories) |
| Gizlilik Politikası | `privacy` | Privacy policy | Hero, Legal content |
| Kullanım Koşulları | `terms` | Terms of service | Hero, Legal content |
| Başarı Hikayeleri | `case-studies` | Case studies | Hero, Case study grid (2 studies) |

## Block Components Used

The migration uses the following block types (referenced via `blockId`):

### Hero Blocks
- `hero-tabbed-carousel` - Main hero with tabs and carousel
- `hero-simple` - Simple hero with title/description
- `hero-product` - Product-specific hero

### Content Blocks
- `thumbnail-carousel` - Solutions/Products carousel with thumbnails
- `tabbed-grid` - Tab-based grid layout (Resources)
- `education-multi-layout` - Education section layout
- `product-grid` - Product cards grid
- `product-variants-grid` - Product variant showcases
- `feature-list` - Feature list with icons
- `solution-categories` - Solution category cards
- `training-courses` - Training course list
- `certification-levels` - Certification level cards
- `download-categories` - Download category cards
- `case-study-grid` - Case study showcases
- `legal-content` - Legal/policy content display
- `contact-form` - Contact form component

## How to Run the Migration

### Prerequisites
1. Backend server must be running
2. Database must be initialized with migrations
3. No existing pages with the same slugs (script checks for duplicates)

### Execution

**Option 1: Via npm script** (Recommended after fixing ts-node issues)
```bash
cd apps/backend
npm run seed:migrate-pages
```

**Option 2: Direct TypeScript execution**
```bash
cd apps/backend
npx ts-node src/database/seeds/run-migrate-public-pages.ts
```

**Option 3: Via NestJS (if backend is running)**
You can also create a controller endpoint to trigger the migration manually.

### Expected Output

```bash
🌱 Starting public pages migration...

📦 Connecting to database...
✅ Database connected!

📄 Migrating backed-up public pages to CMS...
✅ Created page: Ana Sayfa (home)
✅ Created page: İletişim (contact)
✅ Created page: Ürünler (products)
✅ Created page: Allplan (products/allplan)
✅ Created page: Allplan Architecture (products/allplan/professional)
✅ Created page: Çözümler (solutions)
✅ Created page: Eğitim (education)
✅ Created page: Eğitimler (education/training)
✅ Created page: Sertifikasyon (education/certification)
✅ Created page: İndirmeler (downloads)
✅ Created page: Gizlilik Politikası (privacy)
✅ Created page: Kullanım Koşulları (terms)
✅ Created page: Başarı Hikayeleri (case-studies)
🎉 Successfully migrated 13 public pages to CMS!

🎉 Public pages migration completed successfully!
```

## Post-Migration Tasks

### 1. Verify Pages in CMS
1. Navigate to `/admin/cms/pages`
2. Check that all 13 pages are listed
3. Verify each page has status "Published"
4. Check page slugs match the old routes

### 2. Test Visual Editor
1. Select any migrated page
2. Click "Edit" to open visual editor
3. Try adding/removing components
4. Test "Save Draft" functionality (should work now!)
5. Test "Publish" functionality

### 3. Create Menu Structure
Since the migration creates pages without menu assignment, you'll need to:
1. Go to `/admin/cms/menus`
2. Create main navigation menu
3. Add migrated pages to the menu:
   - Products (with Allplan as child)
   - Solutions
   - Education (with Training and Certification as children)
   - Downloads
   - Contact
4. Set proper order and hierarchy

### 4. Update Homepage Components
The homepage uses dynamic components that need configuration:
1. Edit `home` page
2. Configure carousel slides with actual images
3. Update solution/product links
4. Add real content to tabs
5. Customize CTAs

### 5. Remove Backup Directory (Optional)
Once verified that all pages work correctly in CMS:
```bash
# Backup first
mv apps/frontend/src/app/\(public-backup\) ~/affexai-backup-pages

# Or delete
rm -rf apps/frontend/src/app/\(public-backup\)
```

## Known Limitations

1. **Static Content**: The migration creates pages with placeholder/demo content. You'll need to:
   - Replace placeholder images with real ones
   - Update text content
   - Configure actual links and CTAs
   - Add real data (products, solutions, courses, etc.)

2. **Block Implementation**: Some blocks referenced in the migration (like `product-grid`, `solution-categories`) may need to be implemented or exist as reusable components.

3. **Duplicate Prevention**: The script checks for 3 key pages (`home`, `contact`, `products`). If any exist, it skips the entire migration. For partial migrations, you'll need to modify the check.

4. **No Menu Assignment**: Pages are created without menu assignments. This must be done manually via the CMS menu management interface.

5. **Translations**: All content is in Turkish. For multi-language support, you'll need to:
   - Create English versions of pages
   - Implement i18n in the CMS
   - Duplicate pages with different slugs (e.g., `/en/products`)

## Troubleshooting

### Migration Fails with "Pages already exist"
```
⚠️  Some public pages already exist, skipping migration...
```
**Solution**: Delete existing pages or modify the script to skip duplicate check.

### TypeScript/ts-node Errors
If you encounter decorator metadata errors:
```bash
# Clean build
cd apps/backend
rm -rf dist
npm run build

# Try migration again
npm run seed:migrate-pages
```

### Database Connection Errors
Ensure PostgreSQL is running and environment variables are set:
```bash
# Check .env file
cat apps/backend/.env | grep DATABASE

# Test connection
psql -h localhost -U postgres -d affexai
```

### Component Rendering Issues
If components don't render properly:
1. Check that referenced `blockId` values match existing reusable components
2. Verify component props schema matches expected structure
3. Check [apps/frontend/src/components/cms/page-renderer.tsx](apps/frontend/src/components/cms/page-renderer.tsx) for rendering logic

## Next Steps

1. **Run the migration** (once build issues are resolved)
2. **Test the visual editor** with the new fix
3. **Configure homepage** with real content
4. **Set up menus** for navigation
5. **Add real images** to S3/media library
6. **Implement missing blocks** if needed
7. **Create English versions** of pages

## Related Files

### Frontend
- [apps/frontend/src/components/cms/editor/visual-editor.tsx](apps/frontend/src/components/cms/editor/visual-editor.tsx) - Visual editor (fixed)
- [apps/frontend/src/components/cms/page-renderer.tsx](apps/frontend/src/components/cms/page-renderer.tsx) - Page rendering
- [apps/frontend/src/app/(public-backup)/](apps/frontend/src/app/(public-backup)/) - Original backed-up pages (42 files)

### Backend
- [apps/backend/src/database/seeds/migrate-public-pages.seed.ts](apps/backend/src/database/seeds/migrate-public-pages.seed.ts) - Migration logic
- [apps/backend/src/database/seeds/run-migrate-public-pages.ts](apps/backend/src/database/seeds/run-migrate-public-pages.ts) - Runner script
- [apps/backend/src/modules/cms/entities/page.entity.ts](apps/backend/src/modules/cms/entities/page.entity.ts) - Page entity
- [apps/backend/src/modules/cms/entities/component.entity.ts](apps/backend/src/modules/cms/entities/component.entity.ts) - Component entity
- [apps/backend/package.json](apps/backend/package.json) - npm scripts

## User Request Reference

**Original Request** (Turkish):
> "eski frontendeki backup aldığımız sayfaları CMS e entegre edebilir miyiz? ve mevcut şablonlardan biri seçtim ve ve uygula yani kullan dedim test olarak Feature Landing Test oluşturmaya çalıştım Save Draft dediğimde Erorro No page ID pdrovided hatası alıyorum"

**Translation**:
> "Can we integrate the backed-up pages from the old frontend into CMS? And I selected one of the existing templates and tried to use it to create a Feature Landing Test, when I clicked Save Draft I got the error 'No page ID provided'"

**Clarification** (Turkish):
> "esik sayfalara cms tekplate olarak değil normal page olarak entegre edelim istiyorum"

**Translation**:
> "I want to integrate old pages as normal CMS pages, not as templates"

---

**Created**: 2025-11-10
**Status**: ✅ Seed script created, visual editor fixed, ready for execution
**Author**: Claude Code Assistant
