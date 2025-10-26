# 🚀 Affexai Deployment Guide

Complete guide for deploying Affexai to different environments and platforms.

---

## 📋 Table of Contents

1. [Environment Configuration](#-environment-configuration)
2. [Deployment Scenarios](#-deployment-scenarios)
3. [Platform-Specific Guides](#-platform-specific-guides)
4. [Post-Deployment Checklist](#-post-deployment-checklist)
5. [Troubleshooting](#-troubleshooting)

---

## 🔧 Environment Configuration

### Critical Environment Variables

The most important configuration is the **URL matching** between backend and frontend:

```bash
# Backend (.env)
FRONTEND_URL=https://yourapp.com

# Frontend (.env.local)
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

**Why this matters:**
- Email verification links use `FRONTEND_URL` from backend
- Password reset links use `FRONTEND_URL` from backend
- Social sharing uses `NEXT_PUBLIC_APP_URL` from frontend
- **These MUST match** or users will get broken links!

### Backend Environment Variables

Copy `apps/backend/.env.example` to `apps/backend/.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secure-password
DB_NAME=affexai_production

# JWT
JWT_SECRET=generate-strong-random-32-char-secret
JWT_EXPIRES_IN=3600

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=redis-password

# Application
APP_PROTOCOL=https
APP_HOST=api.yourapp.com
PORT=3001

# Email Encryption (32 bytes hex)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ENCRYPTION_KEY=your-32-byte-hex-key

# Frontend URL - CRITICAL!
FRONTEND_URL=https://yourapp.com

# CORS
CORS_ORIGINS=https://yourapp.com,https://www.yourapp.com
```

### Frontend Environment Variables

Copy `apps/frontend/.env.local.example` to `apps/frontend/.env.local` and configure:

```bash
# Backend API
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api

# Application URL - MUST MATCH backend FRONTEND_URL
NEXT_PUBLIC_APP_URL=https://yourapp.com
NEXT_PUBLIC_APP_NAME=Affexai

# S3/MinIO (for public file access)
NEXT_PUBLIC_S3_PUBLIC_URL=https://cdn.yourapp.com/affexai-files
```

---

## 🎯 Deployment Scenarios

### Scenario 1: Same Domain (Recommended)

**Setup:**
- Frontend: `yourapp.com`
- Backend API: `yourapp.com/api`
- CDN: `cdn.yourapp.com`

**Backend `.env`:**
```bash
FRONTEND_URL=https://yourapp.com
CORS_ORIGINS=https://yourapp.com
```

**Frontend `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=https://yourapp.com/api
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

**Advantages:**
- ✅ No CORS issues
- ✅ Simpler configuration
- ✅ Better for SEO

---

### Scenario 2: Subdomain Setup

**Setup:**
- Frontend: `portal.yourapp.com`
- Backend API: `api.yourapp.com`
- Admin Panel: `admin.yourapp.com`

**Backend `.env`:**
```bash
FRONTEND_URL=https://portal.yourapp.com
CORS_ORIGINS=https://portal.yourapp.com,https://admin.yourapp.com
```

**Frontend `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_APP_URL=https://portal.yourapp.com
```

**Advantages:**
- ✅ Clear separation of concerns
- ✅ Can deploy frontend/backend independently
- ⚠️ Requires CORS configuration

---

### Scenario 3: Different Domains

**Setup:**
- Frontend: `affexai.com`
- Backend API: `api.affexai-backend.com`

**Backend `.env`:**
```bash
FRONTEND_URL=https://affexai.com
CORS_ORIGINS=https://affexai.com
```

**Frontend `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=https://api.affexai-backend.com/api
NEXT_PUBLIC_APP_URL=https://affexai.com
```

**Advantages:**
- ✅ Complete separation
- ⚠️ Requires careful CORS setup
- ⚠️ SSL certificates for both domains

---

### Scenario 4: Multi-Environment (Dev/Staging/Production)

**Development:**
```bash
# Backend
FRONTEND_URL=http://localhost:9003

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:9006/api
NEXT_PUBLIC_APP_URL=http://localhost:9003
```

**Staging:**
```bash
# Backend
FRONTEND_URL=https://staging.yourapp.com

# Frontend
NEXT_PUBLIC_API_URL=https://api-staging.yourapp.com/api
NEXT_PUBLIC_APP_URL=https://staging.yourapp.com
```

**Production:**
```bash
# Backend
FRONTEND_URL=https://yourapp.com

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

---

## 🏗️ Platform-Specific Guides

### Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
1. Connect GitHub repository
2. Set build command: `cd apps/frontend && npm run build`
3. Set output directory: `apps/frontend/.next`
4. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://yourapp-backend.up.railway.app/api
   NEXT_PUBLIC_APP_URL=https://yourapp.vercel.app
   ```

**Backend (Railway):**
1. Connect GitHub repository
2. Set start command: `cd apps/backend && npm run start:prod`
3. Environment variables: (all from backend .env)
4. **IMPORTANT:** Set `FRONTEND_URL` to match Vercel URL

---

### AWS (Full Stack)

**Frontend (S3 + CloudFront):**
1. Build: `cd apps/frontend && npm run build`
2. Deploy to S3 bucket
3. Configure CloudFront distribution
4. Environment variables in build pipeline

**Backend (EC2/ECS/Fargate):**
1. Build Docker image
2. Push to ECR
3. Deploy to ECS/Fargate
4. Set environment variables in task definition
5. **IMPORTANT:** Set `FRONTEND_URL` to CloudFront URL

---

### DigitalOcean App Platform

**Backend:**
```yaml
name: affexai-backend
services:
  - name: api
    source_dir: apps/backend
    build_command: npm run build
    run_command: npm run start:prod
    envs:
      - key: FRONTEND_URL
        value: ${APP_URL}
```

**Frontend:**
```yaml
name: affexai-frontend
services:
  - name: web
    source_dir: apps/frontend
    build_command: npm run build
    envs:
      - key: NEXT_PUBLIC_APP_URL
        value: ${APP_URL}
```

---

### Docker Compose (Self-Hosted)

```yaml
version: '3.8'

services:
  backend:
    build: ./apps/backend
    environment:
      - FRONTEND_URL=https://yourapp.com
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/affexai
    ports:
      - "3001:3001"

  frontend:
    build: ./apps/frontend
    environment:
      - NEXT_PUBLIC_API_URL=https://yourapp.com/api
      - NEXT_PUBLIC_APP_URL=https://yourapp.com
    ports:
      - "3000:3000"

  postgres:
    image: postgres:14
    environment:
      - POSTGRES_DB=affexai
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:7-alpine
```

---

## ✅ Post-Deployment Checklist

### 1. Verify URL Configuration

Test email verification link:
```bash
# Register a new user
curl -X POST https://yourapp.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Check email - verification link should be:
# https://yourapp.com/verify-email/{token}
# NOT http://localhost:9002/verify-email/{token}
```

### 2. Test Email Settings

1. Go to Admin Settings → Email Ayarları
2. Select your email provider (Resend, SendGrid, etc.)
3. Enter API key
4. Click "DNS Kayıtlarını Kontrol Et"
5. Verify all DNS records are green ✅

### 3. Verify CORS

```bash
curl -X OPTIONS https://api.yourapp.com/api/auth/login \
  -H "Origin: https://yourapp.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should return:
```
Access-Control-Allow-Origin: https://yourapp.com
Access-Control-Allow-Methods: POST
```

### 4. Check Health Endpoints

```bash
# Backend health
curl https://api.yourapp.com/api/health

# Frontend health
curl https://yourapp.com/api/health
```

### 5. Database Migrations

```bash
cd apps/backend
npm run typeorm:migration:run
```

### 6. Email Settings Database

Verify email settings in database:
```sql
SELECT key, value FROM settings WHERE category = 'email' ORDER BY key;
```

Should see:
- `provider`: resend/sendgrid/etc
- `resend.apiKey`: your API key
- `transactional.*`: from email settings
- `marketing.*`: marketing email settings

---

## 🔍 Troubleshooting

### Issue: Email verification links point to localhost

**Problem:**
```
Email contains: http://localhost:9002/verify-email/{token}
Should be: https://yourapp.com/verify-email/{token}
```

**Solution:**
1. Check backend `.env`: `FRONTEND_URL=https://yourapp.com`
2. Restart backend after changing
3. Clear any backend cache/compiled code
4. Send new test email

---

### Issue: CORS errors in browser console

**Problem:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Backend `.env`: `CORS_ORIGINS=https://yourapp.com`
2. Restart backend
3. Verify with curl (see checklist above)

---

### Issue: Emails not sending

**Problem:** Users register but don't receive verification email

**Checklist:**
1. ✅ Backend email settings configured?
   ```sql
   SELECT * FROM settings WHERE category = 'email';
   ```
2. ✅ Email provider API key valid?
3. ✅ DNS records configured? (Use admin panel DNS checker)
4. ✅ Check backend logs for email sending errors
5. ✅ Verify `transactional.fromEmail` is a verified domain

---

### Issue: API calls fail in production

**Problem:** Frontend can't connect to backend

**Checklist:**
1. ✅ `NEXT_PUBLIC_API_URL` set correctly in frontend?
2. ✅ Backend accessible from internet?
3. ✅ SSL certificate valid on backend?
4. ✅ Firewall rules allow traffic?
5. ✅ Health endpoint responding?

---

## 📝 Environment Variable Quick Reference

### Backend MUST HAVE:
- `FRONTEND_URL` - Where your frontend is deployed
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST` - Redis for caching
- `JWT_SECRET` - Strong random secret
- `ENCRYPTION_KEY` - 32 byte hex for email encryption
- `CORS_ORIGINS` - Frontend URL(s)

### Frontend MUST HAVE:
- `NEXT_PUBLIC_APP_URL` - Your frontend URL (MUST match backend `FRONTEND_URL`)
- `NEXT_PUBLIC_API_URL` - Your backend API URL

### Email Provider (one of):
- Resend: Settings → Email → Resend API Key
- SendGrid: Settings → Email → SendGrid API Key
- (etc.)

---

## 🎯 Best Practices

1. **Always use HTTPS in production**
2. **Match frontend/backend URLs exactly**
3. **Test email flow after deployment**
4. **Verify DNS records before going live**
5. **Use different secrets for each environment**
6. **Keep .env files out of git** (use .env.example)
7. **Document your deployment architecture**
8. **Set up monitoring for email delivery**

---

## 📞 Support

If you encounter issues not covered here:

1. Check backend logs: `docker logs affexai-backend`
2. Check frontend logs: `vercel logs` or equivalent
3. Verify all environment variables are set
4. Test in development first
5. Create GitHub issue with deployment details

---

**Version:** 1.0.0
**Last Updated:** 2025-10-26
**Maintainer:** Affexai Team
