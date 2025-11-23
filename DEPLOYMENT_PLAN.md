# 🚀 Affexai Coolify Deployment Plan

**Tarih**: 2025-11-23
**Version**: 1.0
**Status**: Ready for Deployment

---

## 📊 Current State

### Local Environment
- **Node**: v20.19.5
- **npm**: 10.8.2
- **Backend**: NestJS 11.0.9, Running on :9006
- **Frontend**: Next.js 15.3.3, Running on :9003
- **Database**: PostgreSQL (Docker)
- **Cache**: Redis (Docker)
- **Git**: Clean state, tag `stable-node20-local`

### Dockerfile Configuration
- **Backend**: `FROM node:18-alpine`
- **Frontend**: `FROM node:18-alpine`
- **Issue**: Node version mismatch (local=20, docker=18)

---

## ⚠️ Critical Issues

### 1. Node Version Mismatch
**Problem**: bcrypt native module compiled for Node 20 locally, but Dockerfile uses Node 18
**Impact**: Backend fails to start in Docker
**Solution**: Choose one of 3 strategies below

### 2. Monorepo Deployment
**Problem**: Coolify has limited monorepo support
**Solution**: Deploy backend and frontend as separate applications with base directory settings

---

## 🎯 Deployment Strategies (Choose ONE)

### Strategy A: Upgrade to Node 20 (RECOMMENDED)

**Rationale**: Align Dockerfile with local environment

**Steps**:
1. Update both Dockerfiles to `FROM node:20-alpine`
2. Add bcrypt rebuild in backend Dockerfile:
   ```dockerfile
   # After npm ci in production stage
   RUN apk add --no-cache make gcc g++ python3 && \
       npm rebuild bcrypt --build-from-source && \
       apk del make gcc g++ python3
   ```
3. Test Docker build locally
4. Push to GitHub
5. Deploy to Coolify

**Pros**:
- ✅ Matches local environment
- ✅ Keeps bcrypt (better performance)
- ✅ Future-proof

**Cons**:
- ❌ Slightly larger Docker image
- ❌ Longer build time (bcrypt rebuild)

---

### Strategy B: Switch to bcryptjs (SAFEST)

**Rationale**: Eliminate native module issues entirely

**Steps**:
1. Replace bcrypt with bcryptjs:
   ```bash
   npm uninstall bcrypt
   npm install bcryptjs
   npm install --save-dev @types/bcryptjs
   ```

2. Update imports (minimal changes):
   ```typescript
   // Before
   import * as bcrypt from 'bcrypt';

   // After
   import * as bcrypt from 'bcryptjs';
   ```

3. Test locally
4. Push to GitHub
5. Deploy to Coolify

**Pros**:
- ✅ **Zero Docker issues**
- ✅ Works on any Node version
- ✅ Same API (drop-in replacement)
- ✅ Fastest deployment

**Cons**:
- ❌ Slightly slower hashing (negligible in production)

**Recommendation**: This is the **industry standard** for Docker deployments ([source](https://stackoverflow.com/questions/34546272/cannot-find-module-bcrypt))

---

### Strategy C: Downgrade Local to Node 18

**Rationale**: Match local to Dockerfile

**Steps**:
1. Install Node 18 locally:
   ```bash
   nvm install 18
   nvm use 18
   ```
2. Rebuild dependencies:
   ```bash
   npm rebuild bcrypt --build-from-source
   ```
3. Test locally
4. Deploy to Coolify

**Pros**:
- ✅ No Dockerfile changes

**Cons**:
- ❌ Lose Node 20 features locally
- ❌ Team members must also use Node 18
- ❌ Not recommended for long-term

---

## 📋 Coolify Configuration

### Backend Service

**Application Settings**:
- **Name**: affexai-backend
- **Base Directory**: `/apps/backend`
- **Build Pack**: Dockerfile
- **Dockerfile Location**: `/apps/backend/Dockerfile`
- **Port Expose**: 3001
- **Health Check Path**: `/health`

**Environment Variables**:
```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=affexai
DATABASE_PASSWORD=<generate-secure-password>
DATABASE_NAME=affexai

REDIS_HOST=redis
REDIS_PORT=6379

JWT_SECRET=<generate-secure-secret>
JWT_EXPIRES_IN=7d

NODE_ENV=production
PORT=3001

# AWS S3
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_S3_BUCKET=affexai-uploads
AWS_REGION=us-east-1

# Email (Resend)
RESEND_API_KEY=<your-key>

# AI Providers (Optional)
OPENAI_API_KEY=<your-key>
ANTHROPIC_API_KEY=<your-key>
GOOGLE_AI_API_KEY=<your-key>
```

---

### Frontend Service

**Application Settings**:
- **Name**: affexai-frontend
- **Base Directory**: `/apps/frontend`
- **Build Pack**: Dockerfile
- **Dockerfile Location**: `/apps/frontend/Dockerfile`
- **Port Expose**: 3000
- **Auto Deploy**: true

**Environment Variables**:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

---

### Database (PostgreSQL)

**Service**:
- **Name**: affexai-postgres
- **Type**: PostgreSQL 14
- **Volume**: `/var/lib/postgresql/data`

**Credentials**:
```env
POSTGRES_DB=affexai
POSTGRES_USER=affexai
POSTGRES_PASSWORD=<generate-secure-password>
```

---

### Cache (Redis)

**Service**:
- **Name**: affexai-redis
- **Type**: Redis 7
- **Volume**: `/data`

---

## 🔐 Security Checklist

- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Generate strong database passwords
- [ ] Configure CORS properly (only allow your domain)
- [ ] Enable HTTPS (Coolify auto-generates SSL)
- [ ] Set up firewall rules
- [ ] Configure rate limiting
- [ ] Enable database backups
- [ ] Set up monitoring/alerts

---

## 🧪 Testing Plan

### Local Docker Build Test
```bash
# Test backend Docker build
cd apps/backend
docker build -t affexai-backend:test .
docker run -p 3001:3001 affexai-backend:test

# Test frontend Docker build
cd apps/frontend
docker build -t affexai-frontend:test .
docker run -p 3000:3000 affexai-frontend:test
```

### Deployment Steps
1. **Test locally** with Docker
2. **Push to GitHub** (main/master branch)
3. **Create Coolify application** for backend
4. **Create Coolify application** for frontend
5. **Configure PostgreSQL service**
6. **Configure Redis service**
7. **Link services** (backend → postgres, redis)
8. **Deploy backend** first
9. **Deploy frontend** after backend is healthy
10. **Run database migrations**
11. **Verify health endpoints**
12. **Test critical user flows**

---

## 🚨 Rollback Plan

If deployment fails:

1. **Revert to stable tag**:
   ```bash
   git reset --hard stable-node20-local
   git push -f origin main
   ```

2. **Coolify auto-redeploys** previous version

3. **Check logs**:
   - Backend: Coolify → affexai-backend → Logs
   - Frontend: Coolify → affexai-frontend → Logs

---

## 📚 References

- [Coolify Monorepo Deployment](https://github.com/coollabsio/coolify/discussions/2716)
- [Next.js Coolify Setup](https://coolify.io/docs/applications/nextjs)
- [bcrypt Docker Issues](https://stackoverflow.com/questions/34546272/cannot-find-module-bcrypt)
- [NestJS Coolify Deployment](https://www.arijit.dev/blog/host-nestjs-microservices-on-coolify)

---

## ✅ Recommended Strategy

**Strategy B: Switch to bcryptjs**

**Reasoning**:
1. Most reliable for Docker deployments
2. Zero native module compilation issues
3. Works across all Node versions
4. Industry standard practice
5. Fastest deployment path

**Next Steps**:
1. Review this plan
2. Choose strategy
3. Execute checklist
4. Deploy to Coolify
5. Monitor and verify

---

**Created**: 2025-11-23
**Last Updated**: 2025-11-23
**Status**: ✅ Ready for Review
