"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePageTemplatesTable1729360000000 = void 0;
const typeorm_1 = require("typeorm");
class CreatePageTemplatesTable1729360000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'page_templates',
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
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'category',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'designSystem',
                    type: 'jsonb',
                    isNullable: false,
                },
                {
                    name: 'blocks',
                    type: 'jsonb',
                    isNullable: false,
                },
                {
                    name: 'layoutOptions',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'preview',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'constraints',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'usageCount',
                    type: 'int',
                    default: 0,
                    isNullable: false,
                },
                {
                    name: 'isFeatured',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                    isNullable: false,
                },
                {
                    name: 'authorId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp with time zone',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp with time zone',
                    default: 'now()',
                    isNullable: false,
                },
            ],
        }), true);
        // Add foreign key for authorId
        await queryRunner.createForeignKey('page_templates', new typeorm_1.TableForeignKey({
            columnNames: ['authorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
        // Create indexes for better query performance
        await queryRunner.query(`
      CREATE INDEX idx_page_templates_category ON page_templates(category);
      CREATE INDEX idx_page_templates_is_featured ON page_templates(isFeatured);
      CREATE INDEX idx_page_templates_is_active ON page_templates(isActive);
      CREATE INDEX idx_page_templates_author_id ON page_templates(authorId);
      CREATE INDEX idx_page_templates_created_at ON page_templates(createdAt);
    `);
    }
    async down(queryRunner) {
        // Drop indexes
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_page_templates_created_at;
      DROP INDEX IF EXISTS idx_page_templates_author_id;
      DROP INDEX IF EXISTS idx_page_templates_is_active;
      DROP INDEX IF EXISTS idx_page_templates_is_featured;
      DROP INDEX IF EXISTS idx_page_templates_category;
    `);
        // Drop table (foreign keys are dropped automatically)
        await queryRunner.dropTable('page_templates');
    }
}
exports.CreatePageTemplatesTable1729360000000 = CreatePageTemplatesTable1729360000000;
//# sourceMappingURL=1729360000000-CreatePageTemplatesTable.js.map