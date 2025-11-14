# CMS Menu Management - Issues Analysis & TODO List

**Created**: 2025-11-12
**Status**: Ready for Implementation
**Priority**: High

---

## 📋 Executive Summary

After analyzing the CMS menu management system, 4 critical issues have been identified that prevent proper menu functionality:

1. **Drag & Drop Root Level Bug** - Cannot move items back to top level
2. **Missing Mega Menu Support** - Simple dropdown instead of multi-column mega menu
3. **Modal Default Values Bug** - Edit modal doesn't load item data
4. **Missing Page Selector** - No dropdown to select CMS pages when type is "Page"

---

## 🐛 Issue #1: Drag & Drop Root Level Bug

### Problem Description
Users can drag menu items to become children of other items, but cannot move items back to the root/top level. Once an item is nested, it's stuck.

### Root Cause
**File**: [apps/frontend/src/app/admin/cms/menus/page.tsx:386-400](apps/frontend/src/app/admin/cms/menus/page.tsx#L386-L400)

```typescript
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragOver(false);

  const draggedId = e.dataTransfer.getData('menuItemId');
  if (draggedId && draggedId !== item.id) {
    const isCircular = checkCircularReference(item.id, draggedId);
    if (!isCircular) {
      const newIndex = children.length;
      onReorder(draggedId, item.id, newIndex); // ❌ Always drops INTO item
    }
  }
};
```

**Problem**: The `handleDrop` function only allows dropping items as children (sets `parentId` to the drop target). There's no drop zone for the root level.

### Solution Design

**Add Root-Level Drop Zone**:
```typescript
// Add new drop zone before the first menu item
<div
  onDragOver={(e) => {
    e.preventDefault();
    setRootDropZoneActive(true);
  }}
  onDragLeave={() => setRootDropZoneActive(false)}
  onDrop={(e) => {
    e.preventDefault();
    setRootDropZoneActive(false);
    const draggedId = e.dataTransfer.getData('menuItemId');
    if (draggedId) {
      onReorder(draggedId, null, 0); // ✅ Drop at root level
    }
  }}
  className={cn(
    "h-8 border-2 border-dashed rounded-md transition-colors",
    rootDropZoneActive ? "border-primary bg-primary/5" : "border-transparent"
  )}
>
  <div className="text-xs text-muted-foreground text-center py-1">
    Drop here to move to top level
  </div>
</div>
```

### Implementation Steps

1. Add `rootDropZoneActive` state
2. Create root-level drop zone component
3. Update `handleReorderMenuItem` to accept `null` parent
4. Add visual indicator when dragging over root zone
5. Test moving nested items back to root

### Testing Checklist

- [ ] Can drag root item under another root item
- [ ] Can drag child item to root level
- [ ] Can drag deeply nested item (3+ levels) to root
- [ ] Visual feedback works (border highlight)
- [ ] Order index updates correctly
- [ ] Database updates persist after refresh

---

## 🎨 Issue #2: Missing Mega Menu Support

### Problem Description
The header component renders a simple vertical dropdown menu, but mega menus (multi-column layouts with icons and deeper nesting) are not supported. The old hardcoded navigation had this functionality.

### Root Cause
**File**: [apps/frontend/src/components/layout/header.tsx:244-269](apps/frontend/src/components/layout/header.tsx#L244-L269)

```typescript
{/* Current: Simple dropdown */}
<div className="absolute left-0 top-full mt-2 w-64 bg-white border...">
  <div className="py-2">
    {item.submenu.map((subItem) => (
      <Link key={subItem.label} href={subItem.href}...>
        {subItem.label}
      </Link>
    ))}
  </div>
</div>
```

**Problem**: Only renders a simple vertical dropdown. No support for:
- Multi-column layouts
- Icons for menu items
- Nested submenus (3+ levels)
- Rich content (descriptions, images)

### Solution Design

**Mega Menu Component Architecture**:

```typescript
interface MegaMenuColumn {
  title: string;
  items: MenuItem[];
  icon?: string;
}

interface MegaMenuItem extends MenuItem {
  megaMenu?: {
    columns: MegaMenuColumn[];
    width?: 'sm' | 'md' | 'lg' | 'xl';
    description?: string;
  };
}
```

**Mega Menu Rendering**:
```typescript
{item.megaMenu ? (
  // Multi-column mega menu
  <div className={cn(
    "absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-xl",
    megaMenuWidth[item.megaMenu.width || 'lg']
  )}>
    <div className="grid gap-4 p-6" style={{
      gridTemplateColumns: `repeat(${item.megaMenu.columns.length}, 1fr)`
    }}>
      {item.megaMenu.columns.map((column) => (
        <div key={column.title}>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            {column.icon && <Icon name={column.icon} />}
            {column.title}
          </h3>
          <div className="space-y-2">
            {column.items.map((subItem) => (
              <Link
                key={subItem.label}
                href={subItem.href}
                className="block px-3 py-2 rounded hover:bg-gray-50"
              >
                <div className="font-medium">{subItem.label}</div>
                {subItem.description && (
                  <div className="text-xs text-muted-foreground">
                    {subItem.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  // Simple dropdown (existing)
  <div className="absolute left-0 top-full mt-2 w-64...">
    ...
  </div>
)}
```

### Database Schema Extension

**Update `menu_items` table** (backend):
```sql
ALTER TABLE menu_items ADD COLUMN mega_menu_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE menu_items ADD COLUMN mega_menu_config JSONB;
ALTER TABLE menu_items ADD COLUMN icon VARCHAR(100);
ALTER TABLE menu_items ADD COLUMN description TEXT;
ALTER TABLE menu_items ADD COLUMN mega_menu_column INTEGER; -- Which column (1-4)
```

**Example mega_menu_config**:
```json
{
  "enabled": true,
  "width": "lg",
  "columns": 3,
  "description": "Explore our solutions"
}
```

### Implementation Steps

1. **Backend**:
   - Create migration for menu_items schema
   - Update MenuItemType enum to include `MEGA_MENU`
   - Update DTOs to include megaMenu fields
   - Update menu service to return megaMenu config

2. **Frontend - Menu Management**:
   - Add "Mega Menu" toggle in MenuItemDialog
   - Add column selector (1-4 columns)
   - Add icon picker component
   - Add description field
   - Visual preview of mega menu layout

3. **Frontend - Header Component**:
   - Create `MegaMenuDropdown` component
   - Update `navigationItems` mapping to include megaMenu data
   - Add width variants (sm: 600px, md: 800px, lg: 1000px, xl: 1200px)
   - Add icon rendering support
   - Support 3+ level nesting

4. **Styling**:
   - Add mega menu CSS classes
   - Responsive breakpoints (hide on mobile)
   - Hover effects and animations
   - Loading states

### Testing Checklist

- [ ] Can create mega menu with 2-4 columns
- [ ] Icons display correctly
- [ ] Descriptions show below menu items
- [ ] Mega menu width responds to config (sm/md/lg/xl)
- [ ] Nested items (3+ levels) render correctly
- [ ] Hover states work across all columns
- [ ] Mobile view falls back to simple menu
- [ ] Performance is smooth (no lag on hover)

---

## 🔧 Issue #3: Menu Item Edit Modal Default Values Bug

### Problem Description
When clicking "Edit" on any menu item, the modal opens with default/empty values instead of showing the item's actual properties (label, URL, type, parent, etc.).

### Root Cause
**File**: [apps/frontend/src/app/admin/cms/menus/page.tsx:114-142](apps/frontend/src/app/admin/cms/menus/page.tsx#L114-L142)

```typescript
const MenuItemDialog = ({
  item,
  menuId,
  menuItems,
  onSave,
  onOpenChange
}: {
  item?: CmsMenuItem;
  // ...
}) => {
  // ❌ State initialized once on mount, doesn't update when item prop changes
  const [label, setLabel] = useState(item?.label || '');
  const [type, setType] = useState<MenuItemType>(item?.type || MenuItemType.CUSTOM);
  const [url, setUrl] = useState(item?.url || '');
  const [parentId, setParentId] = useState<string | null>(item?.parentId || null);
  // ... more state
```

**Problem**: React `useState` initializes only once on component mount. When the `item` prop changes (e.g., switching from create to edit mode), the state variables don't update.

### Solution Design

**Add useEffect to Sync State**:
```typescript
const MenuItemDialog = ({ item, menuId, menuItems, onSave, onOpenChange }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<MenuItemType>(MenuItemType.CUSTOM);
  const [url, setUrl] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [megaMenuEnabled, setMegaMenuEnabled] = useState(false);
  const [isNewWindow, setIsNewWindow] = useState(false);

  // ✅ Sync state when item prop changes
  useEffect(() => {
    if (item) {
      // Editing existing item
      setLabel(item.label || '');
      setType(item.type || MenuItemType.CUSTOM);
      setUrl(item.url || '');
      setParentId(item.parentId || null);
      setIcon(item.icon || '');
      setDescription(item.description || '');
      setMegaMenuEnabled(item.megaMenuEnabled || false);
      setIsNewWindow(item.isNewWindow || false);
    } else {
      // Creating new item - reset to defaults
      setLabel('');
      setType(MenuItemType.CUSTOM);
      setUrl('');
      setParentId(null);
      setIcon('');
      setDescription('');
      setMegaMenuEnabled(false);
      setIsNewWindow(false);
    }
  }, [item]); // Re-run when item changes

  // ... rest of component
};
```

### Implementation Steps

1. Replace `useState` initializations with empty defaults
2. Add `useEffect` hook with `item` dependency
3. Update state setters in useEffect for all fields
4. Add reset logic for create mode (when `item` is undefined)
5. Test switching between create and edit modes
6. Verify all fields populate correctly

### Testing Checklist

- [ ] Edit modal shows correct label
- [ ] Edit modal shows correct URL
- [ ] Edit modal shows correct type (Custom/Page/Category)
- [ ] Edit modal shows correct parent selection
- [ ] Edit modal shows correct icon (if set)
- [ ] Edit modal shows correct description (if set)
- [ ] Create modal shows empty fields
- [ ] Switching between items updates modal correctly
- [ ] Modal updates when item is modified externally

---

## 📄 Issue #4: Missing Page Selector for PAGE Type

### Problem Description
When editing a menu item and selecting "Page" as the type, there's no dropdown to select from existing CMS pages. The user has to manually type the page slug/URL, which is error-prone.

### Root Cause
**File**: [apps/frontend/src/app/admin/cms/menus/page.tsx:193-218](apps/frontend/src/app/admin/cms/menus/page.tsx#L193-L218)

```typescript
<Select value={type} onValueChange={(value) => setType(value as MenuItemType)}>
  <SelectContent>
    <SelectItem value={MenuItemType.CUSTOM}>Özel Link</SelectItem>
    <SelectItem value={MenuItemType.PAGE}>Sayfa</SelectItem>
    <SelectItem value={MenuItemType.CATEGORY}>Kategori</SelectItem>
  </SelectContent>
</Select>

{type === MenuItemType.CUSTOM && (
  <div className="space-y-2">
    <Label htmlFor="item-url">URL</Label>
    <Input
      id="item-url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="/hakkimizda"
    />
  </div>
)}

{/* ❌ Nothing rendered for PAGE type - missing page selector */}
```

**Problem**: No conditional rendering for `type === MenuItemType.PAGE`. Need to fetch CMS pages and display them in a Select dropdown.

### Solution Design

**Add Page Selector Component**:
```typescript
const MenuItemDialog = ({ ... }) => {
  const [selectedPageId, setSelectedPageId] = useState<string>('');

  // ✅ Fetch CMS pages
  const { data: cmsPages, isLoading: loadingPages } = useQuery({
    queryKey: ['cms-pages'],
    queryFn: () => CmsPageService.getPublishedPages(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Update URL when page is selected
  const handlePageSelect = (pageId: string) => {
    setSelectedPageId(pageId);
    const selectedPage = cmsPages?.find(p => p.id === pageId);
    if (selectedPage) {
      setUrl(`/${selectedPage.slug}`);
      setLabel(label || selectedPage.title); // Auto-fill label if empty
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent>
        {/* ... type selector ... */}

        {/* ✅ PAGE type - Show page selector */}
        {type === MenuItemType.PAGE && (
          <div className="space-y-2">
            <Label htmlFor="page-select">CMS Sayfası</Label>
            <Select
              value={selectedPageId}
              onValueChange={handlePageSelect}
              disabled={loadingPages}
            >
              <SelectTrigger id="page-select">
                <SelectValue placeholder={
                  loadingPages ? "Yükleniyor..." : "Sayfa seçin"
                } />
              </SelectTrigger>
              <SelectContent>
                {cmsPages?.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{page.title}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        /{page.slug}
                      </span>
                    </div>
                  </SelectItem>
                ))}
                {cmsPages?.length === 0 && (
                  <SelectItem value="no-pages" disabled>
                    Henüz sayfa yok
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Show computed URL */}
            {url && (
              <div className="text-xs text-muted-foreground">
                URL: {url}
              </div>
            )}
          </div>
        )}

        {/* CUSTOM type - Show manual URL input */}
        {type === MenuItemType.CUSTOM && (
          <div className="space-y-2">
            <Label htmlFor="item-url">URL</Label>
            <Input
              id="item-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/hakkimizda"
            />
          </div>
        )}

        {/* CATEGORY type - Show category selector (future) */}
        {type === MenuItemType.CATEGORY && (
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="text-sm text-muted-foreground">
              Kategori seçici yakında eklenecek
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
```

### Implementation Steps

1. Import `CmsPageService` from `@/services/cms-page.service`
2. Add TanStack Query to fetch published pages
3. Add `selectedPageId` state
4. Create `handlePageSelect` function to update URL
5. Add conditional rendering for PAGE type
6. Display page title + slug in dropdown
7. Auto-fill label when page is selected (if label is empty)
8. Add loading state while fetching pages
9. Add empty state if no pages exist
10. Show computed URL below selector

### API Service Method

**Already exists**: [apps/frontend/src/services/cms-page.service.ts:26-30](apps/frontend/src/services/cms-page.service.ts#L26-L30)

```typescript
static async getPublishedPages(): Promise<CmsPageResponse[]> {
  return httpClient.getWrapped<CmsPageResponse[]>('/cms/pages?status=published');
}
```

### Testing Checklist

- [ ] Page selector dropdown appears when PAGE type is selected
- [ ] Dropdown shows all published pages
- [ ] Each item shows page title and slug
- [ ] Selecting a page updates the URL field
- [ ] Selecting a page auto-fills label (if empty)
- [ ] Loading state displays while fetching
- [ ] Empty state shows if no pages exist
- [ ] URL field is read-only when PAGE type is selected
- [ ] Switching from PAGE to CUSTOM clears selected page
- [ ] Editing existing PAGE menu item shows selected page

---

## 📊 Implementation Priority & Effort Estimation

| Issue | Priority | Complexity | Estimated Time | Impact |
|-------|----------|------------|----------------|--------|
| **#3: Modal Default Values** | 🔴 Critical | Low | 1 hour | High - Blocks editing |
| **#4: Page Selector** | 🔴 Critical | Low | 2 hours | High - Core functionality |
| **#1: Root Level Drop** | 🟡 High | Medium | 3 hours | Medium - UX improvement |
| **#2: Mega Menu** | 🟢 Medium | High | 8-12 hours | Medium - Feature enhancement |

**Total Estimated Time**: 14-18 hours
**Recommended Order**: #3 → #4 → #1 → #2

---

## 🔄 Recommended Implementation Order

### Phase 1: Critical Fixes (3 hours)
1. **Fix Modal Default Values** (#3) - 1 hour
   - Simple useEffect addition
   - High impact, low complexity
   - Unblocks testing other features

2. **Add Page Selector** (#4) - 2 hours
   - Straightforward React Query integration
   - Essential for PAGE type menu items
   - Low complexity, high value

### Phase 2: UX Improvements (3 hours)
3. **Fix Root Level Drop** (#1) - 3 hours
   - Requires careful drag & drop logic
   - Medium complexity
   - Improves menu organization workflow

### Phase 3: Feature Enhancement (8-12 hours)
4. **Implement Mega Menu** (#2) - 8-12 hours
   - Backend migration + frontend component
   - High complexity but high value
   - Can be done in stages:
     - Stage 1: Backend schema (2 hours)
     - Stage 2: Menu management UI (3 hours)
     - Stage 3: Header component (3 hours)
     - Stage 4: Testing & polish (2-4 hours)

---

## 🧪 Testing Strategy

### Unit Tests
- Menu item dialog state sync (useEffect)
- Page selector dropdown rendering
- Root level drop zone logic
- Mega menu column rendering

### Integration Tests
- Create menu item with page type
- Edit menu item and verify data loads
- Drag item to root level
- Render mega menu with 2-4 columns

### E2E Tests
- Full menu creation workflow
- Menu item reordering (all scenarios)
- Frontend menu rendering (simple + mega)
- Mobile responsive behavior

---

## 📚 Related Files

### Backend
- `apps/backend/src/modules/cms/entities/menu-item.entity.ts` - Menu item schema
- `apps/backend/src/modules/cms/dto/menu-item.dto.ts` - DTOs
- `apps/backend/src/modules/cms/menu.service.ts` - Menu operations

### Frontend - Menu Management
- `apps/frontend/src/app/admin/cms/menus/page.tsx` - Main management UI
- `apps/frontend/src/lib/cms/menu-service.ts` - API client

### Frontend - Header
- `apps/frontend/src/components/layout/header.tsx` - Navigation rendering

### Shared Types
- `packages/shared-types/src/cms.types.ts` - Menu types

---

## 🎯 Success Criteria

### Issue #1 (Root Level Drop)
- ✅ Can drag any nested item back to root level
- ✅ Visual feedback (drop zone highlight) works
- ✅ Database updates persist correctly
- ✅ No UI glitches or flashing

### Issue #2 (Mega Menu)
- ✅ Can create mega menu with 2-4 columns
- ✅ Icons display in menu items
- ✅ Multi-level nesting (3+ levels) works
- ✅ Responsive on desktop, hidden on mobile
- ✅ Performance is smooth (no lag)

### Issue #3 (Modal Default Values)
- ✅ Edit modal shows actual item data
- ✅ All fields populate correctly
- ✅ Create mode shows empty fields
- ✅ No delay or flicker when opening modal

### Issue #4 (Page Selector)
- ✅ Dropdown shows all published pages
- ✅ URL auto-fills when page is selected
- ✅ Label auto-fills if empty
- ✅ Loading/empty states work correctly

---

## 📝 Next Steps

1. **Review TODO List**: Confirm priorities with team
2. **Start Phase 1**: Fix modal default values (#3)
3. **Implement Page Selector** (#4)
4. **Test Critical Fixes**: Ensure stability before Phase 2
5. **Begin UX Improvements**: Root level drop (#1)
6. **Plan Mega Menu Migration**: Backend schema design
7. **Implement Mega Menu**: Full feature rollout

---

**Document Status**: ✅ Ready for Implementation
**Created By**: Claude (AI Assistant)
**Last Updated**: 2025-11-12
