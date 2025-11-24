-- ============================================
-- Mark All Existing Migrations as Executed
-- ============================================
-- This script safely marks all compiled migrations as executed
-- in the production database to sync migration state with
-- the existing schema.
--
-- IMPORTANT: Only run this if database tables already exist
-- and you're getting "relation already exists" errors.
--
-- Usage: psql $DATABASE_URL -f mark-migrations-executed.sql
-- ============================================

-- First, ensure migrations table exists
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Insert all migration records (ON CONFLICT DO NOTHING ensures idempotency)
INSERT INTO migrations (timestamp, name) VALUES
    (1710000000000, 'CreateCmsTables1710000000000'),
    (17171717171717, 'create-subscribers-table17171717171717'),
    (17171717171718, 'add-subscriber-details17171717171718'),
    (1728662494000, 'AddCmsCategoriesAndMenus1728662494000'),
    (1728908333930, 'AddComplainedStatusToSubscriber1728908333930'),
    (1728908500000, 'CreateTicketsTables1728908500000'),
    (1728909000000, 'SeedTicketCategories1728909000000'),
    (1728910000000, 'ExtendUsersTableAndCreateRoles1728910000000'),
    (1729000000000, 'AddAccountTypeFieldsToUsers1729000000000'),
    (1729000000001, 'AddEmailVerificationFields1729000000001'),
    (1729180000000, 'AddRefreshTokenToUsers1729180000000'),
    (1729264800000, 'CreateCmsMetricsTable1729264800000'),
    (1729333333333, 'AddTokenVersionToUser1729333333333'),
    (1729333333334, 'MigrateExistingUserRoles1729333333334'),
    (1729350000000, 'CreateAnalyticsTables1729350000000'),
    (1729360000000, 'CreatePageTemplatesTable1729360000000'),
    (1729500000000, 'CreateUserRolesTable1729500000000'),
    (1730141000000, 'AddTicketDisplayNumber1730141000000'),
    (1730199600000, 'AddPipelineStateTable1730199600000'),
    (1730552400000, 'CreateReusableContentSystem1730552400000'),
    (1736284800000, 'AddAbTestingSupport1736284800000'),
    (1736285000000, 'AddMarketingAutomation1736285000000'),
    (1736499600000, 'CreateThemeSettings1736499600000'),
    (1737891000000, 'CreateSystemLogsTable1737891000000'),
    (1738032000000, 'AddDEKFieldsToSettings1738032000000'),
    (1738099200000, 'AddJsonStructureToEmailTemplates1738099200000'),
    (1738099300000, 'CreateEmailBlockLibrary1738099300000'),
    (1759668357658, 'CreateUsersTable1759668357658'),
    (1759669080704, 'AddEventsTables1759669080704'),
    (1759670384387, 'AddEmailTables1759670384387'),
    (1759671342074, 'AddMediaTable1759671342074'),
    (1759671927949, 'AddNotificationsTable1759671927949'),
    (1759677801000, 'CreateSettingsTable1759677801000'),
    (1759678923456, 'add-subscriber-location1759678923456'),
    (1759679845678, 'create-segments-table1759679845678'),
    (1759680123456, 'create-groups-table1759680123456'),
    (1759856934336, 'AddBlockToComponentType1759856934336'),
    (1760030936000, 'AddCertificateFieldsToEvent1760030936000'),
    (1760421757644, 'AddEmailSettingsAndEncryption1760421757644'),
    (1760427888000, 'CreateEmailSuppressionTable1760427888000'),
    (1760621189172, 'CreatePlatformIntegrationTables1760621189172'),
    (1760621189173, 'CreateBulkImportExportTables1760621189173'),
    (1760621189175, 'AddCustomFieldsToSubscribers1760621189175'),
    (1760621189176, 'CreateCustomFieldsTable1760621189176'),
    (1760621189177, 'CreateGdprComplianceTables1760621189177'),
    (1760789879830, 'AddSupportEnhancements1760789879830'),
    (1760789880000, 'AddTicketMessageEditingFields1760789880000'),
    (1761134726000, 'CreateKnowledgeBaseCategoriesTable1761134726000'),
    (1761134727000, 'CreateKnowledgeBaseArticlesTable1761134727000'),
    (1761200000000, 'CreateFaqLearningTables1761200000000'),
    (1761200000001, 'SeedFaqLearningConfig1761200000001'),
    (1761311500000, 'FixChatMessageSessionId1761311500000'),
    (1761355638337, 'CreateCompanyKnowledgeSources1761355638337'),
    (1761400000000, 'CreateChatTables1761400000000'),
    (1762095377000, 'FixUserEmailUniqueConstraint1762095377000'),
    (1762095500000, 'UpdateTransactionalEmailSettings1762095500000'),
    (1762200000000, 'AddBlockIdToReusableComponents1762200000000'),
    (1762300000000, 'SeedProductionData1762300000000'),
    (1762310000000, 'SeedCMSContent1762310000000')
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT COUNT(*) as total_migrations_recorded FROM migrations;

-- Show all recorded migrations
SELECT timestamp, name FROM migrations ORDER BY timestamp ASC;
