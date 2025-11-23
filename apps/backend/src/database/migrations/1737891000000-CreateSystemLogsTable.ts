import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateSystemLogsTable1737891000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'system_logs',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'level',
            type: 'varchar',
            length: '10',
            comment: 'ERROR, WARN, INFO, DEBUG',
          },
          {
            name: 'context',
            type: 'varchar',
            length: '100',
            comment: 'AI, Database, Auth, Ticket, etc.',
          },
          {
            name: 'message',
            type: 'text',
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
            comment: 'Additional contextual data',
          },
          {
            name: 'stack_trace',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
      true,
    );

    // Create indexes for performance
    await queryRunner.createIndex(
      'system_logs',
      new TableIndex({
        name: 'IDX_system_logs_level',
        columnNames: ['level'],
      }),
    );

    await queryRunner.createIndex(
      'system_logs',
      new TableIndex({
        name: 'IDX_system_logs_context',
        columnNames: ['context'],
      }),
    );

    await queryRunner.createIndex(
      'system_logs',
      new TableIndex({
        name: 'IDX_system_logs_created_at',
        columnNames: ['created_at'],
      }),
    );

    await queryRunner.createIndex(
      'system_logs',
      new TableIndex({
        name: 'IDX_system_logs_user_id',
        columnNames: ['user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('system_logs');
  }
}
