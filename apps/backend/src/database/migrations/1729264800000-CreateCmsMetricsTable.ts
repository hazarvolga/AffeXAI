import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCmsMetricsTable1729264800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cms_metrics',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'metricType',
            type: 'enum',
            enum: ['view', 'click', 'edit', 'publish'],
            isNullable: false,
          },
          {
            name: 'pageId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pageTitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linkUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'linkText',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'visitorId',
            type: 'varchar',
            isNullable: true,
          },
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
        ],
      }),
      true,
    );

    // Create indexes for better query performance
    await queryRunner.createIndex(
      'cms_metrics',
      new TableIndex({
        name: 'IDX_cms_metrics_type',
        columnNames: ['metricType'],
      }),
    );

    await queryRunner.createIndex(
      'cms_metrics',
      new TableIndex({
        name: 'IDX_cms_metrics_page',
        columnNames: ['pageId'],
      }),
    );

    await queryRunner.createIndex(
      'cms_metrics',
      new TableIndex({
        name: 'IDX_cms_metrics_type_date',
        columnNames: ['metricType', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'cms_metrics',
      new TableIndex({
        name: 'IDX_cms_metrics_page_type_date',
        columnNames: ['pageId', 'metricType', 'createdAt'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cms_metrics');
  }
}
