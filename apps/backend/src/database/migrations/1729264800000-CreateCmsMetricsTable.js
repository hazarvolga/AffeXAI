"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCmsMetricsTable1729264800000 = void 0;
const typeorm_1 = require("typeorm");
class CreateCmsMetricsTable1729264800000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        // Create indexes for better query performance
        await queryRunner.createIndex('cms_metrics', new typeorm_1.TableIndex({
            name: 'IDX_cms_metrics_type',
            columnNames: ['metricType'],
        }));
        await queryRunner.createIndex('cms_metrics', new typeorm_1.TableIndex({
            name: 'IDX_cms_metrics_page',
            columnNames: ['pageId'],
        }));
        await queryRunner.createIndex('cms_metrics', new typeorm_1.TableIndex({
            name: 'IDX_cms_metrics_type_date',
            columnNames: ['metricType', 'createdAt'],
        }));
        await queryRunner.createIndex('cms_metrics', new typeorm_1.TableIndex({
            name: 'IDX_cms_metrics_page_type_date',
            columnNames: ['pageId', 'metricType', 'createdAt'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cms_metrics');
    }
}
exports.CreateCmsMetricsTable1729264800000 = CreateCmsMetricsTable1729264800000;
//# sourceMappingURL=1729264800000-CreateCmsMetricsTable.js.map