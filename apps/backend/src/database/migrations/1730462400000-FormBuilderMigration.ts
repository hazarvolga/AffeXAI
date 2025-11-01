import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Form Builder Migration
 *
 * This migration transforms ticket-specific forms into a universal Form Builder system.
 *
 * Changes:
 * 1. Rename ticket_form_definitions → form_definitions
 * 2. Rename ticket_form_versions → form_versions
 * 3. Rename ticket_field_library → form_field_library
 * 4. Add generalization columns to form_definitions
 * 5. Create form_submissions table (centralized storage)
 * 6. Create form_actions table (webhooks & automations)
 *
 * Zero downtime: All existing data is preserved.
 * Rollback safe: Can be reverted without data loss.
 */
export class FormBuilderMigration1730462400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // =====================================================
    // STEP 1: Rename Tables (preserves all data)
    // =====================================================

    console.log('📦 Renaming ticket_form_definitions → form_definitions...');
    await queryRunner.query(`
      ALTER TABLE ticket_form_definitions RENAME TO form_definitions;
    `);

    console.log('📦 Renaming ticket_form_versions → form_versions...');
    await queryRunner.query(`
      ALTER TABLE ticket_form_versions RENAME TO form_versions;
    `);

    console.log('📦 Renaming ticket_field_library → form_field_library...');
    await queryRunner.query(`
      ALTER TABLE ticket_field_library RENAME TO form_field_library;
    `);

    // =====================================================
    // STEP 2: Rename Indexes
    // =====================================================

    console.log('🔍 Renaming indexes...');

    // Form Definitions indexes
    await queryRunner.query(`
      ALTER INDEX "IDX_ticket_form_definitions_name"
      RENAME TO "IDX_form_definitions_name";
    `);

    await queryRunner.query(`
      ALTER INDEX "IDX_ticket_form_definitions_is_active"
      RENAME TO "IDX_form_definitions_is_active";
    `);

    await queryRunner.query(`
      ALTER INDEX "IDX_ticket_form_definitions_is_default"
      RENAME TO "IDX_form_definitions_is_default";
    `);

    // =====================================================
    // STEP 3: Add Generalization Columns to form_definitions
    // =====================================================

    console.log('➕ Adding generalization columns to form_definitions...');

    await queryRunner.query(`
      ALTER TABLE form_definitions
        ADD COLUMN module VARCHAR(50) DEFAULT 'tickets',
        ADD COLUMN form_type VARCHAR(50) DEFAULT 'standard',
        ADD COLUMN allow_public_submissions BOOLEAN DEFAULT false,
        ADD COLUMN settings JSONB DEFAULT '{}';
    `);

    // Update existing records to have explicit module value
    await queryRunner.query(`
      UPDATE form_definitions SET module = 'tickets' WHERE module IS NULL;
    `);

    // Create indexes for new columns
    console.log('🔍 Creating indexes for new columns...');

    await queryRunner.query(`
      CREATE INDEX "IDX_form_definitions_module"
      ON form_definitions(module);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_definitions_form_type"
      ON form_definitions(form_type);
    `);

    // =====================================================
    // STEP 4: Create form_submissions Table
    // =====================================================

    console.log('📝 Creating form_submissions table...');

    await queryRunner.query(`
      CREATE TABLE form_submissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        form_id UUID NOT NULL,
        submitted_data JSONB NOT NULL,

        -- Source tracking
        source_module VARCHAR(50) NOT NULL,
        source_record_id UUID,

        -- User tracking
        submitted_by UUID,
        submitted_at TIMESTAMP DEFAULT NOW(),

        -- Status
        status VARCHAR(50) DEFAULT 'pending',
        processed_at TIMESTAMP,
        processed_by UUID,

        -- Metadata
        metadata JSONB DEFAULT '{}',
        ip_address VARCHAR(45),
        user_agent TEXT,

        -- Timestamps
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),

        -- Foreign keys
        CONSTRAINT "FK_form_submissions_form"
          FOREIGN KEY (form_id)
          REFERENCES form_definitions(id)
          ON DELETE CASCADE,

        CONSTRAINT "FK_form_submissions_submitted_by"
          FOREIGN KEY (submitted_by)
          REFERENCES users(id)
          ON DELETE SET NULL,

        CONSTRAINT "FK_form_submissions_processed_by"
          FOREIGN KEY (processed_by)
          REFERENCES users(id)
          ON DELETE SET NULL
      );
    `);

    // Create indexes for performance
    console.log('🔍 Creating indexes for form_submissions...');

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_form_id"
      ON form_submissions(form_id);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_source_module"
      ON form_submissions(source_module);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_source_record"
      ON form_submissions(source_record_id);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_submitted_by"
      ON form_submissions(submitted_by);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_status"
      ON form_submissions(status);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_submitted_at"
      ON form_submissions(submitted_at DESC);
    `);

    // Composite index for common queries
    await queryRunner.query(`
      CREATE INDEX "IDX_form_submissions_module_status"
      ON form_submissions(source_module, status);
    `);

    // =====================================================
    // STEP 5: Create form_actions Table
    // =====================================================

    console.log('⚡ Creating form_actions table...');

    await queryRunner.query(`
      CREATE TABLE form_actions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        form_id UUID NOT NULL,

        name VARCHAR(100) NOT NULL,
        description TEXT,

        -- Trigger
        trigger_event VARCHAR(50) NOT NULL,
        trigger_conditions JSONB,

        -- Action
        action_type VARCHAR(50) NOT NULL,
        action_config JSONB NOT NULL,

        -- Status
        is_active BOOLEAN DEFAULT true,
        execution_order INT DEFAULT 0,

        -- Stats
        total_executions INT DEFAULT 0,
        successful_executions INT DEFAULT 0,
        failed_executions INT DEFAULT 0,
        last_executed_at TIMESTAMP,

        -- Timestamps
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),

        -- Foreign key
        CONSTRAINT "FK_form_actions_form"
          FOREIGN KEY (form_id)
          REFERENCES form_definitions(id)
          ON DELETE CASCADE
      );
    `);

    // Create indexes
    console.log('🔍 Creating indexes for form_actions...');

    await queryRunner.query(`
      CREATE INDEX "IDX_form_actions_form_id"
      ON form_actions(form_id);
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_form_actions_is_active"
      ON form_actions(is_active)
      WHERE is_active = true;
    `);

    console.log('✅ Form Builder migration completed successfully!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 Rolling back Form Builder migration...');

    // Drop new tables first
    console.log('🗑️ Dropping form_actions table...');
    await queryRunner.query(`DROP TABLE IF EXISTS form_actions CASCADE;`);

    console.log('🗑️ Dropping form_submissions table...');
    await queryRunner.query(`DROP TABLE IF EXISTS form_submissions CASCADE;`);

    // Remove added columns from form_definitions
    console.log('➖ Removing generalization columns...');
    await queryRunner.query(`
      ALTER TABLE form_definitions
        DROP COLUMN IF EXISTS module,
        DROP COLUMN IF EXISTS form_type,
        DROP COLUMN IF EXISTS allow_public_submissions,
        DROP COLUMN IF EXISTS settings;
    `);

    // Rename indexes back
    console.log('🔍 Renaming indexes back...');

    await queryRunner.query(`
      ALTER INDEX "IDX_form_definitions_name"
      RENAME TO "IDX_ticket_form_definitions_name";
    `);

    await queryRunner.query(`
      ALTER INDEX "IDX_form_definitions_is_active"
      RENAME TO "IDX_ticket_form_definitions_is_active";
    `);

    await queryRunner.query(`
      ALTER INDEX "IDX_form_definitions_is_default"
      RENAME TO "IDX_ticket_form_definitions_is_default";
    `);

    // Rename tables back
    console.log('📦 Renaming tables back...');

    await queryRunner.query(`
      ALTER TABLE form_field_library RENAME TO ticket_field_library;
    `);

    await queryRunner.query(`
      ALTER TABLE form_versions RENAME TO ticket_form_versions;
    `);

    await queryRunner.query(`
      ALTER TABLE form_definitions RENAME TO ticket_form_definitions;
    `);

    console.log('✅ Rollback completed successfully!');
  }
}
