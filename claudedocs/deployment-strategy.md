# 🚀 Affexai Production Deployment Strategy

## 📋 Table of Contents
1. [Database Migration Strategy](#database-migration-strategy)
2. [Git Workflow (GitFlow)](#git-workflow-gitflow)
3. [Coolify Configuration](#coolify-configuration)
4. [Environment Variables](#environment-variables)
5. [Backup Strategy](#backup-strategy)
6. [Deployment Workflow](#deployment-workflow)
7. [Pre-Deployment Checklist](#pre-deployment-checklist)
8. [Test Requirements](#test-requirements)

---

## 🗄️ Database Migration Strategy

### Critical Rule: NEVER Drop Production Data

```bash
# ❌ WRONG (Data loss)
npm run typeorm:schema:sync  # NEVER use in production

# ✅ CORRECT (Data preservation)
npm run typeorm:migration:run  # Only runs new migrations
```

### Migration Workflow

```bash
# 1. Development - Add new feature
# Example: Add new field to CMS

# 2. Generate migration
npm run typeorm:migration:generate -- src/database/migrations/AddNewFieldToCms

# 3. Migration file auto-generated
# src/database/migrations/1234567890-AddNewFieldToCms.ts
export class AddNewFieldToCms1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new column (existing data preserved)
    await queryRunner.addColumn('pages', new TableColumn({
      name: 'new_field',
      type: 'varchar',
      isNullable: true, // IMPORTANT: Existing rows will have null
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pages', 'new_field');
  }
}

# 4. Test locally
npm run typeorm:migration:run

# 5. Commit to Git
git add src/database/migrations/
git commit -m "feat: add new field to CMS pages"

# 6. Deploy to server
# Server runs: npm run typeorm:migration:run
# Only NEW migrations run, old data preserved ✅
```

---

## 🌳 Git Workflow (GitFlow)

### Branch Structure

```
main (production)
  ├── develop (development)
  │   ├── feature/cms-new-field
  │   ├── feature/email-template-fix
  │   └── hotfix/urgent-bug
```

### Development Workflow

```bash
# 1. Create feature branch
git checkout develop
git checkout -b feature/cms-media-library

# 2. Develop
# ... code changes ...

# 3. Commit
git add .
git commit -m "feat: implement media library for CMS"

# 4. Merge to develop
git checkout develop
git merge feature/cms-media-library

# 5. Test in development

# 6. Merge to production
git checkout main
git merge develop
git tag v1.1.0
git push origin main --tags
```

### Semantic Versioning

- **v1.0.0** - Major release (breaking changes)
- **v1.1.0** - Minor release (new features)
- **v1.1.1** - Patch release (bug fixes)

---

## ⚙️ Coolify Configuration

### .coolify.yml

```yaml
version: '1.0'

services:
  backend:
    build:
      context: ./apps/backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      DATABASE_HOST: ${DATABASE_HOST}
      DATABASE_PORT: ${DATABASE_PORT}
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      DATABASE_NAME: ${DATABASE_NAME}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9006/health"]
      interval: 30s
      timeout: 10s
      retries: 3

    deploy:
      pre_deploy:
        - npm install
        - npm run build
        - npm run typeorm:migration:run  # Data-preserving migrations

  frontend:
    build:
      context: ./apps/frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}

  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persistent volume

  redis:
    image: redis:6
    volumes:
      - redis_data:/data  # Persistent volume

volumes:
  postgres_data:  # Data persists across restarts
  redis_data:
```

---

## 🔐 Environment Variables

### Development (.env.development)

```env
# DO NOT commit to Git
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=affexai

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=dev-secret-key
OPENAI_API_KEY=sk-...
```

### Production (Coolify Dashboard)

```env
# Set in Coolify Dashboard → Environment Variables
# Mark as "Encrypted"

DATABASE_HOST=production-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=prod_user
DATABASE_PASSWORD=super_secure_password_here

REDIS_HOST=production-redis-host
REDIS_PORT=6379

JWT_SECRET=production-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

OPENAI_API_KEY=sk-prod-...
ANTHROPIC_API_KEY=sk-ant-prod-...
GOOGLE_AI_API_KEY=prod-...

AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=affexai-prod-uploads
AWS_REGION=us-east-1

RESEND_API_KEY=re_prod_...

CORS_ORIGIN=https://affexai.com
```

---

## 💾 Backup Strategy

### Automated Daily Backup Script

```bash
#!/bin/bash
# /app/scripts/backup-database.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# PostgreSQL backup
pg_dump -h $DATABASE_HOST -U $DATABASE_USERNAME $DATABASE_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Compress
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Upload to S3 (recommended)
aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://affexai-backups/database/

# Keep only last 7 days locally
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

# Keep last 30 days in S3
aws s3 ls s3://affexai-backups/database/ | while read -r line; do
  createDate=$(echo $line | awk '{print $1" "$2}')
  createDate=$(date -d "$createDate" +%s)
  olderThan=$(date -d "30 days ago" +%s)
  if [[ $createDate -lt $olderThan ]]; then
    fileName=$(echo $line | awk '{print $4}')
    if [[ $fileName != "" ]]; then
      aws s3 rm s3://affexai-backups/database/$fileName
    fi
  fi
done

echo "Backup completed: db_backup_$DATE.sql.gz"
```

### Coolify Cron Job

```
# Run daily at 02:00 AM
0 2 * * * /app/scripts/backup-database.sh
```

### Manual Backup Before Risky Operations

```bash
# Before major updates
pg_dump -h localhost -U postgres affexai > backup_before_v2_update.sql

# Restore if needed
psql -h localhost -U postgres affexai < backup_before_v2_update.sql
```

---

## 🚀 Deployment Workflow

### Initial Production Setup

```bash
# 1. Create GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/affexai.git
git push -u origin main

# 2. Coolify setup
# - Connect GitHub repo
# - Add environment variables
# - Configure build settings

# 3. Initial deployment
# Coolify automatically:
# - Clones repo
# - Runs npm install
# - Builds application
# - Runs migrations
# - Starts containers

# 4. Database seed (ONLY first deployment)
# SSH to Coolify server
npm run seed:users
npm run seed:categories
npm run seed:tickets
# ... other seed commands
```

### Ongoing Deployments (Zero-Downtime)

```bash
# 1. Develop new feature
git checkout -b feature/new-cms-block

# 2. Code changes
# ... development ...

# 3. Create migration (if database changes)
npm run typeorm:migration:generate -- src/database/migrations/AddNewCmsBlock

# 4. Test locally
npm run typeorm:migration:run
npm run dev

# 5. Commit
git add .
git commit -m "feat: add new CMS block type"

# 6. Merge to develop
git checkout develop
git merge feature/new-cms-block

# 7. Test in development environment

# 8. Deploy to production
git checkout main
git merge develop
git push origin main

# Coolify auto-deployment:
# 1. Pulls new code
# 2. npm install (only new packages)
# 3. npm run build
# 4. npm run typeorm:migration:run (ONLY NEW migrations)
# 5. Zero-downtime restart:
#    - New container starts
#    - Health check passes
#    - Old container stops
# 6. Data PRESERVED ✅
```

---

## ✅ Pre-Deployment Checklist

### Critical Tests (Must Do)

```bash
# ☑️ 1. Clean install
rm -rf node_modules package-lock.json
npm install
npm run build

# ☑️ 2. Migration test
# Create fresh database
createdb affexai_test
DATABASE_NAME=affexai_test npm run typeorm:migration:run
DATABASE_NAME=affexai_test npm run seed:users
DATABASE_NAME=affexai_test npm run dev

# ☑️ 3. Environment variables
# Ensure .env.example is up to date
cat apps/backend/.env.example
cat apps/frontend/.env.example

# ☑️ 4. Secrets check
# Ensure no API keys in Git
git log --all --full-history -- .env
git log --all --full-history -- "*.env"

# ☑️ 5. Build test
cd apps/backend && npm run build
cd apps/frontend && npm run build

# ☑️ 6. Type check
npm run typecheck

# ☑️ 7. Lint
npm run lint

# ☑️ 8. Production environment test
NODE_ENV=production npm run start:prod
```

---

## 🧪 Test Requirements

### 1. Critical Tests (Must Complete)

#### A. Database Migration Tests
```bash
✅ Migration up/down cycle
✅ Fresh database setup
✅ Seed data loading
✅ Application startup
```

#### B. Build Tests
```bash
✅ Backend build succeeds
✅ Frontend build succeeds
✅ TypeScript compiles without errors
```

#### C. Environment Tests
```bash
✅ .env.example is complete
✅ Production mode works
✅ All required variables present
```

### 2. High Priority Tests (Strongly Recommended)

#### A. Performance Tests
```bash
✅ Lighthouse audit (Score > 90)
✅ Core Web Vitals:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
```

#### B. Responsive Design
```bash
✅ Mobile (320px, 375px, 425px)
✅ Tablet (768px, 1024px)
✅ Desktop (1440px, 1920px)
✅ Real device testing (iOS Safari, Android Chrome)
```

#### C. Accessibility
```bash
✅ Lighthouse accessibility > 90
✅ Keyboard navigation
✅ Screen reader compatible
✅ Color contrast WCAG AA
```

### 3. Medium Priority Tests

#### A. Cross-Browser
| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | ✅ High |
| Firefox | Latest | ✅ Medium |
| Safari | Latest | ✅ Medium |
| Edge | Latest | ✅ Low |
| iOS Safari | 15+ | ✅ High |
| Android Chrome | 10+ | ✅ Medium |

#### B. SEO
```bash
✅ Metadata on all pages
✅ Sitemap.xml accessible
✅ robots.txt correct
✅ Open Graph tags
```

### 4. Low Priority (Time Permitting)
- Load testing (JMeter)
- Security audit (OWASP ZAP)
- Bundle size analysis

---

## 📊 Deployment Day Checklist

```bash
# ☑️ Pre-deployment
□ Run all critical tests
□ Create database backup
□ Review environment variables
□ Check health endpoint works

# ☑️ Deployment
□ Push to main branch
□ Tag version (git tag v1.0.0)
□ Monitor Coolify deployment logs
□ Wait for health check to pass

# ☑️ Post-deployment
□ Test main user flows
□ Check database connection
□ Verify Redis connection
□ Test API endpoints
□ Monitor error logs (first 30 minutes)

# ☑️ First-time only
□ Run seed commands
□ Create admin user
□ Configure initial settings
□ Test email delivery
□ Test file uploads (S3)

# ☑️ Monitoring (First 24 hours)
□ Watch error rates
□ Monitor response times
□ Check database performance
□ Verify backups running
□ User feedback collection
```

---

## 🔧 Troubleshooting

### Migration Failed

```bash
# Check migration status
npm run typeorm:migration:show

# Revert last migration
npm run typeorm:migration:revert

# Fix migration file
# Re-run
npm run typeorm:migration:run
```

### Deployment Failed

```bash
# Check Coolify logs
# SSH to server
docker logs <container_name>

# Check health endpoint
curl http://localhost:9006/health

# Rollback to previous version
git checkout v1.0.0
git push origin main --force
```

### Data Loss Prevention

```bash
# Always have recent backup before:
- Major version updates
- Database schema changes
- Risky operations

# Restore from backup
pg_dump backup.sql | psql -h localhost -U postgres affexai
```

---

## 📝 Notes

### Key Principles

1. ✅ **Migration-based deployment** = No data loss
2. ✅ **Persistent volumes** = Data survives restarts
3. ✅ **Daily backups** = Disaster recovery ready
4. ✅ **Environment variables** = Secure secret management
5. ✅ **Zero-downtime** = No service interruption

### Best Practices

- Never commit .env files
- Always test migrations locally first
- Keep backups for 30 days minimum
- Monitor logs after deployment
- Have rollback plan ready

---

**Last Updated:** 2025-11-21
**Version:** 1.0.0
**Maintained By:** Affexai Development Team
