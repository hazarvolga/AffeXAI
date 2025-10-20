#!/bin/bash

# Quick fix script for certificates database schema issue
# This will truncate the certificates table to allow new schema migration

echo "⚠️  WARNING: This will delete ALL existing certificates!"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Get database credentials from .env or use defaults
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-aluplan}"

echo "Connecting to PostgreSQL..."
echo "Host: $DB_HOST:$DB_PORT"
echo "Database: $DB_NAME"
echo "User: $DB_USER"

# Execute SQL to truncate certificates table
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME <<EOF
-- Truncate certificates table
TRUNCATE TABLE certificates CASCADE;

-- Verify table is empty
SELECT COUNT(*) as remaining_records FROM certificates;

-- Show current schema
\d certificates
EOF

echo ""
echo "✅ Certificates table truncated!"
echo "Now restart your backend:"
echo "  cd backend/aluplan-backend"
echo "  npm run start:dev"
