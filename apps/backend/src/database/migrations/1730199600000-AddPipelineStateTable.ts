import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AddPipelineStateTable1730199600000 implements MigrationInterface {
  name = 'AddPipelineStateTable1730199600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'faq_pipeline_state',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['running', 'stopped', 'error'],
            default: "'stopped'",
          },
          {
            name: 'lastRun',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'nextScheduledRun',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'dailyProcessingCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'totalFaqsGenerated',
            type: 'int',
            default: 0,
          },
          {
            name: 'lastError',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'processingConfig',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create index on status for faster queries
    await queryRunner.createIndex(
      'faq_pipeline_state',
      new TableIndex({
        name: 'IDX_pipeline_state_status',
        columnNames: ['status'],
      }),
    );

    // Create index on updatedAt for sorting
    await queryRunner.createIndex(
      'faq_pipeline_state',
      new TableIndex({
        name: 'IDX_pipeline_state_updated_at',
        columnNames: ['updatedAt'],
      }),
    );

    // Insert initial state
    await queryRunner.query(`
      INSERT INTO faq_pipeline_state (id, status, "dailyProcessingCount", "totalFaqsGenerated", "processingConfig", "createdAt", "updatedAt")
      VALUES (
        uuid_generate_v4(),
        'stopped',
        0,
        0,
        '{"mode": "manual", "batchSize": 50, "scheduleInterval": 3600}'::jsonb,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('faq_pipeline_state', 'IDX_pipeline_state_updated_at');
    await queryRunner.dropIndex('faq_pipeline_state', 'IDX_pipeline_state_status');
    await queryRunner.dropTable('faq_pipeline_state');
  }
}
