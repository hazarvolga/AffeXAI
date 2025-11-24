# Production Deployment Strategy - Affexai Platform

> **Platform**: Coolify Self-Hosted
> **Architecture**: Monorepo (NestJS Backend + Next.js Frontend)
> **Database**: PostgreSQL 14+
> **Cache**: Redis 6+
> **Storage**: AWS S3
> **CI/CD**: GitHub Actions → Coolify Webhook
> **Status**: Production-Ready Implementation Guide
> **Last Updated**: 2025-11-22

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [CI/CD Pipeline Architecture](#cicd-pipeline-architecture)
4. [Database Migration Strategy](#database-migration-strategy)
5. [Deployment Workflow](#deployment-workflow)
6. [Rollback Strategy](#rollback-strategy)
7. [Monitoring & Alerts](#monitoring--alerts)
8. [Environment Management](#environment-management)
9. [Risk Mitigation](#risk-mitigation)
10. [Emergency Procedures](#emergency-procedures)
11. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

### Deployment Goals

- **Zero-Downtime Deployments**: Blue-green deployment with health checks
- **Data Safety**: CMS live data preservation, automated backups before migrations
- **Fast Rollback**: < 2 minutes to previous stable version
- **Automated Testing**: Pre-deployment validation gates
- **Observability**: Comprehensive monitoring and alerting

### Key Challenges

1. **Tiptap Dependency Conflict**: Frontend build fails in Docker (package-lock.json desync)
2. **No CI/CD**: Currently manual deployment process
3. **CMS Live Data**: Must preserve user-generated content
4. **Database Synchronize=true**: Production risk (currently enabled in data-source.ts)
5. **Monorepo Complexity**: Shared dependencies, coordinated builds

### Success Metrics

- **Deployment Frequency**: 2-3 times per week
- **Deployment Duration**: < 5 minutes
- **Rollback Time**: < 2 minutes
- **Failure Rate**: < 5%
- **Data Loss Incidents**: 0

---

## Current State Analysis

### Infrastructure Topology

```
┌─────────────────────────────────────────────────────────────┐
│                     Current Architecture                      │
└─────────────────────────────────────────────────────────────┘

GitHub Repository (main branch)
        │
        ├─── apps/backend/          (NestJS, Port 3001)
        ├─── apps/frontend/         (Next.js, Port 9003)
        └─── packages/shared-types/ (TypeScript types)

Local Development:
├─ PostgreSQL (localhost:5432) - synchronize: true ⚠️
├─ Redis (localhost:6379)
└─ Docker Compose (optional)

Production (Coolify):
├─ Backend Container (NestJS)
├─ Frontend Container (Next.js)
├─ PostgreSQL (managed)
├─ Redis (managed)
└─ AWS S3 (media storage)
```

### Critical Issues

#### 1. Database Schema Management
**Current**: `synchronize: true` (line 94 in data-source.ts)
```typescript
// apps/backend/src/database/data-source.ts
synchronize: true, // TEMPORARY: Enable for development to auto-create missing tables
```

**Risk**: Production schema changes without migration tracking → data loss potential

**Fix Required**:
- Set `synchronize: false` for production
- Use TypeORM migrations exclusively
- Implement migration validation in CI/CD

#### 2. Package-Lock Desync
**Current**: Root `package-lock.json` desynchronized with workspace packages

**Evidence**:
- Tiptap version conflicts (frontend requires 3.7.2)
- Build failures in Docker but not local
- Symlink vs copy issues in Dockerfile

**Fix Required**:
- Regenerate package-lock.json
- Lock Tiptap versions across workspace
- Add lockfile validation to CI/CD

#### 3. No Automated Testing
**Current**: Manual testing only

**Fix Required**:
- Backend: Jest unit tests (framework exists)
- Frontend: React Testing Library
- E2E: Playwright tests (planned)
- Integration tests for critical paths

#### 4. Manual Deployment Process
**Current**: No CI/CD pipeline

**Fix Required**:
- GitHub Actions workflow
- Coolify webhook integration
- Automated build validation
- Health check verification

---

## CI/CD Pipeline Architecture

### Pipeline Overview

```
┌──────────────────────────────────────────────────────────────┐
│              CI/CD Pipeline Flow (GitHub Actions)             │
└──────────────────────────────────────────────────────────────┘

Git Push (main/staging)
        │
        ▼
┌───────────────────┐
│  Trigger Workflow │  ← GitHub Actions
└────────┬──────────┘
         │
         ├─► 1. PRE-BUILD VALIDATION (parallel)
         │   ├─ Lint (ESLint)
         │   ├─ Type Check (TypeScript)
         │   ├─ Security Scan (npm audit)
         │   ├─ Package-Lock Validation
         │   └─ Migration Dry-Run
         │
         ├─► 2. BUILD & TEST (parallel)
         │   ├─ Build Backend
         │   │  ├─ Install deps
         │   │  ├─ Build shared-types
         │   │  └─ Build NestJS
         │   │
         │   ├─ Build Frontend
         │   │  ├─ Install deps
         │   │  ├─ Build shared-types
         │   │  └─ Build Next.js
         │   │
         │   └─ Run Tests
         │      ├─ Backend unit tests (Jest)
         │      ├─ Frontend unit tests
         │      └─ Integration tests
         │
         ├─► 3. DOCKER BUILD (parallel)
         │   ├─ Build backend:latest
         │   ├─ Build frontend:latest
         │   └─ Tag with commit SHA
         │
         ├─► 4. DATABASE MIGRATION VALIDATION
         │   ├─ Backup current schema
         │   ├─ Test migrations (rollback test)
         │   └─ Verify data integrity
         │
         ├─► 5. DEPLOYMENT TRIGGER
         │   ├─ Send webhook to Coolify
         │   ├─ Wait for health check
         │   └─ Verify deployment
         │
         └─► 6. POST-DEPLOYMENT
             ├─ Run smoke tests
             ├─ Send Slack notification
             └─ Update deployment log

ROLLBACK TRIGGER (manual or auto)
        │
        ▼
┌───────────────────┐
│  Rollback Flow    │
└────────┬──────────┘
         │
         ├─► 1. Stop new traffic
         ├─► 2. Revert to previous container
         ├─► 3. Restore database snapshot (if needed)
         └─► 4. Verify health checks
```

### GitHub Actions Workflow Configuration

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main          # Production
      - staging       # Staging environment
  workflow_dispatch:  # Manual trigger

env:
  NODE_VERSION: '20'
  DOCKER_REGISTRY: ghcr.io
  IMAGE_PREFIX: ${{ github.repository }}

jobs:
  # ================================================================
  # JOB 1: PRE-BUILD VALIDATION
  # ================================================================
  validate:
    name: Pre-Build Validation
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for migration checks

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Validate Package Lock
        run: |
          echo "📦 Validating package-lock.json integrity..."
          npm ci --legacy-peer-deps
          git diff --exit-code package-lock.json || {
            echo "❌ ERROR: package-lock.json is out of sync!"
            echo "Run 'npm install' locally and commit changes"
            exit 1
          }

      - name: Lint Check
        run: |
          cd apps/backend && npm run lint
          cd ../frontend && npm run lint

      - name: TypeScript Check
        run: |
          cd apps/backend && npx tsc --noEmit
          cd ../frontend && npm run typecheck

      - name: Security Audit
        run: |
          npm audit --production --audit-level=high || {
            echo "⚠️ WARNING: High/Critical vulnerabilities found"
            echo "Review before deploying to production"
          }

      - name: Database Migration Dry-Run
        run: |
          cd apps/backend
          npm run typeorm:migration:generate -- -d src/database/migrations/DryRunTest
          echo "✅ Migration generation successful"
        env:
          DATABASE_HOST: localhost
          DATABASE_PORT: 5432

  # ================================================================
  # JOB 2: BUILD & TEST
  # ================================================================
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest
    needs: validate
    timeout-minutes: 20

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_DB: affexai_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: Build Shared Types
        run: npm run build:shared

      - name: Build Backend
        run: npm run build:backend

      - name: Build Frontend
        run: npm run build:frontend
        env:
          NEXT_PUBLIC_API_URL: http://localhost:3001
          NEXT_PUBLIC_SOCKET_URL: http://localhost:3001
          NEXT_PUBLIC_APP_URL: http://localhost:9003

      - name: Run Backend Tests
        run: cd apps/backend && npm test
        env:
          DATABASE_HOST: localhost
          DATABASE_PORT: 5432
          DATABASE_NAME: affexai_test
          DATABASE_USERNAME: postgres
          DATABASE_PASSWORD: postgres
          REDIS_HOST: localhost
          REDIS_PORT: 6379
          JWT_SECRET: test-secret

      - name: Run Frontend Tests (if available)
        run: cd apps/frontend && npm test --passWithNoTests
        continue-on-error: true  # Optional until tests implemented

  # ================================================================
  # JOB 3: DOCKER BUILD
  # ================================================================
  docker-build:
    name: Build Docker Images
    runs-on: ubuntu-latest
    needs: build-and-test
    timeout-minutes: 30

    permissions:
      contents: read
      packages: write

    strategy:
      matrix:
        service: [backend, frontend]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.DOCKER_REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_PREFIX }}-${{ matrix.service }}
          tags: |
            type=sha,prefix={{branch}}-
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/${{ matrix.service }}/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=registry,ref=${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_PREFIX }}-${{ matrix.service }}:buildcache
          cache-to: type=registry,ref=${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_PREFIX }}-${{ matrix.service }}:buildcache,mode=max
          build-args: |
            NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
            NEXT_PUBLIC_SOCKET_URL=${{ secrets.NEXT_PUBLIC_SOCKET_URL }}
            NEXT_PUBLIC_APP_URL=${{ secrets.NEXT_PUBLIC_APP_URL }}

  # ================================================================
  # JOB 4: DEPLOY TO COOLIFY
  # ================================================================
  deploy-coolify:
    name: Deploy to Coolify
    runs-on: ubuntu-latest
    needs: docker-build
    timeout-minutes: 15

    environment:
      name: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
      url: ${{ secrets.APP_URL }}

    steps:
      - name: Trigger Coolify Deployment (Backend)
        run: |
          curl -X POST "${{ secrets.COOLIFY_WEBHOOK_BACKEND }}" \
            -H "Content-Type: application/json" \
            -d '{
              "image": "${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_PREFIX }}-backend:${{ github.sha }}",
              "tag": "${{ github.ref_name }}-${{ github.sha }}"
            }'

      - name: Trigger Coolify Deployment (Frontend)
        run: |
          curl -X POST "${{ secrets.COOLIFY_WEBHOOK_FRONTEND }}" \
            -H "Content-Type: application/json" \
            -d '{
              "image": "${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_PREFIX }}-frontend:${{ github.sha }}",
              "tag": "${{ github.ref_name }}-${{ github.sha }}"
            }'

      - name: Wait for Deployment
        run: sleep 60  # Wait for containers to start

      - name: Health Check - Backend
        run: |
          MAX_RETRIES=10
          RETRY_COUNT=0

          while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
            if curl -f -s "${{ secrets.BACKEND_URL }}/health" > /dev/null; then
              echo "✅ Backend health check passed"
              exit 0
            fi

            RETRY_COUNT=$((RETRY_COUNT + 1))
            echo "⏳ Waiting for backend... ($RETRY_COUNT/$MAX_RETRIES)"
            sleep 10
          done

          echo "❌ Backend health check failed"
          exit 1

      - name: Health Check - Frontend
        run: |
          MAX_RETRIES=10
          RETRY_COUNT=0

          while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
            if curl -f -s "${{ secrets.FRONTEND_URL }}" > /dev/null; then
              echo "✅ Frontend health check passed"
              exit 0
            fi

            RETRY_COUNT=$((RETRY_COUNT + 1))
            echo "⏳ Waiting for frontend... ($RETRY_COUNT/$MAX_RETRIES)"
            sleep 10
          done

          echo "❌ Frontend health check failed"
          exit 1

  # ================================================================
  # JOB 5: POST-DEPLOYMENT VALIDATION
  # ================================================================
  post-deploy:
    name: Post-Deployment Validation
    runs-on: ubuntu-latest
    needs: deploy-coolify
    timeout-minutes: 10

    steps:
      - name: Smoke Tests
        run: |
          echo "🧪 Running smoke tests..."

          # Test backend API
          curl -f "${{ secrets.BACKEND_URL }}/api/settings" || exit 1

          # Test frontend homepage
          curl -f "${{ secrets.FRONTEND_URL }}" || exit 1

          echo "✅ Smoke tests passed"

      - name: Send Slack Notification
        if: always()
        uses: slackapi/slack-github-action@v1
        with:
          webhook: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "🚀 Deployment ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment Status*: ${{ job.status }}\n*Environment*: ${{ github.ref_name }}\n*Commit*: ${{ github.sha }}\n*Author*: ${{ github.actor }}"
                  }
                }
              ]
            }

      - name: Update Deployment Log
        run: |
          echo "📝 Deployment completed at $(date)"
          echo "Commit: ${{ github.sha }}"
          echo "Environment: ${{ github.ref_name }}"
```

### Coolify Webhook Integration

**Backend Application Settings** (Coolify UI):
```yaml
# Environment Variables
DATABASE_HOST=postgres.coolify.svc
DATABASE_PORT=5432
DATABASE_NAME=affexai_prod
DATABASE_USERNAME=***
DATABASE_PASSWORD=***
REDIS_HOST=redis.coolify.svc
REDIS_PORT=6379
JWT_SECRET=***
OPENAI_API_KEY=***
ANTHROPIC_API_KEY=***
GOOGLE_AI_API_KEY=***
AWS_ACCESS_KEY_ID=***
AWS_SECRET_ACCESS_KEY=***
AWS_S3_BUCKET=affexai-prod
AWS_REGION=us-east-1
RESEND_API_KEY=***
NODE_ENV=production
PORT=3001

# Health Check
HEALTHCHECK_PATH=/health
HEALTHCHECK_INTERVAL=30s
HEALTHCHECK_TIMEOUT=10s
HEALTHCHECK_RETRIES=3

# Deployment Strategy
DEPLOYMENT_STRATEGY=rolling
DEPLOYMENT_REPLICAS=2
```

**Frontend Application Settings** (Coolify UI):
```yaml
# Build Arguments (injected during Docker build)
NEXT_PUBLIC_API_URL=https://api.affexai.com
NEXT_PUBLIC_SOCKET_URL=https://api.affexai.com
NEXT_PUBLIC_APP_URL=https://affexai.com
NODE_ENV=production

# Runtime Environment
PORT=3000

# Health Check
HEALTHCHECK_PATH=/
HEALTHCHECK_INTERVAL=30s
HEALTHCHECK_TIMEOUT=10s
HEALTHCHECK_RETRIES=3

# Deployment Strategy
DEPLOYMENT_STRATEGY=rolling
DEPLOYMENT_REPLICAS=2
```

---

## Database Migration Strategy

### Migration Architecture

```
┌──────────────────────────────────────────────────────────────┐
│            Database Migration Strategy (Zero-Downtime)        │
└──────────────────────────────────────────────────────────────┘

Phase 1: PRE-MIGRATION (CI/CD)
├─ 1. Snapshot current schema
│  └─ pg_dump --schema-only > /backups/schema_$(date).sql
│
├─ 2. Validate migrations
│  ├─ typeorm migration:generate (dry-run)
│  ├─ Check for breaking changes
│  └─ Verify rollback scripts
│
└─ 3. Test on staging database
   ├─ Restore production snapshot
   ├─ Run migrations
   ├─ Verify data integrity
   └─ Test rollback

Phase 2: MIGRATION EXECUTION (Production)
├─ 1. Enable maintenance mode (optional)
│  └─ Return 503 for non-health endpoints
│
├─ 2. Backup database
│  ├─ pg_dump > /backups/prod_$(date).sql
│  └─ Upload to S3
│
├─ 3. Run migrations
│  ├─ typeorm migration:run
│  ├─ Verify each migration step
│  └─ Log all changes
│
├─ 4. Verify data integrity
│  ├─ Row count checks
│  ├─ Foreign key constraints
│  └─ Index validation
│
└─ 5. Disable maintenance mode

Phase 3: POST-MIGRATION
├─ 1. Monitor application logs
├─ 2. Check database performance
├─ 3. Verify critical user flows
└─ 4. Keep backup for 7 days

ROLLBACK (if migration fails)
├─ 1. Stop application
├─ 2. Restore database snapshot
│  └─ psql < /backups/prod_$(date).sql
├─ 3. Revert to previous container
└─ 4. Verify health checks
```

### Migration File Structure

**Location**: `apps/backend/src/database/migrations/`

**Naming Convention**: `{timestamp}-{description}.ts`

**Example Migration** (with rollback):
```typescript
// 1732281600000-AddTicketPriorityIndex.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTicketPriorityIndex1732281600000 implements MigrationInterface {
  name = 'AddTicketPriorityIndex1732281600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Forward migration
    await queryRunner.query(`
      CREATE INDEX "idx_tickets_priority_status"
      ON "tickets" ("priority", "status")
    `);

    console.log('✅ Added index: idx_tickets_priority_status');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback migration
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_tickets_priority_status"
    `);

    console.log('✅ Dropped index: idx_tickets_priority_status');
  }
}
```

### Migration Best Practices

#### 1. Breaking Change Handling

**Problem**: Renaming column breaks existing code

**Solution**: Multi-phase migration
```typescript
// Phase 1: Add new column
export class AddNewUserFieldPhase11732281600001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "full_name" VARCHAR(255)
    `);

    // Copy data from old column
    await queryRunner.query(`
      UPDATE "users"
      SET "full_name" = "name"
    `);
  }
}

// Phase 2 (next deployment): Remove old column
export class RemoveOldUserFieldPhase21732368000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "name" VARCHAR(255)
    `);

    await queryRunner.query(`
      UPDATE "users"
      SET "name" = "full_name"
    `);
  }
}
```

#### 2. Data Migration with Validation

```typescript
export class MigrateTicketStatusEnum1732281600002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Validate data before migration
    const invalidTickets = await queryRunner.query(`
      SELECT id, status
      FROM "tickets"
      WHERE status NOT IN ('open', 'in_progress', 'resolved', 'closed')
    `);

    if (invalidTickets.length > 0) {
      throw new Error(
        `Found ${invalidTickets.length} tickets with invalid status. ` +
        `Fix manually before running migration.`
      );
    }

    // Safe to proceed
    await queryRunner.query(`
      ALTER TABLE "tickets"
      ALTER COLUMN "status" TYPE VARCHAR(50)
    `);
  }
}
```

#### 3. CMS Data Preservation

**Critical**: CMS pages, components, and media must NEVER be lost

**Strategy**:
```typescript
export class UpdateCmsSchema1732281600003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Backup CMS data to JSON (belt-and-suspenders)
    const pages = await queryRunner.query(`SELECT * FROM "pages"`);
    const components = await queryRunner.query(`SELECT * FROM "components"`);

    const backup = {
      timestamp: new Date().toISOString(),
      pages,
      components
    };

    // Log backup (in production, upload to S3)
    console.log('📦 CMS Backup:', JSON.stringify(backup, null, 2));

    // 2. Perform schema change
    await queryRunner.query(`
      ALTER TABLE "pages"
      ADD COLUMN "seo_metadata" JSONB DEFAULT '{}'::jsonb
    `);

    // 3. Verify data integrity
    const pageCount = await queryRunner.query(
      `SELECT COUNT(*) as count FROM "pages"`
    );

    if (pageCount[0].count !== pages.length) {
      throw new Error('❌ Page count mismatch after migration!');
    }

    console.log(`✅ Verified ${pageCount[0].count} pages preserved`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "seo_metadata"
    `);
  }
}
```

### Database Backup & Restore Scripts

**File**: `apps/backend/scripts/db-backup.sh`
```bash
#!/bin/bash
# Database backup script for production

set -e  # Exit on error

# Configuration
BACKUP_DIR="/app/backups/postgres"
S3_BUCKET="s3://affexai-backups/database"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="affexai_prod_${TIMESTAMP}.sql"

# Database credentials from environment
DB_HOST="${DATABASE_HOST:-localhost}"
DB_PORT="${DATABASE_PORT:-5432}"
DB_NAME="${DATABASE_NAME:-affexai_prod}"
DB_USER="${DATABASE_USERNAME:-postgres}"

echo "🗄️  Starting database backup..."
echo "Database: ${DB_NAME}@${DB_HOST}:${DB_PORT}"
echo "Timestamp: ${TIMESTAMP}"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Full database dump
PGPASSWORD="$DATABASE_PASSWORD" pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --verbose \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  -F c \
  -f "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"
BACKUP_FILE="${BACKUP_FILE}.gz"

echo "✅ Backup created: ${BACKUP_FILE}"
echo "Size: $(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)"

# Upload to S3 (if AWS configured)
if [ -n "$AWS_ACCESS_KEY_ID" ]; then
  echo "📤 Uploading to S3..."
  aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" "${S3_BUCKET}/${BACKUP_FILE}"
  echo "✅ Uploaded to S3: ${S3_BUCKET}/${BACKUP_FILE}"
fi

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -name "affexai_prod_*.sql.gz" -mtime +7 -delete
echo "🧹 Cleaned up backups older than 7 days"

echo "✅ Backup completed successfully"
```

**File**: `apps/backend/scripts/db-restore.sh`
```bash
#!/bin/bash
# Database restore script for rollback scenarios

set -e

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ Usage: ./db-restore.sh <backup_file>"
  echo "Example: ./db-restore.sh affexai_prod_20251122_143000.sql.gz"
  exit 1
fi

# Confirm restore
read -p "⚠️  This will OVERWRITE the database. Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Restore cancelled"
  exit 1
fi

echo "🔄 Starting database restore..."

# Download from S3 if needed
if [[ "$BACKUP_FILE" == s3://* ]]; then
  echo "📥 Downloading from S3..."
  aws s3 cp "$BACKUP_FILE" /tmp/restore.sql.gz
  BACKUP_FILE="/tmp/restore.sql.gz"
fi

# Decompress
if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" > /tmp/restore.sql
  BACKUP_FILE="/tmp/restore.sql"
fi

# Restore database
PGPASSWORD="$DATABASE_PASSWORD" psql \
  -h "$DATABASE_HOST" \
  -p "$DATABASE_PORT" \
  -U "$DATABASE_USERNAME" \
  -d "$DATABASE_NAME" \
  -f "$BACKUP_FILE"

echo "✅ Database restored successfully"

# Cleanup
rm -f /tmp/restore.sql /tmp/restore.sql.gz
```

### Migration Validation Checklist

**Pre-Migration**:
- [ ] Migration file follows naming convention
- [ ] Both `up()` and `down()` implemented
- [ ] Tested on local database
- [ ] Tested on staging with production snapshot
- [ ] Breaking changes documented
- [ ] Rollback procedure tested
- [ ] Data integrity checks included

**During Migration**:
- [ ] Database backup created
- [ ] Backup uploaded to S3
- [ ] Migration logs captured
- [ ] Each step verified
- [ ] Data counts match pre-migration

**Post-Migration**:
- [ ] Health checks passing
- [ ] Critical user flows tested
- [ ] Database performance normal
- [ ] No error logs
- [ ] Backup retained for 7 days

---

## Deployment Workflow

### Standard Deployment Process

```
┌──────────────────────────────────────────────────────────────┐
│                Standard Deployment Workflow                   │
└──────────────────────────────────────────────────────────────┘

Step 1: LOCAL DEVELOPMENT
├─ Developer makes changes
├─ Runs tests locally
├─ Creates feature branch
└─ Opens pull request

Step 2: CODE REVIEW
├─ Peer review required
├─ CI checks must pass
└─ Merge to main/staging

Step 3: AUTOMATED CI/CD (GitHub Actions)
├─ Validate
│  ├─ Lint
│  ├─ Type check
│  ├─ Security audit
│  └─ Package-lock validation
│
├─ Build & Test
│  ├─ Build backend
│  ├─ Build frontend
│  ├─ Run unit tests
│  └─ Run integration tests
│
├─ Docker Build
│  ├─ Build images (parallel)
│  ├─ Tag with commit SHA
│  └─ Push to registry
│
└─ Deploy Trigger
   └─ Send webhook to Coolify

Step 4: COOLIFY DEPLOYMENT
├─ Pull new images
├─ Database migration (if needed)
├─ Rolling deployment
│  ├─ Start new container
│  ├─ Wait for health check
│  ├─ Route traffic
│  └─ Stop old container
└─ Health check verification

Step 5: POST-DEPLOYMENT
├─ Smoke tests
├─ Monitor logs (5 minutes)
├─ Verify critical paths
└─ Send Slack notification

SUCCESS ✅
```

### Pre-Deployment Checklist

**Code Quality**:
- [ ] All tests passing locally
- [ ] No ESLint errors
- [ ] TypeScript compilation successful
- [ ] No console.log statements in production code
- [ ] Environment variables documented

**Database**:
- [ ] Migration files generated (if schema changes)
- [ ] Migration tested on staging
- [ ] Rollback script prepared
- [ ] Data backup scheduled

**Dependencies**:
- [ ] package-lock.json committed
- [ ] No unresolved merge conflicts
- [ ] Dependency vulnerabilities reviewed
- [ ] Breaking changes documented

**Configuration**:
- [ ] Environment variables set in Coolify
- [ ] Secrets rotated if needed
- [ ] API keys validated
- [ ] CORS origins updated

**Documentation**:
- [ ] CHANGELOG.md updated
- [ ] API changes documented
- [ ] Breaking changes communicated
- [ ] Deployment notes prepared

### Deployment Environments

#### 1. Development (Local)
```yaml
Environment: development
Backend: http://localhost:9006
Frontend: http://localhost:9003
Database: localhost:5432 (affexai_dev)
Redis: localhost:6379

Features:
- Hot reload enabled
- Debug logging
- synchronize: true (TypeORM)
- No authentication required (some endpoints)
```

#### 2. Staging (Coolify)
```yaml
Environment: staging
Backend: https://staging-api.affexai.com
Frontend: https://staging.affexai.com
Database: PostgreSQL (managed, production snapshot)
Redis: Redis (managed)

Features:
- Production-like environment
- Test with production data (anonymized)
- synchronize: false
- Full authentication
- Migration testing
```

#### 3. Production (Coolify)
```yaml
Environment: production
Backend: https://api.affexai.com
Frontend: https://affexai.com
Database: PostgreSQL (managed, replicated)
Redis: Redis (managed, cluster)

Features:
- High availability (2+ replicas)
- Automated backups (daily)
- synchronize: false
- Full monitoring
- Rate limiting enabled
```

### Rolling Deployment Strategy

**Configuration** (Coolify):
```yaml
deployment:
  strategy: rolling
  replicas: 2
  maxSurge: 1        # Max new containers during rollout
  maxUnavailable: 0  # Min containers always running

  healthCheck:
    path: /health
    interval: 10s
    timeout: 5s
    successThreshold: 2
    failureThreshold: 3

  lifecycle:
    preStop:
      exec:
        command: ["sh", "-c", "sleep 10"]  # Graceful shutdown
```

**Deployment Sequence**:
```
Current State: 2 containers running (v1.0.0)

Step 1: Start new container
├─ Container-3 (v1.1.0) starting...
├─ Health check: PENDING
└─ Traffic: 0%

Step 2: Health check passes
├─ Container-3 (v1.1.0) HEALTHY
├─ Traffic: 0% → 33%
└─ Containers: v1.0.0 (66%), v1.1.0 (33%)

Step 3: Start second new container
├─ Container-4 (v1.1.0) starting...
├─ Health check: PENDING
└─ Traffic: v1.0.0 (66%), v1.1.0 (33%)

Step 4: Second health check passes
├─ Container-4 (v1.1.0) HEALTHY
├─ Traffic: v1.0.0 (33%), v1.1.0 (66%)
└─ Prepare to stop Container-1

Step 5: Stop old container
├─ Container-1 (v1.0.0) stopping...
├─ Wait 10s for graceful shutdown
└─ Traffic: v1.0.0 (33%), v1.1.0 (66%)

Step 6: Stop second old container
├─ Container-2 (v1.0.0) stopping...
└─ Traffic: v1.1.0 (100%)

Final State: 2 containers running (v1.1.0) ✅
```

### Health Check Implementation

**Backend** (`apps/backend/src/health/health.controller.ts`):
```typescript
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database connectivity
      () => this.db.pingCheck('database', { timeout: 5000 }),

      // Memory usage (< 500MB)
      () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),

      // Redis connectivity (if available)
      async () => {
        try {
          await this.redisService.ping();
          return { redis: { status: 'up' } };
        } catch (error) {
          return { redis: { status: 'down' } };
        }
      },
    ]);
  }

  @Get('ready')
  @HealthCheck()
  readiness() {
    // More strict checks for readiness
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.checkMigrations(),  // Ensure migrations complete
      () => this.checkEssentialServices(),
    ]);
  }

  private async checkMigrations() {
    const pendingMigrations = await this.dataSource.showMigrations();
    return {
      migrations: {
        status: pendingMigrations ? 'down' : 'up',
        pending: pendingMigrations
      }
    };
  }
}
```

**Frontend** (`apps/frontend/src/app/health/route.ts`):
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check backend connectivity
    const backendHealth = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/health`,
      { cache: 'no-store' }
    );

    if (!backendHealth.ok) {
      throw new Error('Backend unhealthy');
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      backend: 'connected'
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      },
      { status: 503 }
    );
  }
}
```

---

## Rollback Strategy

### Rollback Decision Matrix

```
┌──────────────────────────────────────────────────────────────┐
│                    Rollback Decision Tree                     │
└──────────────────────────────────────────────────────────────┘

Deployment Issue Detected
        │
        ▼
Is it critical? (5xx errors, data loss, security)
        │
        ├─ YES → IMMEDIATE ROLLBACK
        │         │
        │         ├─ Stop deployment
        │         ├─ Revert containers
        │         ├─ Restore database (if needed)
        │         └─ Alert team
        │
        └─ NO → Can it be hotfixed?
                  │
                  ├─ YES → Deploy hotfix
                  │         │
                  │         └─ Fast-track CI/CD
                  │
                  └─ NO → ROLLBACK
                            │
                            └─ Schedule fix for next deployment
```

### Rollback Procedures

#### 1. Application Rollback (No DB Changes)

**Scenario**: New code has bugs but database schema unchanged

**Duration**: < 2 minutes

**Steps**:
```bash
# 1. Identify previous stable version
PREVIOUS_TAG="main-abc123def"  # Commit SHA from last successful deployment

# 2. Update Coolify deployment (via UI or API)
curl -X POST "$COOLIFY_WEBHOOK_BACKEND" \
  -H "Content-Type: application/json" \
  -d "{
    \"image\": \"ghcr.io/yourorg/affexai-backend:${PREVIOUS_TAG}\",
    \"force\": true
  }"

curl -X POST "$COOLIFY_WEBHOOK_FRONTEND" \
  -H "Content-Type: application/json" \
  -d "{
    \"image\": \"ghcr.io/yourorg/affexai-frontend:${PREVIOUS_TAG}\",
    \"force\": true
  }"

# 3. Verify health checks
./scripts/wait-for-health.sh https://api.affexai.com/health
./scripts/wait-for-health.sh https://affexai.com

# 4. Monitor logs
kubectl logs -f deployment/affexai-backend --tail=100

# 5. Verify critical paths
curl https://api.affexai.com/api/settings
curl https://affexai.com
```

#### 2. Database Rollback (Schema Changes)

**Scenario**: Migration caused data corruption or breaking changes

**Duration**: < 10 minutes

**Steps**:
```bash
# 1. Stop application (prevent writes)
kubectl scale deployment/affexai-backend --replicas=0

# 2. Backup current state (for forensics)
./scripts/db-backup.sh

# 3. Identify pre-migration backup
BACKUP_FILE="affexai_prod_20251122_143000.sql.gz"

# 4. Restore database
./scripts/db-restore.sh "s3://affexai-backups/database/${BACKUP_FILE}"

# 5. Revert to previous container version
curl -X POST "$COOLIFY_WEBHOOK_BACKEND" \
  -H "Content-Type: application/json" \
  -d "{
    \"image\": \"ghcr.io/yourorg/affexai-backend:${PREVIOUS_TAG}\",
    \"force\": true
  }"

# 6. Scale application back up
kubectl scale deployment/affexai-backend --replicas=2

# 7. Verify health and data integrity
./scripts/verify-data-integrity.sh
```

#### 3. Partial Rollback (Feature Flag)

**Scenario**: New feature causing issues but rest of deployment stable

**Duration**: < 1 minute

**Steps**:
```bash
# 1. Disable feature via settings API
curl -X PUT "https://api.affexai.com/api/settings/feature-flags" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "newFeatureEnabled": false
  }'

# 2. Verify feature disabled
curl "https://api.affexai.com/api/settings/feature-flags"

# 3. Monitor for resolution
# (No container restart needed)
```

### Automated Rollback Triggers

**File**: `.github/workflows/auto-rollback.yml`

```yaml
name: Auto-Rollback on Health Check Failure

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  health-check:
    name: Health Check & Auto-Rollback
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Check Backend Health
        id: backend-health
        continue-on-error: true
        run: |
          for i in {1..3}; do
            if curl -f -s "${{ secrets.BACKEND_URL }}/health" > /dev/null; then
              echo "healthy=true" >> $GITHUB_OUTPUT
              exit 0
            fi
            sleep 10
          done

          echo "healthy=false" >> $GITHUB_OUTPUT
          exit 1

      - name: Check Frontend Health
        id: frontend-health
        continue-on-error: true
        run: |
          for i in {1..3}; do
            if curl -f -s "${{ secrets.FRONTEND_URL }}" > /dev/null; then
              echo "healthy=true" >> $GITHUB_OUTPUT
              exit 0
            fi
            sleep 10
          done

          echo "healthy=false" >> $GITHUB_OUTPUT
          exit 1

      - name: Get Last Successful Deployment
        if: steps.backend-health.outputs.healthy == 'false' || steps.frontend-health.outputs.healthy == 'false'
        id: last-deployment
        run: |
          # Query GitHub API for last successful deployment
          LAST_SUCCESS=$(gh api repos/${{ github.repository }}/actions/workflows/deploy.yml/runs \
            --jq '.workflow_runs[] | select(.conclusion == "success") | .head_sha' \
            --paginate | head -1)

          echo "sha=${LAST_SUCCESS}" >> $GITHUB_OUTPUT

      - name: Trigger Rollback
        if: steps.backend-health.outputs.healthy == 'false' || steps.frontend-health.outputs.healthy == 'false'
        run: |
          echo "🚨 CRITICAL: Health check failed, triggering auto-rollback"

          # Trigger rollback to last successful deployment
          curl -X POST "${{ secrets.COOLIFY_WEBHOOK_BACKEND }}" \
            -H "Content-Type: application/json" \
            -d "{
              \"image\": \"${{ env.DOCKER_REGISTRY }}/${{ github.repository }}-backend:${{ steps.last-deployment.outputs.sha }}\",
              \"force\": true
            }"

          curl -X POST "${{ secrets.COOLIFY_WEBHOOK_FRONTEND }}" \
            -H "Content-Type: application/json" \
            -d "{
              \"image\": \"${{ env.DOCKER_REGISTRY }}/${{ github.repository }}-frontend:${{ steps.last-deployment.outputs.sha }}\",
              \"force\": true
            }"

      - name: Send Emergency Alert
        if: steps.backend-health.outputs.healthy == 'false' || steps.frontend-health.outputs.healthy == 'false'
        uses: slackapi/slack-github-action@v1
        with:
          webhook: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "🚨 EMERGENCY: Auto-rollback triggered",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*EMERGENCY ROLLBACK*\n\nHealth checks failed, rolling back to last successful deployment.\n\n*Reverted to*: ${{ steps.last-deployment.outputs.sha }}\n*Time*: $(date)"
                  }
                }
              ]
            }
```

### Rollback Testing

**Monthly Drill** (Required):
1. Deploy to staging
2. Intentionally break health check
3. Trigger manual rollback
4. Verify procedure completes < 5 minutes
5. Document lessons learned

---

## Monitoring & Alerts

### Monitoring Stack

```
┌──────────────────────────────────────────────────────────────┐
│                    Monitoring Architecture                    │
└──────────────────────────────────────────────────────────────┘

Application Metrics
├─ Backend (NestJS)
│  ├─ Health endpoint (/health)
│  ├─ Custom metrics (Prometheus format)
│  ├─ Error logs (Winston)
│  └─ Performance metrics
│
├─ Frontend (Next.js)
│  ├─ Health endpoint (/health)
│  ├─ Web Vitals
│  ├─ Error boundary logs
│  └─ User analytics
│
└─ Database (PostgreSQL)
   ├─ Connection pool stats
   ├─ Query performance
   ├─ Table sizes
   └─ Replication lag

Infrastructure Metrics (Coolify)
├─ Container stats (CPU, memory, network)
├─ Deployment logs
├─ Health check results
└─ Resource usage

External Monitoring (Optional)
├─ Uptime monitoring (UptimeRobot, Pingdom)
├─ APM (New Relic, Datadog)
├─ Error tracking (Sentry)
└─ Log aggregation (LogDNA, Papertrail)
```

### Key Metrics to Monitor

#### 1. Application Health

| Metric | Target | Alert Threshold | Action |
|--------|--------|----------------|--------|
| Health check success rate | 100% | < 99% | Investigate immediately |
| Response time (p95) | < 500ms | > 1000ms | Review slow queries |
| Error rate (5xx) | < 0.1% | > 1% | Trigger rollback consideration |
| Database connections | < 80% pool | > 90% | Scale database |
| Memory usage | < 70% | > 85% | Check for leaks |
| CPU usage | < 60% | > 80% | Scale replicas |

#### 2. Business Metrics

| Metric | Target | Alert Threshold | Action |
|--------|--------|----------------|--------|
| Ticket creation rate | Stable | Drop > 50% | Check form/API |
| Email campaign sends | As scheduled | Delay > 5 min | Check queue |
| Chat session starts | Stable | Drop > 70% | Check WebSocket |
| CMS page views | Stable | Drop > 80% | Check CDN |
| User logins | Stable | Drop > 60% | Check auth service |

#### 3. Infrastructure Metrics

| Metric | Target | Alert Threshold | Action |
|--------|--------|----------------|--------|
| Disk usage | < 70% | > 85% | Cleanup/expand |
| Network throughput | Stable | Spike > 200% | DDoS check |
| Deployment duration | < 5 min | > 10 min | Optimize build |
| Backup completion | 100% | Failed | Fix immediately |
| SSL certificate expiry | > 30 days | < 7 days | Renew certificate |

### Alert Configuration

**File**: `monitoring/alerts.yml` (for Prometheus/Alertmanager)

```yaml
groups:
  - name: affexai-critical
    interval: 1m
    rules:
      # Health check failures
      - alert: HealthCheckFailing
        expr: probe_success{job="health-check"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Health check failing for {{ $labels.instance }}"
          description: "Health check has been failing for 2 minutes"

      # High error rate
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "5xx error rate is {{ $value | humanizePercentage }}"

      # Database connection issues
      - alert: DatabaseConnectionPoolExhausted
        expr: database_connections_active / database_connections_max > 0.9
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "Database connection pool nearly exhausted"
          description: "{{ $value | humanizePercentage }} of connections in use"

      # Memory usage
      - alert: HighMemoryUsage
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.pod }}"
          description: "Memory usage is {{ $value | humanizePercentage }}"

      # Deployment failures
      - alert: DeploymentFailed
        expr: kube_deployment_status_replicas_available{deployment=~"affexai-.*"} < kube_deployment_spec_replicas
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deployment {{ $labels.deployment }} is not ready"
          description: "Available replicas: {{ $value }}"

  - name: affexai-business
    interval: 5m
    rules:
      # Email queue backed up
      - alert: EmailQueueBackedUp
        expr: bullmq_queue_waiting{queue="email"} > 1000
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "Email queue has {{ $value }} waiting jobs"
          description: "Check email service and BullMQ workers"

      # Low ticket creation rate
      - alert: LowTicketCreationRate
        expr: rate(ticket_created_total[1h]) < 0.1
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "Ticket creation rate is unusually low"
          description: "Only {{ $value | humanize }} tickets per hour"
```

### Slack Notification Configuration

**File**: `monitoring/slack-notifications.yml`

```yaml
# Slack webhook configuration for alerts
receivers:
  - name: 'slack-critical'
    slack_configs:
      - api_url: '${{ secrets.SLACK_WEBHOOK_CRITICAL }}'
        channel: '#affexai-alerts'
        title: '🚨 CRITICAL: {{ .GroupLabels.alertname }}'
        text: |
          *Summary*: {{ .CommonAnnotations.summary }}
          *Description*: {{ .CommonAnnotations.description }}
          *Severity*: {{ .GroupLabels.severity }}
          *Time*: {{ .StartsAt }}
        color: danger
        send_resolved: true

  - name: 'slack-warning'
    slack_configs:
      - api_url: '${{ secrets.SLACK_WEBHOOK_ALERTS }}'
        channel: '#affexai-monitoring'
        title: '⚠️ Warning: {{ .GroupLabels.alertname }}'
        text: |
          *Summary*: {{ .CommonAnnotations.summary }}
          *Description*: {{ .CommonAnnotations.description }}
          *Time*: {{ .StartsAt }}
        color: warning
        send_resolved: true

  - name: 'slack-deployment'
    slack_configs:
      - api_url: '${{ secrets.SLACK_WEBHOOK_DEPLOYMENTS }}'
        channel: '#affexai-deployments'
        title: '🚀 Deployment Update'
        text: |
          *Status*: {{ .CommonAnnotations.status }}
          *Environment*: {{ .CommonAnnotations.environment }}
          *Version*: {{ .CommonAnnotations.version }}
          *Time*: {{ .StartsAt }}
        color: good
```

### Custom Backend Logging

**File**: `apps/backend/src/common/logging/app-logger.service.ts` (Already exists)

**Enhancement for Deployment Monitoring**:
```typescript
import { Injectable, LogLevel } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemLog } from './entities/system-log.entity';

@Injectable()
export class AppLoggerService {
  // ... existing code ...

  async logDeployment(
    version: string,
    environment: 'development' | 'staging' | 'production',
    status: 'started' | 'completed' | 'failed',
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      level: status === 'failed' ? 'ERROR' : 'INFO',
      context: 'DEPLOYMENT',
      message: `Deployment ${status}: ${version}`,
      metadata: {
        version,
        environment,
        status,
        timestamp: new Date().toISOString(),
        ...metadata
      }
    });
  }

  async getDeploymentHistory(limit = 50): Promise<SystemLog[]> {
    return this.systemLogRepository.find({
      where: { context: 'DEPLOYMENT' },
      order: { createdAt: 'DESC' },
      take: limit
    });
  }
}
```

---

## Environment Management

### Environment Configuration Matrix

| Setting | Development | Staging | Production |
|---------|------------|---------|------------|
| **Node Environment** | development | production | production |
| **Debug Logging** | ✅ Enabled | ⚠️ Verbose | ❌ Disabled |
| **TypeORM Sync** | ✅ true | ❌ false | ❌ false |
| **Rate Limiting** | ❌ Disabled | ✅ Enabled | ✅ Enabled (strict) |
| **CORS** | * (all origins) | staging.affexai.com | affexai.com |
| **SSL/HTTPS** | ❌ HTTP only | ✅ Required | ✅ Required |
| **Database Backups** | Manual | Daily | Hourly + daily |
| **Replicas** | 1 | 1 | 2+ |
| **Health Checks** | Optional | Required | Required (strict) |
| **Monitoring** | Basic | Full | Full + alerts |

### Environment Variables Management

**Strategy**: Hierarchical configuration with overrides

```
Base Configuration (.env.example)
        │
        ├─ Development (.env.local) - local overrides
        │
        ├─ Staging (Coolify env vars) - staging-specific
        │
        └─ Production (Coolify env vars) - production-specific
```

**File**: `.env.example` (Checked into Git)
```bash
# ============================================
# Affexai Environment Configuration Template
# ============================================
# Copy to .env.local and fill in values

# ============================================
# APPLICATION
# ============================================
NODE_ENV=development
PORT=9006
FRONTEND_PORT=9003

# ============================================
# DATABASE (PostgreSQL)
# ============================================
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=affexai_dev
DATABASE_SYNCHRONIZE=true  # DANGER: Set to false in production!

# ============================================
# REDIS
# ============================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Optional

# ============================================
# JWT AUTHENTICATION
# ============================================
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# ============================================
# AI PROVIDERS (Get keys from respective platforms)
# ============================================
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# ============================================
# AWS S3 (Media Storage)
# ============================================
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=affexai-uploads
AWS_REGION=us-east-1

# ============================================
# EMAIL (Resend)
# ============================================
RESEND_API_KEY=re_...

# ============================================
# FRONTEND PUBLIC VARIABLES
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:9006
NEXT_PUBLIC_SOCKET_URL=http://localhost:9006
NEXT_PUBLIC_APP_URL=http://localhost:9003

# ============================================
# MONITORING & LOGGING
# ============================================
LOG_LEVEL=debug  # error | warn | info | debug
SENTRY_DSN=  # Optional error tracking

# ============================================
# FEATURE FLAGS
# ============================================
ENABLE_EMAIL_MARKETING=true
ENABLE_AI_CHATBOT=true
ENABLE_ANALYTICS=true
```

**File**: `apps/backend/config/configuration.ts` (Enhanced)
```typescript
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 9006,

  // Database
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    name: process.env.DATABASE_NAME || 'affexai_dev',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',  // CRITICAL
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // AI Providers
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
    google: {
      apiKey: process.env.GOOGLE_AI_API_KEY,
    },
  },

  // AWS S3
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION || 'us-east-1',
  },

  // Email
  email: {
    resend: {
      apiKey: process.env.RESEND_API_KEY,
    },
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:9003'],
    credentials: true,
  },

  // Feature Flags
  features: {
    emailMarketing: process.env.ENABLE_EMAIL_MARKETING === 'true',
    aiChatbot: process.env.ENABLE_AI_CHATBOT === 'true',
    analytics: process.env.ENABLE_ANALYTICS === 'true',
  },

  // Monitoring
  monitoring: {
    logLevel: process.env.LOG_LEVEL || 'info',
    sentryDsn: process.env.SENTRY_DSN,
  },
}));
```

### Secrets Management

**Strategy**: Never commit secrets to Git

#### Local Development
```bash
# .env.local (gitignored)
DATABASE_PASSWORD=local-dev-password
JWT_SECRET=local-dev-secret
OPENAI_API_KEY=sk-local-dev-key
```

#### Coolify Secrets
```yaml
# Set via Coolify UI: Application → Environment Variables

# Encrypted secrets
DATABASE_PASSWORD=*** (encrypted)
JWT_SECRET=*** (encrypted)
OPENAI_API_KEY=*** (encrypted)
ANTHROPIC_API_KEY=*** (encrypted)
GOOGLE_AI_API_KEY=*** (encrypted)
AWS_SECRET_ACCESS_KEY=*** (encrypted)
RESEND_API_KEY=*** (encrypted)

# Non-sensitive config
DATABASE_HOST=postgres.coolify.svc
DATABASE_PORT=5432
DATABASE_NAME=affexai_prod
REDIS_HOST=redis.coolify.svc
```

#### GitHub Secrets (for CI/CD)
```yaml
# Repository → Settings → Secrets and variables → Actions

# Coolify webhooks
COOLIFY_WEBHOOK_BACKEND=https://coolify.yourserver.com/webhook/...
COOLIFY_WEBHOOK_FRONTEND=https://coolify.yourserver.com/webhook/...

# Deployment verification
BACKEND_URL=https://api.affexai.com
FRONTEND_URL=https://affexai.com

# Environment variables for build
NEXT_PUBLIC_API_URL=https://api.affexai.com
NEXT_PUBLIC_SOCKET_URL=https://api.affexai.com
NEXT_PUBLIC_APP_URL=https://affexai.com

# Notifications
SLACK_WEBHOOK=https://hooks.slack.com/services/...
SLACK_WEBHOOK_CRITICAL=https://hooks.slack.com/services/...
SLACK_WEBHOOK_ALERTS=https://hooks.slack.com/services/...
SLACK_WEBHOOK_DEPLOYMENTS=https://hooks.slack.com/services/...
```

### Configuration Validation

**File**: `apps/backend/src/config/config.validation.ts`
```typescript
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, IsNumber, IsBoolean, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  @IsString()
  JWT_SECRET: string;

  // Add more validations as needed
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.toString()}`);
  }

  return validatedConfig;
}
```

**Usage** (in `app.module.ts`):
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,  // Validate on startup
    }),
  ],
})
export class AppModule {}
```

---

## Risk Mitigation

### Risk Assessment Matrix

| Risk | Probability | Impact | Severity | Mitigation |
|------|------------|--------|----------|------------|
| **Database migration failure** | Medium | Critical | 🔴 High | Pre-migration backups, staging tests, rollback scripts |
| **Docker build failure (Tiptap)** | High | High | 🟡 Medium | Fix package-lock, add build validation to CI |
| **Zero-downtime deployment failure** | Low | High | 🟡 Medium | Rolling deployment, health checks, auto-rollback |
| **Data loss during migration** | Low | Critical | 🔴 High | Automated backups, CMS data validation, forensic logs |
| **API key exposure** | Low | Critical | 🔴 High | Secrets management, .env.local gitignored, Coolify encryption |
| **SSL certificate expiry** | Low | High | 🟡 Medium | Auto-renewal (Coolify), 30-day expiry alerts |
| **Dependency vulnerabilities** | Medium | Medium | 🟢 Low | npm audit in CI, Dependabot alerts, regular updates |
| **DDoS attack** | Low | High | 🟡 Medium | Cloudflare/CDN, rate limiting, IP blocking |
| **Database connection pool exhaustion** | Medium | High | 🟡 Medium | Connection pooling tuning, auto-scaling |
| **Disk space exhaustion** | Medium | Medium | 🟢 Low | Log rotation, backup cleanup, disk usage alerts |

### Mitigation Strategies

#### 1. Database Migration Safety

**Problem**: Migration could corrupt data or break production

**Mitigation**:
```yaml
Pre-Migration:
  - [x] Test on local database
  - [x] Test on staging with production snapshot
  - [x] Automated backup before migration
  - [x] Rollback script prepared
  - [x] Data integrity checks in migration code
  - [x] CMS data preservation validated

During Migration:
  - [x] Lock database (optional, for critical changes)
  - [x] Log all migration steps
  - [x] Row count validation
  - [x] Foreign key constraint checks

Post-Migration:
  - [x] Automated health checks
  - [x] Data integrity verification
  - [x] Backup retention (7 days)
  - [x] Monitor for errors (15 minutes)
```

**Script**: `apps/backend/scripts/safe-migration.sh`
```bash
#!/bin/bash
# Safe migration script with automated backup & rollback

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/app/backups/pre_migration_${TIMESTAMP}.sql"

echo "🔒 Starting safe migration process..."

# 1. Backup current state
echo "📦 Creating backup..."
./scripts/db-backup.sh
BACKUP_STATUS=$?

if [ $BACKUP_STATUS -ne 0 ]; then
  echo "❌ Backup failed! Aborting migration."
  exit 1
fi

echo "✅ Backup created: ${BACKUP_FILE}"

# 2. Run migrations
echo "🔄 Running migrations..."
npm run typeorm:migration:run 2>&1 | tee /tmp/migration.log
MIGRATION_STATUS=$?

if [ $MIGRATION_STATUS -ne 0 ]; then
  echo "❌ Migration failed!"
  echo "📋 Rolling back to backup..."
  ./scripts/db-restore.sh "${BACKUP_FILE}"
  exit 1
fi

# 3. Verify data integrity
echo "🔍 Verifying data integrity..."
./scripts/verify-data-integrity.sh
VERIFY_STATUS=$?

if [ $VERIFY_STATUS -ne 0 ]; then
  echo "❌ Data integrity check failed!"
  echo "📋 Rolling back to backup..."
  ./scripts/db-restore.sh "${BACKUP_FILE}"
  exit 1
fi

echo "✅ Migration completed successfully"
echo "📦 Backup retained: ${BACKUP_FILE}"
```

#### 2. Tiptap Build Failure Prevention

**Problem**: package-lock.json desync causes Docker build failures

**Mitigation**:

**File**: `.github/workflows/validate-package-lock.yml`
```yaml
name: Validate Package Lock

on:
  pull_request:
    paths:
      - 'package.json'
      - 'apps/*/package.json'
      - 'package-lock.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: Verify Lock File
        run: |
          git diff --exit-code package-lock.json || {
            echo "❌ ERROR: package-lock.json is out of sync!"
            echo ""
            echo "To fix:"
            echo "  1. Delete package-lock.json and node_modules/"
            echo "  2. Run: npm install --legacy-peer-deps"
            echo "  3. Commit the updated package-lock.json"
            exit 1
          }

      - name: Verify Tiptap Versions
        run: |
          echo "📦 Checking Tiptap package versions..."

          TIPTAP_CORE=$(jq -r '.dependencies["@tiptap/core"]' apps/frontend/package.json)
          TIPTAP_REACT=$(jq -r '.dependencies["@tiptap/react"]' apps/frontend/package.json)
          TIPTAP_STARTER=$(jq -r '.dependencies["@tiptap/starter-kit"]' apps/frontend/package.json)

          if [ "$TIPTAP_CORE" != "$TIPTAP_REACT" ] || [ "$TIPTAP_CORE" != "$TIPTAP_STARTER" ]; then
            echo "❌ ERROR: Tiptap version mismatch!"
            echo "Core: ${TIPTAP_CORE}"
            echo "React: ${TIPTAP_REACT}"
            echo "Starter Kit: ${TIPTAP_STARTER}"
            exit 1
          fi

          echo "✅ All Tiptap packages at version ${TIPTAP_CORE}"
```

**Fix Script**: `scripts/fix-tiptap-dependencies.sh`
```bash
#!/bin/bash
# Fix Tiptap dependency conflicts

set -e

echo "🔧 Fixing Tiptap dependencies..."

# 1. Clean existing installations
echo "🧹 Cleaning node_modules..."
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# 2. Clean package-lock.json
echo "🧹 Removing package-lock.json..."
rm -f package-lock.json

# 3. Ensure consistent Tiptap versions in frontend
cd apps/frontend
TIPTAP_VERSION="3.7.2"

echo "📦 Locking Tiptap to version ${TIPTAP_VERSION}..."
npm install --save-exact \
  @tiptap/core@${TIPTAP_VERSION} \
  @tiptap/react@${TIPTAP_VERSION} \
  @tiptap/starter-kit@${TIPTAP_VERSION} \
  @tiptap/extension-mention@${TIPTAP_VERSION} \
  @tiptap/suggestion@${TIPTAP_VERSION} \
  @tiptap/pm@${TIPTAP_VERSION}

cd ../..

# 4. Reinstall all dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# 5. Verify build
echo "🔨 Testing build..."
npm run build:frontend

echo "✅ Tiptap dependencies fixed!"
echo ""
echo "Next steps:"
echo "  1. Review git diff to see changes"
echo "  2. Commit package.json and package-lock.json"
echo "  3. Push to trigger CI/CD validation"
```

#### 3. Zero-Downtime Deployment Safety

**Problem**: New deployment could cause downtime

**Mitigation**:
- Rolling deployment strategy (max 1 new container at a time)
- Health check validation before routing traffic
- Graceful shutdown (10s drain period)
- Auto-rollback on health check failure
- Keep old containers running until new ones healthy

**Coolify Configuration**:
```yaml
deployment:
  strategy: rolling
  maxSurge: 1
  maxUnavailable: 0

  readinessProbe:
    httpGet:
      path: /health
      port: 3001
    initialDelaySeconds: 10
    periodSeconds: 5
    successThreshold: 2
    failureThreshold: 3

  livenessProbe:
    httpGet:
      path: /health
      port: 3001
    initialDelaySeconds: 30
    periodSeconds: 10
    failureThreshold: 3

  lifecycle:
    preStop:
      exec:
        command: ["sh", "-c", "sleep 10"]
```

#### 4. Secrets Exposure Prevention

**Problem**: API keys accidentally committed or exposed

**Mitigation**:

**File**: `.gitignore` (Verify these entries exist)
```bash
# Environment variables
.env
.env.local
.env.*.local

# Sensitive files
*.pem
*.key
*.cert
credentials.json
secrets.yml

# Logs with potential secrets
*.log
logs/
```

**File**: `.github/workflows/secret-scan.yml`
```yaml
name: Secret Scanning

on:
  push:
    branches: ['**']
  pull_request:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history

      - name: TruffleHog Secret Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

      - name: GitGuardian Secret Scan
        uses: GitGuardian/ggshield-action@master
        env:
          GITHUB_PUSH_BEFORE_SHA: ${{ github.event.before }}
          GITHUB_PUSH_BASE_SHA: ${{ github.event.base }}
          GITHUB_DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}
```

**Pre-commit Hook**: `.git/hooks/pre-commit`
```bash
#!/bin/bash
# Pre-commit hook to prevent secret exposure

echo "🔍 Scanning for secrets..."

# Check for common secret patterns
if git diff --cached | grep -E "(API_KEY|SECRET|PASSWORD|TOKEN).*=.*['\"][^'\"]{20,}['\"]"; then
  echo "❌ Potential secret detected in commit!"
  echo "Review your changes and use environment variables instead."
  exit 1
fi

# Check for .env files
if git diff --cached --name-only | grep -E "\.env$|\.env\.local$"; then
  echo "❌ Attempting to commit .env file!"
  echo "Add to .gitignore instead."
  exit 1
fi

echo "✅ No secrets detected"
```

---

## Emergency Procedures

### Emergency Response Playbook

#### Scenario 1: Complete Site Outage (5xx Errors)

**Severity**: 🔴 Critical
**Target Resolution**: < 5 minutes

**Symptoms**:
- Health checks failing
- 500/502/503 errors on all endpoints
- No database connectivity
- Container crashes

**Immediate Actions**:
```bash
# 1. Check service status
curl https://api.affexai.com/health
curl https://affexai.com

# 2. Check container logs (Coolify UI or CLI)
kubectl logs deployment/affexai-backend --tail=100
kubectl logs deployment/affexai-frontend --tail=100

# 3. Check database connectivity
pg_isready -h postgres.coolify.svc -p 5432

# 4. If database is down: restart PostgreSQL
kubectl restart deployment/postgres

# 5. If containers crashed: trigger rollback
gh workflow run auto-rollback.yml

# 6. Monitor recovery
watch -n 2 'curl -s https://api.affexai.com/health | jq'
```

**Root Cause Investigation** (Post-Recovery):
1. Review deployment logs
2. Check database migration logs
3. Analyze error logs from system_logs table
4. Review recent code changes
5. Document in post-mortem

#### Scenario 2: Database Corruption/Data Loss

**Severity**: 🔴 Critical
**Target Resolution**: < 10 minutes

**Symptoms**:
- Missing CMS pages
- User data inconsistencies
- Foreign key constraint violations
- Row count mismatches

**Immediate Actions**:
```bash
# 1. Stop all write operations
kubectl scale deployment/affexai-backend --replicas=0

# 2. Identify last good backup
aws s3 ls s3://affexai-backups/database/ --human-readable | tail -20

# 3. Restore from backup
BACKUP_FILE="affexai_prod_20251122_143000.sql.gz"
./scripts/db-restore.sh "s3://affexai-backups/database/${BACKUP_FILE}"

# 4. Verify data integrity
./scripts/verify-data-integrity.sh

# 5. Restart application
kubectl scale deployment/affexai-backend --replicas=2

# 6. Monitor for errors
tail -f /var/log/affexai/backend.log | grep ERROR
```

**Data Recovery Verification**:
```sql
-- Check CMS page count
SELECT COUNT(*) FROM pages;

-- Check user count
SELECT COUNT(*) FROM users;

-- Check ticket count (last 24h)
SELECT COUNT(*) FROM tickets WHERE created_at > NOW() - INTERVAL '24 hours';

-- Verify foreign key constraints
SELECT conname, conrelid::regclass, confrelid::regclass
FROM pg_constraint
WHERE contype = 'f' AND convalidated = false;
```

#### Scenario 3: API Rate Limit Exceeded (AI Providers)

**Severity**: 🟡 Medium
**Target Resolution**: < 2 minutes

**Symptoms**:
- AI chatbot returning errors
- Email campaign generation failing
- 429 Too Many Requests from AI providers

**Immediate Actions**:
```bash
# 1. Check current AI usage
SELECT provider, COUNT(*) as calls, AVG(duration) as avg_duration
FROM system_logs
WHERE context = 'AI' AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY provider;

# 2. Switch to backup AI provider
curl -X PUT "https://api.affexai.com/api/settings/ai" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "global": {
      "provider": "anthropic",
      "model": "claude-3-5-sonnet",
      "enabled": true
    }
  }'

# 3. Or temporarily disable AI features
curl -X PUT "https://api.affexai.com/api/settings/feature-flags" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "aiChatbot": false
  }'

# 4. Notify users (if major impact)
# Post banner on frontend about temporary AI unavailability
```

#### Scenario 4: SSL Certificate Expiry

**Severity**: 🟡 Medium
**Target Resolution**: < 15 minutes

**Symptoms**:
- Browser SSL warnings
- API calls failing with certificate errors
- Webhook deliveries failing

**Immediate Actions**:
```bash
# 1. Check certificate expiry
echo | openssl s_client -servername affexai.com -connect affexai.com:443 2>/dev/null | openssl x509 -noout -dates

# 2. Renew certificate (Coolify automatic, or manual)
# Via Coolify UI: Application → Settings → SSL → Renew

# 3. Or use Certbot manually
sudo certbot renew --nginx

# 4. Verify new certificate
curl -I https://affexai.com

# 5. Clear CDN cache (if applicable)
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
  -d '{"purge_everything":true}'
```

#### Scenario 5: DDoS Attack / Traffic Spike

**Severity**: 🟡 Medium
**Target Resolution**: < 5 minutes

**Symptoms**:
- Abnormal traffic spike (10x normal)
- High CPU/memory usage
- Slow response times
- Database connection pool exhaustion

**Immediate Actions**:
```bash
# 1. Enable rate limiting (if not already)
curl -X PUT "https://api.affexai.com/api/settings/security" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "rateLimiting": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    }
  }'

# 2. Block suspicious IPs
# Check recent requests
SELECT
  ip_address,
  COUNT(*) as request_count,
  MIN(created_at) as first_seen,
  MAX(created_at) as last_seen
FROM analytics_events
WHERE created_at > NOW() - INTERVAL '5 minutes'
GROUP BY ip_address
ORDER BY request_count DESC
LIMIT 20;

# 3. Add to firewall (example with iptables)
sudo iptables -A INPUT -s 1.2.3.4 -j DROP

# 4. Enable Cloudflare "Under Attack" mode (if using Cloudflare)
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level" \
  -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
  -d '{"value":"under_attack"}'

# 5. Scale up replicas (temporary)
kubectl scale deployment/affexai-backend --replicas=5
```

### Incident Communication Template

**Slack Message** (for critical incidents):
```
🚨 INCIDENT DETECTED

*Type*: [Database Outage / Deployment Failure / API Provider Issue]
*Severity*: [Critical / High / Medium]
*Detected*: [2025-11-22 14:30:00 UTC]
*Impact*: [All users / Specific feature / Backend only]

*Status*: 🔄 Investigating

*Actions Taken*:
1. [Action 1]
2. [Action 2]

*Next Steps*:
- [Next step 1]
- [Next step 2]

*Estimated Resolution*: [15 minutes / 1 hour / Unknown]

*Incident Commander*: @DevOpsTeam
```

**User-Facing Banner** (frontend):
```tsx
// apps/frontend/src/components/incident-banner.tsx
import { Alert, AlertDescription } from '@/components/ui/alert';

export function IncidentBanner() {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        ⚠️ We're currently experiencing technical difficulties.
        Our team is working to resolve the issue.
        Expected resolution: 15 minutes.
      </AlertDescription>
    </Alert>
  );
}
```

### Post-Incident Review Template

**File**: `claudedocs/incidents/YYYY-MM-DD-incident-name.md`

```markdown
# Post-Incident Review: [Incident Name]

**Date**: 2025-11-22
**Duration**: 14:30 - 14:45 UTC (15 minutes)
**Severity**: Critical
**Commander**: [Name]

## Summary

Brief description of what happened.

## Impact

- **Users Affected**: 1,200 active users
- **Features Impacted**: AI Chatbot, Email Campaigns
- **Data Loss**: None
- **Revenue Impact**: Minimal (no payments during incident)

## Timeline (UTC)

| Time | Event |
|------|-------|
| 14:30 | Health checks started failing |
| 14:32 | Auto-rollback triggered |
| 14:35 | Database connectivity restored |
| 14:40 | All services back online |
| 14:45 | Incident resolved |

## Root Cause

Database connection pool exhausted due to migration adding 100 new connections without increasing pool size.

## Resolution

1. Increased database connection pool from 50 to 100
2. Added connection pool monitoring
3. Updated migration script to check pool capacity

## Preventive Measures

- [ ] Add connection pool usage to health check
- [ ] Add alert for >80% pool usage
- [ ] Document connection pool tuning in CLAUDE.md
- [ ] Add pre-migration validation for connection limits

## Lessons Learned

### What Went Well

- Auto-rollback worked as designed
- Incident detected within 2 minutes
- Communication was clear and timely

### What Needs Improvement

- Pre-migration validation missed connection pool issue
- No alert for connection pool exhaustion
- Staging environment had different pool size than production

## Action Items

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| Add connection pool monitoring | DevOps | 2025-11-25 | 🔄 In Progress |
| Update migration checklist | Backend | 2025-11-23 | ✅ Done |
| Sync staging config with prod | DevOps | 2025-11-24 | ⏳ Pending |
```

---

## Implementation Checklist

### Phase 1: Pre-Deployment Setup (Week 1)

**Infrastructure**:
- [ ] Set up staging environment in Coolify
- [ ] Configure PostgreSQL with automated backups
- [ ] Configure Redis cluster
- [ ] Set up S3 buckets (prod, staging)
- [ ] Configure SSL certificates

**Code Preparation**:
- [ ] Fix package-lock.json desync
  - [ ] Run `./scripts/fix-tiptap-dependencies.sh`
  - [ ] Commit updated package-lock.json
  - [ ] Verify Docker build succeeds
- [ ] Set `synchronize: false` in production config
  - [ ] Update `apps/backend/src/database/data-source.ts`
  - [ ] Generate migration for current schema
- [ ] Add health check endpoints
  - [ ] Backend: `/health` and `/health/ready`
  - [ ] Frontend: `/health`
- [ ] Implement graceful shutdown
  - [ ] Backend: SIGTERM handler
  - [ ] Drain connections (10s)

**Testing**:
- [ ] Write critical path tests
  - [ ] User login/logout
  - [ ] Ticket creation
  - [ ] Email campaign send
  - [ ] CMS page rendering
- [ ] Set up test database
- [ ] Configure Jest for CI

### Phase 2: CI/CD Implementation (Week 2)

**GitHub Actions**:
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Add validation job (lint, typecheck, audit)
- [ ] Add build-and-test job
- [ ] Add docker-build job
- [ ] Add deploy-coolify job
- [ ] Add post-deploy validation
- [ ] Test workflow on staging branch

**Secrets Configuration**:
- [ ] Add GitHub Secrets:
  - [ ] COOLIFY_WEBHOOK_BACKEND
  - [ ] COOLIFY_WEBHOOK_FRONTEND
  - [ ] BACKEND_URL
  - [ ] FRONTEND_URL
  - [ ] SLACK_WEBHOOK
  - [ ] NEXT_PUBLIC_API_URL
  - [ ] NEXT_PUBLIC_SOCKET_URL
  - [ ] NEXT_PUBLIC_APP_URL
- [ ] Add Coolify environment variables (production)
- [ ] Verify secrets not committed to Git

**Coolify Configuration**:
- [ ] Create backend application
  - [ ] Set environment variables
  - [ ] Configure health checks
  - [ ] Set deployment strategy (rolling)
  - [ ] Set replicas (2)
- [ ] Create frontend application
  - [ ] Set build arguments
  - [ ] Configure health checks
  - [ ] Set deployment strategy (rolling)
  - [ ] Set replicas (2)
- [ ] Configure webhooks
- [ ] Test webhook trigger

### Phase 3: Database Migration Strategy (Week 2-3)

**Migration Preparation**:
- [ ] Generate migration for current schema
  ```bash
  npm run typeorm:migration:generate -- src/database/migrations/InitialProduction
  ```
- [ ] Review migration files
- [ ] Add data integrity checks to migrations
- [ ] Write rollback scripts
- [ ] Test migrations on staging

**Backup Scripts**:
- [ ] Create `scripts/db-backup.sh`
- [ ] Create `scripts/db-restore.sh`
- [ ] Create `scripts/verify-data-integrity.sh`
- [ ] Create `scripts/safe-migration.sh`
- [ ] Test backup/restore on staging
- [ ] Configure S3 upload for backups

**Migration Testing**:
- [ ] Restore production snapshot to staging
- [ ] Run migrations on staging
- [ ] Verify data integrity
- [ ] Test rollback procedure
- [ ] Document any manual steps

### Phase 4: Monitoring & Alerts (Week 3)

**Logging**:
- [ ] Verify AppLoggerService captures all errors
- [ ] Add deployment logging
- [ ] Add migration logging
- [ ] Configure log rotation
- [ ] Set up log aggregation (optional)

**Health Checks**:
- [ ] Implement backend health endpoint
- [ ] Implement frontend health endpoint
- [ ] Add database health check
- [ ] Add Redis health check
- [ ] Add S3 connectivity check

**Alerting**:
- [ ] Set up Slack webhook
- [ ] Configure critical alerts
  - [ ] Health check failures
  - [ ] High error rate (5xx)
  - [ ] Database connection pool exhaustion
  - [ ] Deployment failures
- [ ] Configure warning alerts
  - [ ] High memory usage
  - [ ] Slow queries
  - [ ] Email queue backed up
- [ ] Test alert delivery

**Metrics** (Optional):
- [ ] Set up Prometheus
- [ ] Configure Grafana dashboards
- [ ] Add custom metrics
- [ ] Configure retention policies

### Phase 5: Staging Deployment (Week 3)

**Pre-Deployment**:
- [ ] Verify all checklist items complete
- [ ] Review deployment workflow
- [ ] Prepare rollback plan
- [ ] Schedule deployment window

**Deployment**:
- [ ] Trigger deployment to staging
  ```bash
  git push origin staging
  ```
- [ ] Monitor GitHub Actions workflow
- [ ] Verify health checks pass
- [ ] Run smoke tests
- [ ] Monitor logs (15 minutes)

**Validation**:
- [ ] Test critical user flows
  - [ ] User login
  - [ ] Ticket creation
  - [ ] AI chatbot interaction
  - [ ] Email campaign send
  - [ ] CMS page editing
- [ ] Check database integrity
- [ ] Review error logs
- [ ] Performance testing

### Phase 6: Production Deployment (Week 4)

**Pre-Deployment**:
- [ ] All staging tests passed
- [ ] Team approval for production
- [ ] Communication plan ready
- [ ] Rollback plan reviewed
- [ ] Backup verification

**Deployment Window**:
- [ ] Schedule low-traffic period
- [ ] Notify stakeholders
- [ ] Prepare support team

**Deployment Execution**:
- [ ] Create pre-deployment database backup
  ```bash
  ./scripts/db-backup.sh
  ```
- [ ] Verify backup uploaded to S3
- [ ] Trigger deployment
  ```bash
  git push origin main
  ```
- [ ] Monitor GitHub Actions
- [ ] Monitor Coolify deployment
- [ ] Verify health checks
- [ ] Run smoke tests

**Post-Deployment**:
- [ ] Monitor error logs (30 minutes)
- [ ] Check key metrics
  - [ ] Response times
  - [ ] Error rates
  - [ ] Database connections
- [ ] Test critical paths
- [ ] Send deployment notification
- [ ] Update deployment log

### Phase 7: Post-Production (Ongoing)

**Documentation**:
- [ ] Update CLAUDE.md with deployment info
- [ ] Document any issues encountered
- [ ] Update runbooks
- [ ] Create post-deployment report

**Optimization**:
- [ ] Review deployment metrics
- [ ] Identify bottlenecks
- [ ] Optimize build times
- [ ] Tune database queries
- [ ] Review resource usage

**Maintenance**:
- [ ] Schedule monthly rollback drill
- [ ] Review and update dependencies
- [ ] Rotate API keys (quarterly)
- [ ] Review security alerts
- [ ] Update backup retention policy

---

## Conclusion

This production deployment strategy provides:

1. **Automated CI/CD Pipeline**: GitHub Actions → Coolify integration
2. **Zero-Downtime Deployments**: Rolling deployment with health checks
3. **Database Safety**: Automated backups, migration validation, rollback scripts
4. **Fast Rollback**: < 2 minutes to previous version
5. **Comprehensive Monitoring**: Health checks, alerts, error tracking
6. **Risk Mitigation**: Pre-deployment validation, automated testing
7. **Emergency Procedures**: Incident response playbooks, rollback automation

**Key Success Factors**:
- Fix package-lock.json desync before production
- Set `synchronize: false` for production database
- Test migrations on staging with production snapshots
- Implement automated backups before every deployment
- Monitor health checks and error rates continuously
- Maintain rollback capability at all times

**Next Steps**:
1. Execute Phase 1-7 checklist
2. Perform staging deployment
3. Validate rollback procedures
4. Deploy to production during low-traffic window
5. Monitor and iterate

**Support**:
- DevOps Team: On-call for deployment support
- Slack Channel: #affexai-deployments
- Incident Commander: [Name]
- Emergency Contact: [Phone/Email]

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Owner**: DevOps Team
**Review Cadence**: Monthly (or after major incidents)
