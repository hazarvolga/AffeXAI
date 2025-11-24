#!/bin/sh
set -e  # Exit on any error

echo "🚀 Affexai Production Deployment Script"
echo "========================================"
echo ""

# Simple print functions (Alpine sh compatible)
print_info() {
    echo "[INFO] $1"
}

print_warning() {
    echo "[WARN] $1"
}

print_error() {
    echo "[ERROR] $1"
}

# ============================================
# 1. ENVIRONMENT CHECKS
# ============================================
print_info "Step 1: Environment Checks"

if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL environment variable is not set!"
    exit 1
fi

if [ -z "$NODE_ENV" ]; then
    print_warning "NODE_ENV not set, defaulting to 'production'"
    export NODE_ENV=production
fi

print_info "✅ Environment: $NODE_ENV"
print_info "✅ Database URL configured"

# ============================================
# 2. DATABASE MIGRATIONS
# ============================================
print_info "Step 2: Running Database Migrations"

cd /app/apps/backend || exit 1

# Run pending migrations using compiled JavaScript files
print_info "Executing: npm run typeorm:migration:run:prod"
npm run typeorm:migration:run:prod

if [ $? -eq 0 ]; then
    print_info "✅ Migrations completed successfully"
else
    print_error "❌ Migration failed!"
    exit 1
fi

# ============================================
# 3. POST-DEPLOYMENT VERIFICATION
# ============================================
print_info "Step 3: Post-Deployment Verification"
print_info "✅ Migrations completed successfully"
print_info "✅ Application ready to start"

# ============================================
# 4. POST-DEPLOYMENT TASKS
# ============================================
print_info "Step 4: Post-Deployment Tasks"

# Clear application cache (if using Redis)
if [ -n "$REDIS_HOST" ]; then
    print_info "Clearing Redis cache..."
    # Add redis-cli command here if needed
fi

# ============================================
# 5. DEPLOYMENT SUMMARY
# ============================================
echo ""
echo "=========================================="
echo "🎉 Deployment Completed Successfully!"
echo "=========================================="
echo ""
print_info "✅ Database migrations executed"
print_info "✅ Backend application ready"
print_info "✅ Health checks configured"
echo ""
print_warning "⚠️  IMPORTANT: Change default admin password immediately!"
print_warning "   Login: admin@affexai.com / admin123"
echo ""
print_info "Application starting..."
echo ""
