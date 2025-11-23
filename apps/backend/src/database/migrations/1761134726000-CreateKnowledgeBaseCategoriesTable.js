"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKnowledgeBaseCategoriesTable1761134726000 = void 0;
const typeorm_1 = require("typeorm");
class CreateKnowledgeBaseCategoriesTable1761134726000 {
    async up(queryRunner) {
        // Create knowledge_base_categories table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'knowledge_base_categories',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'color',
                    type: 'varchar',
                    length: '50',
                    default: "'blue'",
                },
                {
                    name: 'icon',
                    type: 'varchar',
                    length: '50',
                    default: "'folder'",
                },
                {
                    name: 'sortOrder',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'parentId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'articleCount',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'createdBy',
                    type: 'uuid',
                },
                {
                    name: 'updatedBy',
                    type: 'uuid',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp with time zone',
                    default: 'NOW()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp with time zone',
                    default: 'NOW()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
            ],
        }), true);
        // Add self-referencing foreign key for parent category
        await queryRunner.createForeignKey('knowledge_base_categories', new typeorm_1.TableForeignKey({
            columnNames: ['parentId'],
            referencedTableName: 'knowledge_base_categories',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            name: 'fk_kb_categories_parent',
        }));
        // Add foreign keys for audit fields
        await queryRunner.createForeignKey('knowledge_base_categories', new typeorm_1.TableForeignKey({
            columnNames: ['createdBy'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            name: 'fk_kb_categories_created_by',
        }));
        await queryRunner.createForeignKey('knowledge_base_categories', new typeorm_1.TableForeignKey({
            columnNames: ['updatedBy'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            name: 'fk_kb_categories_updated_by',
        }));
        // Create indexes for better query performance
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_slug',
            columnNames: ['slug'],
            isUnique: true,
        }));
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_parent',
            columnNames: ['parentId'],
        }));
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_active',
            columnNames: ['isActive'],
        }));
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_sort',
            columnNames: ['sortOrder'],
        }));
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_created_at',
            columnNames: ['createdAt'],
        }));
        // Create composite index for parent-child queries with sorting
        await queryRunner.createIndex('knowledge_base_categories', new typeorm_1.TableIndex({
            name: 'idx_kb_categories_parent_sort_active',
            columnNames: ['parentId', 'sortOrder', 'isActive'],
        }));
    }
    async down(queryRunner) {
        // Drop indexes
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_parent_sort_active');
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_created_at');
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_sort');
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_active');
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_parent');
        await queryRunner.dropIndex('knowledge_base_categories', 'idx_kb_categories_slug');
        // Drop foreign keys
        await queryRunner.dropForeignKey('knowledge_base_categories', 'fk_kb_categories_updated_by');
        await queryRunner.dropForeignKey('knowledge_base_categories', 'fk_kb_categories_created_by');
        await queryRunner.dropForeignKey('knowledge_base_categories', 'fk_kb_categories_parent');
        // Drop table
        await queryRunner.dropTable('knowledge_base_categories');
    }
}
exports.CreateKnowledgeBaseCategoriesTable1761134726000 = CreateKnowledgeBaseCategoriesTable1761134726000;
//# sourceMappingURL=1761134726000-CreateKnowledgeBaseCategoriesTable.js.map