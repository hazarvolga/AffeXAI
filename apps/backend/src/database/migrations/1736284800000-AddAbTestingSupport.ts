import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddAbTestingSupport1736284800000 implements MigrationInterface {
  name = 'AddAbTestingSupport1736284800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create email_campaign_variants table
    await queryRunner.createTable(
      new Table({
        name: 'email_campaign_variants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'campaignId',
            type: 'uuid',
          },
          {
            name: 'variantLabel',
            type: 'varchar',
            length: '1',
            comment: 'A, B, C, D, or E',
          },
          // Variant Content
          {
            name: 'subject',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'fromName',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'sendTimeOffset',
            type: 'int',
            isNullable: true,
            comment: 'Minutes offset from base send time',
          },
          // Configuration
          {
            name: 'splitPercentage',
            type: 'decimal',
            precision: 5,
            scale: 2,
            comment: 'Percentage of recipients (0-100)',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'testing'",
            comment: 'testing, winner, loser, draft',
          },
          // Performance Metrics
          {
            name: 'sentCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'openedCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'clickedCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'conversionCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'revenue',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'bounceCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'unsubscribeCount',
            type: 'int',
            default: 0,
          },
          // Computed rates (will be calculated in application layer)
          {
            name: 'openRate',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            comment: 'Calculated: (openedCount / sentCount) * 100',
          },
          {
            name: 'clickRate',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            comment: 'Calculated: (clickedCount / openedCount) * 100',
          },
          {
            name: 'conversionRate',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            comment: 'Calculated: (conversionCount / clickedCount) * 100',
          },
          // Metadata
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // 2. Add foreign key for campaign
    await queryRunner.createForeignKey(
      'email_campaign_variants',
      new TableForeignKey({
        name: 'FK_campaign_variants_campaign',
        columnNames: ['campaignId'],
        referencedTableName: 'email_campaigns',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // 3. Add unique constraint for variant per campaign
    await queryRunner.createIndex(
      'email_campaign_variants',
      new TableIndex({
        name: 'UQ_campaign_variant_label',
        columnNames: ['campaignId', 'variantLabel'],
        isUnique: true,
      }),
    );

    // 4. Add indexes for performance
    await queryRunner.createIndex(
      'email_campaign_variants',
      new TableIndex({
        name: 'IDX_campaign_variants_campaign',
        columnNames: ['campaignId'],
      }),
    );

    await queryRunner.createIndex(
      'email_campaign_variants',
      new TableIndex({
        name: 'IDX_campaign_variants_status',
        columnNames: ['status'],
      }),
    );

    // 5. Extend email_campaigns table with A/B testing fields
    await queryRunner.addColumns('email_campaigns', [
      new TableColumn({
        name: 'isAbTest',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'testType',
        type: 'varchar',
        length: '50',
        isNullable: true,
        comment: 'subject, content, send_time, from_name, combined',
      }),
      new TableColumn({
        name: 'winnerCriteria',
        type: 'varchar',
        length: '50',
        isNullable: true,
        comment: 'open_rate, click_rate, conversion_rate, revenue',
      }),
      new TableColumn({
        name: 'autoSelectWinner',
        type: 'boolean',
        default: true,
      }),
      new TableColumn({
        name: 'winnerSelectionDate',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'selectedWinnerId',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'testDuration',
        type: 'int',
        isNullable: true,
        comment: 'Duration in hours',
      }),
      new TableColumn({
        name: 'confidenceLevel',
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 95.0,
        comment: '95%, 99%, etc.',
      }),
      new TableColumn({
        name: 'minSampleSize',
        type: 'int',
        default: 100,
        comment: 'Minimum sends per variant',
      }),
      new TableColumn({
        name: 'testStatus',
        type: 'varchar',
        length: '20',
        default: "'draft'",
        comment: 'draft, testing, completed, winner_sent',
      }),
    ]);

    // 6. Add foreign key for selected winner
    await queryRunner.createForeignKey(
      'email_campaigns',
      new TableForeignKey({
        name: 'FK_campaign_selected_winner',
        columnNames: ['selectedWinnerId'],
        referencedTableName: 'email_campaign_variants',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // 7. Add index for A/B test campaigns
    await queryRunner.createIndex(
      'email_campaigns',
      new TableIndex({
        name: 'IDX_ab_test_campaigns',
        columnNames: ['isAbTest'],
        where: '"isAbTest" = true',
      }),
    );

    // 8. Add variant tracking to email_logs
    await queryRunner.addColumn(
      'email_logs',
      new TableColumn({
        name: 'variantId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // 9. Add foreign key for variant in email_logs
    await queryRunner.createForeignKey(
      'email_logs',
      new TableForeignKey({
        name: 'FK_email_log_variant',
        columnNames: ['variantId'],
        referencedTableName: 'email_campaign_variants',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // 10. Add index for variant logs
    await queryRunner.createIndex(
      'email_logs',
      new TableIndex({
        name: 'IDX_email_log_variant',
        columnNames: ['variantId'],
      }),
    );

    // 11. Add check constraint for split percentage
    await queryRunner.query(`
      ALTER TABLE email_campaign_variants 
      ADD CONSTRAINT CHK_valid_split_percentage 
      CHECK ("splitPercentage" >= 0 AND "splitPercentage" <= 100)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop email_logs foreign key and column
    await queryRunner.dropIndex('email_logs', 'IDX_email_log_variant');
    await queryRunner.dropForeignKey('email_logs', 'FK_email_log_variant');
    await queryRunner.dropColumn('email_logs', 'variantId');

    // 2. Drop email_campaigns indexes and foreign keys
    await queryRunner.dropIndex('email_campaigns', 'IDX_ab_test_campaigns');
    await queryRunner.dropForeignKey('email_campaigns', 'FK_campaign_selected_winner');

    // 3. Drop email_campaigns columns
    await queryRunner.dropColumns('email_campaigns', [
      'isAbTest',
      'testType',
      'winnerCriteria',
      'autoSelectWinner',
      'winnerSelectionDate',
      'selectedWinnerId',
      'testDuration',
      'confidenceLevel',
      'minSampleSize',
      'testStatus',
    ]);

    // 4. Drop email_campaign_variants table (cascade will drop foreign keys)
    await queryRunner.dropTable('email_campaign_variants', true);
  }
}
