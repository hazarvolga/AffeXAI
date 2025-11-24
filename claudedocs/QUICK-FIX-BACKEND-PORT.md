# 🚨 QUICK FIX: Backend "No Available Server" Error

## 🎯 Problem Identified

**Root Cause**: Port mismatch in Coolify configuration

```
❌ Current (WRONG):
   Coolify "Ports Exposes": 3001
   Backend listening on:   9006
   Result: Connection fails → "no available server"

✅ Should Be (CORRECT):
   Coolify "Ports Exposes": 9006
   Backend listening on:   9006
   Result: Connections work perfectly
```

---

## 🔧 Fix Steps (5 minutes)

### Step 1: Open Coolify Backend Configuration

1. Go to: https://coolify.aluplan.tr/
2. Login with: hazarvolga@gmail.com
3. Navigate to: **AffexAI Aluplan** project → **production** environment
4. Click on: **Aluplan AffexAI Backend**

### Step 2: Update Port Configuration

1. Click **"Configuration"** tab (in left sidebar under "General")
2. Scroll to **"Ports Exposes"** field
3. Current value: `3001`
4. **Change to**: `9006`
5. Click **"Save"** (top right corner)

### Step 3: Redeploy

1. Click **"Redeploy"** button (top right, next to "Save")
2. Wait 2-3 minutes for:
   - Container restart
   - Traefik routing update
   - SSL certificate verification

### Step 4: Verify Fix

Open terminal and test:

```bash
# Test 1: Health endpoint
curl https://api.aluplan.tr/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-11-24T..."}

# Test 2: Any API endpoint
curl https://api.aluplan.tr/api/auth/me

# Expected response:
# 401 Unauthorized (correct - no token provided)
```

---

## 📸 Visual Guide

### Current Configuration (WRONG)
```
┌─────────────────────────────────────┐
│ Coolify Configuration               │
├─────────────────────────────────────┤
│ Domains: http://api.aluplan.tr      │
│ Ports Exposes: 3001  ← WRONG PORT   │
└─────────────────────────────────────┘
              │
              │ Traefik routes to port 3001
              ▼
┌─────────────────────────────────────┐
│ Backend Container                   │
├─────────────────────────────────────┤
│ Listening on port: 9006             │
│ NOT listening on: 3001              │
└─────────────────────────────────────┘
              │
              ▼
         ❌ Connection refused
         "no available server"
```

### Fixed Configuration (CORRECT)
```
┌─────────────────────────────────────┐
│ Coolify Configuration               │
├─────────────────────────────────────┤
│ Domains: http://api.aluplan.tr      │
│ Ports Exposes: 9006  ← CORRECT PORT │
└─────────────────────────────────────┘
              │
              │ Traefik routes to port 9006
              ▼
┌─────────────────────────────────────┐
│ Backend Container                   │
├─────────────────────────────────────┤
│ Listening on port: 9006             │
│ Accepting connections ✅            │
└─────────────────────────────────────┘
              │
              ▼
         ✅ Connection successful
         API responds correctly
```

---

## 🔍 How This Was Discovered

Used Playwright automation to:
1. Login to Coolify
2. Navigate to backend application
3. Screenshot all configuration tabs
4. Analyzed "Ports Exposes" field
5. Cross-referenced with backend Dockerfile and logs

**Evidence**:
- Screenshot: `tab-configuration.png` shows `Ports Exposes: 3001`
- Backend logs: Container listening on port `9006`
- Traefik labels: `loadbalancer.server.port=3001` (incorrect)

---

## ⚡ Quick Copy-Paste

**Port to change FROM**: `3001`
**Port to change TO**: `9006`

**Test command after fix**:
```bash
curl https://api.aluplan.tr/api/health
```

---

## 🛡️ Why This Is Safe

- ✅ No code changes required
- ✅ No database impact
- ✅ No data loss risk
- ✅ Quick rollback (change back to 3001 if needed)
- ✅ Matches existing backend configuration
- ✅ Container already listening on 9006

---

## 📊 Expected Results After Fix

### Before Fix
```bash
$ curl https://api.aluplan.tr/api/health
> no available server
```

### After Fix
```bash
$ curl https://api.aluplan.tr/api/health
> {"status":"ok","timestamp":"2025-11-24T08:45:00.000Z"}
```

---

## 🆘 If Fix Doesn't Work

### Troubleshooting Checklist

1. **Wait 3 minutes**: Traefik needs time to update routing
2. **Check container health**:
   ```bash
   docker ps | grep affexai-backend
   # Should show: healthy
   ```
3. **Check Traefik logs**:
   ```bash
   docker logs traefik | grep api.aluplan.tr
   # Should show port 9006 after fix
   ```
4. **Verify port in container**:
   ```bash
   docker exec affexai-backend netstat -tlnp | grep 9006
   # Should show: LISTEN on 9006
   ```

### Still Not Working?

Check these:
- [ ] DNS: `nslookup api.aluplan.tr` resolves correctly
- [ ] Firewall: Ports 80/443 open on server
- [ ] Backend logs: `docker logs affexai-backend` for errors
- [ ] Coolify saved: Changes saved and redeployed

---

## 📝 Summary

**Problem**: Port mismatch (Coolify: 3001, Backend: 9006)
**Solution**: Change "Ports Exposes" to 9006 in Coolify
**Time**: 5 minutes fix + 3 minutes propagation
**Risk**: None (safe configuration change)
**Impact**: Fixes all backend API access immediately

---

**Last Updated**: 2025-11-24
**Status**: Ready to fix
**Action Required**: Manual update in Coolify UI
