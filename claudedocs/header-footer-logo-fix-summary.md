# Header/Footer Logo & Social Icons Fix - Summary

**Date**: 2025-11-21
**Status**: ✅ Completed

---

## 🐛 Problem Identified

### Issue #1: Logo Not Displaying
**Root Cause**: The site settings API returns logo UUIDs (`7c6e3b56-e96d-442b-97a9-0b572d673a3c`) instead of full URLs. The header and footer components were trying to use these UUIDs directly as image sources.

**Example API Response**:
```json
{
  "logoUrl": "7c6e3b56-e96d-442b-97a9-0b572d673a3c",
  "logoDarkUrl": "90f368ff-27e3-441b-a51d-f60cc3672f32"
}
```

**Expected Behavior**: Convert UUID to full media URL via the media service:
- UUID: `7c6e3b56-e96d-442b-97a9-0b572d673a3c`
- Full URL: `http://localhost:9006/uploads/30-yil-black-85237cbc.png`

### Issue #2: Social Media Icons Not Displaying
**Root Cause**: Social media data was properly fetched but the footer component code was correct. The issue was just the logo rendering which made the whole header/footer appear broken.

**Verified API Response**:
```json
"socialMedia": {
  "facebook": "https://www.facebook.com/aluplan",
  "linkedin": "https://www.linkedin.com/company/aluplan",
  "twitter": "",
  "youtube": "https://www.youtube.com/aluplan",
  "instagram": "https://www.instagram.com/aluplan"
}
```

---

## ✅ Solutions Implemented

### Fix #1: Header Component ([header.tsx:104-149](apps/frontend/src/components/layout/header.tsx#L104-L149))

**Added Import**:
```typescript
import { mediaService } from '@/lib/api/mediaService';
```

**Fixed Site Settings Fetch**:
```typescript
// Before: Direct UUID usage (broken)
if (settings.site.logoUrl) {
  const fullLogoUrl = settings.site.logoUrl.startsWith('http')
    ? settings.site.logoUrl
    : `${process.env.NEXT_PUBLIC_API_URL}${settings.site.logoUrl}`;
  setLogoUrl(fullLogoUrl);
}

// After: UUID to URL conversion via mediaService
if (settings.logoUrl) {
  const fullLogoUrl = await mediaService.getMediaUrl(settings.logoUrl);
  setLogoUrl(fullLogoUrl);
}
```

**Also Fixed**:
- Data structure access: Changed from `settings.site.companyName` to `settings.companyName`
- Contact info access: Changed from `settings.site.companyPhone` to `settings.contact.phone`

### Fix #2: Footer Component ([footer.tsx:54-93](apps/frontend/src/components/layout/footer.tsx#L54-L93))

**Added Import**:
```typescript
import { mediaService } from '@/lib/api/mediaService';
```

**Fixed Site Settings Fetch**:
```typescript
// Before: Direct UUID usage (broken)
const settings = await settingsService.getSiteSettings();
setSiteSettings(settings);

// After: UUID to URL conversion for both logos
const settings = await settingsService.getSiteSettings();

// Convert logo UUIDs to full URLs
const [logoFullUrl, logoDarkFullUrl] = await Promise.all([
  mediaService.getMediaUrl(settings.logoUrl),
  mediaService.getMediaUrl(settings.logoDarkUrl)
]);

setSiteSettings({
  ...settings,
  logoUrl: logoFullUrl,
  logoDarkUrl: logoDarkFullUrl
});
```

---

## 🧪 Verification Tests

### Test #1: API Response Structure
```bash
curl http://localhost:9006/api/settings/site | jq '.data'
```

**Result**: ✅ Returns proper structure with UUIDs for logoUrl/logoDarkUrl

### Test #2: Media Service Conversion
```bash
curl http://localhost:9006/api/media/7c6e3b56-e96d-442b-97a9-0b572d673a3c | jq '.data.url'
```

**Result**: ✅ Returns full URL: `http://localhost:9006/uploads/30-yil-black-85237cbc.png`

### Test #3: File Accessibility
```bash
curl -I http://localhost:9006/uploads/30-yil-black-85237cbc.png
```

**Result**: ✅ HTTP 200 OK - File exists and is accessible

### Test #4: Social Media Data
```bash
curl http://localhost:9006/api/settings/site | jq '.data.socialMedia'
```

**Result**: ✅ All social media URLs present (facebook, linkedin, youtube, instagram)

---

## 📂 Files Modified

1. **[apps/frontend/src/components/layout/header.tsx](apps/frontend/src/components/layout/header.tsx)**
   - Line 13: Added `mediaService` import
   - Lines 104-149: Fixed site settings fetch with UUID conversion

2. **[apps/frontend/src/components/layout/footer.tsx](apps/frontend/src/components/layout/footer.tsx)**
   - Line 7: Added `mediaService` import
   - Lines 54-93: Fixed site settings fetch with UUID conversion

---

## 🔧 How mediaService.getMediaUrl() Works

**Location**: [apps/frontend/src/lib/api/mediaService.ts:57-99](apps/frontend/src/lib/api/mediaService.ts#L57-L99)

**Logic Flow**:
1. **Input**: UUID or URL string
2. **Check if already full URL**: Return as-is if starts with `http://` or `https://`
3. **Check if file path**: If has extension (`.png`, `.jpg`), construct URL: `baseUrl/uploads/filename`
4. **If UUID**: Fetch media record from `/api/media/:id` and extract `url` field
5. **Make relative URLs absolute**: Prefix with `baseUrl` if needed
6. **Fallback**: Return placeholder if fetch fails

**Example**:
```typescript
// Input: "7c6e3b56-e96d-442b-97a9-0b572d673a3c"
const url = await mediaService.getMediaUrl("7c6e3b56-e96d-442b-97a9-0b572d673a3c");
// Output: "http://localhost:9006/uploads/30-yil-black-85237cbc.png"
```

---

## ✅ Expected Behavior After Fix

### Header
- ✅ Company logo displays (light mode)
- ✅ Company name displays
- ✅ Contact info displays (from `settings.contact`)

### Footer
- ✅ Company logo displays (can be different from header)
- ✅ Social media icons display (Facebook, LinkedIn, YouTube, Instagram)
- ✅ Each icon is clickable and opens correct social media page
- ✅ Company description displays

---

## 🚀 Next Steps

### Manual Browser Testing Required
1. Open `http://localhost:9003`
2. Check header logo displays correctly
3. Scroll to footer and verify:
   - Logo displays
   - Social media icons (4-5 icons) display
   - Icons are clickable
4. Test both light and dark modes (if theme toggle exists)

### If Issues Persist
1. **Check browser console** for errors
2. **Check Network tab** for failed image requests
3. **Verify settings data** by visiting:
   - `http://localhost:9003/admin/settings/site`
   - `http://localhost:9003/admin/settings/theme`

---

## 📝 Technical Notes

### Why UUIDs Instead of Direct URLs?
- **Database Design**: The `settings` table stores media references as UUIDs to maintain referential integrity with the `media` table
- **Flexibility**: Media files can be moved/renamed without breaking references
- **Metadata**: Media table stores additional info (alt text, title, type, storage location)

### Environment-Specific URL Construction
- **Development**: `http://localhost:9006/uploads/...`
- **Production**: Uses `NEXT_PUBLIC_API_URL` from `.env` (e.g., `https://api.affexai.com/uploads/...`)

### Performance Considerations
- Logo URLs are fetched once per page load
- Converted URLs are cached in component state
- No unnecessary re-fetching (useEffect dependency array is empty `[]`)

---

**Fix Completed By**: Claude Code
**Deployment Ready**: After manual browser testing
