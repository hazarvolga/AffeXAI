# Self-Learning FAQ System - Production Deployment Guide

## Pre-Deployment Checklist

### Environment Requirements

- [ ] Node.js 18+ installed
- [ ] PostgreSQL 14+ database
- [ ] Redis (optional, for caching)
- [ ] SSL certificates configured
- [ ] Domain name configured
- [ ] Backup system in place

### API Keys & Credentials

- [ ] OpenAI API key (if using OpenAI)
- [ ] Anthropic API key (if using Anthropic)
- [ ] Google AI API key (if using Google)
- [ ] OpenRouter API key (if using OpenRouter)
- [ ] SMTP credentials for email notifications
- [ ] JWT secret key generated

### Database Setup

- [ ] Database created
- [ ] Database user with appropriate permissions
- [ ] Connection string configured
- [ ] Backup schedule configured

## Deployment Steps

### 1. Database Migration

Run the FAQ Learning migrations:

```bash
# Navigate to backend directory
cd apps/backend

# Run migrations
npm run migration:run

# Verify migrations
npm run migration:show
```

Expected migrations:
- `CreateFaqLearningTables` - Creates main tables
- `SeedFaqLearningConfig` - Seeds default configuration

### 2. Environment Configuration

Create or update `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-secure-jwt-secret-here

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
OPENROUTER_API_KEY=...

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=...
SMTP_FROM=noreply@example.com

# FAQ Learning Configuration
FAQ_LEARNING_ENABLED=true
FAQ_MIN_CONFIDENCE=60
FAQ_AUTO_PUBLISH_THRESHOLD=85
FAQ_BATCH_SIZE=100
FAQ_PROCESSING_INTERVAL=3600

# Monitoring
ENABLE_MONITORING=true
ALERT_EMAIL=admin@example.com

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

### 3. Build Application

```bash
# Install dependencies
npm install

# Build backend
cd apps/backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

### 4. Database Seeding

Seed initial configuration:

```bash
cd apps/backend

# Seed FAQ learning configuration
npm run seed:faq-config
```

This will create default configurations for:
- Learning parameters
- AI provider settings
- Quality filters
- Monitoring thresholds

### 5. Verify Installation

Run verification script:

```bash
cd apps/backend
npm run verify:faq-entities
```

Expected output:
```
✓ LearnedFaqEntry entity loaded
✓ LearningPattern entity loaded
✓ FaqLearningConfig entity loaded
✓ Database connection successful
✓ All migrations applied
✓ Configuration seeded
```

### 6. Start Services

#### Development Mode

```bash
# Backend
cd apps/backend
npm run start:dev

# Frontend
cd apps/frontend
npm run dev
```

#### Production Mode

```bash
# Backend
cd apps/backend
npm run start:prod

# Frontend (served by backend)
cd apps/frontend
npm run build
# Static files served from backend
```

### 7. Configure AI Providers

#### Via Admin Panel

1. Navigate to `/admin/support/faq-learning/providers`
2. Select primary AI provider
3. Enter API credentials
4. Test connection
5. Save configuration

#### Via API

```bash
curl -X POST https://api.example.com/api/faq-learning/providers/configure \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "apiKey": "sk-...",
    "model": "gpt-4",
    "enabled": true
  }'
```

### 8. Initial Data Processing

Process historical data:

```bash
curl -X POST https://api.example.com/api/faq-learning/process-batch \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRange": {
      "from": "2024-01-01T00:00:00Z",
      "to": "2024-01-31T23:59:59Z"
    },
    "maxResults": 1000
  }'
```

### 9. Configure Scheduled Jobs

Verify cron jobs are running:

```bash
# Check job status
curl https://api.example.com/api/faq-learning/jobs/status \
  -H "Authorization: Bearer $TOKEN"
```

Expected jobs:
- `hourly-data-processing` - Every hour
- `daily-auto-publish` - 2 AM daily
- `daily-kb-sync` - 3 AM daily
- `weekly-comprehensive-processing` - Weekly
- `daily-cleanup` - 4 AM daily

### 10. Setup Monitoring

#### Health Check Endpoint

```bash
curl https://api.example.com/api/faq-learning/monitoring/health
```

#### Configure Alerts

1. Navigate to `/admin/support/faq-learning/settings`
2. Go to **Monitoring** section
3. Add admin email addresses
4. Configure alert thresholds
5. Test alert system

### 11. Backup Configuration

#### Database Backup

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U user dbname > backup_$DATE.sql
```

#### Configuration Backup

Export configuration:

```bash
curl https://api.example.com/api/faq-learning/config/export \
  -H "Authorization: Bearer $TOKEN" \
  > faq_config_backup.json
```

## Post-Deployment Verification

### 1. System Health Check

```bash
curl https://api.example.com/api/faq-learning/monitoring/health
```

Expected response:
```json
{
  "overall": "healthy",
  "components": {
    "learningPipeline": { "status": "healthy" },
    "aiProviders": { "status": "healthy" },
    "database": { "status": "healthy" },
    "queue": { "status": "healthy" }
  }
}
```

### 2. Test FAQ Generation

```bash
# Trigger test processing
curl -X POST https://api.example.com/api/faq-learning/test/generate \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Verify Scheduled Jobs

```bash
# Check job history
curl https://api.example.com/api/faq-learning/jobs/history \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Test Review Workflow

1. Navigate to `/admin/support/faq-learning/review`
2. Verify FAQs appear in queue
3. Test approve/reject functionality
4. Verify published FAQs appear in search

### 5. Test Public Endpoints

```bash
# Search FAQs
curl https://api.example.com/api/learned-faqs/search?q=password

# Submit feedback
curl -X POST https://api.example.com/api/learned-faqs/{id}/feedback \
  -H "Content-Type: application/json" \
  -d '{"helpful": true}'
```

## Monitoring & Maintenance

### Daily Tasks

- [ ] Check system health dashboard
- [ ] Review new FAQs in queue
- [ ] Monitor active alerts
- [ ] Check processing logs

### Weekly Tasks

- [ ] Review analytics reports
- [ ] Check provider performance
- [ ] Verify backup integrity
- [ ] Update configuration if needed

### Monthly Tasks

- [ ] Review ROI metrics
- [ ] Optimize configuration
- [ ] Clean up old data
- [ ] Update documentation

## Troubleshooting

### Issue: Migrations Fail

**Solution:**
```bash
# Rollback last migration
npm run migration:revert

# Check migration status
npm run migration:show

# Re-run migrations
npm run migration:run
```

### Issue: AI Provider Connection Fails

**Solution:**
1. Verify API key is correct
2. Check network connectivity
3. Verify rate limits not exceeded
4. Try alternative provider
5. Check provider status page

### Issue: No FAQs Generated

**Solution:**
1. Check if learning pipeline is running
2. Verify data exists in source tables
3. Check confidence thresholds
4. Review processing logs
5. Test AI provider connection

### Issue: High Memory Usage

**Solution:**
1. Reduce batch size
2. Increase processing interval
3. Enable caching
4. Optimize database queries
5. Add more resources

## Rollback Procedure

If deployment fails:

### 1. Stop Services

```bash
# Stop backend
pm2 stop backend

# Stop frontend
pm2 stop frontend
```

### 2. Rollback Database

```bash
# Revert migrations
cd apps/backend
npm run migration:revert

# Restore from backup
psql -h localhost -U user dbname < backup_latest.sql
```

### 3. Restore Previous Version

```bash
# Checkout previous version
git checkout previous-tag

# Rebuild
npm install
npm run build

# Restart services
pm2 restart all
```

## Performance Tuning

### Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_faq_confidence ON learned_faq_entries(confidence);
CREATE INDEX CONCURRENTLY idx_faq_created_at ON learned_faq_entries(created_at);
CREATE INDEX CONCURRENTLY idx_pattern_frequency ON learning_patterns(frequency);

-- Analyze tables
ANALYZE learned_faq_entries;
ANALYZE learning_patterns;
ANALYZE faq_learning_config;
```

### Caching Configuration

```typescript
// Enable Redis caching
{
  "caching": {
    "enabled": true,
    "ttl": 3600,
    "provider": "redis",
    "redisUrl": "redis://localhost:6379"
  }
}
```

### Load Balancing

For high-traffic deployments:

```nginx
upstream backend {
    server backend1:3000;
    server backend2:3000;
    server backend3:3000;
}

server {
    listen 443 ssl;
    server_name api.example.com;

    location /api/faq-learning {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Security Hardening

### 1. API Rate Limiting

```typescript
{
  "rateLimit": {
    "windowMs": 60000,
    "max": 100,
    "message": "Too many requests"
  }
}
```

### 2. Input Validation

All endpoints validate input using class-validator.

### 3. PII Protection

Data privacy service automatically detects and anonymizes PII.

### 4. Audit Logging

All admin actions are logged for compliance.

### 5. HTTPS Only

```nginx
server {
    listen 80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}
```

## Scaling Considerations

### Horizontal Scaling

- Use load balancer for multiple backend instances
- Shared Redis for caching
- Database read replicas for analytics

### Vertical Scaling

- Increase CPU for AI processing
- Increase memory for batch processing
- Faster storage for database

### Queue Management

For high-volume deployments, consider:
- Bull queue with Redis
- Separate worker processes
- Priority queuing

## Support & Resources

### Documentation

- API Documentation: `/docs/api`
- Admin Guide: `/docs/admin`
- Architecture: `/docs/architecture`

### Monitoring Dashboards

- System Health: `/admin/support/faq-learning`
- Analytics: `/admin/support/faq-learning/analytics`
- Monitoring: `/admin/support/faq-learning/monitoring`

### Contact

- Technical Support: support@example.com
- Emergency: +1-555-0123
- Documentation: https://docs.example.com

---

**Deployment Checklist Summary**

- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] AI providers configured and tested
- [ ] Initial data processing completed
- [ ] Scheduled jobs running
- [ ] Monitoring and alerts configured
- [ ] Backup system in place
- [ ] Health checks passing
- [ ] Documentation updated
- [ ] Team trained on admin panel

**Deployment Date**: _____________
**Deployed By**: _____________
**Version**: _____________
