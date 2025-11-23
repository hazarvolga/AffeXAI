-- ============================================================================
-- Phase 2: Data Migration - Certificate Fields Cleanup
-- ============================================================================
-- Purpose: Remove duplicate certificate data from metadata JSONB field
-- Date: 2025-10-09
-- Author: Refactoring Phase 2
--
-- Background:
-- Certificate data was being stored in both:
-- 1. Dedicated columns (grantsCertificate, certificateTitle, certificateConfig)
-- 2. Metadata JSONB field (redundant)
--
-- This migration removes the duplicates from metadata to establish
-- a single source of truth in the dedicated columns.
-- ============================================================================

BEGIN;

-- ============================================================================
-- Step 1: Backup current state (optional but recommended)
-- ============================================================================

-- Create backup table
CREATE TABLE IF NOT EXISTS events_backup_phase2 AS 
SELECT * FROM events;

SELECT 'Backup created with ' || COUNT(*) || ' events' as backup_status
FROM events_backup_phase2;

-- ============================================================================
-- Step 2: Audit - Find events with duplicate certificate data in metadata
-- ============================================================================

SELECT 
    'Events with duplicate data in metadata: ' || COUNT(*) as audit_result
FROM events
WHERE metadata ? 'grantsCertificate' OR metadata ? 'certificateTitle';

-- Show examples of duplicate data
SELECT 
    id,
    title,
    "grantsCertificate" as column_grants,
    metadata->'grantsCertificate' as metadata_grants,
    "certificateTitle" as column_title,
    metadata->'certificateTitle' as metadata_title
FROM events
WHERE metadata ? 'grantsCertificate' OR metadata ? 'certificateTitle'
LIMIT 5;

-- ============================================================================
-- Step 3: Data Integrity Check
-- ============================================================================

-- Check if any events have data in metadata but not in columns
-- (This would indicate data we need to migrate first)
SELECT 
    'Events needing migration: ' || COUNT(*) as migration_needed
FROM events
WHERE (
    (metadata ? 'grantsCertificate' AND "grantsCertificate" IS NULL)
    OR
    (metadata ? 'certificateTitle' AND "certificateTitle" IS NULL)
);

-- ============================================================================
-- Step 4: Migrate any missing data from metadata to columns (if needed)
-- ============================================================================

-- Migrate grantsCertificate if it exists in metadata but not in column
UPDATE events
SET "grantsCertificate" = (metadata->>'grantsCertificate')::boolean
WHERE metadata ? 'grantsCertificate' 
  AND "grantsCertificate" IS NULL;

-- Migrate certificateTitle if it exists in metadata but not in column
UPDATE events
SET "certificateTitle" = metadata->>'certificateTitle'
WHERE metadata ? 'certificateTitle' 
  AND "certificateTitle" IS NULL;

SELECT 'Data migration completed' as migration_status;

-- ============================================================================
-- Step 5: Remove duplicate data from metadata
-- ============================================================================

-- Remove grantsCertificate from metadata
UPDATE events
SET metadata = metadata - 'grantsCertificate'
WHERE metadata ? 'grantsCertificate';

-- Remove certificateTitle from metadata
UPDATE events
SET metadata = metadata - 'certificateTitle'
WHERE metadata ? 'certificateTitle';

-- ============================================================================
-- Step 6: Verification
-- ============================================================================

-- Verify no certificate data remains in metadata
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ SUCCESS: No certificate data in metadata'
        ELSE '❌ WARNING: ' || COUNT(*) || ' events still have certificate data in metadata'
    END as verification_result
FROM events
WHERE metadata ? 'grantsCertificate' OR metadata ? 'certificateTitle';

-- Show sample of cleaned events
SELECT 
    id,
    title,
    "grantsCertificate",
    "certificateTitle",
    metadata
FROM events
LIMIT 5;

-- ============================================================================
-- Step 7: Statistics
-- ============================================================================

SELECT 
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE "grantsCertificate" = true) as events_with_certificates,
    COUNT(*) FILTER (WHERE "certificateTitle" IS NOT NULL) as events_with_cert_title,
    COUNT(*) FILTER (WHERE "certificateConfig" IS NOT NULL) as events_with_cert_config
FROM events;

COMMIT;

-- ============================================================================
-- Rollback Script (if needed)
-- ============================================================================
-- 
-- To rollback this migration:
--
-- BEGIN;
-- 
-- -- Restore from backup
-- TRUNCATE TABLE events;
-- INSERT INTO events SELECT * FROM events_backup_phase2;
-- 
-- -- Verify restoration
-- SELECT COUNT(*) FROM events;
-- 
-- COMMIT;
--
-- -- Drop backup table (only after verifying everything works)
-- -- DROP TABLE events_backup_phase2;
-- ============================================================================
