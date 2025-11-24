# Coolify Deployment Solution Guide
**Quick Reference for Fixing Production Build Failures**

---

## Current Status

🔴 **Deployment**: FAILED
🟢 **Bundle Analyzer Fix**: WORKING (Confirmed)
🔴 **New Issue**: API Connection Error During Build

---

## Problem Summary

### What's Working ✅

- Git clone from GitHub
- npm install (all dependencies)
- TypeScript compilation
- **Bundle analyzer conditional import** (no more `@next/bundle-analyzer` errors)

### What's Broken ❌

**Error**: `Error generating static params: Error [ApiError]: no available server`

**Root Cause**: Next.js is trying to fetch data from `https://api.aluplan.tr/api` during the build process to generate static pages, but the API is not reachable from the Docker build container.

**Location**: Build fails at step: `Collecting page data ...`

---

## Quick Fix (5 Minutes)

### Solution: Disable Static Generation Temporarily

**Step 1**: Find problematic pages
```bash
cd apps/frontend
grep -r "generateStaticParams" src/app/
```

**Step 2**: Add dynamic rendering to each page

Find all pages that have `generateStaticParams` and add this line at the top:

```typescript
// apps/frontend/src/app/[problematic-page]/page.tsx

export const dynamic = 'force-dynamic'; // Add this line

// Remove or comment out generateStaticParams
// export async function generateStaticParams() { ... }

export default function Page() {
  // ... rest of your component
}
```

**Step 3**: Commit and deploy
```bash
git add .
git commit -m "fix: Disable static generation to fix build (temporary)"
git push origin main
```

**Result**: Build should complete successfully, but pages will be server-side rendered instead of static.

---

## Proper Fix (1-2 Hours)

### Solution: Build-Time API Mocking

**Step 1**: Create build utility

```bash
mkdir -p apps/frontend/src/lib
touch apps/frontend/src/lib/build-utils.ts
```

**File**: `apps/frontend/src/lib/build-utils.ts`
```typescript
/**
 * Utility to handle API calls during build time
 */

export function isBuildTime(): boolean {
  return typeof window === 'undefined' &&
         process.env.NEXT_PHASE === 'phase-production-build';
}

export async function fetchOrMock<T>(
  fetcher: () => Promise<T>,
  mockData: T
): Promise<T> {
  if (isBuildTime()) {
    console.log('⚠️ Build time detected - using mock data');
    return mockData;
  }

  try {
    return await fetcher();
  } catch (error) {
    console.error('API fetch failed, using mock data:', error);
    return mockData;
  }
}
```

**Step 2**: Update pages with generateStaticParams

```typescript
// Example: apps/frontend/src/app/cms/[slug]/page.tsx

import { fetchOrMock } from '@/lib/build-utils';

export async function generateStaticParams() {
  const pages = await fetchOrMock(
    async () => {
      const response = await fetch('https://api.aluplan.tr/api/cms/pages');
      return await response.json();
    },
    [] // Mock: Empty array for build time
  );

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await fetchOrMock(
    async () => {
      const response = await fetch(`https://api.aluplan.tr/api/cms/pages/${params.slug}`);
      return await response.json();
    },
    { title: 'Loading...', content: '' } // Mock data
  );

  return <div>{page.title}</div>;
}
```

**Step 3**: Update environment configuration

**File**: `apps/frontend/.env.production`
```env
# API URLs
NEXT_PUBLIC_API_URL=https://api.aluplan.tr
INTERNAL_API_URL=https://api.aluplan.tr

# Build configuration
SKIP_STATIC_GENERATION=false
API_AVAILABLE=false  # Set to true if API is reachable during build

# Remove this security risk!
# NODE_TLS_REJECT_UNAUTHORIZED=0  # ❌ DELETE THIS LINE
```

**Step 4**: Commit and deploy
```bash
git add .
git commit -m "feat: Add build-time API mocking for static generation"
git push origin main
```

---

## Advanced Fix (Production-Ready)

### Solution: Network Configuration + ISR

**Step 1**: Configure Coolify networking

In Coolify dashboard:
1. Go to **Backend Application** settings
2. Note the internal service name (e.g., `backend-service`)
3. Ensure backend is deployed first
4. Configure frontend to access backend via internal network

**Step 2**: Update environment variables in Coolify

Frontend environment variables:
```env
# Client-side (browser) API URL
NEXT_PUBLIC_API_URL=https://api.aluplan.tr

# Server-side (build + SSR) API URL - internal Docker network
INTERNAL_API_URL=http://backend-service:3001

# Build settings
SKIP_BUILD_API_CALLS=false
```

**Step 3**: Update HTTP client to use different URLs

**File**: `apps/frontend/src/services/http-client.ts`
```typescript
// Determine API URL based on environment
const getApiUrl = () => {
  // Server-side (Node.js)
  if (typeof window === 'undefined') {
    // Use internal URL during build and SSR
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
  }

  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL;
};

const httpClient = axios.create({
  baseURL: `${getApiUrl()}/api`,
  // ... rest of config
});
```

**Step 4**: Implement ISR (Incremental Static Regeneration)

```typescript
// Instead of generateStaticParams, use ISR
export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await fetch(
    `${process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL}/api/cms/pages/${params.slug}`,
    {
      next: { revalidate: 3600 } // Cache for 1 hour
    }
  );

  return <div>{/* render page */}</div>;
}
```

---

## Critical Security Fix

### Remove SSL Verification Bypass

⚠️ **URGENT**: This is a critical security vulnerability!

**Current Configuration** (DANGEROUS):
```env
NODE_TLS_REJECT_UNAUTHORIZED=0  # ❌ Makes all HTTPS insecure!
```

**Action Required**:

**Option 1**: Remove the variable (recommended)
```bash
# In Coolify dashboard:
# 1. Go to Application → Environment Variables
# 2. Delete NODE_TLS_REJECT_UNAUTHORIZED
# 3. Redeploy
```

**Option 2**: Fix SSL certificate on API
```bash
# If using self-signed certificate, get a proper certificate:
# - Use Let's Encrypt (free)
# - Use Cloudflare SSL
# - Purchase commercial certificate
```

**Option 3**: Add certificate to Docker image (temporary)
```dockerfile
# In Dockerfile
COPY your-ca-cert.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates
```

---

## Testing Checklist

After applying fixes:

### Local Testing
```bash
cd apps/frontend

# 1. Test production build locally
npm run build

# 2. Check for errors
# Should complete without "Error generating static params"

# 3. Start production server
npm start

# 4. Test in browser
open http://localhost:3000
```

### Production Testing
```bash
# 1. Monitor deployment logs in Coolify
# 2. Check for successful build completion
# 3. Verify container status: Running (not Exited)
# 4. Test application URL: https://app.aluplan.tr
# 5. Check browser console for errors
```

---

## Files to Modify

### Quick Fix
```
apps/frontend/src/app/
├── admin/support/faq-learning/page.tsx
├── portal/dashboard/*/page.tsx
├── cms/[slug]/page.tsx
└── [any-page-with-generateStaticParams]/page.tsx
```

### Proper Fix
```
apps/frontend/
├── src/
│   ├── lib/
│   │   └── build-utils.ts  ← CREATE THIS
│   ├── services/
│   │   └── http-client.ts  ← UPDATE THIS
│   └── app/
│       └── [pages-with-data-fetching]/  ← UPDATE THESE
├── .env.production  ← UPDATE THIS
└── next.config.ts  ← OPTIONAL UPDATES
```

---

## Troubleshooting

### Build still fails after quick fix?

**Check**: Did you add `export const dynamic = 'force-dynamic'` to ALL pages with `generateStaticParams`?

```bash
# Find all pages that might need the fix
cd apps/frontend
grep -r "generateStaticParams" src/app/
grep -r "fetch.*api\.aluplan\.tr" src/app/
```

### API still unreachable?

**Check**: Backend service status in Coolify
1. Go to Backend application in Coolify
2. Check container status: Should be "Running"
3. Check logs for errors
4. Test API health: `curl https://api.aluplan.tr/api/health`

### SSL errors persist?

**Check**: Environment variables in Coolify
1. Go to Application → Environment Variables
2. Verify `NODE_TLS_REJECT_UNAUTHORIZED` is removed
3. If needed, add proper certificate path

---

## Expected Results

### After Quick Fix
- ✅ Build completes successfully
- ✅ No "Error generating static params"
- ✅ Container status: Running
- ⚠️ Pages are server-side rendered (slower)

### After Proper Fix
- ✅ Build completes successfully
- ✅ Static pages generated with mock data
- ✅ Runtime data fetching works
- ✅ Good performance (static/ISR)

### After Advanced Fix
- ✅ Build uses internal network
- ✅ Real data during build
- ✅ Optimal performance
- ✅ ISR for dynamic content

---

## Time Estimates

| Solution | Complexity | Time | Performance | Recommended For |
|----------|-----------|------|-------------|-----------------|
| Quick Fix | Low | 5-10 min | Medium | Urgent deployments |
| Proper Fix | Medium | 1-2 hours | Good | Standard deployments |
| Advanced Fix | High | 3-4 hours | Excellent | Production-ready |

---

## Next Deployment

### Before Deploying

1. [ ] Choose fix strategy (Quick/Proper/Advanced)
2. [ ] Make code changes
3. [ ] Test locally with `npm run build`
4. [ ] Commit changes
5. [ ] Push to main branch

### During Deployment

1. [ ] Monitor Coolify deployment logs
2. [ ] Watch for "Collecting page data ..." step
3. [ ] Verify no API errors
4. [ ] Check container status changes to "Running"

### After Deployment

1. [ ] Test application in browser
2. [ ] Check all pages load correctly
3. [ ] Verify API calls work
4. [ ] Monitor for errors in production

---

## Additional Resources

### Coolify Documentation
- Network configuration: https://coolify.io/docs/knowledge-base/docker/network
- Environment variables: https://coolify.io/docs/knowledge-base/environment-variables

### Next.js Documentation
- Static Generation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
- ISR: https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- Dynamic Rendering: https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering

---

## Summary

### Current Issue
Build fails when trying to generate static pages that need API data, because the API is not reachable during Docker build.

### Root Cause
Next.js `generateStaticParams` tries to fetch from `https://api.aluplan.tr/api`, but the API server is not accessible from the build container.

### Solution Priority
1. **Immediate**: Disable static generation (`export const dynamic = 'force-dynamic'`)
2. **Short-term**: Implement build-time mocking
3. **Long-term**: Configure proper network access + ISR

### Security Priority
1. **Critical**: Remove `NODE_TLS_REJECT_UNAUTHORIZED=0` from production

---

**Last Updated**: 2025-11-23
**Status**: Active Issue - Requires Fix Before Production Deployment
