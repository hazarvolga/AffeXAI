# 🚀 Affexai Production Deployment Guide

> **Last Updated**: 2025-11-24
> **Version**: 2.0.0 - Professional Migration-Based Deployment

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Database Migration Strategy](#database-migration-strategy)
4. [Deployment Steps](#deployment-steps)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedure](#rollback-procedure)

---

## Overview

This deployment uses **TypeORM migration-based data seeding** for a professional, repeatable, and safe production deployment process.

### ✅ Advantages of This Approach

| Feature | Benefit |
|---------|---------|
| **Version Controlled** | All data changes tracked in git |
| **Idempotent** | Safe to run multiple times |
| **Rollback Capable** | Can revert changes if needed |
| **Automated** | No manual SQL execution |
| **Production-Safe** | Environment-aware configuration |
| **CI/CD Ready** | Integrates with deployment pipelines |

---

## Prerequisites

### 1. Infrastructure

- [x] Coolify v4.0.0+ installed
- [x] PostgreSQL 17 service running
- [x] Redis service running (optional)
- [x] Domain configured (api.aluplan.tr, aluplan.tr)
- [x] SSL certificates (Let's Encrypt)

### 2. Environment Variables

Copy [.env.production.template](.env.production.template) and configure all required variables in Coolify.

**Critical Variables**:
```bash
# Database (auto-configured by Coolify)
DATABASE_URL=postgresql://user:password@host:5432/database

# Application
NODE_ENV=production
JWT_SECRET=<generate-secure-random-string>

# AI Provider (at least one required)
GOOGLE_AI_API_KEY=AIzaSy...
# OR
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...
```

**Generate Secure Secrets**:
```bash
# JWT secrets
openssl rand -base64 32

# Password hashing salt
openssl rand -base64 16
```

---

## Database Migration Strategy

### Migration Structure

```
apps/backend/src/database/
├── data-source.ts                  # Production-ready config
└── migrations/
    └── 1762300000000-SeedProductionData.ts  # Seeds roles, settings, admin
```

### What Gets Seeded

**1. Roles (10 entries)**:
- admin, editor, customer, support_team, viewer
- marketing_manager, social_media_manager, content_creator
- subscriber, partner

**2. Settings (16 entries)**:
- Company info (name, email, phone, timezone)
- Email configuration
- AI provider settings
- Analytics settings

**3. Admin User (1 entry)**:
- Email: `admin@affexai.com`
- Password: `admin123` ⚠️ **MUST CHANGE AFTER FIRST LOGIN**

### Key Features

✅ **Idempotent**: Uses `ON CONFLICT DO NOTHING`
✅ **Rollback**: Includes `down()` method
✅ **Environment-Aware**: Uses `DATABASE_URL` if available
✅ **No Hardcoded Values**: Falls back to environment variables

---

## Deployment Steps

### Step 1: Prepare Code

```bash
# 1. Ensure all changes are committed
git status

# 2. Build locally to verify
cd apps/backend
npm run build

# 3. Commit migration and deployment scripts
git add src/database/data-source.ts
git add src/database/migrations/1762300000000-SeedProductionData.ts
git add .coolify-deploy.sh
git add .env.production.template
git add DEPLOYMENT.md

git commit -m "feat: add production-ready migration-based deployment system

- Update data-source.ts to use DATABASE_URL in production
- Add SeedProductionData migration (roles, settings, admin user)
- Add automated deployment script (.coolify-deploy.sh)
- Add environment variables template
- Add comprehensive deployment documentation
- Disable synchronize in production for safety

BREAKING CHANGE: synchronize is now disabled in production.
All schema changes must be done via migrations.
"

git push origin main
```

### Step 2: Configure Coolify

#### A. Environment Variables

Go to Coolify → Backend Service → Environment Variables:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://...  # Auto-configured by Coolify
JWT_SECRET=<your-secure-secret>
GOOGLE_AI_API_KEY=<your-api-key>
RESEND_API_KEY=<your-resend-key>
AWS_ACCESS_KEY_ID=<your-aws-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret>
AWS_S3_BUCKET=affexai-uploads
CORS_ORIGIN=https://aluplan.tr
FRONTEND_URL=https://aluplan.tr
```

#### B. Post-Deploy Hook

Go to Coolify → Backend Service → Build Pack → Post-Deploy Script:

```bash
# Option 1: Use deployment script (recommended)
bash .coolify-deploy.sh

# Option 2: Run migrations directly
cd apps/backend && npm run typeorm:migration:run
```

### Step 3: Deploy

#### Manual Deployment

1. Go to Coolify Dashboard
2. Click on Backend Service
3. Click "Deploy" button
4. Monitor deployment logs

#### Automatic Deployment (Git Push)

1. Push to main branch
2. Coolify auto-deploys (if webhook configured)
3. Post-deploy script runs automatically

### Step 4: Verify Deployment

```bash
# 1. Check deployment logs
# Look for:
# - "Migrations completed successfully"
# - "Roles table has 10 entries"
# - "Settings table has 16 entries"
# - "Users table has 1 entries"

# 2. Access backend health endpoint
curl https://api.aluplan.tr/health
# Expected: {"status":"ok"}

# 3. Test admin login
# URL: https://aluplan.tr/admin/login
# Email: admin@affexai.com
# Password: admin123

# 4. Verify database via PostgreSQL terminal (Coolify)
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM roles;"
# Expected: 10

psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM settings;"
# Expected: 16

psql "$DATABASE_URL" -c "SELECT email FROM users;"
# Expected: admin@affexai.com
```

---

## Verification Checklist

### ✅ Backend

- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] Database has 10 roles
- [ ] Database has 16 settings
- [ ] Admin user exists and can login
- [ ] API endpoints respond correctly

### ✅ Frontend

- [ ] Homepage loads without 404
- [ ] Navigation menu displays
- [ ] Admin panel accessible
- [ ] Login works with admin credentials
- [ ] CMS pages render correctly

### ✅ Security

- [ ] Admin password changed from default
- [ ] JWT secrets are unique and secure
- [ ] Environment variables don't contain defaults
- [ ] SSL certificates are valid
- [ ] CORS origin is correct

---

## Troubleshooting

### Issue 1: Migration Fails with "relation does not exist"

**Cause**: Schema migrations not run before data migration.

**Solution**:
```bash
# Check migration status
cd apps/backend
npm run typeorm:migration:show

# Run all pending migrations
npm run typeorm:migration:run
```

### Issue 2: "Roles table is empty"

**Cause**: Migration ran but `ON CONFLICT` skipped inserts (unlikely).

**Solution**:
```bash
# Check if roles exist
psql "$DATABASE_URL" -c "SELECT name FROM roles;"

# If empty, check migration logs
# Rerun migration (it's idempotent)
npm run typeorm:migration:run
```

### Issue 3: "Cannot connect to database"

**Cause**: `DATABASE_URL` not configured or incorrect.

**Solution**:
```bash
# Verify DATABASE_URL
echo $DATABASE_URL

# Test connection manually
psql "$DATABASE_URL" -c "SELECT version();"

# Check Coolify PostgreSQL service is running
```

### Issue 4: Frontend shows 404 on homepage

**Cause**: No CMS pages in database.

**Solution**:
```bash
# 1. Login to admin panel
# 2. Go to CMS → Pages
# 3. Create homepage (slug: "/")
# 4. Publish the page

# OR: Seed CMS pages via migration (TODO for next version)
```

### Issue 5: "synchronize is not working"

**Expected Behavior**: `synchronize: false` in production.

**Explanation**: This is intentional for safety. All schema changes must be done via migrations.

**How to Add New Tables**:
```bash
# 1. Update entity
# 2. Generate migration
cd apps/backend
npm run typeorm:migration:generate src/database/migrations/AddNewFeature

# 3. Review generated migration
# 4. Test locally
npm run typeorm:migration:run

# 5. Commit and deploy
git add src/database/migrations/*
git commit -m "feat: add new feature migration"
git push
```

---

## Rollback Procedure

### Rollback Last Migration

```bash
cd apps/backend
npm run typeorm:migration:revert
```

This will execute the `down()` method of [1762300000000-SeedProductionData.ts](apps/backend/src/database/migrations/1762300000000-SeedProductionData.ts:369-402), which:
1. Removes admin user role assignments
2. Deletes admin user
3. Deletes all settings
4. Deletes all roles

### Full Rollback to Clean State

```bash
# Revert all migrations (DANGEROUS - only for emergencies)
while npm run typeorm:migration:revert 2>/dev/null; do
  echo "Reverted migration"
done

# Verify database is empty
psql "$DATABASE_URL" -c "\dt"
```

### Restore from Backup (Recommended)

```bash
# If you have a backup
pg_restore -d "$DATABASE_URL" /path/to/backup.dump

# OR use Coolify's backup restore feature
```

---

## Migration Workflow for Future Changes

### Adding New Data

```bash
# 1. Create new migration
npm run typeorm:migration:generate src/database/migrations/SeedNewFeature

# 2. Edit migration file
# Add INSERT statements with ON CONFLICT DO NOTHING

# 3. Test locally
npm run typeorm:migration:run

# 4. Verify data
psql -d affexai_dev -c "SELECT * FROM your_table;"

# 5. Test rollback
npm run typeorm:migration:revert

# 6. Re-run migration
npm run typeorm:migration:run

# 7. Commit and deploy
git add src/database/migrations/*
git commit -m "feat: add new feature data seeding"
git push
```

### Best Practices

✅ **DO**:
- Always use `ON CONFLICT DO NOTHING` for idempotency
- Test migrations locally before production
- Include `down()` method for rollback
- Use `gen_random_uuid()` for PostgreSQL UUID generation
- Document migration purpose in comments

❌ **DON'T**:
- Use hardcoded UUIDs (use `gen_random_uuid()`)
- Skip testing `down()` method
- Use `synchronize: true` in production
- Hardcode credentials in migrations
- Mix schema changes with data seeding (separate migrations)

---

## Monitoring & Maintenance

### Daily Checks

```bash
# 1. Check application logs (Coolify)
# 2. Monitor error rate
# 3. Check database disk usage
```

### Weekly Tasks

```bash
# 1. Review migration status
npm run typeorm:migration:show

# 2. Check for pending schema changes
git log --oneline --all -- src/database/migrations/

# 3. Verify backups (if configured)
```

### Monthly Tasks

```bash
# 1. Update dependencies
npm outdated

# 2. Review security audit
npm audit

# 3. Performance optimization
# - Check slow query logs
# - Review database indexes
```

---

## Additional Resources

- [TypeORM Migrations Documentation](https://typeorm.io/migrations)
- [Coolify Documentation](https://coolify.io/docs)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [NestJS Production Guide](https://docs.nestjs.com/deployment)

---

## Support

**Issues or Questions?**
- Check [CLAUDE.md](CLAUDE.md) for architecture details
- Review [güvenlikraporu.md](güvenlikraporu.md) for security guidelines
- Open GitHub issue for bugs

**Critical Production Issues?**
- Contact: admin@affexai.com
- Emergency rollback: See [Rollback Procedure](#rollback-procedure)

---

**✅ Deployment Checklist Summary**

Before going live:
- [ ] All environment variables configured
- [ ] JWT secrets are unique and secure
- [ ] AI API keys are valid
- [ ] AWS S3 credentials working
- [ ] Database migrations run successfully
- [ ] Admin password changed from default
- [ ] Frontend loads without errors
- [ ] SSL certificates valid
- [ ] Backup strategy in place (optional)
- [ ] Monitoring configured (optional)

---

**🎉 Congratulations!** You've successfully deployed Affexai to production using a professional, migration-based approach.
