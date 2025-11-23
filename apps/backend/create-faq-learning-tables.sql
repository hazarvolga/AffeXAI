-- Create FAQ Learning Tables
-- This script creates the tables for the Self-Learning FAQ System

-- Create learning_patterns table
CREATE TABLE IF NOT EXISTS learning_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "patternType" VARCHAR(20) NOT NULL CHECK ("patternType" IN ('question', 'answer', 'context')),
    pattern TEXT NOT NULL,
    "patternHash" VARCHAR(64) UNIQUE NOT NULL,
    frequency INTEGER DEFAULT 1,
    confidence INTEGER DEFAULT 50 CHECK (confidence >= 1 AND confidence <= 100),
    keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    category VARCHAR(100),
    sources JSONB DEFAULT '[]'::JSONB,
    metadata JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE
);

-- Create learned_faq_entries table
CREATE TABLE IF NOT EXISTS learned_faq_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    confidence INTEGER NOT NULL CHECK (confidence >= 1 AND confidence <= 100),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'published')),
    source VARCHAR(10) NOT NULL CHECK (source IN ('chat', 'ticket')),
    "sourceId" UUID NOT NULL,
    keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    metadata JSONB,
    "usageCount" INTEGER DEFAULT 0,
    "helpfulCount" INTEGER DEFAULT 0,
    "notHelpfulCount" INTEGER DEFAULT 0,
    "reviewedAt" TIMESTAMP WITH TIME ZONE,
    "publishedAt" TIMESTAMP WITH TIME ZONE,
    "reviewedBy" UUID,
    "createdBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    
    -- Foreign key constraints (assuming users table exists)
    CONSTRAINT fk_learned_faq_entries_reviewed_by FOREIGN KEY ("reviewedBy") REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_learned_faq_entries_created_by FOREIGN KEY ("createdBy") REFERENCES users(id) ON DELETE SET NULL
);

-- Create faq_learning_config table
CREATE TABLE IF NOT EXISTS faq_learning_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "configKey" VARCHAR(100) UNIQUE NOT NULL,
    "configValue" JSONB NOT NULL,
    description TEXT,
    "isActive" BOOLEAN DEFAULT true,
    category TEXT,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    
    -- Foreign key constraint (assuming users table exists)
    CONSTRAINT fk_faq_learning_config_updated_by FOREIGN KEY ("updatedBy") REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for learning_patterns
CREATE INDEX IF NOT EXISTS idx_learning_patterns_type ON learning_patterns("patternType");
CREATE INDEX IF NOT EXISTS idx_learning_patterns_frequency ON learning_patterns(frequency);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_confidence ON learning_patterns(confidence);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_category ON learning_patterns(category);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_created_at ON learning_patterns("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS idx_learning_patterns_hash ON learning_patterns("patternHash");

-- Create indexes for learned_faq_entries
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_status ON learned_faq_entries(status);
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_source ON learned_faq_entries(source);
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_category ON learned_faq_entries(category);
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_confidence ON learned_faq_entries(confidence);
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_created_at ON learned_faq_entries("createdAt");
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_source_id ON learned_faq_entries("sourceId");
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_usage_count ON learned_faq_entries("usageCount");

-- Create indexes for faq_learning_config
CREATE UNIQUE INDEX IF NOT EXISTS idx_faq_learning_config_key ON faq_learning_config("configKey");
CREATE INDEX IF NOT EXISTS idx_faq_learning_config_updated_at ON faq_learning_config("updatedAt");

-- Create composite indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_status_confidence ON learned_faq_entries(status, confidence);
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_source_status ON learned_faq_entries(source, status);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_type_confidence ON learning_patterns("patternType", confidence);

-- Create GIN indexes for JSONB columns for better search performance
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_metadata_gin ON learned_faq_entries USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_sources_gin ON learning_patterns USING GIN (sources);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_metadata_gin ON learning_patterns USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_faq_learning_config_value_gin ON faq_learning_config USING GIN ("configValue");

-- Create text search indexes for better full-text search
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_question_text ON learned_faq_entries USING GIN (to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_learned_faq_entries_answer_text ON learned_faq_entries USING GIN (to_tsvector('english', answer));
CREATE INDEX IF NOT EXISTS idx_learning_patterns_pattern_text ON learning_patterns USING GIN (to_tsvector('english', pattern));

-- Insert default configuration values
INSERT INTO faq_learning_config ("configKey", "configValue", description, category, "isActive") VALUES 
('confidence_thresholds', '{"minConfidenceForReview": 60, "minConfidenceForAutoPublish": 85}', 'Minimum confidence scores for review and auto-publishing', 'thresholds', true),
('pattern_recognition', '{"minPatternFrequency": 3, "similarityThreshold": 0.8}', 'Pattern recognition parameters for identifying FAQ candidates', 'recognition', true),
('data_processing', '{"batchSize": 100, "processingInterval": 3600}', 'Batch processing configuration for learning pipeline', 'processing', true),
('quality_filters', '{"minQuestionLength": 10, "maxQuestionLength": 500, "minAnswerLength": 20}', 'Quality filters for question and answer validation', 'quality', true),
('source_preferences', '{"chatSessionMinDuration": 300, "ticketMinResolutionTime": 1800, "requiredSatisfactionScore": 4}', 'Preferences for learning from different data sources', 'sources', true),
('categorization', '{"excludedCategories": [], "autoCategorizationEnabled": true}', 'Category management and auto-categorization settings', 'categories', true),
('ai_model_settings', '{"aiProvider": "openai", "modelName": "gpt-4", "temperature": 0.7, "maxTokens": 1000}', 'AI model configuration for FAQ generation', 'ai', true),
('provider_settings', '{"openai": {"models": ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"], "defaultModel": "gpt-4"}, "anthropic": {"models": ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"], "defaultModel": "claude-3-sonnet"}, "google": {"models": ["gemini-pro", "gemini-pro-vision", "gemini-1.5-pro"], "defaultModel": "gemini-pro"}, "openrouter": {"models": ["meta-llama/llama-2-70b-chat", "anthropic/claude-2", "openai/gpt-4"], "defaultModel": "openai/gpt-4"}}', 'Provider-specific model configurations', 'providers', true),
('advanced_settings', '{"enableRealTimeProcessing": false, "enableAutoPublishing": false, "maxDailyProcessingLimit": 1000, "retentionPeriodDays": 365}', 'Advanced system settings and limits', 'advanced', true),
('system_status', '{"isLearningEnabled": true, "lastProcessingRun": null, "totalFaqsGenerated": 0, "totalPatternsIdentified": 0}', 'System status and statistics', 'status', true)
ON CONFLICT ("configKey") DO NOTHING;

-- Verify table creation
SELECT 
    'learning_patterns' as table_name,
    COUNT(*) as row_count
FROM learning_patterns
UNION ALL
SELECT 
    'learned_faq_entries' as table_name,
    COUNT(*) as row_count
FROM learned_faq_entries
UNION ALL
SELECT 
    'faq_learning_config' as table_name,
    COUNT(*) as row_count
FROM faq_learning_config;

PRINT 'FAQ Learning tables created successfully!';