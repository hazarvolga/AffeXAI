import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateKnowledgeBaseArticlesTable1761134727000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create knowledge_base_articles table
    await queryRunner.createTable(
      new Table({
        name: 'knowledge_base_articles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'summary',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '500',
            isUnique: true,
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'authorId',
            type: 'uuid',
          },
          {
            name: 'tags',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isPublished',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isFeatured',
            type: 'boolean',
            default: false,
          },
          {
            name: 'viewCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'helpfulCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'notHelpfulCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'searchScore',
            type: 'integer',
            default: 0,
          },
          {
            name: 'relatedArticleIds',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'draft'",
          },
          {
            name: 'publishedAt',
            type: 'timestamp with time zone',
            isNullable: true,
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
        ],
      }),
      true,
    );

    // Add foreign key for category
    await queryRunner.createForeignKey(
      'knowledge_base_articles',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: 'knowledge_base_categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        name: 'fk_kb_articles_category',
      }),
    );

    // Add foreign key for author
    await queryRunner.createForeignKey(
      'knowledge_base_articles',
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        name: 'fk_kb_articles_author',
      }),
    );

    // Create indexes for better query performance
    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_slug',
        columnNames: ['slug'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_category',
        columnNames: ['categoryId'],
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_author',
        columnNames: ['authorId'],
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_published',
        columnNames: ['isPublished'],
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_status',
        columnNames: ['status'],
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_created_at',
        columnNames: ['createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_published_at',
        columnNames: ['publishedAt'],
      }),
    );

    // Create composite index for published articles by category
    await queryRunner.createIndex(
      'knowledge_base_articles',
      new TableIndex({
        name: 'idx_kb_articles_category_published',
        columnNames: ['categoryId', 'isPublished', 'publishedAt'],
      }),
    );

    // Create full-text search index for title and content
    await queryRunner.query(`
      CREATE INDEX idx_kb_articles_search 
      ON knowledge_base_articles 
      USING gin(to_tsvector('english', title || ' ' || content));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop full-text search index
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_search');

    // Drop indexes
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_category_published');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_published_at');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_created_at');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_status');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_published');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_author');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_category');
    await queryRunner.dropIndex('knowledge_base_articles', 'idx_kb_articles_slug');

    // Drop foreign keys
    await queryRunner.dropForeignKey('knowledge_base_articles', 'fk_kb_articles_author');
    await queryRunner.dropForeignKey('knowledge_base_articles', 'fk_kb_articles_category');

    // Drop table
    await queryRunner.dropTable('knowledge_base_articles');
  }
}