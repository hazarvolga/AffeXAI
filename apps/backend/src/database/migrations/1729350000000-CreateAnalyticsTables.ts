import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateAnalyticsTables1729350000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ========================================
    // 1. Analytics Events Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'analytics_events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'componentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'componentType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'interactionType',
            type: 'enum',
            enum: ['click', 'hover', 'scroll', 'focus', 'input', 'submit', 'view', 'exit'],
            isNullable: false,
          },
          {
            name: 'sessionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'pageUrl',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'deviceType',
            type: 'enum',
            enum: ['mobile', 'tablet', 'desktop'],
            isNullable: false,
          },
          {
            name: 'browser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'viewportWidth',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'viewportHeight',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'coordinateX',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'coordinateY',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'relativeX',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'relativeY',
            type: 'int',
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

    // Indexes for analytics_events
    await queryRunner.createIndex(
      'analytics_events',
      new TableIndex({
        name: 'IDX_analytics_events_component',
        columnNames: ['componentId', 'componentType'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_events',
      new TableIndex({
        name: 'IDX_analytics_events_session',
        columnNames: ['sessionId'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_events',
      new TableIndex({
        name: 'IDX_analytics_events_type_date',
        columnNames: ['interactionType', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_events',
      new TableIndex({
        name: 'IDX_analytics_events_page_date',
        columnNames: ['pageUrl', 'createdAt'],
      }),
    );

    // ========================================
    // 2. Analytics Sessions Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'analytics_sessions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'startTime',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'endTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: true,
            comment: 'Duration in milliseconds',
          },
          {
            name: 'pagesVisited',
            type: 'jsonb',
            isNullable: false,
            default: "'[]'",
          },
          {
            name: 'totalInteractions',
            type: 'int',
            default: 0,
          },
          {
            name: 'deviceType',
            type: 'enum',
            enum: ['mobile', 'tablet', 'desktop'],
            isNullable: false,
          },
          {
            name: 'browser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'os',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'converted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'conversionGoal',
            type: 'varchar',
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

    // Indexes for analytics_sessions
    await queryRunner.createIndex(
      'analytics_sessions',
      new TableIndex({
        name: 'IDX_analytics_sessions_user',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_sessions',
      new TableIndex({
        name: 'IDX_analytics_sessions_start_time',
        columnNames: ['startTime'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_sessions',
      new TableIndex({
        name: 'IDX_analytics_sessions_converted',
        columnNames: ['converted', 'conversionGoal'],
      }),
    );

    // ========================================
    // 3. Analytics Heatmaps Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'analytics_heatmaps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'componentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'componentType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'pageUrl',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'periodStart',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'periodEnd',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'points',
            type: 'jsonb',
            isNullable: false,
            comment: 'Array of {x, y, intensity, type}',
          },
          {
            name: 'dimensionWidth',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'dimensionHeight',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'totalInteractions',
            type: 'int',
            default: 0,
          },
          {
            name: 'uniqueUsers',
            type: 'int',
            default: 0,
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

    // Indexes for analytics_heatmaps
    await queryRunner.createIndex(
      'analytics_heatmaps',
      new TableIndex({
        name: 'IDX_analytics_heatmaps_component',
        columnNames: ['componentId', 'pageUrl'],
      }),
    );

    await queryRunner.createIndex(
      'analytics_heatmaps',
      new TableIndex({
        name: 'IDX_analytics_heatmaps_period',
        columnNames: ['periodStart', 'periodEnd'],
      }),
    );

    // ========================================
    // 4. A/B Tests Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'ab_tests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'componentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'componentType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['draft', 'running', 'paused', 'completed'],
            default: "'draft'",
          },
          {
            name: 'periodStart',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'periodEnd',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'conversionGoal',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'targetAudience',
            type: 'jsonb',
            isNullable: true,
            comment: 'Countries, devices, user segments',
          },
          {
            name: 'winnerVariantId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'confidenceLevel',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            comment: 'Statistical confidence (0-100)',
          },
          {
            name: 'sampleSize',
            type: 'int',
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

    // Indexes for ab_tests
    await queryRunner.createIndex(
      'ab_tests',
      new TableIndex({
        name: 'IDX_ab_tests_component',
        columnNames: ['componentId'],
      }),
    );

    await queryRunner.createIndex(
      'ab_tests',
      new TableIndex({
        name: 'IDX_ab_tests_status',
        columnNames: ['status'],
      }),
    );

    // ========================================
    // 5. A/B Test Variants Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'ab_test_variants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'testId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'componentConfig',
            type: 'jsonb',
            isNullable: false,
            comment: 'Component configuration for this variant',
          },
          {
            name: 'trafficAllocation',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
            comment: 'Percentage of traffic (0-100)',
          },
          {
            name: 'impressions',
            type: 'int',
            default: 0,
          },
          {
            name: 'interactions',
            type: 'int',
            default: 0,
          },
          {
            name: 'conversions',
            type: 'int',
            default: 0,
          },
          {
            name: 'conversionRate',
            type: 'decimal',
            precision: 5,
            scale: 4,
            default: 0,
            comment: 'Conversion rate (0-1)',
          },
          {
            name: 'averageEngagementTime',
            type: 'int',
            default: 0,
            comment: 'Average engagement time in milliseconds',
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

    // Foreign key for ab_test_variants
    await queryRunner.createForeignKey(
      'ab_test_variants',
      new TableForeignKey({
        columnNames: ['testId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ab_tests',
        onDelete: 'CASCADE',
      }),
    );

    // Index for ab_test_variants
    await queryRunner.createIndex(
      'ab_test_variants',
      new TableIndex({
        name: 'IDX_ab_test_variants_test',
        columnNames: ['testId'],
      }),
    );

    // ========================================
    // 6. Component Performance Table
    // ========================================
    await queryRunner.createTable(
      new Table({
        name: 'component_performance',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'componentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'componentType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'pageUrl',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'periodStart',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'periodEnd',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'renderTimeAvg',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'renderTimeMin',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'renderTimeMax',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'renderTimeP50',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'renderTimeP95',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'renderTimeP99',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'errorRate',
            type: 'decimal',
            precision: 5,
            scale: 4,
            default: 0,
          },
          {
            name: 'totalRenders',
            type: 'int',
            default: 0,
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

    // Indexes for component_performance
    await queryRunner.createIndex(
      'component_performance',
      new TableIndex({
        name: 'IDX_component_performance_component',
        columnNames: ['componentId', 'pageUrl'],
      }),
    );

    await queryRunner.createIndex(
      'component_performance',
      new TableIndex({
        name: 'IDX_component_performance_period',
        columnNames: ['periodStart', 'periodEnd'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('component_performance');
    await queryRunner.dropTable('ab_test_variants');
    await queryRunner.dropTable('ab_tests');
    await queryRunner.dropTable('analytics_heatmaps');
    await queryRunner.dropTable('analytics_sessions');
    await queryRunner.dropTable('analytics_events');
  }
}
