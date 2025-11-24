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

# Run pending migrations
print_info "Executing: npm run typeorm:migration:run"
npm run typeorm:migration:run

if [ $? -eq 0 ]; then
    print_info "✅ Migrations completed successfully"
else
    print_error "❌ Migration failed!"
    exit 1
fi

# ============================================
# 3. VERIFY DATABASE STATE
# ============================================
print_info "Step 3: Verifying Database State"

# Check if critical tables have data
print_info "Checking roles table..."
ROLES_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM roles;")
ROLES_COUNT=$(echo $ROLES_COUNT | xargs)  # Trim whitespace

if [ "$ROLES_COUNT" -gt 0 ]; then
    print_info "✅ Roles table has $ROLES_COUNT entries"
else
    print_warning "⚠️  Roles table is empty (expected 10 roles)"
fi

print_info "Checking settings table..."
SETTINGS_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM settings;")
SETTINGS_COUNT=$(echo $SETTINGS_COUNT | xargs)

if [ "$SETTINGS_COUNT" -gt 0 ]; then
    print_info "✅ Settings table has $SETTINGS_COUNT entries"
else
    print_warning "⚠️  Settings table is empty (expected 16 settings)"
fi

print_info "Checking users table..."
USERS_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM users;")
USERS_COUNT=$(echo $USERS_COUNT | xargs)

if [ "$USERS_COUNT" -gt 0 ]; then
    print_info "✅ Users table has $USERS_COUNT entries"
else
    print_warning "⚠️  Users table is empty (expected at least 1 admin user)"
fi

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
echo "Database State:"
echo "  - Roles:    $ROLES_COUNT"
echo "  - Settings: $SETTINGS_COUNT"
echo "  - Users:    $USERS_COUNT"
echo ""

if [ "$USERS_COUNT" -gt 0 ] && [ "$ROLES_COUNT" -gt 0 ] && [ "$SETTINGS_COUNT" -gt 0 ]; then
    print_info "✅ All critical data verified"
    echo ""
    print_warning "⚠️  IMPORTANT: Change default admin password immediately!"
    print_warning "   Login: admin@affexai.com / admin123"
else
    print_error "⚠️  Warning: Some tables are empty. Please investigate."
    exit 1
fi

echo ""
print_info "Deployment log: /app/deployment.log"
echo ""
