# Deployment Quick Reference Guide

> **Fast access to critical deployment commands and procedures**
> **Last Updated**: 2025-11-22

---

## Emergency Contacts

| Role | Contact | Availability |
|------|---------|-------------|
| DevOps Team | #affexai-devops (Slack) | 24/7 |
| Critical Alerts | #affexai-alerts (Slack) | 24/7 |
| Incident Commander | [Phone/Email] | On-call rotation |

---

## Critical Commands

### Quick Deployment

```bash
# Trigger production deployment
git push origin main

# Trigger staging deployment
git push origin staging

# Manual deployment trigger (GitHub CLI)
gh workflow run deploy.yml --ref main
```

### Health Checks

```bash
# Backend health
curl https://api.affexai.com/health

# Frontend health
curl https://affexai.com/health

# Database connectivity
PGPASSWORD=$DATABASE_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT 1;"

# Redis connectivity
redis-cli -h $REDIS_HOST ping
```

### Emergency Rollback

```bash
# Application rollback (no DB changes)
# 1. Find last successful deployment SHA
gh api repos/org/affexai/actions/workflows/deploy.yml/runs \
  --jq '.workflow_runs[] | select(.conclusion == "success") | .head_sha' | head -1

# 2. Trigger rollback
curl -X POST "$COOLIFY_WEBHOOK_BACKEND" \
  -H "Content-Type: application/json" \
  -d '{"image": "ghcr.io/org/affexai-backend:main-PREVIOUS_SHA", "force": true}'

curl -X POST "$COOLIFY_WEBHOOK_FRONTEND" \
  -H "Content-Type: application/json" \
  -d '{"image": "ghcr.io/org/affexai-frontend:main-PREVIOUS_SHA", "force": true}'
```

```bash
# Database rollback (with backup restore)
# 1. Stop application
kubectl scale deployment/affexai-backend --replicas=0

# 2. Restore database
./apps/backend/scripts/db-restore.sh s3://affexai-backups/database/BACKUP_FILE.sql.gz

# 3. Revert containers
curl -X POST "$COOLIFY_WEBHOOK_BACKEND" -d '{"image": "ghcr.io/org/affexai-backend:main-PREVIOUS_SHA"}'

# 4. Scale up
kubectl scale deployment/affexai-backend --replicas=2
```

### Database Operations

```bash
# Create backup
cd apps/backend
./scripts/db-backup.sh

# Restore backup
./scripts/db-restore.sh /path/to/backup.sql.gz

# Verify data integrity
./scripts/verify-data-integrity.sh

# Run migrations
npm run typeorm:migration:run

# Revert last migration
npm run typeorm:migration:revert
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] package-lock.json committed
- [ ] Migration files generated (if schema changes)
- [ ] Migration tested on staging
- [ ] Environment variables set in Coolify
- [ ] Stakeholders notified
- [ ] Rollback plan prepared

### During Deployment

- [ ] Monitor GitHub Actions workflow
- [ ] Watch Coolify deployment logs
- [ ] Check health endpoints
- [ ] Verify database migration success

### Post-Deployment

- [ ] Run smoke tests
- [ ] Monitor error logs (15 minutes)
- [ ] Test critical user flows
- [ ] Update deployment log
- [ ] Send completion notification

---

## Monitoring URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Production Frontend | https://affexai.com | - |
| Production Backend | https://api.affexai.com | - |
| Staging Frontend | https://staging.affexai.com | - |
| Staging Backend | https://staging-api.affexai.com | - |
| Coolify Dashboard | https://coolify.yourserver.com | [See 1Password] |
| GitHub Actions | https://github.com/org/affexai/actions | - |
| Slack Alerts | #affexai-alerts | - |

---

## Common Issues & Solutions

### Issue: Build Failing (Tiptap Dependency)

**Symptoms**: Docker build fails with "Cannot find module @tiptap/core"

**Solution**:
```bash
# Run Tiptap fix script
./scripts/fix-tiptap-dependencies.sh

# Commit updated package files
git add package.json package-lock.json apps/frontend/package.json
git commit -m "fix: resolve Tiptap dependency conflicts"
git push
```

### Issue: Health Check Failing

**Symptoms**: Deployment stuck on health check verification

**Solution**:
```bash
# 1. Check container logs
kubectl logs deployment/affexai-backend --tail=100

# 2. Check database connectivity
PGPASSWORD=$DATABASE_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT 1;"

# 3. Check Redis
redis-cli -h $REDIS_HOST ping

# 4. Manual health check
curl -v https://api.affexai.com/health
```

### Issue: Database Migration Stuck

**Symptoms**: Migration taking >10 minutes

**Solution**:
```bash
# 1. Check active queries
PGPASSWORD=$DATABASE_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "
  SELECT pid, now() - pg_stat_activity.query_start AS duration, query
  FROM pg_stat_activity
  WHERE state = 'active' AND query NOT LIKE '%pg_stat_activity%'
  ORDER BY duration DESC;
"

# 2. Kill long-running query (if safe)
PGPASSWORD=$DATABASE_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "
  SELECT pg_terminate_backend(<pid>);
"

# 3. Rollback migration
npm run typeorm:migration:revert
```

### Issue: High Error Rate (5xx)

**Symptoms**: >5% of requests returning 5xx errors

**Solution**:
```bash
# 1. Check recent errors in database
PGPASSWORD=$DATABASE_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "
  SELECT message, metadata, created_at
  FROM system_logs
  WHERE level = 'ERROR' AND created_at > NOW() - INTERVAL '5 minutes'
  ORDER BY created_at DESC
  LIMIT 20;
"

# 2. Check container health
kubectl get pods

# 3. Trigger rollback if critical
# (See Emergency Rollback section)
```

---

## Key Metrics Thresholds

| Metric | Target | Warning | Critical | Action |
|--------|--------|---------|----------|--------|
| Health Check Success | 100% | <99% | <95% | Investigate/Rollback |
| Response Time (p95) | <500ms | >1s | >2s | Optimize queries |
| Error Rate (5xx) | <0.1% | >1% | >5% | Rollback |
| CPU Usage | <60% | >80% | >90% | Scale up |
| Memory Usage | <70% | >85% | >95% | Check for leaks |
| DB Connections | <80% | >90% | >95% | Increase pool size |
| Disk Usage | <70% | >85% | >95% | Cleanup/expand |

---

## Scripts Reference

| Script | Location | Purpose | Duration |
|--------|----------|---------|----------|
| Fix Tiptap | /scripts/fix-tiptap-dependencies.sh | Resolve dependency conflicts | 3-5 min |
| DB Backup | /apps/backend/scripts/db-backup.sh | Create database backup | 2-5 min |
| DB Restore | /apps/backend/scripts/db-restore.sh | Restore from backup | 5-10 min |
| Verify Integrity | /apps/backend/scripts/verify-data-integrity.sh | Validate database | 1-2 min |

---

## Incident Response

### Critical Incident (5xx errors, data loss, downtime)

**Immediate Actions** (< 5 minutes):
1. Post in #affexai-alerts: "INCIDENT: [brief description]"
2. Check health endpoints
3. Review recent logs
4. Decide: Rollback or Debug

**If Rollback**:
1. Execute emergency rollback (see above)
2. Verify services restored
3. Schedule post-mortem

**If Debug**:
1. Isolate issue (app, DB, network)
2. Apply hotfix or rollback
3. Monitor for stability

### Post-Incident

1. Create incident report (claudedocs/incidents/YYYY-MM-DD-name.md)
2. Schedule post-mortem meeting
3. Document lessons learned
4. Update runbooks

---

## Slack Notifications

### Critical Alerts (#affexai-alerts)
- Health check failures
- Deployment failures
- 5xx error spikes
- Database issues
- Auto-rollback triggers

### Deployment Updates (#affexai-deployments)
- Deployment started
- Deployment completed
- Rollback executed
- Migration completed

### Monitoring (#affexai-monitoring)
- High resource usage
- Slow queries
- Email queue backed up
- SSL certificate expiring

---

## Useful Queries

### Recent Errors
```sql
SELECT message, metadata, created_at
FROM system_logs
WHERE level = 'ERROR' AND created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC
LIMIT 50;
```

### AI Call Statistics
```sql
SELECT
  metadata->>'provider' AS provider,
  COUNT(*) AS calls,
  AVG((metadata->>'duration')::int) AS avg_duration_ms,
  SUM(CASE WHEN metadata->>'success' = 'true' THEN 1 ELSE 0 END) AS successful,
  SUM(CASE WHEN metadata->>'success' = 'false' THEN 1 ELSE 0 END) AS failed
FROM system_logs
WHERE context = 'AI' AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY metadata->>'provider';
```

### Deployment History
```sql
SELECT message, metadata, created_at
FROM system_logs
WHERE context = 'DEPLOYMENT'
ORDER BY created_at DESC
LIMIT 20;
```

### Database Connection Pool
```sql
SELECT count(*) AS connections,
       state
FROM pg_stat_activity
GROUP BY state;
```

---

## Environment Variables Quick Reference

### Critical Backend Variables
```bash
DATABASE_HOST=          # PostgreSQL host
DATABASE_PORT=5432      # PostgreSQL port
DATABASE_NAME=          # Database name
DATABASE_USERNAME=      # Database user
DATABASE_PASSWORD=      # Database password (encrypted)
REDIS_HOST=             # Redis host
REDIS_PORT=6379         # Redis port
JWT_SECRET=             # JWT signing key (encrypted)
OPENAI_API_KEY=         # OpenAI API key (encrypted)
AWS_ACCESS_KEY_ID=      # AWS S3 access key
AWS_SECRET_ACCESS_KEY=  # AWS S3 secret (encrypted)
RESEND_API_KEY=         # Email service key (encrypted)
NODE_ENV=production     # Environment (production/staging)
```

### Critical Frontend Variables
```bash
NEXT_PUBLIC_API_URL=https://api.affexai.com     # Backend URL
NEXT_PUBLIC_SOCKET_URL=https://api.affexai.com  # WebSocket URL
NEXT_PUBLIC_APP_URL=https://affexai.com         # Frontend URL
```

---

## GitHub Secrets (for CI/CD)

| Secret | Purpose | Set In |
|--------|---------|--------|
| COOLIFY_WEBHOOK_BACKEND | Trigger backend deployment | Repository Settings |
| COOLIFY_WEBHOOK_FRONTEND | Trigger frontend deployment | Repository Settings |
| BACKEND_URL | Health check verification | Repository Settings |
| FRONTEND_URL | Health check verification | Repository Settings |
| SLACK_WEBHOOK | Deployment notifications | Repository Settings |
| NEXT_PUBLIC_API_URL | Frontend build arg | Repository Settings |

---

## Coolify Configuration

### Backend Application
- **Name**: affexai-backend
- **Image**: ghcr.io/org/affexai-backend:latest
- **Port**: 3001
- **Health Check**: /health
- **Replicas**: 2
- **Strategy**: rolling

### Frontend Application
- **Name**: affexai-frontend
- **Image**: ghcr.io/org/affexai-frontend:latest
- **Port**: 3000
- **Health Check**: /
- **Replicas**: 2
- **Strategy**: rolling

---

## Support Resources

| Resource | Link |
|----------|------|
| Full Deployment Strategy | claudedocs/PRODUCTION_DEPLOYMENT_STRATEGY.md |
| Architecture Diagrams | claudedocs/DEPLOYMENT_ARCHITECTURE_DIAGRAM.md |
| Project Documentation | CLAUDE.md |
| GitHub Actions Workflow | .github/workflows/deploy.yml |
| Database Scripts | apps/backend/scripts/ |

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Owner**: DevOps Team
