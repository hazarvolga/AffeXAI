# Affexai Platform - Deployment Architecture Diagrams

> **Visual Reference for Production Deployment Strategy**
> **Last Updated**: 2025-11-22

---

## Table of Contents

1. [CI/CD Pipeline Flow](#cicd-pipeline-flow)
2. [Infrastructure Architecture](#infrastructure-architecture)
3. [Database Migration Strategy](#database-migration-strategy)
4. [Rolling Deployment Process](#rolling-deployment-process)
5. [Rollback Procedures](#rollback-procedures)
6. [Monitoring Architecture](#monitoring-architecture)

---

## CI/CD Pipeline Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE CI/CD PIPELINE                           │
└──────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│  Developer      │
│  Pushes Code    │
│  to GitHub      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        GITHUB REPOSITORY (main/staging)                  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     │ Webhook Trigger
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           GITHUB ACTIONS RUNNER                          │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ STAGE 1: VALIDATION (Parallel - 10 min)                       │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ • Package Lock Validation                                      │    │
│  │ • ESLint (Backend + Frontend)                                  │    │
│  │ • TypeScript Check (Backend + Frontend)                        │    │
│  │ • Security Audit (npm audit)                                   │    │
│  │ • Tiptap Version Consistency Check                             │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                     │                                    │
│                                     │ ✅ All Checks Pass                 │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ STAGE 2: BUILD & TEST (Parallel - 20 min)                     │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ Services:                                                       │    │
│  │   • PostgreSQL 14 (test database)                              │    │
│  │   • Redis 7 (cache)                                            │    │
│  │                                                                 │    │
│  │ Build Steps:                                                    │    │
│  │   1. Install dependencies (npm ci --legacy-peer-deps)          │    │
│  │   2. Build shared-types package                                │    │
│  │   3. Build backend (NestJS)                                    │    │
│  │   4. Build frontend (Next.js)                                  │    │
│  │   5. Run backend unit tests (Jest)                             │    │
│  │   6. Run frontend unit tests                                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                     │                                    │
│                                     │ ✅ Build Success                   │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ STAGE 3: DOCKER BUILD (Parallel - 30 min)                     │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ Backend Image:                                                  │    │
│  │   • Multi-stage build (builder + production)                   │    │
│  │   • Tag: ghcr.io/org/affexai-backend:main-abc123               │    │
│  │   • Tag: ghcr.io/org/affexai-backend:latest                    │    │
│  │   • Push to GitHub Container Registry                          │    │
│  │                                                                 │    │
│  │ Frontend Image:                                                 │    │
│  │   • Multi-stage build (builder + production)                   │    │
│  │   • Tag: ghcr.io/org/affexai-frontend:main-abc123              │    │
│  │   • Tag: ghcr.io/org/affexai-frontend:latest                   │    │
│  │   • Push to GitHub Container Registry                          │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                     │                                    │
│                                     │ ✅ Images Pushed                   │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ STAGE 4: DEPLOY TO COOLIFY (15 min)                           │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ 1. Trigger Backend Webhook                                      │    │
│  │    curl POST $COOLIFY_WEBHOOK_BACKEND                          │    │
│  │                                                                 │    │
│  │ 2. Trigger Frontend Webhook                                     │    │
│  │    curl POST $COOLIFY_WEBHOOK_FRONTEND                         │    │
│  │                                                                 │    │
│  │ 3. Wait for containers to start (60s)                          │    │
│  │                                                                 │    │
│  │ 4. Health Check Loop (Backend)                                 │    │
│  │    • Retry 10 times with 10s interval                          │    │
│  │    • Check /health endpoint                                    │    │
│  │                                                                 │    │
│  │ 5. Health Check Loop (Frontend)                                │    │
│  │    • Retry 10 times with 10s interval                          │    │
│  │    • Check / endpoint                                          │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                     │                                    │
│                                     │ ✅ Deployment Successful           │
│                                     ▼                                    │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ STAGE 5: POST-DEPLOYMENT (10 min)                             │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ Smoke Tests:                                                    │    │
│  │   • GET /api/settings                                          │    │
│  │   • GET / (homepage)                                           │    │
│  │                                                                 │    │
│  │ Notifications:                                                  │    │
│  │   • Send Slack notification                                    │    │
│  │     - Status: success/failure                                  │    │
│  │     - Environment: main/staging                                │    │
│  │     - Commit SHA                                               │    │
│  │     - Author                                                   │    │
│  │                                                                 │    │
│  │ Logging:                                                        │    │
│  │   • Log deployment metadata                                    │    │
│  │   • Update deployment history                                  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │  PRODUCTION RUNNING  │
                          │  ✅ Deployment Done  │
                          └──────────────────────┘
```

---

## Infrastructure Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      PRODUCTION INFRASTRUCTURE                            │
└──────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   CLOUDFLARE    │
                              │   CDN + WAF     │
                              └────────┬────────┘
                                       │ HTTPS
                  ┌────────────────────┼────────────────────┐
                  │                    │                    │
                  ▼                    ▼                    ▼
        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
        │   affexai.com    │  │ api.affexai.com  │  │  S3 Bucket CDN   │
        │   (Frontend)     │  │   (Backend API)  │  │   (Media/Assets) │
        └────────┬─────────┘  └────────┬─────────┘  └──────────────────┘
                 │                     │
                 │                     │
┌────────────────▼─────────────────────▼──────────────────────────────────┐
│                         COOLIFY DEPLOYMENT PLATFORM                       │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      FRONTEND CONTAINERS                        │   │
│  │  ┌────────────────────┐           ┌────────────────────┐       │   │
│  │  │  frontend-1        │           │  frontend-2        │       │   │
│  │  │  Next.js 15        │           │  Next.js 15        │       │   │
│  │  │  Port: 3000        │           │  Port: 3000        │       │   │
│  │  │  Status: HEALTHY   │           │  Status: HEALTHY   │       │   │
│  │  └────────────────────┘           └────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      BACKEND CONTAINERS                         │   │
│  │  ┌────────────────────┐           ┌────────────────────┐       │   │
│  │  │  backend-1         │           │  backend-2         │       │   │
│  │  │  NestJS 11         │           │  NestJS 11         │       │   │
│  │  │  Port: 3001        │           │  Port: 3001        │       │   │
│  │  │  Status: HEALTHY   │           │  Status: HEALTHY   │       │   │
│  │  └────────────────────┘           └────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      WORKER CONTAINERS                          │   │
│  │  ┌────────────────────┐           ┌────────────────────┐       │   │
│  │  │  email-worker-1    │           │  automation-worker │       │   │
│  │  │  BullMQ Consumer   │           │  BullMQ Consumer   │       │   │
│  │  │  Queue: email      │           │  Queue: automation │       │   │
│  │  │  Status: HEALTHY   │           │  Status: HEALTHY   │       │   │
│  │  └────────────────────┘           └────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                 │                                    │
                 │                                    │
    ┌────────────▼────────────┐         ┌────────────▼────────────┐
    │   POSTGRESQL 14         │         │     REDIS CLUSTER       │
    │   (Managed Service)     │         │   (Managed Service)     │
    ├─────────────────────────┤         ├─────────────────────────┤
    │ • Primary (Read/Write)  │         │ • Node 1 (Master)       │
    │ • Replica 1 (Read Only) │         │ • Node 2 (Replica)      │
    │ • Replica 2 (Read Only) │         │ • Node 3 (Replica)      │
    │                         │         │                         │
    │ Backups:                │         │ Persistence:            │
    │ • Daily (30 days)       │         │ • RDB snapshots         │
    │ • Hourly (7 days)       │         │ • AOF logs              │
    │ • Pre-migration         │         │                         │
    └─────────────────────────┘         └─────────────────────────┘
                 │
                 │ Backup Upload
                 ▼
    ┌─────────────────────────┐
    │   AWS S3 BACKUPS        │
    │   s3://affexai-backups  │
    ├─────────────────────────┤
    │ /database/              │
    │   - affexai_prod_*.sql  │
    │ /media/                 │
    │   - production snapshots│
    └─────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                         MONITORING & LOGGING                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │   Health Checks  │  │  Error Tracking  │  │  Performance     │     │
│  │                  │  │                  │  │  Monitoring      │     │
│  │ • /health (BE)   │  │ • AppLogger      │  │                  │     │
│  │ • /health (FE)   │  │ • system_logs DB │  │ • Response Times │     │
│  │ • Every 30s      │  │ • Sentry (opt)   │  │ • CPU/Memory     │     │
│  │                  │  │                  │  │ • DB Queries     │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │   Slack Alerts   │  │  Uptime Monitor  │  │  Log Aggregation │     │
│  │                  │  │                  │  │                  │     │
│  │ • Critical Fails │  │ • UptimeRobot    │  │ • Winston Logger │     │
│  │ • Deployments    │  │ • 5min interval  │  │ • Rotation (7d)  │     │
│  │ • High Errors    │  │                  │  │                  │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Database Migration Strategy

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    ZERO-DOWNTIME MIGRATION FLOW                           │
└──────────────────────────────────────────────────────────────────────────┘

PRE-MIGRATION PHASE (CI/CD)
────────────────────────────────────────────────────────────────────────────

┌─────────────────────┐
│ 1. Generate         │     TypeORM Migration Generate
│    Migration        ├────► CREATE TABLE, ALTER COLUMN, etc.
│                     │     + up() and down() methods
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 2. Validate on      │     • Restore prod snapshot to staging
│    Staging          ├────► • Run migration
│                     │     • Test rollback (down())
└──────────┬──────────┘     • Verify data integrity
           │
           ▼
┌─────────────────────┐
│ 3. Code Review &    │     • Peer review migration file
│    Approval         ├────► • Check for breaking changes
│                     │     • Document rollback plan
└──────────┬──────────┘
           │
           │ ✅ Approved
           ▼

PRODUCTION MIGRATION PHASE
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│ Step 1: BACKUP CURRENT STATE (2-5 min)                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ./scripts/db-backup.sh                                                │
│   ├─ pg_dump (full schema + data)                                      │
│   ├─ gzip compression                                                   │
│   ├─ Upload to S3: s3://affexai-backups/database/                      │
│   └─ Verify backup integrity                                           │
│                                                                         │
│   Output: affexai_prod_20251122_143000.sql.gz (345 MB)                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 2: RUN MIGRATIONS (1-10 min, depends on size)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   npm run typeorm:migration:run                                         │
│                                                                         │
│   Example: Adding new column                                            │
│   ┌────────────────────────────────────────────────────────────┐       │
│   │ Migration: AddUserPreferencesColumn1732281600000           │       │
│   │                                                             │       │
│   │ up():                                                       │       │
│   │   ALTER TABLE users ADD COLUMN preferences JSONB;          │       │
│   │   UPDATE users SET preferences = '{}'::jsonb;              │       │
│   │                                                             │       │
│   │ down():                                                     │       │
│   │   ALTER TABLE users DROP COLUMN preferences;               │       │
│   └────────────────────────────────────────────────────────────┘       │
│                                                                         │
│   Logging:                                                              │
│   ✅ [2025-11-22 14:32:15] Running migration: AddUserPreferences...    │
│   ✅ [2025-11-22 14:32:17] Migration completed (2.3s)                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 3: VERIFY DATA INTEGRITY (1-2 min)                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ./scripts/verify-data-integrity.sh                                    │
│                                                                         │
│   Checks:                                                               │
│   ✅ Table count matches pre-migration (48 tables)                     │
│   ✅ Row count validation (users: 1,234 → 1,234)                       │
│   ✅ Foreign key constraints valid                                     │
│   ✅ No orphaned records                                               │
│   ✅ Index validity check                                              │
│   ✅ CMS pages preserved (156 pages)                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 4: DEPLOY NEW CODE (3-5 min)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Coolify Rolling Deployment:                                           │
│   1. Start new container (backend-3) with updated code                 │
│   2. Wait for health check (10s)                                       │
│   3. Route 50% traffic to new container                                │
│   4. Start second new container (backend-4)                            │
│   5. Route 100% traffic to new containers                              │
│   6. Stop old containers (backend-1, backend-2)                        │
│                                                                         │
│   NO DOWNTIME - Always 2 healthy containers running                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 5: POST-DEPLOYMENT MONITORING (15 min)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   • Monitor error logs (watch for migration-related issues)            │
│   • Check health endpoint every 10s                                    │
│   • Verify critical user flows (login, ticket creation, etc.)          │
│   • Database performance metrics (query times)                         │
│   • Keep backup for 7 days                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
     ✅ SUCCESS


ROLLBACK SCENARIO (If migration fails)
────────────────────────────────────────────────────────────────────────────

┌─────────────────────┐
│ Migration Failed    │
│ or Data Corruption  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ROLLBACK PROCESS (< 10 min)                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 1. Stop application (prevent writes)                                   │
│    kubectl scale deployment/affexai-backend --replicas=0               │
│                                                                         │
│ 2. Restore database from backup                                        │
│    ./scripts/db-restore.sh s3://.../affexai_prod_20251122_143000.sql   │
│                                                                         │
│ 3. Verify data integrity                                               │
│    ./scripts/verify-data-integrity.sh                                  │
│                                                                         │
│ 4. Revert to previous container version                                │
│    curl POST $COOLIFY_WEBHOOK_BACKEND -d '{"tag": "main-previous"}'    │
│                                                                         │
│ 5. Scale application back up                                           │
│    kubectl scale deployment/affexai-backend --replicas=2               │
│                                                                         │
│ 6. Monitor for stability                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Rolling Deployment Process

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      ZERO-DOWNTIME ROLLING DEPLOYMENT                     │
│                          (Coolify Strategy)                               │
└──────────────────────────────────────────────────────────────────────────┘

INITIAL STATE (v1.0.0 Running)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                    (Distributes Traffic 50/50)                            │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌──────────────────┐        ┌──────────────────┐
    │  backend-1       │        │  backend-2       │
    │  v1.0.0          │        │  v1.0.0          │
    │  Status: HEALTHY │        │  Status: HEALTHY │
    │  Traffic: 50%    │        │  Traffic: 50%    │
    └──────────────────┘        └──────────────────┘


DEPLOYMENT TRIGGERED (v1.1.0)
────────────────────────────────────────────────────────────────────────────

Step 1: START NEW CONTAINER (maxSurge: 1)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│              (Gradually shift traffic to new version)                     │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  backend-1       │  │  backend-2       │  │  backend-3       │
    │  v1.0.0          │  │  v1.0.0          │  │  v1.1.0          │
    │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: STARTING│
    │  Traffic: 50%    │  │  Traffic: 50%    │  │  Traffic: 0%     │
    └──────────────────┘  └──────────────────┘  └──────────────────┘
                                                          │
                                                          │
                                                 ┌────────▼────────┐
                                                 │ Health Check    │
                                                 │ /health         │
                                                 │ Waiting...      │
                                                 └─────────────────┘

Step 2: HEALTH CHECK PASSES (after 20s)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                    (Route 33% to new version)                             │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  backend-1       │  │  backend-2       │  │  backend-3       │
    │  v1.0.0          │  │  v1.0.0          │  │  v1.1.0          │
    │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: HEALTHY │
    │  Traffic: 33%    │  │  Traffic: 33%    │  │  Traffic: 33%    │
    └──────────────────┘  └──────────────────┘  └──────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │ ✅ Health OK    │
                                                 │ successThreshold│
                                                 │ reached (2/2)   │
                                                 └─────────────────┘

Step 3: START SECOND NEW CONTAINER
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│              (Prepare to route majority to new version)                   │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┼─────────────┐
              │             │             │             │
              ▼             ▼             ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  backend-1       │  │  backend-2       │  │  backend-3       │  │  backend-4       │
    │  v1.0.0          │  │  v1.0.0          │  │  v1.1.0          │  │  v1.1.0          │
    │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: STARTING│
    │  Traffic: 33%    │  │  Traffic: 33%    │  │  Traffic: 33%    │  │  Traffic: 0%     │
    └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘

Step 4: SECOND HEALTH CHECK PASSES
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                (Route 50% to new version, 50% to old)                     │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┼─────────────┐
              │             │             │             │
              ▼             ▼             ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  backend-1       │  │  backend-2       │  │  backend-3       │  │  backend-4       │
    │  v1.0.0          │  │  v1.0.0          │  │  v1.1.0          │  │  v1.1.0          │
    │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: HEALTHY │
    │  Traffic: 25%    │  │  Traffic: 25%    │  │  Traffic: 25%    │  │  Traffic: 25%    │
    └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘

Step 5: STOP OLD CONTAINER (backend-1)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                  (Route 66% to new, 33% to old)                           │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
                            │             ┌─────────────┼─────────────┐
                            │             │             │             │
                            ▼             ▼             ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  backend-1       │  │  backend-2       │  │  backend-3       │  │  backend-4       │
    │  v1.0.0          │  │  v1.0.0          │  │  v1.1.0          │  │  v1.1.0          │
    │  Status: DRAINING│  │  Status: HEALTHY │  │  Status: HEALTHY │  │  Status: HEALTHY │
    │  Traffic: 0%     │  │  Traffic: 33%    │  │  Traffic: 33%    │  │  Traffic: 33%    │
    └────────┬─────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
             │
             │ preStop: sleep 10s (drain connections)
             │
             ▼
    ┌──────────────────┐
    │ Container Stopped│
    │ Cleanup Complete │
    └──────────────────┘

Step 6: STOP SECOND OLD CONTAINER (backend-2)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                    (Route 100% to new version)                            │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
                            │                           ┌─────────────┐
                            │                           │             │
                            ▼                           ▼             ▼
                  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
                  │  backend-2       │  │  backend-3       │  │  backend-4       │
                  │  v1.0.0          │  │  v1.1.0          │  │  v1.1.0          │
                  │  Status: DRAINING│  │  Status: HEALTHY │  │  Status: HEALTHY │
                  │  Traffic: 0%     │  │  Traffic: 50%    │  │  Traffic: 50%    │
                  └────────┬─────────┘  └──────────────────┘  └──────────────────┘
                           │
                           │ preStop: sleep 10s
                           │
                           ▼
                  ┌──────────────────┐
                  │ Container Stopped│
                  └──────────────────┘


FINAL STATE (v1.1.0 Deployed)
────────────────────────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                   │
│                    (Distributes Traffic 50/50)                            │
└───────────────────────────┬───────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌──────────────────┐        ┌──────────────────┐
    │  backend-3       │        │  backend-4       │
    │  v1.1.0          │        │  v1.1.0          │
    │  Status: HEALTHY │        │  Status: HEALTHY │
    │  Traffic: 50%    │        │  Traffic: 50%    │
    └──────────────────┘        └──────────────────┘

    ✅ Deployment Complete
    ✅ Zero Downtime Achieved
    ✅ Old Version Fully Replaced


DEPLOYMENT TIMELINE
────────────────────────────────────────────────────────────────────────────

0:00    - Deployment triggered
0:05    - backend-3 (v1.1.0) starting
0:25    - backend-3 health check passed → route 33% traffic
0:30    - backend-4 (v1.1.0) starting
0:50    - backend-4 health check passed → route 50% to new version
1:00    - backend-1 (v1.0.0) draining → 0% traffic
1:10    - backend-1 stopped
1:15    - backend-2 (v1.0.0) draining → 0% traffic
1:25    - backend-2 stopped
1:30    - Deployment complete ✅

Total Duration: ~90 seconds
Downtime: 0 seconds ✅
```

---

## Rollback Procedures

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      EMERGENCY ROLLBACK PROCEDURES                        │
└──────────────────────────────────────────────────────────────────────────┘

ROLLBACK DECISION TREE
────────────────────────────────────────────────────────────────────────────

                    ┌────────────────────────┐
                    │ Deployment Issue       │
                    │ Detected               │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │ Is it CRITICAL?        │
                    │ • 5xx errors           │
                    │ • Data loss            │
                    │ • Security breach      │
                    └───────────┬────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
            YES  ▼                             ▼  NO
    ┌────────────────────┐         ┌────────────────────┐
    │ IMMEDIATE ROLLBACK │         │ Can it be hotfixed?│
    │ (< 2 minutes)      │         │                    │
    └────────┬───────────┘         └────────┬───────────┘
             │                               │
             │                     ┌─────────┴─────────┐
             │                     │                   │
             │                YES  ▼                   ▼  NO
             │         ┌────────────────────┐  ┌────────────────────┐
             │         │ Deploy Hotfix      │  │ ROLLBACK           │
             │         │ (Fast-track CI/CD) │  │ (Schedule fix)     │
             │         └────────────────────┘  └────────────────────┘
             │                     │                   │
             └─────────────────────┴───────────────────┘
                                   │
                                   ▼
                       ┌────────────────────┐
                       │ Execute Rollback   │
                       │ Procedure          │
                       └────────────────────┘


SCENARIO 1: APPLICATION ROLLBACK (No DB Changes)
────────────────────────────────────────────────────────────────────────────
Duration: < 2 minutes
Database: Unchanged

┌─────────────────────────────────────────────────────────────────────────┐
│ Step 1: Identify Previous Version (10 sec)                             │
├─────────────────────────────────────────────────────────────────────────┤
│   $ gh api repos/org/affexai/actions/workflows/deploy.yml/runs \       │
│     --jq '.workflow_runs[] | select(.conclusion == "success")' \       │
│     | head -1                                                           │
│                                                                         │
│   Previous SHA: abc123def456                                            │
│   Previous Tag: ghcr.io/org/affexai-backend:main-abc123def             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 2: Trigger Rollback Deployment (30 sec)                           │
├─────────────────────────────────────────────────────────────────────────┤
│   $ curl -X POST "$COOLIFY_WEBHOOK_BACKEND" \                          │
│     -H "Content-Type: application/json" \                              │
│     -d '{                                                               │
│       "image": "ghcr.io/org/affexai-backend:main-abc123def",           │
│       "force": true                                                     │
│     }'                                                                  │
│                                                                         │
│   $ curl -X POST "$COOLIFY_WEBHOOK_FRONTEND" \                         │
│     -H "Content-Type: application/json" \                              │
│     -d '{                                                               │
│       "image": "ghcr.io/org/affexai-frontend:main-abc123def",          │
│       "force": true                                                     │
│     }'                                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 3: Wait for Health Checks (60 sec)                                │
├─────────────────────────────────────────────────────────────────────────┤
│   $ while ! curl -f https://api.affexai.com/health; do                 │
│       echo "Waiting for backend..."                                     │
│       sleep 5                                                           │
│     done                                                                │
│                                                                         │
│   ✅ Backend: HEALTHY                                                  │
│   ✅ Frontend: HEALTHY                                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 4: Verify Critical Paths (20 sec)                                 │
├─────────────────────────────────────────────────────────────────────────┤
│   $ curl https://api.affexai.com/api/settings                          │
│   $ curl https://affexai.com                                           │
│                                                                         │
│   ✅ Settings API: OK                                                  │
│   ✅ Homepage: OK                                                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

SCENARIO 2: DATABASE ROLLBACK (Schema Changes)
────────────────────────────────────────────────────────────────────────────
Duration: < 10 minutes
Database: Restore from backup

┌─────────────────────────────────────────────────────────────────────────┐
│ Step 1: Stop Application (30 sec)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│   $ kubectl scale deployment/affexai-backend --replicas=0              │
│                                                                         │
│   ⚠️  MAINTENANCE MODE ENABLED                                         │
│   Users will see "Service temporarily unavailable"                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 2: Backup Current State (Forensics) (2 min)                       │
├─────────────────────────────────────────────────────────────────────────┤
│   $ ./scripts/db-backup.sh                                              │
│                                                                         │
│   Created: affexai_prod_20251122_145000.sql.gz (failed state)          │
│   Purpose: For post-mortem analysis                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 3: Identify Pre-Migration Backup (10 sec)                         │
├─────────────────────────────────────────────────────────────────────────┤
│   $ aws s3 ls s3://affexai-backups/database/ | grep pre_migration      │
│                                                                         │
│   Found: pre_migration_20251122_143000.sql.gz                          │
│   Timestamp: 14:30:00 (before deployment)                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 4: Restore Database (5 min)                                       │
├─────────────────────────────────────────────────────────────────────────┤
│   $ ./scripts/db-restore.sh \                                           │
│       s3://affexai-backups/database/pre_migration_20251122_143000.sql  │
│                                                                         │
│   ⚠️  Confirmation required: Type 'RESTORE'                            │
│   > RESTORE                                                             │
│                                                                         │
│   📦 Creating safety backup...                                         │
│   📥 Downloading from S3...                                            │
│   🗜️  Decompressing...                                                 │
│   🔄 Restoring database (pg_restore)...                                │
│   ✅ Restore complete (4m 32s)                                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 5: Verify Data Integrity (1 min)                                  │
├─────────────────────────────────────────────────────────────────────────┤
│   $ ./scripts/verify-data-integrity.sh                                  │
│                                                                         │
│   ✅ Table count: 48 tables                                            │
│   ✅ Row counts match pre-migration                                    │
│   ✅ Foreign keys valid                                                │
│   ✅ No orphaned records                                               │
│   ✅ CMS pages preserved: 156                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 6: Revert Application (30 sec)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│   $ curl -X POST "$COOLIFY_WEBHOOK_BACKEND" \                          │
│     -d '{"image": "ghcr.io/org/affexai-backend:main-abc123def"}'       │
│                                                                         │
│   Deploying previous version (before migration)...                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 7: Scale Application Up (30 sec)                                  │
├─────────────────────────────────────────────────────────────────────────┤
│   $ kubectl scale deployment/affexai-backend --replicas=2              │
│                                                                         │
│   ✅ backend-1: HEALTHY                                                │
│   ✅ backend-2: HEALTHY                                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Step 8: Final Verification (30 sec)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│   Health Checks:                                                        │
│   ✅ GET /health → 200 OK                                              │
│   ✅ Database connectivity → OK                                        │
│                                                                         │
│   Critical Paths:                                                       │
│   ✅ Login → Success                                                   │
│   ✅ Ticket creation → Success                                         │
│   ✅ CMS page load → Success                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                       ┌────────────────────┐
                       │ ✅ ROLLBACK        │
                       │    SUCCESSFUL      │
                       │ Total Time: 9m 12s │
                       └────────────────────┘
```

---

## Monitoring Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    COMPREHENSIVE MONITORING SYSTEM                        │
└──────────────────────────────────────────────────────────────────────────┘

APPLICATION LAYER
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│                           BACKEND MONITORING                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Health Endpoint: /health                                               │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │ {                                                           │        │
│  │   "status": "healthy",                                      │        │
│  │   "checks": {                                               │        │
│  │     "database": { "status": "up", "latency": "12ms" },      │        │
│  │     "redis": { "status": "up", "latency": "3ms" },          │        │
│  │     "memory_heap": { "status": "up", "used": "245MB" }      │        │
│  │   },                                                         │        │
│  │   "uptime": "3d 14h 32m"                                    │        │
│  │ }                                                           │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  Custom Metrics (AppLoggerService):                                     │
│  • Request count (by endpoint)                                         │
│  • Response times (p50, p95, p99)                                      │
│  • Error rate (4xx, 5xx)                                               │
│  • AI API calls (provider, model, duration, success/fail)              │
│  • Database query times                                                │
│  • Email queue depth (BullMQ)                                          │
│  • WebSocket connections (active, total)                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND MONITORING                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Health Endpoint: /health                                               │
│  • Backend connectivity check                                          │
│  • Build timestamp                                                     │
│                                                                         │
│  Web Vitals (Real User Monitoring):                                    │
│  • LCP (Largest Contentful Paint) - Target: < 2.5s                    │
│  • FID (First Input Delay) - Target: < 100ms                          │
│  • CLS (Cumulative Layout Shift) - Target: < 0.1                      │
│  • TTFB (Time to First Byte) - Target: < 600ms                        │
│                                                                         │
│  Error Boundary (React):                                               │
│  • Catches component crashes                                           │
│  • Logs to backend via POST /api/frontend-errors                      │
│  • Displays user-friendly error message                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


DATABASE LAYER
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│                        POSTGRESQL MONITORING                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Connection Pool:                                                       │
│  • Active connections: 45 / 100 (45%)                                  │
│  • Idle connections: 12                                                │
│  • Wait time: 5ms avg                                                  │
│                                                                         │
│  Query Performance:                                                     │
│  • Slow queries (>1s) logged to system_logs                           │
│  • Query plan analysis for optimization                                │
│  • Index usage tracking                                                │
│                                                                         │
│  Replication:                                                           │
│  • Primary → Replica 1: 0ms lag                                        │
│  • Primary → Replica 2: 2ms lag                                        │
│                                                                         │
│  Backups:                                                               │
│  • Last backup: 2025-11-22 14:30:00 (30 min ago)                       │
│  • Backup size: 345 MB                                                 │
│  • S3 upload: Success                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


INFRASTRUCTURE LAYER
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│                          CONTAINER METRICS                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Backend Containers:                                                    │
│  ┌──────────────┬─────────┬─────────┬──────────┬──────────┐           │
│  │ Container    │ CPU     │ Memory  │ Network  │ Status   │           │
│  ├──────────────┼─────────┼─────────┼──────────┼──────────┤           │
│  │ backend-1    │ 35%     │ 245 MB  │ 12 Mbps  │ HEALTHY  │           │
│  │ backend-2    │ 32%     │ 238 MB  │ 11 Mbps  │ HEALTHY  │           │
│  └──────────────┴─────────┴─────────┴──────────┴──────────┘           │
│                                                                         │
│  Frontend Containers:                                                   │
│  ┌──────────────┬─────────┬─────────┬──────────┬──────────┐           │
│  │ Container    │ CPU     │ Memory  │ Network  │ Status   │           │
│  ├──────────────┼─────────┼─────────┼──────────┼──────────┤           │
│  │ frontend-1   │ 18%     │ 156 MB  │ 45 Mbps  │ HEALTHY  │           │
│  │ frontend-2   │ 20%     │ 162 MB  │ 48 Mbps  │ HEALTHY  │           │
│  └──────────────┴─────────┴─────────┴──────────┴──────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


ALERT ROUTING
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│                            ALERT SEVERITY                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🔴 CRITICAL (Slack: #affexai-alerts + SMS)                            │
│  ├─ Health check failing (>2 min)                                      │
│  ├─ Error rate >5% (5xx errors)                                        │
│  ├─ Database connection pool exhausted                                 │
│  ├─ Deployment failed                                                  │
│  └─ Data corruption detected                                           │
│                                                                         │
│  🟡 WARNING (Slack: #affexai-monitoring)                               │
│  ├─ High memory usage (>85%)                                           │
│  ├─ Slow queries detected (>3s)                                        │
│  ├─ Email queue backed up (>1000 jobs)                                 │
│  ├─ Disk usage >80%                                                    │
│  └─ SSL certificate expiring (<7 days)                                 │
│                                                                         │
│  🟢 INFO (Slack: #affexai-deployments)                                 │
│  ├─ Deployment started/completed                                       │
│  ├─ Database backup completed                                          │
│  ├─ Migration completed                                                │
│  └─ Scheduled maintenance                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

MONITORING DASHBOARD (Example)
────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────┐
│                      AFFEXAI PRODUCTION DASHBOARD                        │
│                         2025-11-22 15:00:00 UTC                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  System Health: ✅ ALL SYSTEMS OPERATIONAL                             │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ REQUEST METRICS (Last 5 minutes)                             │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │ Total Requests:        12,345                                │     │
│  │ Success Rate (2xx):    99.7% (12,308 requests)               │     │
│  │ Client Errors (4xx):    0.2% (24 requests)                   │     │
│  │ Server Errors (5xx):    0.1% (13 requests)                   │     │
│  │ Avg Response Time:      245ms                                │     │
│  │ p95 Response Time:      580ms                                │     │
│  │ p99 Response Time:      1.2s                                 │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ INFRASTRUCTURE (Current State)                               │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │ Backend Containers:    2/2 HEALTHY                           │     │
│  │ Frontend Containers:   2/2 HEALTHY                           │     │
│  │ Database:              PRIMARY + 2 REPLICAS (0ms lag)        │     │
│  │ Redis:                 3-NODE CLUSTER (100% uptime)          │     │
│  │ CPU Usage:             35% (avg across all containers)       │     │
│  │ Memory Usage:          42% (3.2 GB / 8 GB)                   │     │
│  │ Disk Usage:            64% (128 GB / 200 GB)                 │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ BUSINESS METRICS (Last 1 hour)                              │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │ Active Users:          1,234                                 │     │
│  │ Tickets Created:       45                                    │     │
│  │ Chat Sessions:         156                                   │     │
│  │ Email Campaigns Sent:  2 (12,500 emails)                    │     │
│  │ CMS Page Views:        3,456                                 │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ RECENT DEPLOYMENTS                                           │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │ ✅ v1.2.3 - 2025-11-22 14:30 (main-abc123def)               │     │
│  │ ✅ v1.2.2 - 2025-11-21 10:15 (main-xyz789abc)               │     │
│  │ ✅ v1.2.1 - 2025-11-20 16:45 (main-def456ghi)               │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │ ACTIVE ALERTS                                                │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │ 🟡 Email queue depth: 850 jobs (threshold: 1000)            │     │
│  │ 🟢 No critical alerts                                        │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**End of Deployment Architecture Diagrams**

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Owner**: DevOps Team
