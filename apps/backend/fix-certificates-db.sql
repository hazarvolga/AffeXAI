-- Quick Fix: Clean certificates table for new schema
-- WARNING: This will delete ALL existing certificates!
-- Only use in development environment

-- Delete all existing certificates
TRUNCATE TABLE certificates CASCADE;

-- Alternative: Drop and recreate table
-- DROP TABLE IF EXISTS certificates CASCADE;

-- After running this, restart the backend to let TypeORM recreate the schema
