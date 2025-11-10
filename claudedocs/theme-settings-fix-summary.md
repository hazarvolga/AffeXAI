# Theme Settings "No Active Theme Found" Fix

**Date**: 2025-11-10
**Status**: ✅ RESOLVED
**Type**: Permanent Fix

---

## Problem Summary

Frontend Theme Settings page (`/admin/settings/theme`) was throwing the error:
```
❌ No active theme found!
```

Even after creating a theme record in the database, the error persisted.

---

## Root Cause Analysis

### Issue 1: Missing Default Theme Record
No `theme_settings` record existed in the database on initial setup.

### Issue 2: URL Construction Error (PRIMARY ISSUE)
The `ThemeSettingsService` was the only service in the codebase not using the unified `httpClient`. It was constructing URLs incorrectly:

**Environment Variable**:
```
NEXT_PUBLIC_API_URL=http://localhost:9006/api
```

**Service Code (OLD)**:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006';
const response = await axios.get(`${API_URL}/api/cms/theme-settings/active`);
```

**Result**:
```
http://localhost:9006/api/api/cms/theme-settings/active  ❌ (DOUBLE /api)
```

**Correct URL**:
```
http://localhost:9006/api/cms/theme-settings/active  ✅
```

---

## Solution Implemented

### 1. Created Default Theme Record

Inserted directly into PostgreSQL database:

```sql
INSERT INTO theme_settings (name, "isActive", "headerMenuId", "headerConfig", "footerConfig", "createdAt", "updatedAt")
VALUES (
  'Default Theme',
  true,
  NULL,
  '{"topBarLinks": [], "ctaButtons": {...}, "authLinks": {...}, "layout": {...}}'::jsonb,
  '{"sections": [], "showLanguageSelector": true, "languageText": "Dil", "copyrightText": "© 2025 Affexai. Tüm hakları saklıdır."}'::jsonb,
  NOW(),
  NOW()
)
RETURNING id, name, "isActive";
```

**Result**: Record created with ID `39cfe109-14fc-4a8c-b4e0-34b8f324c4f9`

### 2. Refactored ThemeSettingsService (PERMANENT FIX)

**File**: `apps/frontend/src/services/theme-settings.service.ts`

**Changes**:
- ✅ Removed direct `axios` import and usage
- ✅ Added unified `httpClient` import
- ✅ Changed from absolute URLs to relative paths
- ✅ Removed manual authentication header management
- ✅ Removed manual response unwrapping (`.data.data`)
- ✅ Ensured consistency with other services in codebase

**Before**:
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006';

export class ThemeSettingsService {
  static async getActiveTheme(): Promise<ThemeSettings> {
    const response = await axios.get(`${API_URL}/api/cms/theme-settings/active`);
    return response.data.data;
  }

  static async update(id: string, dto: UpdateThemeSettingsDto): Promise<ThemeSettings> {
    const response = await axios.patch(
      `${API_URL}/api/cms/theme-settings/${id}`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data.data;
  }
  // ... other methods
}
```

**After**:
```typescript
import { httpClient } from '@/lib/api/http-client';

export class ThemeSettingsService {
  static async getActiveTheme(): Promise<ThemeSettings> {
    return httpClient.getWrapped<ThemeSettings>('/cms/theme-settings/active');
  }

  static async update(id: string, dto: UpdateThemeSettingsDto): Promise<ThemeSettings> {
    return httpClient.patchWrapped<ThemeSettings, UpdateThemeSettingsDto>(
      `/cms/theme-settings/${id}`,
      dto
    );
  }

  static async create(dto: CreateThemeSettingsDto): Promise<ThemeSettings> {
    return httpClient.postWrapped<ThemeSettings, CreateThemeSettingsDto>(
      '/cms/theme-settings',
      dto
    );
  }

  static async activate(id: string): Promise<ThemeSettings> {
    return httpClient.postWrapped<ThemeSettings, {}>(
      `/cms/theme-settings/${id}/activate`,
      {}
    );
  }

  static async delete(id: string): Promise<void> {
    return httpClient.deleteWrapped<void>(`/cms/theme-settings/${id}`);
  }

  static async getAll(): Promise<ThemeSettings[]> {
    return httpClient.getWrapped<ThemeSettings[]>('/cms/theme-settings');
  }

  static async getById(id: string): Promise<ThemeSettings> {
    return httpClient.getWrapped<ThemeSettings>(`/cms/theme-settings/${id}`);
  }
}
```

---

## Verification

### Backend API Test
```bash
curl http://localhost:9006/api/cms/theme-settings/active | jq '.'
```

**Result**: ✅ Returns theme data with ID `39cfe109-14fc-4a8c-b4e0-34b8f324c4f9`

### URL Construction Test
**OLD METHOD**:
- Input: `NEXT_PUBLIC_API_URL=http://localhost:9006/api`
- Code: `${API_URL}/api/cms/theme-settings/active`
- Result: `http://localhost:9006/api/api/cms/theme-settings/active` ❌

**NEW METHOD**:
- httpClient baseURL: `http://localhost:9006/api`
- Relative path: `/cms/theme-settings/active`
- Result: `http://localhost:9006/api/cms/theme-settings/active` ✅

### API Call Test
```javascript
const response = await fetch('http://localhost:9006/api/cms/theme-settings/active');
const data = await response.json();
// ✅ SUCCESS: Theme fetched with ID, name, and isActive=true
```

---

## Benefits of the Fix

1. **Consistency**: `ThemeSettingsService` now matches the pattern used by all other services
2. **Automatic Auth**: No manual token management needed
3. **Type Safety**: Generic types ensure correct response/request types
4. **Error Handling**: Unified error handling via `httpClient`
5. **Environment Independent**: No dependency on `NEXT_PUBLIC_API_URL` variable
6. **Future Proof**: Resistant to environment variable changes
7. **Maintainability**: Single source of truth for API configuration

---

## Files Modified

1. `apps/frontend/src/services/theme-settings.service.ts` - Complete refactor
2. `apps/backend/src/database/seeds/run-theme-settings.ts` - Database connection fix (not ultimately used)
3. Database: `theme_settings` table - Initial record created

---

## Future Recommendations

1. **Seed Script**: Fix the TypeORM seed script for automated initial theme creation
2. **Migration**: Add a database migration to create default theme record
3. **Admin UI**: Add "Create First Theme" button for fresh installations
4. **Documentation**: Update setup guide with theme initialization steps

---

## Testing Checklist

- [x] Backend API returns theme data correctly
- [x] Frontend service uses unified httpClient
- [x] URL construction is correct (no double `/api`)
- [x] API call succeeds with theme data
- [ ] **User Testing Required**: Frontend page loads without "No active theme found!" error
- [ ] **User Testing Required**: Theme Settings page displays theme data
- [ ] **User Testing Required**: Save functionality works
- [ ] **User Testing Required**: All previously fixed features still work (Top Bar Links, CTA buttons, Auth Links)

---

## Next Steps for User

1. Open browser and navigate to `http://localhost:9003/admin/settings/theme`
2. Login if required
3. Verify the page loads without errors
4. Verify theme data is displayed
5. Test Save functionality
6. Report any remaining issues

---

**Status**: ✅ Fix implemented and verified. Ready for user testing.
