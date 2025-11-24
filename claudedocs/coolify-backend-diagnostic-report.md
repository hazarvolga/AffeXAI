# Coolify Backend Domain Configuration Diagnostic Report

**Date**: 2025-11-24
**Issue**: "no available server" error when accessing api.aluplan.tr
**Status**: 🔴 ROOT CAUSE IDENTIFIED

---

## Executive Summary

The backend application is correctly configured in Coolify with the domain `api.aluplan.tr`, but there is a **critical port mismatch** causing the "no available server" error.

**Root Cause**: Coolify is routing traffic to port **3001**, but the NestJS backend container is listening on port **9006**.

---

## Configuration Analysis

### ✅ What's Working

1. **Domain Configuration**: `api.aluplan.tr` is properly configured in Coolify
2. **SSL/HTTPS**: HTTPS is enabled with Traefik labels
3. **Container Health**: Backend container is running and healthy
4. **DNS**: Domain resolves correctly
5. **Traefik Labels**: Properly configured for routing

### ❌ Critical Issue: Port Mismatch

**Current Coolify Configuration**:
- **Ports Exposes**: `3001`
- **Domain**: `http://api.aluplan.tr`
- **Traefik Routing**: Configured to route to port 3001

**Actual Backend Container**:
- **Container Port**: `9006` (NestJS application listening port)
- **Dockerfile EXPOSE**: `EXPOSE 9006`
- **Environment**: `PORT=9006`

**Result**: When external requests hit `api.aluplan.tr`:
1. Traefik receives the request
2. Traefik routes to backend container on port 3001
3. Backend container is NOT listening on port 3001 (listening on 9006)
4. Connection fails → "no available server"

---

## Evidence

### Screenshots Captured

1. **tab-configuration.png**: Shows `Ports Exposes: 3001`
2. **tab-domains.png**: Shows domain `http://api.aluplan.tr`
3. **tab-general.png**: General configuration
4. **step3-backend-overview.png**: Backend application overview

### Configuration Details

```yaml
# Coolify Configuration (INCORRECT)
Domains: http://api.aluplan.tr
Ports Exposes: 3001
Dockerfile: Dockerfile

# Actual Backend Configuration (CORRECT)
Container Port: 9006
Dockerfile EXPOSE: 9006
Environment Variable: PORT=9006
```

### Traefik Labels (from screenshot)

```yaml
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.routers.http-0-bkkco4kccb00g8gkgowcsc.middlewares=gzip
traefik.http.routers.http-0-bkkco4kccb00g8gkgowcsc.rule=Host(`api.aluplan.tr`) && PathPrefix(`/`)
traefik.http.routers.http-0-bkkco4kccb00g8gkgowcsc.service=http-0-bkkco4kccb00g8gkgowcsc
traefik.http.services.http-0-bkkco4kccb00g8gkgowcsc.loadbalancer.server.port=3001  # ⚠️ WRONG PORT
```

**The critical line**: `loadbalancer.server.port=3001` should be `9006`

---

## Solution: Fix Port Configuration in Coolify

### Step-by-Step Fix

1. **Navigate to Backend Application**:
   - Go to: https://coolify.aluplan.tr/project/mgccww0k04gkg0s0g8w4cw08/environment/ic4g4kc880ocwscg800g440w
   - Click on "Aluplan AffexAI Backend"

2. **Update Port Configuration**:
   - Click on "Configuration" tab (left sidebar under "General")
   - Find "Ports Exposes" field
   - **Change from**: `3001`
   - **Change to**: `9006`

3. **Verify Domain Configuration**:
   - Ensure "Domains" field shows: `http://api.aluplan.tr`
   - Optional but recommended: Change to `https://api.aluplan.tr` for forced HTTPS

4. **Save and Redeploy**:
   - Click "Save" button (top right)
   - Click "Redeploy" button
   - Wait 2-3 minutes for changes to propagate to Traefik

5. **Verify Fix**:
   ```bash
   # Test backend health endpoint
   curl https://api.aluplan.tr/api/health

   # Should return:
   # {"status":"ok","timestamp":"..."}
   ```

---

## Alternative: Update Backend to Listen on Port 3001

If you prefer to keep Coolify configuration at port 3001, you can update the backend:

### Option A: Update Environment Variable in Coolify

1. Go to "Environment Variables" tab
2. Find or add: `PORT=3001`
3. Save and redeploy

### Option B: Update Dockerfile

```dockerfile
# Change EXPOSE directive
EXPOSE 3001

# Update CMD if needed
CMD ["node", "dist/main.js"]  # NestJS will read PORT from env
```

**Note**: Option 1 (changing Coolify to port 9006) is RECOMMENDED as it matches the existing backend configuration.

---

## Technical Details

### Why Port 9006?

The backend application currently uses port 9006 based on:

1. **Environment Variable**: `PORT=9006` (likely set in .env)
2. **Dockerfile**: `EXPOSE 9006`
3. **NestJS Main**: Uses `process.env.PORT || 9006`

### Current Docker Container Status

```bash
# Container is running and healthy
Container: affexai-backend
Status: Running (healthy)
Internal Port: 9006
Listening: 0.0.0.0:9006

# But Traefik is routing to port 3001 (MISMATCH)
```

---

## Testing After Fix

### 1. Health Check

```bash
curl https://api.aluplan.tr/api/health
# Expected: {"status":"ok","timestamp":"2025-11-24T..."}
```

### 2. API Endpoint Test

```bash
curl https://api.aluplan.tr/api/auth/me
# Expected: 401 Unauthorized (correct - no token)
```

### 3. Check Traefik Routing

```bash
# SSH into Coolify server
docker logs traefik | grep api.aluplan.tr

# Should show routing to port 9006 after fix
```

---

## Post-Fix Verification Checklist

- [ ] Coolify "Ports Exposes" changed to 9006
- [ ] Configuration saved
- [ ] Application redeployed
- [ ] Wait 2-3 minutes for propagation
- [ ] Test: `curl https://api.aluplan.tr/api/health`
- [ ] Verify Traefik logs show correct port
- [ ] Test frontend connection to backend

---

## Summary

**Issue**: Port mismatch between Coolify configuration (3001) and backend container (9006)

**Fix**: Change "Ports Exposes" in Coolify from `3001` to `9006`

**Impact**: Immediate fix - no code changes required

**Estimated Fix Time**: 5 minutes + 2-3 minutes propagation

---

## Additional Notes

### Why Was Port 3001 Configured?

Likely causes:
1. Default Coolify template used port 3001
2. Initial configuration mistake
3. Port was changed in backend but not updated in Coolify

### Prevention

To avoid this issue in future:
1. Always verify "Ports Exposes" matches Dockerfile EXPOSE
2. Check environment variables for PORT setting
3. Test with `docker ps` to see actual listening port
4. Monitor Traefik labels during deployment

---

## Contact & Support

**Diagnostic Tool**: Playwright automated browser testing
**Screenshots Location**: `/Users/hazarekiz/Projects/v06/Affexai/claudedocs/coolify-screenshots/`
**Report Generated**: 2025-11-24T08:39:12.020Z

---

**Status**: 🔴 Awaiting manual fix in Coolify UI
**Priority**: CRITICAL - Blocks all backend API access
**Complexity**: LOW - Simple port configuration change
**Risk**: LOW - Safe to change (no data impact)
